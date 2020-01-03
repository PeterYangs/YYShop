<template>
	<view >
		
		<text v-if="status==1" class="red-color">待付款</text>
		<text v-if="status==11" style="color: #67C23A;">已支付</text>
		<text v-if="status==22" class="red-color">已取消</text>
		<!-- <text v-if="status==1" class="red-color">待付款</text> -->
		
	</view>
	
</template>

<script>
  export default {
    name: "yy-pay-status",
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
		
		status:{
			
			type:[Number,String],
			default:1
		}
		
		
	}
    
  }
</script>

<style>
</style>
