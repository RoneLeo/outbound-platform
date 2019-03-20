<template>
	<view class="body">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/icon/default-face.png" class="face"></image>
			</view>

			<view class="info-wapper">
				<label class="words-lbl">授权码</label>
				<input name="sqm" type="text" value="" class="input" placeholder="请输入用户名" placeholder-class="graywords" />
			</view>
			<button class="submit-btn" type="primary" form-type="submit" style="">提交</button>
		</form>

	</view>
</template>


<script>
	import HMmessages from '../../components/HM-messages/HM-messages'
	export default {
		components: {
			HMmessages
		},
		data() {
			return {

			};
		},
		methods: {
			formSubmit(e) {
				var sqm = e.detail.value.sqm;
				console.log(sqm);
				uni.login({
					provider: "weixin",
					success: (loginResult) => {
						var code = loginResult.code;
// 						uni.request({
// 							url: this.$url + "/mpWXLogin/",
// 							data: {
// 								"code": code,
// 								"sqm": sqm
// 							},
// 							method: "POST",
// 							success(res) {
// 								console.log(res);
// 								if (res.data.resCode === 200) {
// 									//登录成功
// 									uni.setStorageSync("globalUser", res.data.data);
// 									uni.switchTab({
// 										url: "../../pages/me/me"
// 									});
// 								} else if (res.data.resCode === 100) {
// 									this.HMmessages.show('认证失败！', {
// 										icon: 'error',
// 										closeButton: true,
// 										duration: 5000
// 									})
// 									console.log('登录认证失败')
// 								} else if (res.data.status == 500) {
// 									uni.showToast({
// 										title: res.data.msg,
// 										duration: 2000,
// 										image: "../../static/icon/error.png"
// 									})
// 								}
// 							}
// 						});
					}
				});
			}
		}
	}
</script>

<style>
	@import url("login.css");
</style>
