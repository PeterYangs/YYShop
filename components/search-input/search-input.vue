<template>
	<view>
		<view class="red-background-color" style="padding-bottom: 15upx;padding-top: 10upx;">
		
			<view style="margin-left: 30upx;" class="row-no-full center-col">
				<input v-model="item.keyword" @input="getInput" style="background-color: #FFFFFF;border-radius: 2rem;height: 50upx;flex: 1;padding-left: 20upx;" />
		
				<text style="color: #FFFFFF;padding-left: 20upx;padding-right: 20upx;">取消</text>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		
		name:'SearchInput',
		data(){
			
		},
		methods: {
			
			getInput(){
				
				
			}
		
		},
		
		
	}
	
	
</script>

<style>
</style>
