<template>

	<view class="row-no-full space" style="background-color: #FFFFFF;padding: 20upx 20upx;">

		<view class="row-no-full center-row" v-for="(v,i) in list"  :key='i' >

			<view class="col width-fit" style="padding: 0 20upx;" @click="select_item(i)">
				<view>{{v.label}}</view>

				<view class=" line" style="margin-top: 5upx;" v-if="i==index"></view>
			</view>

		</view>


	</view>

</template>

<script>
	export default {
		name: "YyTab",
		data() {
			return {

				index: this.check_index

			}
		},
		methods: {

			select_item(index) {

				this.index = index;
				
				// this.$emit('update:check_index',index);
				

				let temp = this.cloneObj(this.list[this.index])

				this.$emit('change', temp,index);
			}

		},
		created() {

		},
		computed: {

		},
		props: {

			list: {

				type: Array,
				default: function() {


					return [{
							label: '全部',
							value: -1
						},
						{
							label: '待付款',
							value: 1
						},
						{
							label: '待发货',
							value: 11
						},
						{
							label: '已取消',
							value: 22
						},
					];
				}
			},
			check_index:{
				
				type:[Number,String],
				default:0
			}



		},
		watch:{
			
			check_index(value){
				
				this.index=value;
				
			}
			
		}

	}
</script>

<style>
	.line {

		height: 2px;
		background-image: linear-gradient(to right, rgba(194, 74, 40, 1), rgba(194, 74, 40, 0.3));
	}
</style>
