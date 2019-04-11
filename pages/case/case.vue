<template>
	<view class="page">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		
		<view class="cicle-toolbar" @tap="toolBarShowChange">
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;">
				我要
			</view>
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;"> 
				接单
			</view>
		</view>
		<BasicCase :tagTxt="'¥'+ rwyj" :caseId="caseId" :taskId="taskId"></BasicCase>
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
				caseId: 0,
				taskId: 0,
				rwyj: 0,
			};
		},
		onLoad(params) {
			this.caseId = params.caseId;
			this.taskId = params.taskId;
			this.rwyj = params.rwyj;
		},
		methods:{
			toolBarShowChange() {
				let userId = this.getGlobalUser() != null ? this.getGlobalUser().id : '';
				this.$api.post('/task/order', {ywyid: userId, rwid: this.taskId}).then((res)=>{
					if(res.resCode == 200) {
						this.HMmessages.show('接单成功！', {icon: 'success', closeButton: true, duration: 3000})
					}else {
						uni.showToast({
							title: res.resMsg,
							icon: 'none'
						})
					}
				}).catch((err)=>{
					console.log('request fail', err);
				})
				
			}
		}
	}
</script>
	
<style lang="scss">
	.cicle-toolbar {
		position: fixed;
		top: 15%;
		right: 3%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;
		z-index: 2000;
		background:linear-gradient(to bottom, #66CC66,#00B07B);
		box-shadow: 8upx 5upx 10upx 0upx RGBA(0, 198, 116, .3);
	}
</style>
