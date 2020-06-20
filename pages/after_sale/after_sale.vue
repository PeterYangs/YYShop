<template>
	<view style="height: 100vh;background-color: #F2F2F2;" class="tip-font-size col ">



		<view class="border-r col" style="flex: 1;overflow: auto;">

			<!-- 订单信息栏 -->
			<span class='red-background-color' style='color: #FFFFFF;padding-top: 20upx;padding-bottom: 30upx;'>

				<!-- 状态栏 -->
				<view class="row-no-full center-row">

					<!-- 未支付-订单未超时 -->
					<!-- <template v-if="info.status==1&&expired_time_with_seconds">
						<view class="row-no-full center-col">
							<image src="../../static/icon/last_time.png" style="width: 40upx;height: 40upx;margin-right: 20upx;"></image>
						</view>
						<view class="title-font-size">等待支付</view>
					</template> -->
					
					<!-- 未支付-订单未超时 -->
					<yy-order-show :orderItem="info" :code="1" >
						<view class="row-no-full" >
							<view class="row-no-full center-col">
								<image src="../../static/icon/last_time.png" style="width: 40upx;height: 40upx;margin-right: 20upx;"></image>
							</view>
							<view class="title-font-size">等待支付</view>
						</view>
					</yy-order-show>


					<!-- 未支付-订单超时 -->
					<!-- <template v-if="info.status==1&&!expired_time_with_seconds">
						<view class="row-no-full center-col">
							<image src="../../static/icon/last_time.png" style="width: 40upx;height: 40upx;margin-right: 20upx;"></image>
						</view>
						<view class="title-font-size">订单超时</view>
					</template> -->
					
					<yy-order-show :orderItem="info" :code="2">
						
						<view class="row-no-full">
							<view class="row-no-full center-col">
								<image src="../../static/icon/last_time.png" style="width: 40upx;height: 40upx;margin-right: 20upx;"></image>
							</view>
							<view class="title-font-size">订单超时</view>
							
						</view>
						
					</yy-order-show>


				</view>


				<view class="row-no-full center-row real-line-height-none tip-font-size" style="margin-top: 8upx;height: 30upx;">

					<!-- 未支付-订单未超时 -->
					<!-- <template v-if="info.status==1&&expired_time_with_seconds">
						<view class="row-no-full" style="align-items: flex-end;">需支付：¥ <view class="" style="line-height: none;">
								{{info.real_money | split(0)}}
							</view>.
							<view style="height: 19upx;" class="small-font-size ">{{info.real_money | split(1)}}
							</view>
							<view class="row-no-full" style="margin-left: 30upx;">剩余:10分60秒</view>

						</view>
					</template> -->
					
					<!-- 未支付-订单未超时 -->
					<yy-order-show :orderItem="info" :code="1">
						
						<view class="row-no-full" style="align-items: flex-end;">需支付：¥ <view class="" style="line-height: none;">
								{{info.real_money | split(0)}}
								
							</view>.
							<view style="height: 19upx;" class="small-font-size ">{{info.real_money | split(1)}}
							</view>
							<view class="row-no-full" style="margin-left: 30upx;">剩余:{{convertTime(info.expired_time_with_seconds,'i:s').min}}分{{getObj(convertTime(info.expired_time_with_seconds,'i:s'),'sec')}}秒</view>
						
						</view>
						
					</yy-order-show>
					
					

					<!-- 未支付-订单超时 -->
					<!-- <template v-if="info.status==1&&!expired_time_with_seconds">
						<view class="tip-font-size" style="margin-top: 10upx;">
							超时未支付
						</view>

					</template> -->
					
					<!-- 未支付-订单超时 -->
					<yy-order-show :orderItem="info" :code="2">
						
						<view class="tip-font-size" style="margin-top: 10upx;">
							超时未支付
							
						</view>
						
					</yy-order-show>




				</view>

				<!-- 未支付-订单未超时 -->
				<!-- <template v-if="info.status==1&&expired_time_with_seconds">
					<view class="row-no-full center-row" style="margin-top: 30upx;">

						<view @click="toPay(info.id)" style="background-color: #FFFFFF;border-radius: 1rem;padding: 10upx 40upx;" class="red-color">去支付</view>
					</view>
				</template> -->
				
				<!-- 未支付-订单未超时 -->
				<yy-order-show :orderItem="info" :code="1">
					<view class="row-no-full center-row" style="margin-top: 30upx;">
					
						<view @click="toPay(info.id)" style="background-color: #FFFFFF;border-radius: 1rem;padding: 10upx 40upx;" class="red-color">去支付</view>
					</view>
				</yy-order-show>
				



			</span>
			<!-- <view style="background-color: #c24a28;"> -->
			<view class="row-no-full" v-if="getObj(info,'delivery_type')==1">

				<view style="margin-right: 20upx;">
					<image src="../../static/icon/address.png" style="width: 40upx;height: 40upx;"></image>
				</view>

				<view class="col">

					<view>
						<text>{{getObj(info,'address_copy.name')}}</text>

						<text style="margin-left: 30upx;" class="bold">{{getObj(info,'address_copy.phone')}}</text>
					</view>

					<text style="margin-top: 15upx;color: #666;" class="small-font-size">
						地址：{{getObj(info,'address_copy.address')}} {{getObj(info,'address_copy.address_detail')}}
					</text>

				</view>

			</view>

			<view class="row-no-full" v-if="getObj(info,'delivery_type')==2">

				<view>
					<view class="row-no-full center-col" style="margin-bottom: 10upx;">
						<view class="tag blue-background-color small-font-size row-no-full center-col" style="margin-right: 10upx;">自提</view>
						<text class="bold row-no-full center-col">{{getObj(info,'store_copy.name')}}</text>
					</view>


					<view class="small-font-size gray-color">

						<view class="row-no-full">

							<view style="margin-bottom: 10upx;">{{getObj(info,'store_copy.phone')}}</view>
						</view>
						<view>{{getObj(info,'store_copy.all_address')}}</view>

					</view>
				</view>


			</view>
			<!-- </view> -->

			<view class="col">

				<view>
					自营
				</view>

				<view class="col" v-for="(v,i) in goods_list" :key='i'>

					<view v-if="i!=0" style="height: 1px;background-color: #F2F2F2;margin: 30upx 0;"></view>
					<view class="row-no-full" style="padding: 0 20upx;">

						<view style="padding: 30upx 0;" class="row-no-full">

							<view>
								<image :src="getImgPrefix()+getObj(v,'goods_sku.img')" style="width: 120upx;height: 120upx;"></image>
							</view>

							<view class="col text-dec" style="margin-left: 40upx;">

								<text>{{v.goods_name}}</text>
								<text class="small-font-size" style="color: #666;">{{v.sku_msg}}</text>
								<text class="small-font-size" style="color: #666;margin-top: 10upx;">数量：{{v.num}}</text>
								<text class="bold" style="margin-top: 15upx;">¥{{v.price}}</text>

							</view>

						</view>


					</view>

					<view style="display: flex;flex-direction: row-reverse;margin-top: 5upx;" class="button-item small-font-size">

						<text v-if="v.is_refund==false&&v.status==11" @click="to_refund(v)">申请退款</text>

						<text @click="add_shop_car(v)">加购物车</text>


					</view>


				</view>

			</view>

		</view>



	</view>
