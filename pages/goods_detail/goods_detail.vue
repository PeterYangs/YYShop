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

			<view class="tip-font-size">商品名称</view>

			<view class="row-no-full" style="margin-top: 30upx;justify-content: space-between;">

				<view class="row-no-full center-col">
					<view class="red-color title-font-size" style="margin-right: 28upx;">¥{{item.price_interval}}</view>
					<view class="gray-color small-font-size">100人已买</view>
				</view>

				<view class="row-no-full">
					
					<!-- 收藏 -->
					<view @click="college()">
						<image v-if="!item.collect.id" src="../../static/icon/college.png" style="width: 45upx;height: 45upx;"></image>
						<image v-else src="../../static/icon/colleged.png" style="width: 45upx;height: 45upx;"></image>
					</view>
					
					
					
					
					<!-- <view>
						<image src="../../static/icon/share.png" style="width: 40upx;height: 40upx;"></image>
					</view> -->
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

				<view class="row-no-full center-col" style="flex: 1;justify-content: space-between;">
					<view class="col center-col">
						<image src="../../static/icon/customer.png" style="height: 40upx;width: 40upx;"></image>
						<text class="small-font-size gray-color">客服</text>
					</view>

					<view class="col center-col" @click="toShopCar()">
						<!-- <uni-badge text="1" :inverted="true" size="small"> -->

						<view class="relative">
							<image src="../../static/menu/shop_car_normal.png" style="height: 40upx;width: 40upx;">
							</image>

							<view v-if="shop_car_num" class="shop_car_num absolute red-background-color row-no-full center-col center-row">{{shop_car_num}}</view>

						</view>
						<!-- </uni-badge> -->
						<text class="small-font-size gray-color">购物车</text>
					</view>
				</view>

				<view class="row-no-full center-col" style="flex: 3;padding-left: 40upx;">

					<view @click="showShopCar()" style="margin-right: 15upx;" class="border-radius row-no-full center-col center-row tip-font-size shop-car">加入购物车</view>

					<view @click="showBuyNow()" class="border-radius row-no-full center-col center-row tip-font-size red-background-color buy-now">立即购买</view>


				</view>


			</view>




		</view>



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

								<view class="red-color"><text v-if="getObj(sku_index,'price')">¥{{getObj(sku_index,'price')}}</text></view>

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
					price_interval:'',
					collect:''

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
				shop_car_num:0
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
			showBuyNow(){
				
				this.submitType = 'buy_now';
				
				this.$refs['goods_sku'].open();
				
			},
			
			closeSku() {
				this.$refs['goods_sku'].close();
			},
			get_detail() {

				console.log(this.option);

				this.httpPost({
					url: "/weapp/goods/detail",
					data: {
						id: this.option.id
					}
				}).then((re) => {

					// console.log(re);

					// this.item=re.data;

					this.setItem(this.item, re.data)

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
				
				let selectArr=this.$refs.goods_group.selectArr;
				
				for(let i in selectArr){
					
					
					// console.log(selectArr[i]);
					let temp=selectArr[i];
					
					if(temp==="") return uni.showToast({
					title:'请选择完整的规格',
					icon:'none'
				}) 
					
				}
				
				// return ;
				
				if(!this.sku_index.id) return uni.showToast({
					title:'请选择完整的规格',
					icon:'none'
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



				}else if(this.submitType == 'buy_now'){
					
					let param='param='+this.sku_index.id+'*'+this.submitItem.num;
					
					
					// console.log(param);
					
					this.httpPost({
						url:"/weapp/check/checkLogin"
					}).then((login)=>{
						
						uni.navigateTo({
							url:'../confirm/confirm?'+param
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
			getShopCarNum(){
				
				this.httpPost({
					url:"/weapp/goods/getShopCarNum"
				}).then((re)=>{
					
					// console.log(re);
					
					this.shop_car_num=re.data;
					
				})
				
			},
			college(){
				
				this.httpPost({
					url:"/weapp/goods/collect_goods",
					data:{id:this.item.id}
				}).then(()=>{
					
					this.get_detail();
				})
				
			}
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
			
			
			this.getShopCarNum();
		}
	}
</script>

<style>
	.goods-item {
		padding: 0 40upx;
		padding-top: 40upx;
		padding-bottom: 60upx;
		background-color: #FFFFFF;
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
</style>
