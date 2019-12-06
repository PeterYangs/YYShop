<template>
	<view class="background-color" style="min-height: 100vh;">

		<view style="padding: 20upx 50upx;" class="row-no-full center-col">

			<view class="row-no-full" style="background-color: #FFFFFF;flex: 1;">
				<input class="search-input" placeholder="请搜索商品" placeholder-class="search-placeholder tip-font-size" />

				<view class="row-no-full center-col" style="padding-right: 20upx;" @click="go()">
					<image style="width: 40upx;height: 40upx;" src="../../static/icon/search.png"></image>
				</view>
			</view>

			<view class="row-no-full center-col" style="margin-left: 20upx;">
				<image src="../../static/icon/message.png" style="width: 55upx;height: 55upx;"></image>
			</view>

		</view>

		<view>


			<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(v,i) in adList" :key='i'>
					<view>
						<image :src="getImgPrefix()+v.img" mode="widthFix" style="width: 100%;"></image>
					</view>
				</swiper-item>

			</swiper>

		</view>

		<view class="margin-top">

			<view class="messgae row-no-full center-col">

				<view class="row-no-full center-col" style="margin-right: 20upx;">
					<image src="../../static/icon/notice.png" style="width: 40upx;height: 40upx;"></image>
				</view>

				<text class="tip-font-size" style="flex: 1;overflow: hidden;white-space: nowrap;">
					{{messageList[messageIndex].title}}
				</text>

				<view class="row-no-full center-col">
					<image src="../../static/icon/right.png" style="width: 40upx;height: 40upx;"></image>
				</view>


			</view>

		</view>

		<view class="margin-top" style="background-color: #FFFFFF;">

			<view class="row-no-full" style="padding: 40upx 40upx;">

				<view class="col center-col" style="flex: 1;" v-for="(v,i) in 4" :key='i'>

					<view class="col width-fit">
						<view>
							<image src="../../static/logo.png" style="width: 90upx;height: 90upx;"></image>
						</view>

						<text class="tip-font-size" style="text-align: center;">模块{{v+1}}</text>
					</view>

				</view>

			</view>

		</view>


		<view class="margin-top" :key='i'>

			<view style="background-color: #FFFFFF;">

				<view class="row-no-full center-row" style="padding: 20upx 0;">
					<view>
						<image src="../../static/icon/good.png" style="width: 40upx;height: 40upx;"></image>
					</view>
					<view class="normal-font-size" style="margin-left: 15upx;">店家推荐</view>
				</view>

				<view class="aline"></view>

				<view style="margin-top: 30upx;padding-bottom: 30upx;">

					<scroll-view :scroll-x="true">
						<view class="row-no-full">
							<view class="col" v-for="(v,i) in recommendGoodsList" :key='i' style="padding: 0 30upx;max-width: 250upx;">

								<view @click="toGoodsDetail(v.id)">
									<image style="width: 200upx;height: 200upx;" :src="getImgPrefix()+v.main_img"></image>
								</view>

								<view class="col">
									<view class="tip-font-size text-padding" style="overflow: hidden;white-space: nowrap;">{{v.name}}</view>

									<view class="row-no-full text-padding" style="justify-content: space-between;margin-top: 40upx;">
										<view class="col">


											<view class="red-color tip-font-size">¥ {{v.min_price}}</view>

											<view style="text-decoration: line-through;" class="small-font-size gray-color">¥ {{v.min_price}}</view>
										</view>

										<view>
											<image src="../../static/menu/shop_car_selected.png" style="width: 40upx;height: 40upx;"></image>
										</view>

									</view>
								</view>
							</view>
						</view>
					</scroll-view>


				</view>

			</view>


		</view>


		<view>
			<view class="normal-font-size row-no-full center-col" style="padding: 10upx 0;">
				<view style="height: 1px;flex: 1;" class="black-background-color"></view>
				<view style="margin: 0 45upx;">新品上架</view>
				<view style="height: 1px;flex: 1;" class="black-background-color"></view>

			</view>

			<view style="width: 100vw;flex-wrap: wrap;justify-content: space-between;" class="row-no-full">

				<view class="col" style="align-content: stretch;width: 48%;margin-top: 30upx;background-color: #FFFFFF;padding-bottom: 20upx;"
				 v-for="(v,i) in newGoodsList" :key='i' @click="toGoodsDetail(v.id)">

					<view>
						<image :src="getImgPrefix()+v.main_img" style="width: 100%;" mode="widthFix"></image>
					</view>

					<view style="flex: 1;display: flex;flex-direction: column-reverse;">
						
						<view style="display: flex;flex-direction: column-reverse;">
							<view class="normal-font-size text-padding">
								{{v.name}}
							</view>


							<view class="row-no-full text-padding" style="justify-content: space-between;margin-top: 40upx;">
								<view class="col">


									<view class="red-color tip-font-size">¥ {{v.min_price}}</view>

									<view style="text-decoration: line-through;" class="small-font-size gray-color">¥ {{v.min_price}}</view>
								</view>

								<view>
									<image src="../../static/menu/shop_car_selected.png" style="width: 40upx;height: 40upx;"></image>
								</view>

							</view>

						</view>
					</view>
				</view>


			</view>

		</view>

		<view style="height: 60px;">

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello YY',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				adList: [],
				messageList: [{
						title: "双十一全场1折",
						url: ""
					},
					{
						title: "呵呵哒",
						url: ""
					},

				],
				messageIndex: 0,
				recommendGoodsList: [],
				newGoodsList: []
			}
		},
		onLoad() {

			this.getInit();

		},
		methods: {
			go() {

				uni.redirectTo({
					url: '../goods_detail/goods_detail?id=8'
				})
			},
			getAd() {

				this.httpPost({
					url: "/weapp/index_model/getAd"
				}).then((re) => {

					// console.log(re);

					this.adList = re.data;
				})

			},
			/**
			 * 切换消息
			 */
			switchMessage() {

				let maxLength = this.messageList.length;

				setInterval(() => {

					if (this.messageIndex == maxLength - 1) {

						this.messageIndex = 0;
					} else {

						this.messageIndex++;
					}


				}, 7000)



			},
			getMessage() {

				this.httpGet({
					url: "/weapp/index_model/getMessage"
				}).then((re) => {

					// console.log(re);

					this.messageList = re.data;

					this.switchMessage();

				})

			},
			getInit() {

				this.getAd();

				// this.switchMessage();

				this.getMessage();

				this.getRecommend();

				this.getNewGoods();
			},
			/**
			 * 获取推荐商品
			 */
			getRecommend() {

				this.httpPost({
					url: "/weapp/goods/recommendGoods"
				}).then((re) => {

					// console.log(re);

					this.recommendGoodsList = re.data;
				})

			},
			toGoodsDetail(id) {

				uni.navigateTo({
					url: '../goods_detail/goods_detail?id=' + id
				})

			},
			/**
			 * 获取新品
			 */
			getNewGoods() {

				this.httpPost({
					url: "/weapp/goods/getNewGoods"
				}).then((re) => {

					// console.log(re);

					this.newGoodsList = re.data;
				})

			}

		}
	}
</script>

<style>
	.search-input {

		background-color: #FFFFFF;
		padding: 6upx 5upx;
		flex: 1;

	}


	.search-placeholder {

		text-align: center;
		color: #492c24;

	}

	.margin-top {

		margin-top: 30upx;
	}

	.messgae {

		padding: 28upx;
		padding-left: 20upx;
		padding-right: 10upx;
		background-color: #FFFFFF;
		color: #928f90;
	}

	.text-padding {

		padding: 0 10upx;
	}
</style>
