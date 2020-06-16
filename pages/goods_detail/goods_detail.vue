<template>
	<view class="background-color" style="min-height: 100vh;">
		<view>
			<swiper :style="'height:'+adImgHeight+'px;'" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			 :duration="duration">
				<swiper-item v-for="(v,i) in item.img" :key='i'>
					<view class="row-no-full center-row">
						<image @load="getAdImg" :src="getImgPrefix()+v" style="height: 300px;" :style="'width:'+adImgWidth+'px'"></image>
					</view>
				</swiper-item>

			</swiper>
		</view>

		<view class="goods-item">

			<view class="row-no-full" style="justify-content: space-between;">

				<!-- 普通价格 -->
				<view v-if="!getObj(sku_index,'snapped_price',false)" class="row-no-full center-col" style="padding: 20upx 30upx;">
					<view class="red-color title-font-size" style="margin-right: 28upx;">
						¥
						<template v-if="getObj(sku_index,'price')">{{getObj(sku_index,'price')}}</template>
						<template v-else>{{item.min_price}}</template>
					</view>
					<!-- <view class="gray-color small-font-size">100人已买</view> -->
				</view>

				<!-- 秒杀价格 -->
				<view v-if="getObj(sku_index,'snapped_price')" class="row-no-full" style="flex: 1;">

					<view class="row-no-full center-col goods-item-padding" style="flex: 6;background-color: #009EE2;">

						<view class=" small-font-size red-background-color" style="color: #FFFFFF;border-radius: .3rem;height: fit-content;margin-right: 20upx;width: 60upx;height: 60upx;text-align: center;padding: 10upx;">限时<br />秒杀</view>

						<view>

							<view class="title-font-size row-no-full" style="line-height: 26px;color: #FFFFFF;">¥

								<view class="row-no-full" style="align-items: flex-end;">
									<!-- <template v-if="getObj(sku_index,'snapped_price')"> -->
									<view class="row-no-full" style="align-items: flex-end;">{{getObj(sku_index,'snapped_price') | split(0)}}</view>
									.
									<view class="small-font-size row-no-full" style="align-items: flex-end;line-height: 36upx;">{{getObj(sku_index,'snapped_price') | split(1)}}</view>
									<!-- </template> -->




								</view>

							</view>

							<view class="small-font-size" style="text-decoration: line-through;color: #FFFFFF;">¥
								{{getObj(sku_index,'price')}}</view>

						</view>


					</view>

					<view class="row-no-full small-font-size center-row" style="background-color: #feeae9;padding: 0 20upx;">

						<view class="col center-row center-col">

							<view class="red-color" style="margin-bottom: 10upx;">距离结束还剩:</view>
							<view class="row-no-full small-font-size time-item" style="line-height: 32upx;">
								<view class="red-background-color" style="">{{end_time[0]}}:</view>
								<view class="red-background-color">{{end_time[1]}}:</view>
								<view class="red-background-color">{{end_time[2]}}</view>
							</view>
						</view>

					</view>

				</view>



				<view class="row-no-full">


				</view>

			</view>

			<!-- 商品名称 -->
			<view class="tip-font-size row-no-full" style="margin-top: 30upx;padding: 30upx 30upx;padding-top: 0upx;justify-content: space-between;align-items: flex-start;">
				
				<view style="flex: 1;">{{item.name}}</view>
				
				<view class="row-no-full center-col relative" style="margin-left: 20upx;margin-top: 10upx;">
					
					<view class="absolute" style="top: 0;left: 0;bottom: 0;right: 0;">
						<button open-type="share" style="width: 100%;height: 100%;opacity: 0;"></button>
					</view>
					
					<image src="../../static/icon/share2.png" style="width: 50upx;height: 50upx;"></image>
					
								
				</view>
				
				
				
			</view>


		</view>

		<view class="item-margin-top item-padding" style="background-color: #FFFFFF;">

			<view class="row-no-full center-col" @click="showSku()" style="justify-content: space-between;">

				<view class="row-no-full">

					<template v-if='sku_index.difference'>
						<view class="tip-font-size gray-color" style="width: 100upx;">已选择</view>

						<view class="tip-font-size">
							<text v-for="(v,i) in sku_index.difference" :key='i'><template v-if="i!=0">,</template>{{v}}</text>

						</view>

					</template>

					<template v-else>
						<view class="tip-font-size gray-color" style="width: 100upx;">选择</view>

						<view class="tip-font-size">请选择产品规格</view>
					</template>




				</view>


				<view>
					<image src="../../static/icon/right.png" style="width: 38upx;height: 38upx;"></image>
				</view>

			</view>


		</view>


		<view class="item-margin-top item-padding" style="background-color: #FFFFFF;">

			<view class="row-no-full center-col" style="margin-bottom: 40upx;">
				<view style="flex: 1;height: 1upx;" class="gray-background-color"></view>
				<view class="tip-font-size gray-color" style="padding: 0 40upx;">商品信息</view>
				<view style="flex: 1;height: 1upx;" class="gray-background-color"></view>
			</view>

			<!-- 商品详情图 -->
			<view class="col">

				<view v-for="(v,i) in item.detail_img" :key='i'>

					<image :src="getImgPrefix()+v" style="width: 100%;" mode="widthFix" :lazy-load="true"></image>
				</view>
			</view>


		</view>


		<view style="height: 200upx;">

		</view>


		<view class="bot" style="box-shadow: 10px 10px 5px #888888;">

			<view class="row-no-full center-col" style="padding: 15upx 30upx;">

				<view class="row-no-full center-col" style="flex: 2;justify-content: space-between;">
					<view class="col center-row center-col" style="position: relative;">
						
						<view style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;opacity: 0;">
							<button open-type="contact" style="width: 100%;height: 100%;"></button>
						</view>
						
						<image src="../../static/icon/customer.png" style="height: 40upx;width: 40upx;"></image>
						<text class="small-font-size gray-color" style="margin-top: 10upx;">客服</text>
					</view>

					<view class="col center-row center-col" @click="toShopCar()">

						<view class="relative">
							<image src="../../static/menu/shop_car_normal.png" style="height: 40upx;width: 40upx;">
							</image>

							<view v-if="shop_car_num" class="shop_car_num absolute red-background-color row-no-full center-col center-row">{{shop_car_num}}</view>

						</view>
						<!-- </uni-badge> -->
						<text class="small-font-size gray-color">购物车</text>
					</view>


					<!-- 收藏 -->
					<view class="col center-row center-col">
						<view @click="college()">
							<image v-if="!getObj(item,'collect.id')" src="../../static/icon/college.png" style="width: 40upx;height: 40upx;"></image>
							<image v-else src="../../static/icon/colleged.png" style="width: 40upx;height: 40upx;"></image>
						</view>

						<view class="small-font-size gray-color">收藏</view>

					</view>

				</view>

				<view class="row-no-full center-col" style="flex: 3;padding-left: 40upx;">

					<view @click="showShopCar()" style="margin-right: 15upx;" class="border-radius row-no-full center-col center-row tip-font-size shop-car">加入购物车</view>

					<view @click="showBuyNow()" class="border-radius row-no-full center-col center-row tip-font-size red-background-color buy-now">立即购买</view>


				</view>


			</view>




		</view>


		<!-- 规格选择框 -->
		<uni-popup ref='goods_sku' type="bottom">

			<view style="background-color: #FFFFFF;">



				<view style="height: 80vh;padding: 20upx;padding-bottom: 5upx;" class="col">

					<view>



						<view class="row-no-full" style="justify-content: flex-end;">
							<image @click="closeSku()" src="../../static/icon/close.png" style="width: 40upx;height: 40upx;"></image>
						</view>


						<view class="row-no-full" style="align-items: flex-end;">

							<view style="margin-left: 80upx;margin-right: 50upx;">

								<image v-if="getObj(sku_index,'img')" :src="getImgPrefix()+getObj(sku_index,'img')" style="width: 200upx;height: 200upx;"></image>

								<image v-else :src="getImgPrefix()+item.img[0]" style="width: 200upx;height: 200upx;"></image>

							</view>


							<view class="col">

								<view class="red-color tip-font-size">
									<view v-if="getObj(sku_index,'price')">

										<view v-if="getObj(sku_index,'snapped_price')">

											<view>
												¥ {{getObj(sku_index,'snapped_price')}}
											</view>

											<view style="color: #000000;text-decoration: line-through;" class="small-font-size">
												¥{{getObj(sku_index,'price')}}
											</view>





										</view>

										<view v-else>
											¥{{getObj(sku_index,'price')}}
										</view>

									</view>

								</view>

								<view class="small-font-size">
									<text v-if="getObj(sku_index,'number')">编号:{{getObj(sku_index,'number')}}</text>
								</view>

							</view>

						</view>


					</view>

					<view style="flex: 1;overflow: hidden;margin-top: 30upx;" class="col">
						<scroll-view :scroll-y="true">
							<!-- <view v-for="v in 100" :key='v'>{{v}}</view> -->

							<view>

								<goods-group :item="item" @success='setSku' ref='goods_group'>
								</goods-group>

							</view>

						</scroll-view>

						<view class="tip-font-size row-no-full center-col" style="margin-top: 30upx;justify-content: space-between;">
							<text>数量</text>
							<uni-number-box :value="submitItem.num" @change='changeNum'></uni-number-box>
						</view>

					</view>




					<view @click="submit()" style="padding: 5upx 20upx;" class="row-no-full center-col">
						<view class="col" style="width: 100%;">
							<button class="red-background-color border-radius" style="color: #FFFFFF;width: 100%;">确定</button>
						</view>
					</view>


				</view>



			</view>

		</uni-popup>

	</view>
