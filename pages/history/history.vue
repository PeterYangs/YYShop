<template>
	<view class="background-color col" style="height: 100vh;">

		<view style="height: 1vh"></view>
		<view class="col" style="flex: 1;">

			<scroll-view @scrolltolower="bottom()" scroll-y="true" style="height: 99vh;">

				<!-- <view v-for="(vvvv,ii) in 10"> -->
				<view @click="toGoodsDetail(getObj(v,'goods.id'))" style="padding: 10upx 20upx;padding-top: 22upx;" v-for="(v,i) in list" :key='i'
				 class="background-color-normal row-no-full" >

					<view>
						<image style="width: 250upx;height: 250upx;" :src="getImgPrefix()+getObj(v,'goods.main_img')"></image>
					</view>

					<view class="col" style="margin-left: 30upx;flex: 1;">

						<view>{{getObj(v,'goods.name')}}</view>

						<view class="title-font-size" style="margin-top: 30upx;">
							<text class="red-color">¥</text>
							<text class="red-color">{{getObj(v,'goods.min_price')}}</text>
						</view>

						<view class="row-no-full " style="justify-content: flex-end;">
							<!-- <div class="background-color row-no-full center-col center-row" style='border-radius: 50%;width: 70upx;height: 70upx;'>
							<image src="../../static/menu/shop_car_selected.png" style="width: 35upx;height: 35upx;"></image>
						</div> -->
							<view class="small-font-size gray-color" style="border: 1px solid #746d6e;padding: 5upx 23upx;border-radius: 1rem;">找相似</view>

						</view>

						<view v-if="i<list.length-1" style="flex: 1;align-items: flex-end;" class="row-no-full">
							<view style="height: 1px;width: 100%;" class="background-color"></view>

						</view>

					</view>

				</view>
				<!-- </view> -->
			</scroll-view>
			
			
			
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				list2: [{}, {}, {}, {}, {}],
				p:1,
				isbottom:false
			}
		},
		methods: {

			getList() {
				
				if(this.isbottom==true) return;
				
				this.httpPost({
					url: "/weapp/my/historyList",
					data:{p:this.p}
				}).then((re) => {

					if(re.data.data.length>0){
						
						
						for(let i in re.data.data){
							
							this.list.push(re.data.data[i])
						}
						
					}else{
						
						this.isbottom=true;
						
					} 

				})


			},
			toGoodsDetail(id) {

				uni.navigateTo({
					url: '../goods_detail/goods_detail?id=' + id
				})

			},
			bottom(e) {

				// console.log('bottom')
				
				this.p++;
				
				this.getList();
				

			}


		},
		onShow() {

			this.getList();
		}
	}
</script>

<style>
	.b {
		margin-bottom: 30upx;
	}
</style>
