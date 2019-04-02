<template>
	<view class="page">
		
		<view class="page-block index-head">
			<Swiper></Swiper>
			<!-- <image src="http://182.151.22.247:8083/files/swiper2.jpg" class="header-img"></image> -->
			<view class="search-block">
				<view class="search-ico-wapper">
					<image src="../../static/icon/search1.png" class="search-ico"></image>
				</view>
				<input 
					placeholder="搜索案件" 
					maxlength="10" 
					class="search-text" 
					confirm-type="完成"
					@confirm="searchMe"
				/>
			</view>
			<!-- <image src="../../static/indexPng/bg.jpeg" class="header-img"></image> -->
		</view>
		
		<view class="page-block cases-wraper">
			<view class="cases-item no-border">
				<view class="case-txt case-id case-title">
					案件编号
				</view>
				<view class="case-txt case-name case-title">
					客户姓名
				</view>
				<view class="case-txt case-date case-title">
					外访方式
				</view>
				<view class="case-txt case-status case-title">
					佣金
				</view>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=1">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							张三张三张三
						</view>
						<view class="case-txt case-date">
							地址信息
						</view>
						<view class="case-txt case-status">
							￥3.00
						</view>
					</view>
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=2">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							李四
						</view>
						<view class="case-txt case-date">
							信函签字
						</view>
						<view class="case-txt case-status">
							￥11.00
						</view>
					</view>

				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=1">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							张三张三张三
						</view>
						<view class="case-txt case-date">
							地址信息
						</view>
						<view class="case-txt case-status">
							￥3.00
						</view>
					</view>
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=2">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							李四
						</view>
						<view class="case-txt case-date">
							信函签字
						</view>
						<view class="case-txt case-status">
							￥11.00
						</view>
					</view>
			
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=1">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							张三张三张三
						</view>
						<view class="case-txt case-date">
							地址信息
						</view>
						<view class="case-txt case-status">
							￥3.00
						</view>
					</view>
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=2">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							李四
						</view>
						<view class="case-txt case-date">
							信函签字
						</view>
						<view class="case-txt case-status">
							￥11.00
						</view>
					</view>
			
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=1">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							张三张三张三
						</view>
						<view class="case-txt case-date">
							地址信息
						</view>
						<view class="case-txt case-status">
							￥3.00
						</view>
					</view>
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=2">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							李四
						</view>
						<view class="case-txt case-date">
							信函签字
						</view>
						<view class="case-txt case-status">
							￥11.00
						</view>
					</view>
			
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=1">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							张三张三张三
						</view>
						<view class="case-txt case-date">
							地址信息
						</view>
						<view class="case-txt case-status">
							￥3.00
						</view>
					</view>
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=2">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							李四
						</view>
						<view class="case-txt case-date">
							信函签字
						</view>
						<view class="case-txt case-status">
							￥11.00
						</view>
					</view>
			
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=1">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							张三张三张三
						</view>
						<view class="case-txt case-date">
							地址信息
						</view>
						<view class="case-txt case-status">
							￥3.00
						</view>
					</view>
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=2">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							李四
						</view>
						<view class="case-txt case-date">
							信函签字
						</view>
						<view class="case-txt case-status">
							￥11.00
						</view>
					</view>
			
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=1">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							张三张三张三
						</view>
						<view class="case-txt case-date">
							地址信息
						</view>
						<view class="case-txt case-status">
							￥3.00
						</view>
					</view>
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=2">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							李四
						</view>
						<view class="case-txt case-date">
							信函签字
						</view>
						<view class="case-txt case-status">
							￥11.00
						</view>
					</view>
			
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=1">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							张三张三张三
						</view>
						<view class="case-txt case-date">
							地址信息
						</view>
						<view class="case-txt case-status">
							￥3.00
						</view>
					</view>
				</navigator>
			</view>
			<view>
				<navigator open-type="navigate" url="/pages/case/case?caseId=2">
					<view class="cases-item">
						<view class="case-txt case-id">
							201903140999
						</view>
						<view class="case-txt case-name">
							李四
						</view>
						<view class="case-txt case-date">
							信函签字
						</view>
						<view class="case-txt case-status">
							￥11.00
						</view>
					</view>
			
				</navigator>
			</view>

		</view>
	
		<view class="page-end">
			<view class="end-txt">-- END --</view>
		</view>
	</view>
</template>

<script>
	import Swiper from '../../components/swiper/swiper.vue'
	export default {
		components: {
			Swiper
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			let id = uni.getStorageSync("globalUser").id;
			this.$api.test('/user/changePassword', {id: id, mm: '666666'}).then((res)=>{
				console.log('请求结果 : ' + JSON.stringify(res))
			}).catch((err)=>{
				this.loading = false;
				console.log('request fail', err);
			})
		},
		methods:{
			searchMe(e) {
				console.log('searchMe');
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
