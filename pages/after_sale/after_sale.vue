<template>
	<view style="height: 100vh;background-color: #F2F2F2;" class="tip-font-size col">

		<view class="border-r" style="flex: 1;overflow: auto;">

			<view class="row-no-full">

				<view style="margin-right: 20upx;">
					<image src="../../static/icon/address.png" style="width: 40upx;height: 40upx;"></image>
				</view>

				<view class="col">

					<view>
						<text>{{getObj(info,'address.name')}}</text>

						<text style="margin-left: 30upx;" class="bold">{{getObj(info,'address.phone')}}</text>
					</view>

					<text style="margin-top: 15upx;color: #666;" class="small-font-size">
						地址：{{getObj(info,'address.address')}} {{getObj(info,'address.address_detail')}}
					</text>

				</view>

			</view>

			<view class="col">

				<view>
					自营
				</view>

				<view class="col" v-for="(v,i) in goods_list" :key='i'>

					<view v-if="i!=0" style="height: 1px;background-color: #F2F2F2;margin: 30upx 0;"></view>
					<view class="row-no-full" style="padding: 0 20upx;">

						<view style="padding: 30upx 0;" class="row-no-full">

							<image :src="getImgPrefix()+getObj(v,'goods_sku.img')" style="width: 120upx;height: 120upx;"></image>

							<view class="col text-dec" style="margin-left: 40upx;">

								<text>{{v.goods_name}}</text>
								<text class="small-font-size" style="color: #666;">{{v.sku_msg}}</text>
								<text class="small-font-size" style="color: #666;margin-top: 10upx;">数量：{{v.num}}</text>
								<text class="bold" style="margin-top: 15upx;">¥{{v.price}}</text>

							</view>

						</view>


					</view>

					<view style="display: flex;flex-direction: row-reverse;margin-top: 5upx;" class="button-item small-font-size">

						<text v-if="v.is_refund==false" @click="to_refund(v)">申请退款</text>

						<text @click="add_shop_car(v)">加购物车</text>


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

				})

			},
			to_refund(item){
				
				console.log(item);
				
				uni.navigateTo({
					url:'../refund/refund?id='+item.id
				})
				
			},
			add_shop_car(item){
				
				this.httpPost({
					url:"/weapp/shop_car/addGoods",
					data:{id:item.goods_sku.id,num:1,goods_id:item.goods_id}
				}).then((re)=>{
					
					// console.log(re);
					
					if(re.code==1){
						
						uni.showToast({
							icon:'success',
							title:'添加成功'
						})
						
					}
					
				})
				
			}

		},
		onLoad(e) {

			this.order_id = e.id;

			this.order_detail();

		},
		computed:{
			
			goods_list(){
				
				let temp=this.getObj(this.info,'order_goods');
				
				if(!temp) return [];
				
				return temp;
				
			}
			
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
