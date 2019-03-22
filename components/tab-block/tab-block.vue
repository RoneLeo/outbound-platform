<template>
	<view>
		<view class="page-block tab-block">
			<Tab :modelData="tabList" @change="tabchange($event, activeTab)"></Tab>
			<view v-show="activeTab === 0" class="list-wrapper">
				<view class="list-item">
					<view class="list-item-tt over-text">曾用名</view>
					<view class="list-item-td over-text">哈哈哈</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">工作</view>
					<view class="list-item-td over-text">无</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">是否婚嫁</view>
					<view class="list-item-td over-text">是</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">现居住地</view>
					<view class="list-item-td over-text">天南地北天南地北天南地北天南地北</view>
				</view>
			</view>
			<view v-show="activeTab === 1" class="list-wrapper">
				<view class="list-item">
					<view class="list-item-tt over-text">公司名称</view>
					<view class="list-item-td over-text">娃哈哈有限公司</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">公司地址</view>
					<view class="list-item-td over-text">天涯海角天涯海角天涯海角天涯海角天涯海角天涯海角天涯海角天涯海角天涯海角</view>
				</view>
			</view>
			<view v-show="activeTab === 2" class="list-wrapper">
				<view class="list-item">
					<view class="list-item-tt over-text">联系人姓名</view>
					<view class="list-item-td over-text">二狗</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">联系人电话</view>
					<view class="list-item-td over-text">00000333444</view>
				</view>
			</view>
			<view v-show="activeTab === 3" class="list-wrapper">
				<view class="list-item">
					<view class="list-item-tt over-text">贷款时间</view>
					<view class="list-item-td over-text">2013年09月23日</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">贷款到期时间</view>
					<view class="list-item-td over-text">2018年09月23日</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">贷款利息</view>
					<view class="list-item-td over-text">0.009</view>
				</view>
			</view>
			<view v-show="activeTab === 4" class="list-wrapper">
				<view class="list-item">
					<view class="list-item-tt over-text">逾期天数</view>
					<view class="list-item-td over-text">379</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">逾期总额</view>
					<view class="list-item-td over-text">100989.00</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">最近还款时间</view>
					<view class="list-item-td over-text">2018年03月23日</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Tab from '../../components/stzhang-tab/stzhang-tab'
	export default {
		components: {
			Tab
		},
		data() {
			return {
				tabList: [
					{label:"基本信息"},
					{label:"工作信息",},
					{label:"联系人信息"},
					{label:"贷款信息"},
					{label:"逾期信息"}
				],
				activeTab: 0
			};
		},
		onLoad(params) {},
		methods: {
			tabchange(activeTab, e) {
				console.log(activeTab)
				this.activeTab = activeTab;
			}
		}
	}
</script>

<style lang="scss">
	.tab-block {
		margin-top: 20upx;
	}
	
	.list-wrapper {
		padding: 0 20upx;
	}
	
</style>
