<template>
	<view style="min-height: 100vh;background-color: #F2F2F2;" class="tip-font-size">


		<view class="col item">
			<view>

				<view class="row-no-full">
					<view>收货人</view>

					<input placeholder="请填写收货人姓名" v-model="item.name" />

				</view>

			</view>

			<view v-if="i!=0" style="height: 1px;background-color: #F2F2F2;padding: 0;margin: 0;"></view>

		</view>

		<view class="col item">
			<view>

				<view class="row-no-full">
					<view>手机号码</view>

					<input placeholder="请填写收货人手机号" v-model="item.phone" />

				</view>

			</view>

			<view v-if="i!=0" style="height: 1px;background-color: #F2F2F2;padding: 0;margin: 0;"></view>

		</view>

		<view class="col item"  >
			<view @click.stop="openAddres">

				<view  class="row-no-full center-col" >
					<view>所在区域</view>
					<text >{{item.address}}</text>
					

					<view  class="row-no-full center-col" style="flex: 1;flex-direction: row-reverse;">
						<image src="../../static/icon/right.png" style="height: 30upx;width: 30upx;"></image>
					</view>

				</view>

			</view>

			<view v-if="i!=0" style="height: 1px;background-color: #F2F2F2;padding: 0;margin: 0;"></view>

		</view>
		
		<simple-address ref="simpleAddress" :pickerValueDefault="item.address_index" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>

		<view class="col item">
			<view>

				<view class="row-no-full">
					<view>详细地址</view>

					<!-- <input placeholder="请填写详细地址" v-model="item.address_detail" /> -->
					
					<textarea  :auto-height='true' placeholder="请填写详细地址" v-model="item.address_detail"></textarea>

				</view>

			</view>

			<view v-if="i!=0" style="height: 1px;background-color: #F2F2F2;padding: 0;margin: 0;"></view>

		</view>

		<view class="col item">
			<view>

				<view class="row-no-full">
					<view>标签 </view>

					<view class="row-no-full">
						<view v-for="(v,i) in label_list" :key='i'>
							<view v-if='v==item.label' @click="cancel_label()" class="small-font-size row-no-full center-col label width-fit">{{v}}</view>							
							<view v-else  @click="select_label(v)" class="small-font-size row-no-full center-col label-normal width-fit">{{v}}</view>
						</view>
						
						
					</view>

				</view>

			</view>

			<view v-if="i!=0" style="height: 1px;background-color: #F2F2F2;padding: 0;margin: 0;"></view>

		</view>

		<view class="col item">
			<view>

				<view class="row-no-full space">
					<view @click="page()">设置默认地址 </view>

					<switch color="#c24a28" :checked="item.is_default==1" @change='chang_is_default' />

				</view>

			</view>

			<view v-if="i!=0" style="height: 1px;background-color: #F2F2F2;padding: 0;margin: 0;"></view>

		</view>



		<view style="position: fixed;bottom: 0;left: 0;right: 0;padding: 0 6%;padding-bottom: 30upx;">

			<view @click="submit" style="color: #FFFFFF;border-radius: 1rem;padding: 15upx 40upx;" class="red-background-color row-no-full center-row">保存并使用</view>

		</view>


	</view>
</template>

<script>
	import simpleAddress from '../../components/simple-address/simple-address.nvue'
	export default {
		data() {
			return {

				cityPickerValueDefault: [1, 0, 3],
				pickerText: '',

				item: {
					name: '',
					phone: '',
					address: '',
					address_index: [0, 0, 0],
					address_detail: '',
					label: '',
					is_default: 1,
					id:""

				},
				label_list:['家','学校','公司']
			}
		},
		methods: {

			openAddres() {

				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				// this.pickerText = JSON.stringify(e)

				this.item.address = e.label;
				
				this.item.address_index=e.value;

				console.log(e);

			},
			chang_is_default(e) {

				// console.log(e);

				if (e.detail.value == true) this.item.is_default = 1;

				if (e.detail.value == false) this.item.is_default = 2;


			},
			select_label(v){
				
				this.item.label=v;
				
			},
			cancel_label(){
				
				this.item.label=''
			},
			submit(){
				
				this.httpPost({
					url:"/weapp/address/saveAddress",
					data:this.item
				}).then((re)=>{
					
					// console.log(re);
					
					this.setItem(this.item,re.data);
					
					this.page();
					
				})
				
				
			},
			getDetail(id){
				
				this.httpPost({
					url:"/weapp/address/getDetail",
					data:{id:id}
				}).then((re)=>{
					
					// console.log(re);
					
					this.setItem(this.item,re.data);
					
				})
				
			},
			page(){
				
				console.log();
				
				
				console.log(getCurrentPages());
				
				let lastPage=this.lastPage(1);
				
				let sec=this.lastPage(2);
				
				
				if(lastPage.route=='pages/confirm/confirm'){
					
					
					let temp=this.cloneObj(lastPage.data.item);
					
					temp.address_id=this.item.id;
					
					temp.address=this.item;
										
					lastPage.$vm.changeData(temp);
										
					uni.navigateBack({});
					
					
					
				}else if(sec.route=='pages/confirm/confirm'){
					
					let temp=this.cloneObj(sec.data.item);
					
					temp.address_id=this.item.id;
					
					temp.address=this.item;
										
					sec.$vm.changeData(temp);
										
					uni.navigateBack({delta:2});
					
				}
				
				
				
				
				
			}
		},
		components: {
			simpleAddress
		},
		onLoad(e) {
			
			if(e.id) this.getDetail(e.id);
		}
	}
</script>

<style>
	.item>view {

		background-color: #FFFFFF;

		padding: 20upx;

		/* display: flex;
		
		justify-content: center; */

	}

	.item>view>view {

		display: flex;

		align-items: center;

		/* justify-content: center; */

	}

	.item>view>view>view {

		color: #666;

		width: 190upx;
	}

	.label {
		background-color: #1296db;
		color: #FFFFFF;
		padding: 1upx 25upx;
		height: 30upx;
		border-radius: .8rem;
		margin-right: 20upx;
		white-space: nowrap;
		
	}
	
	
	.label-normal{
		
		padding: 1upx 25upx;
		height: 30upx;
		border-radius: .8rem;
		margin-right: 20upx;
		white-space: nowrap;
		border: 1px solid #CCCCCC;
		
	}
	
	
	
</style>