</template>

<script>
	import UniPopup from '../../components/uni-popup/uni-popup.vue'

	// import GoodsItem from '../../components/goods-item/goods-item.vue'



	import GoodsGroup from '../../components/goods-group/goods-group.vue'

	import uniNumberBox from "../../components/uni-number-box/uni-number-box.vue"


	// import uniBadge from '../../components/uni-badge/uni-badge.vue'

	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				adImgHeight: 300,
				adImgWidth: 300,
				item: {
					category_id: 0,
					detail_img: [],
					goods_sku: [],
					id: 0,
					img: [],
					name: "",
					seller_id: -1,
					sku: {},
					status: 1,
					price_interval: '',
					collect: '',
					sku_details: [],
					min_price: "",
					main_img:''

				},
				option: {},
				//当前sku
				sku_index: {},
				//shop_car和buy_now
				submitType: '',
				submitItem: {
					goods_id: '',
					id: '',
					num: 1,
					seller_id: -1


				},
				//购物车商品数量
				shop_car_num: 0
			}
		},
		methods: {

			getAdImg(e) {

				// console.log(e);

				let realHeight = e.detail.height;

				let realWidth = e.detail.width;


				let w = realWidth * this.adImgHeight / realHeight;

				this.adImgWidth = w;

			},
			showSku() {

				this.$refs['goods_sku'].open();
			},

			showShopCar() {

				this.submitType = 'shop_car';

				this.$refs['goods_sku'].open();

			},
			showBuyNow() {

				this.submitType = 'buy_now';

				this.$refs['goods_sku'].open();

			},

			closeSku() {
				this.$refs['goods_sku'].close();
			},
			get_detail(isSku = true) {

				// console.log(this.option);

				let data = {
					id: this.option.id,

				};


				if (isSku == true) data.sku_id = this.option.sku_id;


				this.httpPost({
					url: "/weapp/goods/detail",
					data: data
				}).then((re) => {

					// console.log(re);

					// this.item=re.data;

					this.setItem(this.item, re.data)


					this.checkSku();

				})

			},
			setSku(obj, arr) {

				this.sku_index = obj;

				this.submitItem.goods_id = obj.goods_id;

				this.submitItem.id = obj.id;

				this.submitItem.seller_id = this.item.seller_id;


				// console.log(obj);

			},
			addShopCar() {

				return new Promise((success, fail) => {

					this.httpPost({
						url: '/weapp/shop_car/addGoods',
						data: this.submitItem
					}).then((re) => {

						// console.log(re);



						if (re.code == 1) {

							success(re);
						}

					})

				});


			},
			submit() {


				// console.log(this.$refs.goods_group.selectArr);

				let selectArr = this.$refs.goods_group.selectArr;

				for (let i in selectArr) {


					// console.log(selectArr[i]);
					let temp = selectArr[i];

					if (temp === "") return uni.showToast({
						title: '请选择完整的规格',
						icon: 'none'
					})

				}

				// return ;

				if (!this.sku_index.id) return uni.showToast({
					title: '请选择完整的规格',
					icon: 'none'
				})


				// console.log(this.sku_index.id);

				// return false;

				if (this.submitType == 'shop_car') {

					this.addShopCar().then((re) => {

						this.$refs['goods_sku'].close();

						this.getShopCarNum();

						uni.showToast({
							icon: 'success',
							title: '加入购物车成功'
						})
					});



				} else if (this.submitType == 'buy_now') {

					let param = 'param=' + this.sku_index.id + '*' + this.submitItem.num;


					// console.log(param);

					this.httpPost({
						url: "/weapp/check/checkLogin"
					}).then((login) => {

						uni.navigateTo({
							url: '../confirm/confirm?' + param
						})

					});




				}


			},
			changeNum(value) {

				this.submitItem.num = value;

			},
			toShopCar() {

				uni.switchTab({
					url: '../shop_car/shop_car'
				})
			},
			getShopCarNum() {

				this.httpPost({
					url: "/weapp/goods/getShopCarNum"
				}).then((re) => {

					// console.log(re);

					this.shop_car_num = re.data;

				})

			},
			college() {

				this.httpPost({
					url: "/weapp/goods/collect_goods",
					data: {
						id: this.item.id
					}
				}).then(() => {

					this.get_detail(false);
				})

			},
			checkSku() {

				// if(this)

				if (this.item.sku_details.length <= 0) return;

				let temp = this.item.sku_details;

				let specifications = this.item.sku.specifications;

				for (let i in temp) {

					let value = temp[i].value;


					for (let j in specifications[i].item) {

						if (specifications[i].item[j].name == value) this.$refs.goods_group.specificationBtn(value, i, '', j);

					}


				}


			},
			/**
			 * 点击率
			 */
			addView() {

				this.httpPost({
					url: "/weapp/goods/addView",
					data: {
						id: this.option.id
					}
				}).then((re) => {



				})

			},
			setTime() {


				setTimeout(() => {


					let snapped_end_time = this.sku_index.snapped_end_time;


					if (snapped_end_time) {


						this.sku_index.snapped_end_time--;

					}

					this.setTime();



				}, 1000)


			},
			


		},
		components: {
			UniPopup,
			GoodsGroup,
			uniNumberBox,
			// uniBadge


		},
		onLoad(e) {

			this.option = e;

			// console.log(e);

			// this.$refs['goods_sku'].open();

			this.get_detail();
			
			console.log(this.getCompleteRoute(this));


			this.getShopCarNum();

			this.addView();

			// this.getObj()

			this.setTime();



			// this.$refs.goods_group.specificationBtn('1983',0,'',0)

		},
		onShareAppMessage(e){
			
			// console.log(e);
			
			// uni.share({
			// 	provider:'weixin',
			// 	scene:'WXSceneSession',
			// 	type:0,
			// 	imageUrl:
			// })
			
			return {
				
				title:this.item.name,
				path:this.getCompleteRoute(this),
				imageUrl:this.getImgPrefix()+this.item.main_img
			}
			
			
		},
		
		
		computed: {

			end_time() {

				let snapped_end_time = this.sku_index.snapped_end_time;

				if (!snapped_end_time) return ['00', '00', '00'];

				let hour = parseInt(snapped_end_time / 3600);

				if (hour < 10) hour = "0" + hour + "";


				let min = parseInt((snapped_end_time - hour * 3600) / 60);

				if (min < 10) min = "0" + min + "";

				let sec = (snapped_end_time - hour * 3600 - min * 60);

				if (sec < 10) sec = "0" + sec + "";

				return [hour, min, sec];

			}

		}
	}
