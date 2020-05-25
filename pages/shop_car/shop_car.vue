<template>
	<view class="tip-font-size col" style="min-height: 100vh;background-color: #F2F2F2;padding: 20upx 20upx;">


		<view v-if='isLogin&&list.length>=1' v-for="(vv,ii) in list" :key="ii" style="background-color: #FFFFFF;border-radius: .3rem;padding: 30upx 40upx;margin-bottom: 30upx;">

			<view class="row-no-full center-col" style="margin-bottom: 30upx;">
				<image src="../../static/icon/shop.png" style="width: 30upx;height: 30upx;"></image>
				<view style="margin-left: 10upx;" v-if="ii==0">自营</view>
			</view>

			<uni-swipe-action class="col">
				<uni-swipe-action-item class="col" v-for="(v,i) in vv" :key='i' :options="options" @click="onClick" @change="change($event,v)">

					<view class="col" style="width: 100%;margin-top: 30upx;">

						<view class="row-no-full">

							<view class="row-no-full center-col" style="margin-right: 20upx;">

								<image @click="changeStatus(1,v.id)" v-if="v.status==2" src="../../static/icon/no_check.png" style="width: 40upx;height: 40upx;"></image>
								<image @click="changeStatus(2,v.id)" v-if="v.status==1" src="../../static/icon/checked.png" style="width: 40upx;height: 40upx;"></image>
							</view>

							<image :src="getImgPrefix()+getObj(v,'goods_sku.img')" style="width: 170upx;height: 170upx;"></image>

							<view class="col" style="margin-left: 30upx;justify-content: space-between;flex: 1;">

								<view class="col">
									<view>{{getObj(v,'goods.name')}}</view>

									<view class="small-font-size" style="color: #666;">
										<text v-for="(xx,yy) in v.sku_array" :key='yy'>
											<text v-if="yy!=0">,</text>{{xx.value}}
										</text>

									</view>


								</view>


								<view class="row-no-full center-col space">

									<view class="normal-font-size red-color">¥ {{getObj(v,'goods_sku.price')}}</view>

									<view>
										<uni-number-box   :value="v.num" @change='changeNum($event,v)'></uni-number-box>
									</view>

								</view>


							</view>
						</view>


						<view v-if="i!=vv.length-1" style="height: 1px;background-color: #CCCCCC;margin-top: 30upx;"></view>
						<view v-else style="margin-top: 30upx;"></view>



					</view>



				</uni-swipe-action-item>
			</uni-swipe-action>

		</view>




		<view v-if="isLogin&&list.length<=0" style="height:90vh;" class="col center-row center-col">

			<image src="../../static/menu/shop_car_normal.png" style="width: 200upx;height: 200upx;"></image>
			<text>购物车里空空如也~</text>

		</view>
		
		<view style="height: 100vh;" class="col center-col center-row">
			
			<button type="primary" style="height: auto;width: 35%;" @click="goLogin()">登录</button>
			
		</view>
		
		


		<view v-if="isLogin"  style="position: fixed;bottom: 0;background-color: #FFFFFF;left: 0;right: 0;">

			<view class="row-no-full">


				<view class="row-no-full center-col" style="flex: 3;padding: 20upx 30upx;justify-content: space-between;padding-left: 40upx;">

					<view  v-if="checkButtonStatus==1" class="row-no-full" @click="selectAll()" >
						<view>
							<image src="../../static/icon/no_check.png" style="width: 40upx;height: 40upx;"></image>
						</view>

						<view style="margin-left: 10upx;">全选</view>
					</view>
					
					<view v-if="checkButtonStatus==2" class="row-no-full" @click="cancelAll()">
						<view>
							<image src="../../static/icon/checked.png" style="width: 40upx;height: 40upx;"></image>
						</view>
					
						<view style="margin-left: 10upx;">全选</view>
					</view>
					
					
					<view class="red-color">
						
						<view>合计：¥ {{getTotalPrice}}</view>
						
					</view>
					
					
				
				</view>
				
				
				
				<view @click="submit()" style="flex: 1;color: #FFFFFF;" class="red-background-color row-no-full center-col center-row">去结算</view>
				
			
				
			</view>


		</view>



	</view>
