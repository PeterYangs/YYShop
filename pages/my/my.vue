<template>
	<view class="relative" style="width: 100vw;min-height: 100vh;background-color: #F2F2F2;">

		<view class="absolute" style="top:0;left: 0;width: 100vw;height: 400upx;">
			<image src="../../static/img/background.jpeg" mode="aspectFill" style="width: 100%;height: 100%;"></image>
		</view>

		<view class="col absolute" style="z-index: 100;width: 100vw;top: 200upx;">

			<view class="col">

				<view class="relative status-item">

					<view v-if="isLogin" class="absolute" style="left: 0;right: 0;top: -75upx">
						<view class="row-no-full center-row">
							<image src="../../static/logo.png" class="header">
							</image>
						</view>
					</view>

					<view v-if="isLogin" class="row-no-full center-row normal-font-size" style="margin-top: 100upx;margin-bottom: 30upx;">
						<template v-if="info.nickname">{{info.nickname}}</template>
						<template v-else>用户{{info.phone}}</template>
					</view>


					<view v-if="!isLogin" style="margin-top: 70upx;margin-bottom: 30upx;" class="row-no-full center-row tip-font-size">

						<view class="login" @click="goLogin()">点击登录账户</view>

					</view>


					<view class="row-no-full" style="justify-content: space-around;padding-bottom: 40upx;padding-top: 20upx;">

						<view class="col center-col" @click="to_order_list(1,1)">
							<image src="../../static/status/待付款.png" style="width: 70upx;height: 70upx;"></image>
							<text class="tip-font-size">待付款</text>
						</view>

						<view class="col center-col" @click="to_order_list(11,2)">
							<image src="../../static/status/待发货.png" style="width: 70upx;height: 70upx;"></image>
							<text class="tip-font-size">待发货</text>
						</view>

						<view class="col center-col">
							<image src="../../static/status/已发货.png" style="width: 70upx;height: 70upx;"></image>
							<text class="tip-font-size">已发货</text>
						</view>

						<view class="col center-col">
							<image src="../../static/status/已完成.png" style="width: 70upx;height: 70upx;"></image>
							<text class="tip-font-size">已完成</text>
						</view>


					</view>


				</view>


				<view style="margin-top: 50upx;" class="tip-font-size list-item">

					<view @click="goCollect()" class="row-no-full center-col" style="justify-content: space-between;">

						<view class="row-no-full center-col" >
							
							<image src="../../static/icon/attention.png" style="width: 40upx;height: 40upx;"></image>
							<text>收藏商品</text>
						</view>

						<view>
							<image src="../../static/icon/right.png" style="height: 40upx;width: 40upx;"></image>
						</view>

					</view>

					<text class="line"></text>

					<view @click="to_history()" class="row-no-full center-col" style="justify-content: space-between;">

						<view class="row-no-full center-col">
							<image src="../../static/icon/history.png" style="width: 40upx;height: 40upx;"></image>
							<text>浏览记录</text>
						</view>

						<view>
							<image src="../../static/icon/right.png" style="height: 40upx;width: 40upx;"></image>
						</view>

					</view>
					
					<text class="line"></text>
					
					<view @click="to_refund_list()" class="row-no-full center-col" style="justify-content: space-between;">
					
						<view class="row-no-full center-col">
							<image src="../../static/icon/sale_after.png" style="width: 40upx;height: 40upx;"></image>
							<text>售后列表</text>
						</view>
					
						<view>
							<image src="../../static/icon/right.png" style="height: 40upx;width: 40upx;"></image>
						</view>
					
					</view>



					<view @click="to_address_list()" class="row-no-full center-col" style="justify-content: space-between;margin-top: 40upx;">

						<view class="row-no-full center-col">
							<image src="../../static/icon/address.png" style="width: 40upx;height: 40upx;"></image>
							<text>地址管理</text>
						</view>

						<view>
							<image src="../../static/icon/right.png" style="height: 40upx;width: 40upx;"></image>
						</view>

					</view>

					<text class="line"></text>

					<view class="row-no-full center-col" style="justify-content: space-between;">

						<view class="row-no-full center-col">
							<image src="../../static/icon/chat.png" style="width: 40upx;height: 40upx;"></image>
							<text>联系客服</text>
						</view>

						<view>
							<image src="../../static/icon/right.png" style="height: 40upx;width: 40upx;"></image>
						</view>

					</view>


				</view>



			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

				info: {},
				isLogin: false

			}
		},
		methods: {

			getInfo() {

				this.httpPost({
					url: "/weapp/login/getInfo"
				}).then((re) => {

					// console.log(re);

					if (re.code == 1) {

						this.isLogin = true;

						this.info = re.data;

					} else {

						this.isLogin = false;


					}

				})

			},
			goLogin(){
				
				
				uni.navigateTo({
					url:'../login/login'
				})
				
			},
			to_order_list(status,index){
				
				uni.navigateTo({
					url:'../order_list/order_list?status='+status+'&index='+index
				})
				
			},
			to_refund_list(){
				
				uni.navigateTo({
					url:"../refund_list/refund_list"
				})
				
			},
			to_address_list(){
				
				uni.navigateTo({
					url:'../address_list/address_list'
				})
				
			},
			goCollect(){
				uni.navigateTo({
					url:"../goods_collect/goods_collect"
				})
			},
			to_history(){
				uni.navigateTo({
					url:"../history/history"
				})
			},
			

		},
		onShow() {

			this.getInfo();
		}
	}
</script>

<style>
	.header {
		border-radius: 50%;
		width: 150upx;
		height: 150upx;
	}

	.status-item {
		min-height: 100upx;
		background-color: #FFFFFF;
		margin: 0 5%;
		border-radius: .3rem;
	}

	.list-item>view {

		padding: 30upx 30upx;
		background-color: #FFFFFF;
	}

	.list-item>view>view>image {

		margin-right: 10upx;
	}

	.line {

		height: 1px;
		background-color: #F2F2F2;
		display: block;
	}

	.login {
		border: 1px solid #000000;
		padding: 10upx 25upx;
		border-radius: .2rem;
	}
</style>