</template>

<script>
	import YyOrderShow from '../../components/yy-order-show/yy-order-show.vue'
	export default {
		data() {
			return {

				order_id: 0,
				info: {}

			}
		},
		methods: {

			order_detail() {

				this.httpPost({
					url: '/weapp/refund/order_detail',
					data: {
						id: this.order_id
					}
				}).then((re) => {

					console.log(re);

					this.info = re.data;
					
					// console.log(this.convertTime(this.info.expired_time_with_seconds));
					
					// this.info.pp=this.convertTime(this.info.expired_time_with_seconds)
					
					this.setTime();

				})

			},
			to_refund(item) {

				console.log(item);

				uni.navigateTo({
					url: '../refund/refund?id=' + item.id
				})

			},
			add_shop_car(item) {

				this.httpPost({
					url: "/weapp/shop_car/addGoods",
					data: {
						id: item.goods_sku.id,
						num: 1,
						goods_id: item.goods_id
					}
				}).then((re) => {

					// console.log(re);

					if (re.code == 1) {

						uni.showToast({
							icon: 'success',
							title: '添加成功'
						})

					}

				})

			},
			toPay(id) {

				uni.navigateTo({
					url: '../pay/pay?id=' + id
				})

			},
			setTime(){
				
				setTimeout(()=>{
					
					if(this.info.expired_time_with_seconds&&this.info.expired_time_with_seconds>0){
						
						
						this.info.expired_time_with_seconds--;
						
						this.setTime();
						
					}
					
					
				},1000)
				
			}

		},
		onLoad(e) {

			this.order_id = e.id;

			this.order_detail();

		},
		computed: {

			goods_list() {

				let temp = this.getObj(this.info, 'order_goods');

				if (!temp) return [];

				return temp;

			}

		},
		components: {

			YyOrderShow
		}
	}
</script>

<style>
	.border-r>view {
		border-radius: .6rem;
		margin-bottom: 30upx;
		background-color: #FFFFFF;
		padding: 30upx;
	}

	.text-dec>text {

		/* margin-bottom: 8upx; */

	}

	.button-item>text {

		border-radius: 2rem;

		border: 1px solid #CCCCCC;

		padding: 6upx 20upx;

		margin-left: 15upx;

	}
</style>
