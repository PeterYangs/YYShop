<template>
	<text >
		
		<text v-if="snappedSkuItem.type==1"   class="red-color title-font-size " >{{snappedSkuItem.price.split('.')[0]}}.<text class="red-color small-font-size ">{{snappedSkuItem.price.split('.')[1]}}</text></text>
		
		<text v-if="snappedSkuItem.type==2"  class="red-color">{{goodsSkuItem.price*(snappedSkuItem.percent/10)}}</text>
		
		
		
	</text>
	
</template>

<script>
  export default {
    name: "YyPrice",
    data() {
      return {
        
      }
    },
    methods: {


    },
    created(){

    },
    computed:{

    },
	props:{
		
		snappedSkuItem:{
			
			type:Object,
			default:function(){
				
				return {};
			}
			
		},
		goodsSkuItem:{
			
			type:Object,
			default:function(){
				
				return {};
			}
			
			
		}
		
	}
    
  }
</script>

<style>
</style>
