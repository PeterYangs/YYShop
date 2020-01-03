<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')


			// #ifdef MP-WEIXIN

			if (!this.localGet('weapp_session_key')) this.getSession();
			// this.getSession();

			// #endif



		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {

			getSession(isAging=false) {
				
				if(isAging){
					
					uni.showLoading({
						mask: true,
						title: "网络错误，重试"
					})
					
				}else{
					
					uni.showLoading({
						mask: true,
						title: "加载中..."
					})
					
					
				}
				
				
				
				
				
				let that = this;

				uni.login({
					success(code) {

						that.httpPost({
							url: "/weapp/login/getSessionKey",
							data: {
								code: code.code
							}
						}).then((re) => {

							// console.log(re);

							let sessionKey = re.data.session_key;

							that.localSave('weapp_session_key', sessionKey, 60 * 60 * 24)
							that.localSave('weapp_openid', re.data.openid, 60 * 60 * 24)


							uni.hideLoading()
						})

					}
				})


			}


		}
	}
</script>

<style>
	/*每个页面公共css */

	.col {
		display: flex;
		flex-direction: column;
	}

	.row {

		display: flex;
		width: 100%;

	}

	.row-no-full {

		display: flex;

	}

	.nowrap {
		white-space: nowrap;
	}

	.center-row {

		justify-content: center;
	}

	.center-col {

		align-items: center;
	}

	.space {

		justify-content: space-between;
	}

	.wrap {

		white-space: pre-wrap;

		line-height: 100%;
	}


	.all {
		width: 100%;
	}


	.bottom_line {
		/* border-bottom: 1upx solid #C0C0C0; */
		padding-bottom: 8upx;
		/* margin-left: 20upx; */
		display: inline-block;
		width: 100%;

		text-decoration: underline;
	}

	.aline {
		background-color: #E6E3E3;
		height: 1px;
		/* margin: 20upx 0; */
	}


	.bold {

		font-weight: bold;
	}

	.c666 {
		color: #666;
	}

	.blue {

		color: #009EE2;
	}

	.shadow {


		box-shadow: 0px 0px 8px #ccc;
	}

	.border-radius {

		border-radius: 0.1166rem;
	}

	.normal-font-size {

		font-size: 35upx;
	}

	.tip-font-size {

		font-size: 28upx;
	}

	.small-font-size {

		font-size: 22upx;
	}

	.title-font-size {

		font-size: 45upx;
	}

	.background-color {
		background-color: #F2F2F2;
	}

	.background-color-normal {

		background-color: #FFFFFF;
	}

	.relative {
		position: relative;
	}

	.absolute {
		position: absolute;
	}

	.width-100vw {

		width: 100vw;
	}

	.height-100vh {

		height: 100vh;

	}

	.width-fit {
		width: -webkit-fit-content;
	}

	.red-color {
		color: #c24a28;
	}

	.black-color {

		color: #4c332b;
	}

	.gray-color {
		color: #746d6e;
	}





	.red-background-color {
		background-color: #c24a28;
	}

	.black-background-color {

		background-color: #4c332b;
	}

	.gray-background-color {
		background-color: #746d6e;
	}

	text {
		color: #303133;
	}

	.success-color {

		color: #67C23A;
	}


	.success-background-color {

		background-color: #67C23A;
	}


	.warning-color {

		color: #E6A23C;
	}

	.warning-background-color {

		background-color: #E6A23C;
	}
	
	
	.danger-color{
		
		color: #F56C6C;
	}
	
	.danger-background-color {
	
		background-color: #F56C6C;
	}
	
	
</style>
