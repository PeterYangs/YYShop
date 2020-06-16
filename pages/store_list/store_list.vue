<template>
	<view class="background-color" style="height: 100vh;width: 100vw;overflow-y: scroll;">

		<view v-for="(v,i) in list" :key='i' style="margin-bottom: 15upx;" >
			<uni-swipe-action class="col">

				<uni-swipe-action-item :options="options" @click.stop="store_set($event,v.id)">

					<view class="bottom col" style="padding: 20upx 20upx;width: 100%;" @click="select(v)">

						<view class="bold row-no-full center-col">
							<view>{{v.name}}</view>
							<view v-if="v.is_default" class="small-font-size tag b-color" style="margin-left: 10upx;">默认</view>
						</view>
						<view class="small-font-size gray-color">{{v.phone}}</view>
						<view class="small-font-size gray-color">{{v.province}}{{v.city}}{{v.area}}{{v.detail}}</view>

					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>





	</view>
</template>

<script>
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item.vue'

	export default {
		data() {
			return {
				options: [{
					text: '设为默认',
					style: {
						backgroundColor: '#4e92df'
					}
				}],
				list:[]
			}
		},
		methods: {

			store_set(e,id) {

				// console.log(id);
				
				
				this.setDefaultStore(id);
				
			},
			getList(){
				
				this.httpPost({
					url:'/weapp/store/getStoreList',
					loading:true
				}).then((re)=>{
					
					this.list=re.data;
					
				})
				
			},
			setDefaultStore(id){
				
				this.httpPost({
					url:"/weapp/store/setDefaultStore",
					data:{id:id}
				}).then((re)=>{
					
					this.getList();
					
				})
				
			},
			select(v){
				
				// console.log(v);
				
				let lastPage=this.lastPage(1);
				
				if(lastPage.route=='pages/confirm/confirm'){
					
					let temp=this.cloneObj(lastPage.data.item);
					
					// temp.address_id=item.id;
					
					// temp.address=item;
					
					temp.store=v;
					
					temp.store_id=v.id;
					
					lastPage.$vm.item=temp;
					
					// lastPage.$vm.item.store_id=temp.id;
					
					uni.navigateBack({});
					
					// lastPage.data.ite
					
					
				}
				
				// console.log(lastPage);
				
			}

		},
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		onLoad() {
			
			this.getList();
			
		}
	}
</script>

<style>
	.bottom>view {

		margin-bottom: 5upx;

	}

	uni-swipe-action-item {

		margin-bottom: 10upx;

	}

	uni-swipe-action {

		background-color: #F2F2F2;
	}

	.b-color {
		
		background-color:#4e92df ;
	}
</style>
