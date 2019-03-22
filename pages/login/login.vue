<template>
	<view class="body">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/icon/default-face.png" class="face"></image>
			</view>

			<view class="info-wapper">
				<label class="words-lbl">授权码</label>
				<input name="sqm" type="text" v-model="sqm" value="" @confirm="formSubmit" password class="input" placeholder="请输入授权码"
				 placeholder-class="graywords" />
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
				sqm: ''
			};
		},
		methods: {
			formSubmit(e) {
				var sqm = e.detail.value.sqm;
				console.log('授权码', sqm);
				uni.login({
					provider: "weixin",
					success: (loginResult) => {
						var code = loginResult.code,
							encryptedData = '',
							iv = '';
						uni.getUserInfo({
							provider: 'weixin',
							success: (infoRes) => {
								encryptedData = infoRes.encryptedData;
								iv = infoRes.iv;
								console.log('code');
								console.log(code)
								this.$postData({
									url: '/user/weLogin',
									data: {
										"code": code,
										"sqm": sqm || this.sqm,
										"encryptedData": encryptedData,
										"iv": iv
									},
									success: (res) => {
										console.log('登录页面的登录接口返回：',res.data);
										if (res.data.resCode === 200) {
											uni.setStorageSync("globalUser", res.data.data);
											uni.switchTab({
												url: "../../pages/me/me"
											});
										}else if (res.data.status == 500) {
											uni.showToast({
												title: '服务器500错',
												duration: 2000,
												image: "../../static/icon/error.png"
											})
										}else{
											this.HMmessages.show(res.data.resMsg, {
												icon: 'error',
												closeButton: true,
												duration: 5000
											})
										}
									}
								})
							}
						});
					},
				});

			}
		}
	}
</script>

<style>
	@import url("login.css");
</style>
