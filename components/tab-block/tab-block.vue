<template>
	<view>
		<view class="page-block tab-block">
			<Tab :modelData="tabList" @change="tabchange($event, activeTab)"></Tab>
			<view v-show="activeTab === 0" class="list-wrapper">
				<view class="list-item">
					<view class="list-item-tt over-text">批次号</view>
					<view class="list-item-td over-text">{{caseData.pch || ''}}</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">个案序列号</view>
					<view class="list-item-td over-text">{{caseData.gaxlh || ''}}</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">案件类型</view>
					<view class="list-item-td over-text">{{ajlx || ''}}</view>
				</view>
				<view class="list-item">
					<view class="list-item-tt over-text">新建时间</view>
					<view class="list-item-td over-text">{{caseData.drsj || ''}}</view>
				</view>
				
			</view>
			<view v-show="activeTab === 1" class="list-wrapper">
				<block v-for="(khxx, index) in caseData.khxx" :key="index">
					<view class="list-item" v-for="(value, key, khIndex) in khxx" :key="khIndex" v-if="key != 'id' && key != 'ajid' && key != 'xszt' && value!= null">
							<view class="list-item-tt">{{baseCaseJson[key]}}</view>
							<view class="list-item-td">{{value || ''}}</view>
					</view>
				</block>
			</view>
			<view v-show="activeTab === 2" class="list-wrapper">
				<block v-for="(csyxx, index) in caseData.csyxx" :key="index">
					<view class="list-item" v-for="(value, key, csyIndex) in csyxx" :key="csyIndex" v-if="key != 'id' && key != 'ajid' && key != 'xszt' && value!= null">
							<view class="list-item-tt">{{baseCaseJson[key]}}</view>
							<view class="list-item-td">{{value || ''}}</view>
					</view>
				</block>
			</view>
			<view v-show="activeTab === 3" class="list-wrapper">
				<block v-for="(dkxx, index) in caseData.dkxx" :key="index">
					<view class="list-item" v-for="(value, key, dkIndex) in dkxx" :key="dkIndex" v-if="key != 'id' && key != 'ajid' && key != 'xszt' && value!= null">
							<view class="list-item-tt">{{baseCaseJson[key]}}</view>
							<view class="list-item-td">{{value || ''}}</view>
					</view>
				</block>
			</view>
			<view v-show="activeTab === 4" class="list-wrapper">
				<block v-for="(dxxx, index) in caseData.dxxx" :key="index">
					<view class="list-item" v-for="(value, key, dxIndex) in dxxx" :key="dxIndex" v-if="key != 'id' && key != 'ajid' && key != 'xszt' && value!= null">
							<view class="list-item-tt">{{baseCaseJson[key]}}</view>
							<view class="list-item-td">{{value || ''}}</view>
					</view>
				</block>
			</view>
			<view v-show="activeTab === 5" class="list-wrapper">
				<block v-for="(wfxx, index) in caseData.wfxx" :key="index">
					<view class="list-item" v-for="(value, key, wfIndex) in wfxx" :key="wfIndex" v-if="key != 'id' && key != 'ajid' && key != 'xszt' && value!= null">
							<view class="list-item-tt">{{baseCaseJson[key]}}</view>
							<view class="list-item-td">{{value || ''}}</view>
					</view>
				</block>
			</view>
			<view v-show="activeTab === 6" class="list-wrapper">
				<block v-for="(arxx, index) in caseData.arxx" :key="index">
					<view class="list-item" v-for="(value, key, arIndex) in arxx" :key="arIndex" v-if="key != 'id' && key != 'ajid' && key != 'xszt' && value!= null">
							<view class="list-item-tt">{{baseCaseJson[key]}}</view>
							<view class="list-item-td">{{value || ''}}</view>
					</view>
				</block>
			</view>
			<view v-show="activeTab === 7" class="list-wrapper">
				<view v-for="(lxrxx, index) in caseData.lxrxx" :key="index" class="lxr-block">
					<view class="list-item" v-for="(value, key, lxrIndex) in lxrxx" :key="lxrIndex" v-if="key != 'id' && key != 'ajid' && key != 'xszt' && value!= null">
							<view class="list-item-tt">{{baseCaseJson[key]}}</view>
							<view class="list-item-td">{{value || ''}}</view>
					</view>
				</view>
			</view>
			<view v-show="activeTab === 8" class="list-wrapper">
				<block v-for="(qtxx, index) in caseData.qtxx" :key="index">
					<view class="list-item" v-for="(value, key, qxIndex) in qtxx" :key="qxIndex" v-if="key != 'id' && key != 'ajid' && key != 'xszt' && value!= null">
							<view class="list-item-tt">{{baseCaseJson[key]}}</view>
							<view class="list-item-td">{{value || ''}}</view>
					</view>
				</block>
			</view>
			<view v-show="activeTab === 9" class="list-wrapper">
				<view v-for="(bzxx, index) in caseData.bzxx" :key="index" class="lxr-block">
					<view class="list-item" v-for="(value, key, bzIndex) in bzxx" :key="bzIndex" v-if="key != 'id' && key != 'ajid' && key != 'xszt' && value!= null">
							<view class="list-item-tt">{{baseCaseJson[key]}}</view>
							<view class="list-item-td">{{value || ''}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import baseCaseJson from '../../common/baseCaseJson.js'
	import Tab from '../../components/stzhang-tab/stzhang-tab'
	export default {
		props:['caseId'],
		components: {
			Tab
		},
		data() {
			return {
				tabList: [
					{label:"基本信息"},
					{label:"卡号信息"},
					{label:"催收员信息"},
					{label:"贷款信息"},
					{label:"对象信息"},
					{label:"外访信息"},
					{label:"案人信息"},
					{label:"联系人信息"},
					{label:"其他信息"},
					{label:"备注信息"},
				],
				caseData: {},
				activeTab: 0,
				baseCaseJson: baseCaseJson,
				ajlx: '',
				ajlxArr: []
			};
		},
		onLoad(params) {
			this.$api.post('/dict/findDictListByZddm', {zddm: 'D_SYS_AJLXDM', zxbz: 0}).then((res)=>{
				if(res.resCode == 200) {
					this.ajlxArr = res.data;
				}else {
					uni.showToast({
						title: res.resMsg,
						icon: 'none'
					})
				}
				this.getCaseData();
			}).catch((err)=>{
				console.log('request fail', err);
			})
		},
		methods: {
			getCaseData() {
				this.$api.post('/casebase/findAllInfoById', {id: this.caseId}).then((res)=>{
					if(res.resCode == 200) {
						this.caseData = res.data;
						this.ajlx = this.$util.parseJSON(this.caseData.ajlx, this.ajlxArr)
					}else {
						uni.showToast({
							title: res.resMsg,
							icon: 'none'
						})
					}
				}).catch((err)=>{
					console.log('request fail', err);
				})
			},
			tabchange(activeTab, e) {
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
	.lxr-block:not(:first-of-type) {
		border-top: 1px dashed #eee;
	}
	
</style>
