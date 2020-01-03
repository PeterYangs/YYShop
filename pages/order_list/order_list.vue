<template>
	<view style="height: 100vh;background-color: #F2F2F2;" class="tip-font-size col">

		<yy-tab @change='changeStatus' :list="pay_status" :check_index="tab_index"></yy-tab>

		<view style="margin-top: 20upx;flex: 1;overflow: hidden;">
			<scroll-view :scroll-y="true" style="height: 100%;" @scrolltolower='loadMore'>

				<view style="background-color: #FFFFFF;padding: 20upx 20upx;margin-bottom: 15upx;" v-for="(v,i) in list" :key='i'>

					<view class="row-no-full space">

						<view v-if="v.seller_id==-1">
							<text>自营</text>
							<text style="margin-left: 20upx;">{{v.order_no}}</text>
						</view>

						<yy-pay-status :status="v.status"></yy-pay-status>
					</view>

					<view class="row-no-full space center-col" style="margin-top: 30upx;">

						<view style="flex: 1;flex-wrap: wrap;" class="row-no-full">

							<view v-for="vv in v.order_goods" class="row-no-full width-fit" :key='vv' style="margin-right: 10upx;margin-bottom: 10upx;">

								<image :src="getImgPrefix()+getObj(vv,'goods_sku.img')" style="width: 100upx;height: 100upx;"></image>

							</view>
						</view>


						<view style="margin-left: 30upx;">
							¥{{v.real_money}}
						</view>


					</view>


					<view>


						<view style="display: flex;flex-direction: row-reverse;margin-top: 15upx;" class="button-item small-font-size">


							<text v-if="v.status==11">查看物流</text>

							<text v-if="v.status==11" @click="to_after_sale(v)">申请售后</text>

							<text v-if="v.status==1" @click="cancel_order(v,i)">取消订单</text>

							<text @click="to_pay(v)" v-if="v.status==1">去支付</text>

						</view>


					</view>



				</view>


			</scroll-view>

		</view>
	</view>
</template>

<script>
	import YyTab from '../../components/yy-tab/yy-tab.vue'
	import YyPayStatus from '../../components/yy-pay-status/yy-pay-status.vue'

	export default {
		data() {
			return {

				list: [],
				//是否已经全部加载完毕
				isEnd: false,
				page: 1,

				pay_status: [{
						label: '全部',
						value: -1
					},
					{
						label: '待付款',
						value: 1
					},
					{
						label: '待发货',
						value: 11
					},
					{
						label: '已取消',
						value: 22
					},
					{
						label: '已完成',
						value: 23
					},
				],
				status: -1,
				tab_index: 0

			}
		},
		methods: {

			changeStatus(e, index) {

				console.log(e);

				this.status = e.value;

				this.tab_index = index;

				this.page = 1;

				this.isEnd = false;

				this.list = [];

				this.getOrderList();

			},
			getOrderList() {

				if (this.isEnd == true) return;

				uni.showLoading({
					mask: true
				})
				this.httpPost({
					url: "/weapp/order/my_order",
					data: {
						p: this.page,
						status: this.status
					}
				}).then((re) => {

					// console.log(re);

					// this.list.push(re.data);

					uni.hideLoading();


					if (re.data.length <= 0) {

						this.isEnd = true;

						return;

					}

					for (let i in re.data) {

						this.list.push(re.data[i]);

					}

				})


			},
			loadMore(e) {

				// console.log(e);

				// this.list.push({});

				if (this.isEnd == true) return;

				this.page++;

				this.getOrderList();


			},
			to_pay(item) {

				uni.navigateTo({
					url: '../pay/pay?id=' + item.id
				})

			},
			cancel_order(item, index) {

				this.showModal('提示', '确定取消订单？').then(() => {

					this.httpPost({
						url: "/weapp/order/order_cancel",
						data: {
							id: item.id
						}
					}).then((re) => {

						if (re.code == 1) {


							this.list.splice(index, 1);
						}

					})

				})

			},
			to_after_sale(item) {

				uni.navigateTo({
					url: '../after_sale/after_sale?id=' + item.id
				})

			}

		},
		components: {
			YyTab,
			YyPayStatus
		},
		onLoad(e) {

			let status = e.status;

			let index = e.index;


			// this.status=e.status;

			if (status) this.status = status;

			if (index) this.tab_index = index;

			this.getOrderList();

		}
	}
</script>

<style>
	.button-item>text {

		border-radius: 2rem;

		border: 1px solid #CCCCCC;

		padding: 6upx 20upx;

		margin-left: 15upx;
	}
</style>
