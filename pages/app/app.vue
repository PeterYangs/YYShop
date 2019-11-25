<template>
	<view style="padding: 20upx;">
		
		<view v-for="(v,i) in simulatedDATA.specifications" :key='i'>
			<view>
				<view>{{v.name}}</view>
			</view>

			<view class="row-no-full item">
				<view v-for="(oItem,index) in v.item"  :key='index'  :class="[oItem.isShow?'normal':'disable',subIndex[i] == index?'active':'normal']" @click="specificationBtn(oItem.name,i,$event,index)"   >{{oItem.name}}</view>
			</view>


		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				price: '' //选中规格的价钱
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
						 
						 console.log(result);
						//在数据里面添加字段isShow来判断是否可以选择
						option[i].item[k].isShow = self.isMay(result); 
					}
					//还原，目的是记录点下去那个值，避免下一次执行循环时被覆盖
					result[i] = last; 
				}
				if (this.shopItemInfo[result]) {
					this.price = this.shopItemInfo[result].price || ''
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
				
				try{
					
					//匹配选中的数据的库存，若不为空返回true反之返回false
					return this.shopItemInfo[result].stock == 0 ? false : true;
					
				}catch(e){
					
					return false;
				}
			}
			
		},
		onLoad() {
			
			var self = this;
			for (var i in self.simulatedDATA.difference) {
				//修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
				self.shopItemInfo[self.simulatedDATA.difference[i].difference] = self.simulatedDATA.difference[i]; 
			}
			self.checkItem();
		}
	}
</script>

<style>
	.item>view {

		margin-right: 20upx;

		/* border: 1px solid #000000; */

		padding: 5upx 20upx;
	}

	.normal {

		/* margin-right: 20upx; */

		border: 1px solid #000000;

		/* padding: 5upx 20upx; */
	}


	.item {

		margin-top: 20upx;
		margin-bottom: 20upx;
	}

	.disable {

		background-color: #ccc;
		border: 1px solid #ccc;
		pointer-events: none;
	}

	.active {

		background-color: #000000;
		color: #FFFFFF;
	}
</style>
