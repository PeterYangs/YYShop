<template>
	<view>


		<!-- <goods-item v-for="(v,i) in getSkuList" @cancel='cancalItem' :title="i" :allowItem="allowListItem" :key='i' :list="v"
		 @change='changeItem'></goods-item> -->

		<view v-for="(v,i) in simulatedDATA.specifications" :key='i'>

			<view>

				<view class="tip-font-size" style="margin-bottom: 20upx;">
					{{v.name}}
				</view>



				<view class="row-no-full item-right" style="width: 90%;flex-wrap: wrap;">

					<view v-for="(oItem,index) in v.item" :class="[oItem.isShow?'':'disable-item',subIndex[i] == index?'active-item':'normal-item']"
					 :key='index' @click="specificationBtn(oItem.name,i,$event,index)" class="small-font-size border-radius">{{oItem.name}}</view>

				</view>



			</view>


		</view>


	</view>
</template>

<script>
	// import GoodsItem from '../goods-item/goods-item.vue'

	export default {
		name: "GoodsGroup",
		data() {
			return {

				model: {},
				allowListItem: {},
				indexKey: '',
				allList: {},

				simulatedDATA: {

					difference: [{
							"id": "19",
							"price": "200.00",
							"stock": "19",
							"difference": "1982,100ML"
						}, {
							"id": "20",
							"price": "100.00",
							"stock": "19",
							"difference": "1983,100ML"
						},
						// {
						// 	"id": "21",
						// 	"price": "300.00",
						// 	"stock": "0",
						// 	"difference": "1983,200ML"
						// },
						{
							"id": "22",
							"price": "400.00",
							"stock": "19",
							"difference": "1982,200ML"
						},

					],
					specifications: [

						{
							"name": "年份",
							"item": [{
									"name": "1982",
								},
								{
									"name": "1983",
								}
							]
						},
						{
							"name": "容量",
							"item": [{
									"name": "200ML",
								},
								{
									"name": "100ML",
								}
							]
						},

					]

				},
				selectArr: [], //存放被选中的值
				shopItemInfo: {}, //存放要和选中的值进行匹配的数据
				subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
				price: '', //选中规格的价钱
				goods_detail: {}

			}
		},
		methods: {

			specificationBtn: function(item, n, event, index) {
				var self = this;
				if (self.selectArr[n] != item) {
					self.selectArr[n] = item;
					self.subIndex[n] = index;
				} else {
					self.selectArr[n] = "";
					//去掉选中的颜色
					self.subIndex[n] = -1;
				}
				self.checkItem();


				// console.log(this.selectArr);
			},
			checkItem: function() {
				var self = this;
				var option = self.simulatedDATA.specifications;
				//定义数组储存被选中的值
				var result = [];
				for (var i in option) {
					result[i] = self.selectArr[i] ? self.selectArr[i] : '';
				}
				for (var i in option) {
					//把选中的值存放到字符串last去
					var last = result[i];
					for (var k in option[i].item) {
						//赋值，存在直接覆盖，不存在往里面添加name值
						result[i] = option[i].item[k].name;

						// console.log(result);
						//在数据里面添加字段isShow来判断是否可以选择
						option[i].item[k].isShow = self.isMay(result);
					}
					//还原，目的是记录点下去那个值，避免下一次执行循环时被覆盖
					result[i] = last;
				}
				if (this.shopItemInfo[result]) {
					this.price = this.shopItemInfo[result].price || ''

					// console.log(this.shopItemInfo[result]);
					let temp = this.cloneObj(this.shopItemInfo[result]);

					let selectArrTemp = this.cloneObj(this.selectArr);

					this.$emit('success', temp, selectArrTemp);


				} else {

					let selectArrTemp = this.cloneObj(this.selectArr);

					this.$emit('fail', selectArrTemp)

					// console.log(selectArrTemp);

				}

				// console.log(result);
				//重绘
				self.$forceUpdate();
			},
			isMay: function(result) {
				for (var i in result) {
					if (result[i] == '') {
						//如果数组里有为空的值，那直接返回true
						return true;
					}
				}

				try {

					//匹配选中的数据的库存，若不为空返回true反之返回false
					return this.shopItemInfo[result].stock == 0 ? false : true;

				} catch (e) {

					return false;
				}
			},
			setName() {

				var self = this;
				for (var i in self.simulatedDATA.difference) {
					//修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
					self.shopItemInfo[self.simulatedDATA.difference[i].difference] = self.simulatedDATA.difference[i];
				}
			}

		},
		created() {

			// this.allSku();

			var self = this;
			// for (var i in self.simulatedDATA.difference) {
			// 	//修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
			// 	self.shopItemInfo[self.simulatedDATA.difference[i].difference] = self.simulatedDATA.difference[i]; 
			// }


			this.setName();

			// console.log(self.shopItemInfo);

			self.checkItem();

		},
		computed: {

		},
		props: {

			item: {
				type: Object,
				default: function() {

					return {};
				}
			}


		},
		watch: {

			item(value) {


				this.goods_detail = value;


				this.simulatedDATA = value.sku;


				this.setName();



				this.checkItem();




			}

		},
		components: {
			// GoodsItem
		},
		computed: {

			getSkuList() {

				let list = this.item.sku_list;

				if (!list) return {};

				let sku = {};

				// console.log(this.item);

				if (list.length <= 0) return {};


				for (let i in this.item.sku_list) {

					for (let j in this.item.sku_list[i].model) {


						let key = j;

						let value = this.item.sku_list[i].model[j];

						if (!sku[key]) sku[key] = [];

						if (sku[key].indexOf(value) == -1) sku[key].push(value);

					}

				}

				// console.log(sku);

				return sku;

			},



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
		background-color: #FFFFFF;
		width: 100vw;
	}

	.shop-car {
		flex: 1;
		height: 80upx;
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

		/* 点击禁用 */
		pointer-events: none;

	}


	.item-right>view {

		margin-right: 30upx;

		margin-bottom: 30upx;

	}
</style>