</script>

<style>
	.goods-item {
		/* padding: 0 40upx;
		padding-top: 20upx;
		padding-bottom: 60upx; */
		background-color: #FFFFFF;
	}

	.goods-item-padding {

		padding: 15upx 30upx;
		/* padding-top: 20upx; */

	}

	.bot {
		position: fixed;
		bottom: 0;
		left: 0;
		/* height: 100upx; */
		background-color: #FFFFFF;
		/* width: 100%; */
		width: 100vw;

		/* display: inline-flex; */

	}

	.shop-car {
		flex: 1;
		height: 80upx;
		/* height: 100%; */
		background-color: #E6A23C;
		color: #FFFFFF;
	}

	.buy-now {
		height: 80upx;
		flex: 1;
		color: #FFFFFF;
	}

	.border-radius {

		border-radius: 3rem;
	}

	.item-margin-top {

		margin-top: 20upx;
	}

	.item-padding {

		padding: 20upx 30upx;

	}

	.active-item {

		border: 1px solid #df3e27;

		width: -webkit-fit-content;

		background-color: #f9edeb;

		color: #df3e27;

		padding: 10upx 37upx;

	}

	.normal-item {

		border: 1px solid #f2f2f2;

		width: -webkit-fit-content;

		background-color: #f2f2f2;

		padding: 10upx 37upx;
	}


	.disable-item {

		border: 1px solid #f2f2f2;

		color: #bfbfbf;

		text-decoration: line-through;

		padding: 10upx 37upx;

		background-color: #f2f2f2;

	}


	.item-right>view {

		margin-right: 30upx;

		margin-bottom: 30upx;

	}

	.item-bottom {}


	.shop_car_num {

		right: -15upx;
		top: -5upx;
		border-radius: 50%;
		width: 25upx;
		height: 25upx;
		font-size: 18upx;
		color: #FFFFFF;

	}

	.time-item>view {

		color: #FFFFFF;
		/* padding: 10upx 5upx; */
		border-radius: .3rem;
		margin-right: 10upx;
		height: fit-content;
		width: 39upx;
		text-align: center;
		padding: 5upx 0;
	}
</style>
