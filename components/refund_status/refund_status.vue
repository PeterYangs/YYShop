<template>
	
	<view>
		
		<view v-if="status==1" class="warning-color">申请中</view>
		<view v-else-if="status==2" class="warning-color">退款中</view>
		<view v-else-if="status==3" class="success-color">已退款</view>
		<view v-else-if="status==4" class="danger-color">已驳回</view>
		
	</view>
	
</template>

<script>
  export default {
    name: "RefundStatus",
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
