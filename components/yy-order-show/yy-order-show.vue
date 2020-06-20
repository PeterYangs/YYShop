<template>
	<view >
		<!-- 未支付-订单未超时 -->
		<template v-if="orderItem.status==1&&orderItem.expired_time_with_seconds&&code==1">
			
			<slot></slot>
			
		</template>
		
		<!-- 未支付-订单超时 -->
		<template v-if="orderItem.status==1&&!orderItem.expired_time_with_seconds&&code==2">
			
			<slot></slot>
			
		</template>
		
		
		
		
		
	</view>
</template>

<script>
  export default {
    name: "YyOrderShow",
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
		
		orderItem:{
			
			type:Object,
			default:function(){
				
				return {};
			}
			
		},
		/**
		 * 1.未支付-订单未超时
		 * 2.未支付-订单超时
		 * 
		 * 
		 */
		code:{
			type:Number,
			default:1
			
			
		}
		
		
	}
    
  }
</script>

<style>
</style>
