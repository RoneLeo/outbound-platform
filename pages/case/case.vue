<template>
	<view class="page">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		
		<view class="cicle-toolbar" @tap="toolBarShowChange">
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;">
				我要
			</view>
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;"> 
				认领
			</view>
		</view>
		<BasicCase tagTxt="¥40000.00"></BasicCase>
		<view class="page-end">
			<view class="end-txt">-- END --</view>
		</view>
	</view>
</template>

<script>
	import HMmessages from '../../components/HM-messages/HM-messages'
	import BasicCase from '../../components/basic-case/basic-case'
	export default {
		components:{
			HMmessages,
			BasicCase
		},
		data() {
			return {
				// toolbarShow: false
			};
		},
		onLoad(params) {
			console.log(params, params.caseId)
		},
		methods:{
			toolBarShowChange() {
				console.log(11111);
				this.HMmessages.show('认领成功！', {icon: 'success', closeButton: true, duration: 3000})
			}
		}
	}
</script>
	
<style lang="scss">
	.cicle-toolbar {
		position: fixed;
		top: 18%;
		right: 3%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;
		background:linear-gradient(to bottom, #66CC66,#00B07B);
		box-shadow: 8upx 5upx 10upx 0upx RGBA(0, 198, 116, .3);
	}
</style>
