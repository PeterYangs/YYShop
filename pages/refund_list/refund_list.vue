<template>
	<view style="height: 100vh;background-color: #F2F2F2;overflow: auto;" class="tip-font-size">

		<view style="height: 20upx;"></view>

		<view>

			<view v-for="(v,i) in list" :key='i' class="item">
				<view class="row-no-full space">

					<view>创建时间：{{v.created_at}}</view>

					<view class="row-no-full center-col">
						<image src="../../static/icon/refund.png" style="width: 40upx;height: 40upx;"></image>
						<text style="margin-left: 5upx;">退款</text>
					</view>
				</view>

				<view style="margin-top: 30upx;" class="row-no-full">

					<view>
						<image :src="getImgPrefix()+v.goods_img" style="width: 90upx;height: 90upx;"></image>
					</view>


					<view class="col" style="margin-left: 40upx;flex: 1;">

						<text>{{v.goods_name}}</text>
						<text class="small-font-size" style="margin-top: 15upx;">数量： {{v.num}}</text>

					</view>
					

					<view class="red-color col" style="flex-direction: column-reverse;">
						
						<refund-status :status="v.status"></refund-status>
						
					</view>

				</view>

			</view>

		</view>

	</view>
</template>

<script>
	
	import RefundStatus from '../../components/refund_status/refund_status.vue'
	export default {
		data() {
			return {
				
				list:[]
				
			}
		},
		methods: {
			
			getList(){
				
				this.httpPost({
					url:"/weapp/refund/refund_list"
				}).then((re)=>{
					
					console.log(re);
					
					this.list=re.data;
				})
				
			}
			
		},
		onLoad() {
			
			this.getList();
			
		},
		components:{
			
			RefundStatus
		}
	}
</script>

<style>
	.item {
		background-color: #FFFFFF;
		padding: 20upx 30upx;
		margin-bottom: 20upx;
	}
</style>
