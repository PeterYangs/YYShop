<template>
	<view style="height: 100vh;background-color: #F2F2F2;" class="col">

		<view class="title-font-size red-color row-no-full center-row" style="background-color: #F8F8F8;padding: 10upx 0;">
			¥{{info.total}}
		</view>

		<view class="col pay-item" style="background-color: #F8F8F8;flex: 1;overflow-y: auto;">

			<view class="row-no-full space center-col" @click="select_pay_type(1)">
				<view class="row-no-full center-col">
					<image src="../../static/pay_icon/wechat.png" style="width: 60upx;height: 60upx;"></image>					
					<text>微信支付</text>
				</view>
				
				<image v-if="item.pay_type==1"  src="../../static/icon/checked.png" style="width: 45upx;height: 45upx;"></image>
				
				<image v-else  src="../../static/icon/no_check.png" style="width: 45upx;height: 45upx;"></image>
				
			</view>
			
			
			<text style="height: 1upx;background-color: #F2F2F2;"></text>
			
			
			<view class="row-no-full space center-col" @click="select_pay_type(2)">
				<view class="row-no-full center-col">
					<image src="../../static/pay_icon/ali.png" style="width: 60upx;height: 60upx;"></image>					
					<text>支付宝</text>
				</view>
				
				<image v-if="item.pay_type==2" src="../../static/icon/checked.png" style="width:45upx;height: 45upx;"></image>
				
				<image v-else src="../../static/icon/no_check.png" style="width: 45upx;height: 45upx;"></image>
				
			</view>


		</view>
		
		<view style="background-color: #F8F8F8;">
			
			<view @click="pay()" class="red-background-color row-no-full center-row" style="color: #FFFFFF;border-radius: 2rem;padding: 20upx 0;margin: 0 20upx;margin-bottom: 20upx;">支付</view>
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				item:{
					
					pay_type:'',
					id:"",
					openid:''
				},
				option:{},
				info:{
					total:0.00
				}
				
			}
		},
		methods: {
			select_pay_type(type){
				
				this.item.pay_type=type;
				
			},
			getDetail(){
				
				this.httpPost({
					url:"/weapp/order/getOrderDetail",
					data:this.option
				}).then((re)=>{
					
					
					
					if(re.code==1){
						
						this.info=re.data;
					}else{
						
						uni.showModal({
							title:'提示',
							content:re.msg,
							complete() {
								
								uni.navigateBack({
									
								});
							}
						})
					}
					
				})
				
			},
			pay(){
				
				if(!this.item.pay_type) return uni.showModal({
					title:'提示',
					content:'请选择支付方式'
				})
				
				if(this.item.pay_type==2){
					
					return uni.showModal({
						title:'提示',
						content:'暂不支持此支付方式'
					})
				}
				
				uni.showLoading({
					mask:true
				})
				
				this.httpPost({
					url:"/weapp/pay/getPayParam",
					data:this.item					
				}).then((re)=>{
					
					uni.hideLoading();
					
					
					if(re.code!=1){
						
						 return uni.showModal({
							title:'提示',
							content:re.msg,
							complete() {
								
								uni.navigateBack({
									
								});
							}
						})
						
					}
					
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: '测试',
						timeStamp: re.data.timeStamp + '',
						nonceStr: re.data.nonceStr,
						package: re.data.package,
						signType: re.data.signType,
						paySign: re.data.paySign,
						success(res) {
					
							// that.getDetail();
							
							console.log(res);
							
							uni.redirectTo({
								url:'../order_list/order_list'
							})
					
						},
						complete(rec) {
							// console.log(re);
					
					
						}
					})
					
				})
			}
		},
		onLoad(e) {
			
			this.option=e;
			
			this.item.id=e.id;
			
			this.item.openid=this.localGet('weapp_openid')
			
			this.getDetail();
		}
	}
</script>

<style>
	
	.pay-item>view{
		
		padding: 20upx 20upx;
	}
	
	.pay-item>view>view>image{
		
		margin-right: 20upx;
	}
	
</style>
