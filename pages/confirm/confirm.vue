<template>
	<view style="min-height: 100vh;background-color: #F2F2F2;" class="item tip-font-size">


		<view class="col">
			<view class="row-no-full space">

				<view class="normal-font-size">配送方式</view>

				<view class="row-no-full">

					<view class="row-no-full center-col" style="margin-right: 30upx;" @click="change_delivery_type(1)">
						<image v-if="item.delivery_type==1" src="../../static/icon/checked.png" style="width: 50upx;height: 50upx;"></image>
						<image v-else src="../../static/icon/no_check.png" style="width: 50upx;height: 50upx;"></image>
						<view>快递</view>
					</view>

					<view class="row-no-full center-col" @click="change_delivery_type(2)">

						<image v-if="item.delivery_type==2" src="../../static/icon/checked.png" style="width: 50upx;height: 50upx;"></image>
						<image v-else src="../../static/icon/no_check.png" style="width: 50upx;height: 50upx;"></image>
						<view>自提</view>
					</view>



				</view>
			</view>

			<view style="height: 1px;background-color: #F2F2F2;margin: 20upx 0;"></view>


			<template v-if="item.delivery_type==1">

				<view v-if="!item.address_id" class="row-no-full space center-col" @click="to_address_edit()">

					<view class="row-no-full center-col">

						<image src="../../static/icon/add.png" style="width: 50upx;height: 50upx;"></image>

						<text style="margin-left: 14upx;">新增收货地址</text>
					</view>

					<image src="../../static/icon/right.png" style="width: 50upx;height: 50upx;"></image>


				</view>

				<view v-else class="row-no-full space center-col" @click="to_address_list()">

					<view class="col">

						<view class="row-no-full center-col" style="margin-bottom: 10upx;">

							<view class="small-font-size row-no-full center-row center-col" style="background-color: #1296db;color: #FFFFFF;padding: 0 12upx;height: 30upx;margin-right: 15upx;">{{item.address.label}}</view>

							<view>{{item.address.address}}</view>


						</view>

						<view class="normal-font-size bold" style="margin-bottom: 15upx;">{{item.address.address_detail}}</view>

						<view class="row-no-full">

							<view>{{item.address.name}}</view>
							<view style="margin-left: 20upx;">{{item.address.phone}}</view>

						</view>



					</view>

					<image src="../../static/icon/right.png" style="width: 50upx;height: 50upx;"></image>


				</view>





				<view style="height: 1px;background-color: #F2F2F2;margin: 20upx 0;"></view>

			</template>

			<view class="row-no-full">

				<text style="margin-right: 40upx;">备注</text>

				<input placeholder="如需备注请输入" />


			</view>

		</view>


		<view style="margin-top: 30upx;">

			<view>

				<view class="normal-font-size">商品列表</view>

			</view>

			<view style="height: 1px;background-color: #F2F2F2;margin: 20upx 0;"></view>

			<view v-for="(v,i) in goods_info" :key='i'>

				<view v-if='i!=0' style="height: 1px;background-color: #F2F2F2;margin: 20upx 0;"></view>

				<view class="row-no-full">

					<view>
						<image :src="getImgPrefix()+getObj(v,'detail.img')" style="width: 120upx;height: 120upx;"></image>
					</view>

					<view class="col space" style="flex: 1;margin-left: 20upx;">

						<view class="row-no-full space">

							<view class="col">
								<text>{{getObj(v,'detail.goods.name')}}</text>
								<text style="color: #666;" class="small-font-size ">
									<text v-for="(vv,ii) in v.detail.goods_sku_detail" :key='ii'><template v-if="ii!=0">,</template> {{vv.value}}</text>
								</text>
							</view>

							<text>¥ {{getObj(v,'detail.price')}}</text>


						</view>

						<view style="display: flex;flex-direction: row-reverse;">
							<text style="color: #666666;">x{{v.num}}</text>
						</view>


					</view>

				</view>




			</view>


		</view>


		<view style="position: fixed;bottom: 0;left: 0;right: 0;background-color: #FFFFFF;padding: 0;">

			<view class="row-no-full space">

				<view style="padding: 30upx 0;padding-left: 40upx;" class="red-color">
					合计：¥{{getTotal}}
				</view>


				<view class="col center-col">
					<view @click="submit()" class="red-background-color row-no-full center-col" style="color: #FFFFFF;padding: 20upx 45upx;flex: 1;font-size: 33upx;">提交订单</view>
				</view>

			</view>


		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {

				item: {
					delivery_type: 1,
					note: '',
					goods: [
						// {goods_sku_id:1,num:3}

						{}, {}, {}
					],
					address_id: 0,
					address: {

						name: "",
						phone: '',
						address: '',
						address_detail: ''
					},
					param:''

				},
				goods_info:{}
			}
		},
		methods: {

			change_delivery_type(type) {

				// console.log(type);

				this.item.delivery_type = type;

			},
			getDefaultAddress() {

				this.httpPost({
					url: "/weapp/confirm/getDefaultAddress"
				}).then((re) => {

					// console.log(re);

					if (re.code == 1) {

						this.item.address = re.data;

						this.item.address_id = re.data.id;

					}

				})

			},
			to_address_edit() {

				uni.navigateTo({
					url: '../address_edit/address_edit'
				})


			},
			changeData(data) {

				this.item = data;

			},
			to_address_list() {

				uni.navigateTo({
					url: "../address_list/address_list"
				})

			},
			getGoodsDetail(param){
				
				
				this.httpPost({
					url:"/weapp/confirm/getGoodsDetail",
					data:{param:param}
				}).then((re)=>{
					
					console.log(re);
					
					this.goods_info=re.data;
				})
				
			},
			submit(){
				
				if(this.item.delivery_type==1&&!this.item.address_id) return this.showModal('提示', '请填写地址');
				
				this.httpPost({
					url:'/weapp/order/create_order',
					data:this.item
				}).then((re)=>{
					
					// console.log(re);
					
					if(re.code==1){
						
						// uni.navigateTo({
						// 	url:''
						// })
						
						uni.redirectTo({
							url: '../pay/pay?id='+re.data
						});
						
					}
					
				})
				
			}
		},
		onLoad(e) {

			this.getDefaultAddress();
			
			// console.log(e.param);
			
			let param=e.param;
			
			// param=decodeURI(param);
			
			
			this.item.param=param;
			
			
			console.log(param);
			
			
			this.getGoodsDetail(param);
			
		},
		onShow() {

			// this.$forceUpdate();
		},
		computed:{
			
			getTotal(){
				
				let total=0;
				
				for(let i in this.goods_info){
					
					total+=Number(this.goods_info[i].detail.price)*Number(this.goods_info[i].num);
				}
				
				return total;
				
			}
		}
	}
</script>

<style>
	.item>view {

		padding: 20upx;
		background-color: #FFFFFF;

	}
</style>
