<template>
	<view class="height-100vh ">
		
		<!-- 搜索框 -->
		<view class="red-background-color" style="padding-bottom: 15upx;padding-top: 10upx;">
		
			<view style="margin-left: 30upx;" class="row-no-full center-col">
				<input v-model="item.keyword" @input="getInput" @confirm="getSearch"  style="background-color: #FFFFFF;border-radius: 2rem;height: 50upx;flex: 1;padding-left: 20upx;" />
		
				<text style="color: #FFFFFF;padding-left: 20upx;padding-right: 20upx;">取消</text>
			</view>
		
		</view>
		
		<!-- 搜索历史 -->
		<view style="padding: 20upx;" v-if="!item.keyword">

			<view class="bold">历史搜索</view>

			<view class="tip-font-size row-no-full" style="margin-top: 20upx;flex-wrap: wrap;">

				<text @click="select_history(v)" v-for="(v,i) in history_list" :key='i' class="background-color search-history" >{{v}}</text>


			</view>

		</view>

		<!-- 候选项列表 -->
		<view v-else class="col tip-font-size center-row">

			<view v-for="(v,i) in search_list" :key='i' style="font-weight: 300;">
				<view v-if="i!=0" style="background-color: #F2F2F2;height: 1px;"></view>
				<view class="search-list" @click="select_list(v.name)">{{v.name}}</view>

			</view>


		</view>


	</view>
</template>

<script>
	
	// import searchInput from '../../components/search-input/search-input.vue'
	
	export default {
		data() {
			return {
				delay: 1000,
				timeId: 0,
				item: {

					keyword: ''
				},
				search_list: [],
				history_list:[],
				key:'search_keyword'
			}
		},
		methods: {

			getInput(e) {

				let value = e.detail.value;

				clearTimeout(this.timeId);



				if (!value) {

					this.search_list = [];

					return;


				}

				// clearTimeout(this.timeId);

				this.timeId = setTimeout(() => {

					this.httpPost({
						url: "/weapp/search/search",
						data: {
							keyword: value
						}
					}).then((re) => {

						// console.log(re);
						
						
						

						// this.localSave('search_keyword', )
						
						this.saveHistoryList(value)

						this.search_list = re.data;

					})



				}, this.delay)


			},
			saveHistoryList(value){
				
				let limit=10;
				
				let key=this.key;
				
				let list=this.localGet(key)
				
				
				if(!list) list='[]';
				
				
				
				
				list=JSON.parse(list);
				
				console.log(list);
				
				// if(list.indexOf(value)==-1){
					
				// 	// if(this.)
				// }
				
				if(list.length>=limit){
					
					console.log(111);
					
					
					let index=list.indexOf(value);
					
					if(index!==-1){
						
						// console.log(2222);
						
						// list.splice(index,1)
						
						// list.unshift(value);
								
						// this.localSave(key,JSON.stringify(list))
						
											
						// return list;
						
					}else{
						
						// console.log(list);
						
						
						
						
						
						// if(list.length<=0){
							
						// 	list.push(value);
							
						// }else{
							list.unshift(value);
							
							list.pop();
						// }
						
						
						this.localSave(key,JSON.stringify(list))
						
						return list;
					}
					
					
					
					
				}else{
					
					//数组未满
					
					let index=list.indexOf(value);
					
					if(index!==-1){
						
						console.log(2222);
						
						list.splice(index,1)
						
						list.unshift(value);
								
						this.localSave(key,JSON.stringify(list))
						
											
						return list;
						
					}else{
						
						// console.log(list);
						
						
						
						if(list.length<=0){
							
							list.push(value);
							
						}else{
							list.unshift(value);
						}
						
						
						this.localSave(key,JSON.stringify(list))
						
						return list;
					}
					
					
					
				}
				
				
				
				// this.localSave('search_keyword')
				
				
			},
			select_history(v){
				
				console.log(v);
				
				this.item.keyword=v;
				
				
				let word=encodeURI(v);
				
				uni.navigateTo({
					url:'../search_list/search_list?keyword=' + word+ "&type=1"
				})
				
				
			},
			select_list(v){
				
				this.item.keyword=v;
				
				
				let word=encodeURI(v);
				
				uni.navigateTo({
					url:'../search_list/search_list?keyword=' + word+ "&type=1"
				})
				
			},
			getSearch(){
				
				// console.log('kkkkkkkkk');
				
				let word=encodeURI(this.item.keyword);
				
				console.log(word);
				
				uni.navigateTo({
					url:'../search_list/search_list?keyword=' + word+ "&type=1"
				})
				
			}
			
		},
		onLoad() {
			
			let history_list=this.localGet(this.key);
			
			if(!history_list) return;
			
			
			history_list=JSON.parse(history_list);
			
			this.history_list=history_list;
			
			
		},
		components:{
			// searchInput
		}
	}
</script>

<style>
	.search-input {

		background-color: #FFFFFF;
		padding: 6upx 5upx;
		flex: 1;

	}


	.search-placeholder {

		text-align: center;
		color: #492c24;

	}

	.search-list {

		padding: 30upx;
	}


	.search-history {

		padding: 1upx 30upx;
		border-radius: 2rem;
		margin-right: 30upx;
		margin-bottom: 30upx;
	}
</style>
