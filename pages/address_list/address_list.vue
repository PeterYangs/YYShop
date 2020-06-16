<template>
	<view style="height: 100vh;background-color: #F2F2F2;" class="col">

		<view style="height: 92vh;overflow-y: auto;">

			<uni-swipe-action class="col">

				<uni-swipe-action-item v-for="(v,i) in list" :key='i' :options="options" @click="onClick" @change="change($event,v)">

					<view  @click="selectAddress(v)" class="col item" style="width: 100%;padding: 15upx;">

						<view v-if="i!=0" style="height: 1px;background-color: #F2F2F2;padding: 0;margin: 0;"></view>

						<view class="col">

							<view class="row-no-full center-col">

								<view class="bold" style="margin-right: 70upx;">{{v.name}}</view>

								<view class="bold" style="margin-right: 40upx;">{{v.phone}}</view>

								<view class="small-font-size row-no-full center-row center-col" style="background-color: #1296db;color: #FFFFFF;padding: 0 20upx;height: 30upx;">{{v.label}}</view>

								<view v-if="v.is_default==1" class="red-background-color small-font-size center-row row-no-full center-col"
								 style="color: #FFFFFF;padding: 0 20upx;height: 30upx;margin-left: 20upx;">默认</view>

							</view>

							<view class="row-no-full space center-col">
								<view style="color: #666;flex: 1;margin-right: 80upx;" class="small-font-size">{{v.address}}{{v.address_detail}}</view>

								<image @click.stop="to_edit(v.id)" src="../../static/icon/edit.png" style="width: 30upx;height: 30upx;"></image>
							</view>

						</view>


					</view>
				</uni-swipe-action-item>

			</uni-swipe-action>
		</view>


		<view style="flex: 1;background-color: #FFFFFF;" class="col center-row">

			<view style="padding: 15upx 0;" class="row-no-full center-row">

				<view @click="add_address()" class="red-background-color row-no-full center-row" style="color: #FFFFFF;border-radius: 1rem;padding: 10upx 60upx;">新建收货地址</view>

			</view>


		</view>

	</view>
</template>

<script>
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item.vue'

	export default {
		data() {
			return {
				list: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c24a28'
					}
				}],
				checkedItemId: 0
			}
		},
		methods: {

			change(e, item) {

				// console.log(item);

				this.checkedItemId = item.id;


			},
			onClick(e) {

				console.log(e);

				this.deleteAddress();

			},
			getList() {

				this.httpPost({
					url: "/weapp/address/addressList",
					loading: true
				}).then((re) => {

					// console.log(re);

					this.list = re.data;

				})

			},
			to_edit(id) {

				uni.navigateTo({
					url: '../address_edit/address_edit?id=' + id
				})
			},
			deleteAddress() {

				this.showModal('提示', '确定删除？').then(() => {

					this.httpPost({
						url: "/weapp/address/deleteAddress",
						data: {
							id: this.checkedItemId
						}
					}).then(() => {


						this.getList();
					})

				})



			},
			add_address() {

				uni.navigateTo({
					url: '../address_edit/address_edit'
				})

			},
			selectAddress(item){
				
				console.log(item);
				
				let lastPage=this.lastPage(1);
				
				if(lastPage.route=='pages/confirm/confirm'){
					
					let temp=this.cloneObj(lastPage.data.item);
					
					temp.address_id=item.id;
					
					temp.address=item;
										
					lastPage.$vm.changeData(temp);
										
					uni.navigateBack({});
					
					
				}
				
			}
		},
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		onLoad() {

			

		},
		onShow() {
			this.getList();
		}
	}
</script>

<style>
	.item>view {

		background-color: #FFFFFF;
		padding: 20upx 25upx;
	}

	.item>view>view {

		margin-bottom: 10upx;
	}
</style>
