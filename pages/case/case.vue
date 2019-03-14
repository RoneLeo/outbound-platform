<template>
	<view class="page">
		<view class="cicle-toolbar" @tap="toolBarShowChange">
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;">
				我要
			</view>
			<view style="font-size: 12px;font-weight: 300;color: #FFFFFF;"> 
				认领
			</view>
		</view>
		
		<view class="page-block case-head">
			<view class="basic-info">
				<view class="head-img-wrapper">
					<image src="../../static/icon/man.png" class="head-img"></image>
				</view>
				<view class="head-info">
					<view class="info-data info-title">
						<view class="info-name">张三</view>
						<view class="info-age">37岁</view>
						<view class="info-addr">四川省成都市</view>
					</view>
					<view class="info-data over-text">
						委案到期日：2019-03-14
					</view>
					<view class="info-data over-text">
						身份证号：511922177408299999
					</view>
					<!-- <view class="info-data">
						<view></view>
						<view></view>
					</view> -->
				</view>
			</view>
			<view class="data-wrapper">
				<view class="data-item">
					<view class="data-name">逾期金额</view>
					<view class="data-num">12345.6元</view>
				</view>
				<view class="data-item">
					<view class="data-name">已还金额</view>
					<view class="data-num">12.6元</view>
				</view>
				<view class="data-item">
					<view class="data-name">逾期天数</view>
					<view class="data-num">123天</view>
				</view>
			</view>
			<view class="case-staus">
				￥233.0
			</view>
		</view>
		<view class="page-block other-info">
			<Tab @change="tabchange($event,Defined)"></Tab>
			<view class="list-wrapper">
				<view class="list-item">
					<view class="list-item-tt over-text">电话号</view>
					<view class="list-item-td over-text">18977889900</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">详细地址详细</view>
					<view class="list-item-td over-text">四川省成都市武侯区青羊区金牛区天府新区</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">电话号</view>
					<view class="list-item-td over-text">18977889900</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">详细地址详细</view>
					<view class="list-item-td over-text">四川省成都市武侯区青羊区金牛区天府新区</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">电话号</view>
					<view class="list-item-td over-text">18977889900</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">详细地址详细</view>
					<view class="list-item-td over-text">四川省成都市武侯区青羊区金牛区天府新区</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">电话号</view>
					<view class="list-item-td over-text">18977889900</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">详细地址详细</view>
					<view class="list-item-td over-text">四川省成都市武侯区青羊区金牛区天府新区</view>
				</view>
			</view>
		</view>
		<view class="block-title">
			外访说明
		</view>
		<view class="page-block task-info">
			<view class="task-list">
				<view class="list-item">
					<view class="list-item-tt over-text">外访方式</view>
					<view class="list-item-td over-text">确认案件对象信息完整</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">外访地址</view>
					<view class="list-item-td">四川省成都市武侯区科华路哈哈小区7栋2单元304</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">外访说明</view>
					<view class="list-item-td">到地址后仔细询问相关信息，并且记录下俩</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Tab from '../../components/stzhang-tab/stzhang-tab'
	export default {
		components:{
			Tab
		},
		data() {
			return {
				toolbarShow: false
			};
		},
		onLoad(params) {
			console.log(params, params.caseId)
		},
		methods:{
			tabchange(index, e) {
				console.log(index)
			},
			toolBarShowChange() {
				this.toolbarShow = !this.toolbarShow
			}
		}
	}
</script>
	
<style>
	@import url("./case.css");
</style>