</template>

<script>
	import uniNumberBox from "../../components/uni-number-box/uni-number-box.vue"
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item.vue'

	export default {
		data() {
			return {

				list: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c24a28'
					}
				}],
				checkedId: '',
				checkButtonStatus:2,
				isLogin:false
			}
		},
		methods: {

			getShopCarList() {


				uni.showLoading({})
				this.httpPost({
					url: "/weapp/shop_car/getShopCarList"
				}).then((re) => {


					// console.log(re);
					if(re.code==1){
						
						this.list = re.data;
						
						this.isLogin=true;
						
					}else{
						
						this.isLogin=false;
						
					}
					
					

					uni.hideLoading();

				})


			},
			changeStatus(status, id) {

				this.httpPost({
					url: "/weapp/shop_car/changeStatus",
					data: {
						id: id,
						status: status
					}

				}).then((re) => {

					this.getShopCarList();

				});

			},
			change(e, item) {

				console.log(e)

				console.log(item);

				this.checkedId = item.id;
			},
			onClick(e) {


				this.httpPost({
					url: "/weapp/shop_car/deleteGoods",
					data: {
						id: this.checkedId
					}
				}).then((re) => {

					// console.log(re);

					this.getShopCarList();

				})




			},
			selectAll(){
				
				
				this.httpPost({
					url:"/weapp/shop_car/selectAll"
				}).then((re)=>{
					
					this.getShopCarList();
					
					this.checkButtonStatus=2;
					
				})
				
				
			},
			cancelAll(){
				
				this.httpPost({
					url:"/weapp/shop_car/cancelAll"
				}).then((re)=>{
					
					this.getShopCarList();
					
					this.checkButtonStatus=1;
					
				})
				
			},
			changeNum(e,item){
				
				// console.log(e);
				
				// console.log(item);
				
				
				if(e!=item.num){
					
					this.httpPost({
						url:"/weapp/shop_car/changeNum",
						data:{id:item.id,num:e}
					}).then(()=>{
						
						this.getShopCarList();
					})
					
				}
				
				
			},
			submit(){
				
				
				// console.log('ok');
				
				//{sku_id:1,num:3}
				let goods_array=[];
				
				let param='';
				
				for(let i in this.list){
					
					
					for(let j in this.list[i]){
						
						
						if(this.list[i][j].status==1){
							
							// total+=this.list[i][j]
							
							let temp={};
							
							let item=this.list[i][j];
							
							if(!item) continue;
							
							// total+= Number(item.price);
							
							temp.sku_id=item.goods_sku_id;
							
							temp.num=item.num;
							
							goods_array.push(temp);
							
							
							param+=(item.goods_sku_id+'*'+item.num+'!');
							
							
							
						}
						
					}
				}
				
				param=param.substr(0,param.length-1)
				
				
				uni.navigateTo({
					url:'../confirm/confirm?param='+param
				})
				
				
			},
			goLogin(){
				
				
				uni.navigateTo({
					url:'../login/login'
				})
				
			},

		},
		components: {
			uniNumberBox,
			uniSwipeAction,
			uniSwipeActionItem

		},
		onShow() {

			this.getShopCarList();

		},
		computed:{
			
			getTotalPrice(){
				
				
				let total=0;
				for(let i in this.list){
					
					
					for(let j in this.list[i]){
						
						
						if(this.list[i][j].status==1){
							
							// total+=this.list[i][j]
							
							let item=this.list[i][j].goods_sku;
							
							if(!item) continue;
							
							total+= Number(item.price)*Number(this.list[i][j].num);
							
							
						}
						
					}
				}
				
				return total;
				
			}
		}
	}
</script>

<style>

</style>
