<template>
	<view style="height: 100vh;background-color: #F2F2F2;" class="row-no-full tip-font-size">

		<view style="flex: 1;">
			<scroll-view :scroll-y="true" style="height: 100%;">

				<view v-for="(v,i) in category_list" :key='i' @click="select_category(v,i)" class="row-no-full center-row" style="padding: 40upx 0;position: relative;"
				 :class="[select_category_index==i?'select-category':'']">
				 <view v-if='select_category_index==i' class="red-background-color" style="width: 7upx;position: absolute;left: 0;top: 20%;bottom: 20%;"></view>
				 <view> {{v.name}}</view>
				 </view>

			</scroll-view>
		</view>

		<view style="flex: 3;">
			<scroll-view :scroll-y="true" style="height: 100%;background-color: #FFFFFF;">
				<view style="flex-wrap: wrap;height: 100%;" class="row-no-full ">
					<view v-for="(v,i) in item_list" :key='i'  @click="toSearchList(v)" style="width: 33.33%;padding: 30upx 0;" class="col center-col ">

						<image :src="getImgPrefix()+v.img" style="width: 100upx;height: 100upx;"></image>
						<view style="padding-top: 20upx;">{{v.name}}</view>
						
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

				category_list: [{}, {}, {}],
				// item_list: [],
				select_category_index: 0

			}
		},
		methods: {

			select_category(item, index) {

				console.log(item);


				this.select_category_index = index;

			},
			getList() {

				this.httpPost({
					url: "/weapp/category/getCategory",
				}).then((re) => {
					// console.log(re);

					this.category_list = re.data;
				})

			},
			toSearchList(v){
				
				// console.log(v);
				
				let param= this.setSearchParam(2,v.id,v.name);
				
				uni.navigateTo({
					url:'../search_list/search_list?'+param
				})
				
				
				
			}

		},
		onLoad() {

			this.getList();

		},
		computed: {

			item_list() {


				let item = this.category_list[this.select_category_index];

				if (!item) return [];

				return item['child'];


			}


		}
	}
</script>

<style>
	.select-category {

		background-color: #FFFFFF;
	}
</style>
