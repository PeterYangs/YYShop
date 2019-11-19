<template>
	<view>
		
		<view>
			
			<view class="tip-font-size" style="margin-bottom: 20upx;">
				{{title}}
			</view>
			
			
			
			<view class="row-no-full item-right" style="width: 90%;flex-wrap: wrap;">
				
				<view  v-for="(v,i) in list"  :key='i' @click="setItem(v,i)" class="small-font-size border-radius" :class="[getClass(i,v)]">{{v}}</view>
				
			</view>
			
						
			
		</view>
		
		
	</view>
	
</template>

<script>
  export default {
    name: "GoodsItem",
    data() {
      return {
        
		index:this.checkedIndex
		
      }
    },
    methods: {
		
		getClass(index,item){
			
			
			// console.log(this.getAllowItem);
			
			if(this.getAllowItem!==true&&(this.getAllowItem.indexOf(item)==-1)) return 'disable-item';
			
			
			if(index==this.index) return 'active-item';
			
			return 'normal-item';
			
		},
		setItem(item,index){
			
			if(this.getAllowItem!==true&&(this.getAllowItem.indexOf(item)==-1)) return false;
			
			if(index==this.index){
				
				this.index=-1;
				
				// this.$emit('change',item,-1)
				
				this.$emit('cancel',item,this.title)
				
				return false;
				
			}
			
			this.index=index;
			
			this.$emit('change',item,this.title)
			
		}

    },
    created(){

    },
    computed:{
		
		getAllowItem(){
				
				
			let obj=this.allowItem[this.title];	
				
			if(!obj) return true;
						
			
			return obj;
				
		}
		
    },
	props:{
	
		title:{
			type:String,
			default:'规格'
		},
		list:{
			
			type:Array,
			default:function(){
				
				return [
					'黑色','白色','红色'
				]
			}
		},
		checkedIndex:{
			type:Number,
			default:-1
		},
		allowItem:{
			type:Object,
			default:function(){
				
				return {};
			}
		}
		
		
	},
	watch:{
		
		checkedIndex(value){
			
			this.index=value;
		}
		
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
	
	.active-item{
		
		border: 1px solid #df3e27;
		
		width: -webkit-fit-content;
		
		background-color: #f9edeb;
		
		color: #df3e27;
		
		padding: 10upx 37upx;
		
	}
	
	.normal-item{
		
		border: 1px solid #f2f2f2;
		
		width: -webkit-fit-content;
		
		background-color: #f2f2f2;
		
		padding: 10upx 37upx;
	}
	
	
	.disable-item{
		
		border: 1px solid #f2f2f2;
		
		color: #bfbfbf;
		
		text-decoration: line-through;
		
		padding: 10upx 37upx;
		
		background-color: #f2f2f2;
		
	}
	
	
	.item-right>view{
		
		margin-right: 30upx;
		
		margin-bottom: 30upx;
		
	}
</style>
