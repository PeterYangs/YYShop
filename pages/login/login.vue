<template>
	<view style="min-height: 100vh;background-color: #F2F2F2;padding: 0 4%;" class="col center-row">


		<!-- #ifdef MP-WEIXIN -->

		<view>
			<button type="primary" open-type="getPhoneNumber" @getphonenumber='getPhone'>微信用户一键登录</button>
		</view>

		<!-- #endif -->

		<view style="margin-top: 20upx;">
			<button>手机验证码登录</button>
		</view>




	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

			getPhone(e) {

				// console.log(e);

				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') return false;

				let that = this;

				that.httpPost({
					url: '/weapp/login/getPhone',
					data: {
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv,
						sessionKey: that.localGet('weapp_session_key')
					}
				}).then((info) => {

					// console.log(info);

					if (info.code == 1) {

						that.localSave('token', info.data);


						uni.navigateBack({});
					}

				});


			},
			loginByWeixin() {

			}
		},
		onLoad() {

			// console.log()

			// uni.getProvider({

			// })

			// uni.getSystemInfo({
			// 	success(re) {

			// 		// console.log(re);
			// 	}
			// })

		}
	}
</script>

<style>

</style>
