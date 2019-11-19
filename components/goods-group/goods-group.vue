<template>
	<view>


		<goods-item v-for="(v,i) in getSkuList"  @cancel='cancalItem' :title="i" :allowItem="allowListItem" :key='i' :list="v" @change='changeItem'></goods-item>

	</view>
</template>

<script>
	import GoodsItem from '../goods-item/goods-item.vue'

	export default {
		name: "GoodsGroup",
		data() {
			return {
				
				model:{},
				allowListItem:{}
			}
		},
		methods: {

			changeItem(item, index) {


				this.model[index]=item;
				
				// console.log(this.model);
				
				
				this.setSkuItem();
				
	
			},
			cancalItem(item, index){
				
				// delete this.model
				
				// console.log(this.model);
				
				// console.log(index);
				
				delete this.model[index]
				
				console.log(this.model);
				
				this.setSkuItem();
				
				
				
				
				
				
			},
			setSkuItem(){
				
				
				let mode_list=this.item.goods_mode.mode;
								
				let hasSkuList=[];
				
				for(let i in this.item.sku_list){
					
					
					// console.log();
					
					
					let model=this.item.sku_list[i].model;
										
					let isFind=true;
					
					for(let j in  this.model){
						
						
						if(!(model[j]==this.model[j])){
							
							isFind=false;
							
						}
						
						
					}
					
					
					if(isFind){
						
						// console.log(model);
						
						
						hasSkuList.push(model);
												
						
					}
										
				}
				
								
				let allowList={};
				for(let i in hasSkuList){
										
					
					for(let j in hasSkuList[i]){
						
						
						let key=allowList[j];
						
						if(!key) allowList[j]=[];
						
						
						if(allowList[j].indexOf(hasSkuList[i][j])==-1) allowList[j].push(hasSkuList[i][j]);
						
						
					}
					
					
					
				}
				
				
				console.log(allowList);
				
				this.allowListItem=allowList;
				// return allowList;
				
				
				
			}

		},
		created() {

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
		components: {
			GoodsItem
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

				console.log(sku);

				return sku;

			},
			
			

		}

	}
</script>

<style>
</style>
