<template>
	<view class="height-100vh col background-color">

		<!-- 搜索框 -->
		<view class="red-background-color" style="padding-bottom: 15upx;padding-top: 10upx;">

			<view style="margin-left: 30upx;" class="row-no-full center-col">
				<input  v-model="option.inputText" @click="toSearch()" style="background-color: #FFFFFF;border-radius: 2rem;height: 50upx;flex: 1;padding-left: 20upx;" />

				<!-- <text style="color: #FFFFFF;padding-left: 20upx;padding-right: 20upx;">取消</text> -->

				<view style="padding: 0upx 30upx;" class="row-no-full center-col">
					<image @click="changeType()" src="../../static/icon/list_change.png" style="width: 50upx;height: 50upx;"></image>
				</view>


			</view>

		</view>

		<!-- 列表 -->
		<view style="margin-top: 16upx;flex: 1;overflow: hidden;">

			<scroll-view :scroll-y="true" style="height: 100%;">

				<!-- 一行一个 -->
				<view v-if="type=='col'" v-for="(v,i) in list" :key='i' @click="toGoodsDetail(v)" class="col" style="background-color: #FFFFFF;">

					<view style="padding: 30upx;">

						<view class="row-no-full">

							<image :src="getImgPrefix()+v.main_img" style="width: 180upx;height: 180upx;"></image>

							<view class="col space" style="margin-left: 30upx;flex: 1;">

								<view class="col">
									<text>{{v.name}}</text>
									<text class="gray-color small-font-size" style="margin-top: 10upx;">商品描述</text>
								</view>

								<view class="row-no-full space center-col">
									<text class="red-color">¥ {{v.min_price}}</text>

									<image src="../../static/menu/shop_car_selected.png" style="width: 50upx;height: 50upx;"></image>
								</view>

							</view>

						</view>


					</view>

					<view style="height: 1px;background-color: #F2F2F2;"></view>

				</view>

				<!-- 一行两个 -->
				<view v-if="type=='row'" class="row-no-full space" style="flex-wrap: wrap;background-color: #F2F2F2;">

					<view v-for="(v,i) in list" :key='i' @click="toGoodsDetail(v)" style="width: 49%;background-color: #FFFFFF;margin-bottom: 15upx;border-radius: .3rem;" class="col">
						<view class="col" style="padding: 30upx;padding-bottom: 5upx;">

							<view class="row-no-full center-row">
								<image :src="getImgPrefix()+v.main_img" mode="aspectFill" style="width: 100%;height: 160upx;"></image>
							</view>
							
							<view class="col">

								<text style="margin-top: 10upx;">{{v.name}}</text>

								<text style="margin-top: 10upx;" class="gray-color small-font-size">商品描述</text>

								<view style="margin-top: 10upx;" class="row-no-full space center-col">
									<text class="red-color">¥ {{v.min_price}}</text>

									<image src="../../static/menu/shop_car_selected.png" style="width: 50upx;height: 50upx;"></image>

								</view>

							</view>

						</view>
					</view>

				</view>


			</scroll-view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

				type: 'row',
				
				option:{
					keyword:'',
					type:'',
					inputText:''
				},
				list:[]

			}
		},
		methods: {

			changeType() {


				if (this.type == 'row'){
					
					this.localSave('list_type','col')
					
					return this.type = 'col';
				} 

				if (this.type == 'col'){
					
					this.localSave('list_type','row')
					
					return this.type = 'row';
				} 

			},
			toSearch(){
				
				
				
				if(this.lastPage(1).route=='pages/search/search'){
					
					uni.navigateBack({
						
					});
					
					
				}else{
					
					uni.navigateTo({
						url:"../search/search"
					})
					
				}
					
				
			},
			getList(){
				
				this.httpPost({
					url:"/weapp/search/search_list",
					data:this.option
				}).then((re)=>{
					
					// console.log(re);
					
					this.list=re.data;
				})
				
			},
			toGoodsDetail(item){
				
				
				uni.navigateTo({
					url:'../goods_detail/goods_detail?id='+item.id
				})
				
			}

		},
		onLoad(e) {
			
			
			this.type=this.localGet('list_type','col');
			
			
			let param= this.getSearchParam(e);
			
			this.option=param;
			
			
			this.getList();
			
			
			
			
			
		}
		
	}
</script>

<style>

</style>
