<template>
	<view style="height: 100vh;" class="tip-font-size col">
		
		<view class="col" style="background-color: #EBEEF5;padding: 40upx 30upx;margin: 20upx 50upx;">
			<text>退款成功后，金额将在三个工作日内原路退还到您的账户中</text>
			
			<view style="margin-top: 10upx;" class="row-no-full center-col">
				<image src="../../static/icon/warning.png" style="width: 30upx;height: 30upx;"></image>
				<text class="small-font-size" style="color: #909399;">超过三个月订单无法退款</text>
			</view>
		</view>
		
		<view style="margin-top: 60upx;flex: 1;">
			
			<view class="row-no-full" style="padding: 20upx 50upx;">
				
				<view>退款原因：</view>
				
				<view>
					<input v-model="item.reason" />
				</view>
				
			</view>
			
			<view style="height: 1px;background-color: #F2F2F2;"></view>
			
			<view class="row-no-full" style="padding: 20upx 50upx;">
				
				<view>联系人：</view>
				
				<view>
					<input  v-model="item.name"/>
				</view>
				
			</view>
			
			<view style="height: 1px;background-color: #F2F2F2;"></view>
			
			<view class="row-no-full" style="padding: 20upx 50upx;">
				
				<view>电话：</view>
				
				<view>
					<input v-model="item.phone"/>
				</view>
				
			</view>
			
			<view style="height: 1px;background-color: #F2F2F2;"></view>
			
			
			
		</view>
		
		
		<view class="row-no-full center-row" style="margin-bottom: 30upx;">
			
			<view @click="create_refund()" class="red-background-color normal-font-size" style="color: #FFFFFF;border-radius: 2rem;padding: 10upx 40upx;">申请退款</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:{
					order_goods_id:0,
					reason:'',
					name:'',
					phone:''
				}
			}
		},
		methods:{
			
			create_refund(){
				
				let rule ={
					
					reason:[{rule:'required',msg:'请填写理由'}],
					name:[{rule:'required',msg:'请填联系人'}],
					phone:[{rule:'required',msg:'请填手机号'}],
				};
				
				let check=this.checkFormPro(this.item,rule);
				
				if(!check.result){
					
					this.showModal('提示',check.msg);
					
					return;
					
				}
				
				this.httpPost({
					url:"/weapp/refund/create_refund",
					data:this.item
				}).then((re)=>{
					
					// console.log(re);
					
					if(re.code==1){
						
						// uni.reLaunch({
						// 	url:'../refund_list/refund_list'
						// })
						
						uni.redirectTo({
							url:'../refund_list/refund_list'
						})
						
						
					}else{
						
						this.showModal('提示',re.msg);
						
					}
					
				})
				
				
			}
			
		},
		onLoad(e) {
			
			
			this.item.order_goods_id=e.id;
		}
	}
</script>

<style >
	
	text{
		color: #303133;
	}
	
</style>
