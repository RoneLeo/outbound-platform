<template>
	<view class="page">
		<view class="search-block">
			
			<view class="search-ico-wapper">
				<image src="../../static/icon/search.png" class="search-ico"></image>
			</view>
			
			<input 
				placeholder="搜索案件" 
				maxlength="10" 
				class="search-text" 
				confirm-type="search"
				@confirm="searchMe"
			/>
			
		</view>
		<view class="page-block index-head">
			<!-- <swiper></swiper> -->
			<image src="../../static/indexPng/bg.jpeg" class="header-img"></image>
		</view>
		<view class="page-block cases-wraper">
			<view class="cases-item">
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
	</view>
</template>

<script>
	import Swiper from '../../components/jing-swiper/jing-swiper.vue'
	export default {
		components:{
			Swiper
		},
		data: {
			
		},
		methods:{
			searchMe(e) {
// 				var me = this;
// 				// 获取搜索的内容
// 				var value = e.detail.value;
// 				me.keywords = value;
// 				me.trailerList = [];
// 				
// 				me.pagedTrailerList(value, 1, 15);
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
