<template>
	<view class="background-color" style="height: 100vh;">

		<view style="text-align: center;opacity: 0;">
			branner
		</view>

		<view style="padding: 0 30upx;">
			<view style="padding: 30upx 40upx;border-radius: .4rem;" class="background-color-normal">


				<view class="row-no-full center-col">

					<view class="width-fit row-no-full center-col" style="margin-right: 10upx;">
						<image src="../../static/icon/time.png" style="height: 35upx;width: 35upx;"></image>
					</view>

					<view class="arktitle width-fit">每日限时秒杀</view>

				</view>

				<view class="" style="height: 1px;background-color: #F2F2F2;margin-top: 20upx;"></view>

				<!-- 商品栏 -->
				<view>

					<view v-for="(v,i) in list.data" :key='i' style="margin-top: 30upx;" @click="goDetail(v)">
						<view class="row-no-full">
							<!-- 商品图片 -->
							<view style="margin-right: 20upx;">
								<image :src="getImgPrefix()+getObj(v,'goods_sku.img')" style="width: 230upx;height: 230upx;"></image>
							</view>

							<view class="col" style="justify-content: space-between;flex: 1;">

								<view>
									<view class="row-no-full center-col">

										<view class="red-background-color small-font-size miao-tag">秒杀</view>

										<view style="margin-left: 10upx;overflow-x: hidden;">{{getObj(v,'goods.name')}}</view>

									</view>

									<view class="small-font-size gray-color">
										{{getObj(v,'goods_sku.sku_info')}}

									</view>

									<view style="font-size: 10upx;" class=" red-color">
										<progress font-size='10' style="width: 300upx;" :percent="(v.num/v.all*100) | ceil" activeColor='#c24a28'
										 border-radius='8' show-info></progress>
									</view>

								</view>


								<view class="row-no-full center-col" style="justify-content: space-between;">
									<view class="row-no-full tip-font-size" style="padding-bottom: 6upx;">
										<view class="red-color row-no-full" style="margin-right: 15upx;"> <span style='padding-bottom: 6upx;'>¥</span>  <span>
																
											{{v.real_price}}	
											</span></view>
										<view class="gray-color row-no-full" style="text-decoration: line-through;align-items: flex-end;padding-bottom: 5upx;">¥<span>{{getObj(v,'goods_sku.price')}}</span></view>



									</view>

									<view class="row-no-full" >
										<text class="red-background-color small-font-size" style="color: #FFFFFF;border-radius: .6rem;height: fit-content;padding: 5upx 15upx;"
										 @click="goDetail(v)">立即购买</text>
									</view>

								</view>



							</view>



						</view>


						<!-- <view class="row-no-full" style="flex-direction: row-reverse;margin-top: 20upx;">
							
							<view class="red-background-color" style="color: #FFFFFF;padding: 10upx 40upx;border-radius: .3rem;border-radius: 20px;" @click="goDetail(v)">立即购买</view>
						</view> -->

						<view v-if="i!=list.data.length-1" style="height: 1px;background-color: #F2F2F2;margin-top: 30upx;"></view>


					</view>

				</view>


			</view>
		</view>
	</view>
</template>

<script>
	import YyPrice from '../../components/yy-price/yy-price.vue'

	export default {
		data() {
			return {
				list: {
					data: [],


				}
			}
		},
		methods: {

			getList() {

				this.httpPost({
					url: "/weapp/snapped/snapped_list"
				}).then((re) => {

					this.list = re.data;

				});

			},
			goDetail(item) {

				uni.navigateTo({
					url: '../goods_detail/goods_detail?id=' + item.goods_id + '&sku_id=' + item.sku_id
				})

			}

		},
		onShow() {

			this.getList();

		},
		components: {
			YyPrice
		}
	}
</script>

<style>
	.arktitle {

		background: linear-gradient(to right, red, blue);
		-webkit-background-clip: text;
		color: transparent;
		animation: blink 2s linear infinite;
		-webkit-animation: blink 2s linear infinite;
		-moz-animation: blink 2s linear infinite;
		-ms-animation: blink 2s linear infinite;
		-o-animation: blink 2s linear infinite;
	}

	@keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}

		100% {
			opacity: 0.8;
		}
	}

	@-webkit-keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}

		100% {
			opacity: 0.8;
		}
	}

	@-moz-keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}

		100% {
			opacity: 0.8;
		}
	}

	@-ms-keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}

		100% {
			opacity: 0.8;
		}
	}

	@-o-keyframes blink {
		0% {
			opacity: 1;
		}

		50% {
			opacity: 0.5;
		}

		100% {
			opacity: 0.8;
		}
	}

	.miao-tag {

		color: #FFFFFF;
		padding: 1upx 18upx;
		border-radius: .8em;
		height: fit-content;
	}
	
/* 	.bb view{
		
		display: flex;
		align-items: flex-end;
	}
	
	.bb text{
		
		display: flex;
		align-items: flex-end;
	} */
	
</style>
