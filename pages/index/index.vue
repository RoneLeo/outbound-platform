<template>
	<view class="page">
		<view v-show="isNull" class="null-box" >
			<view class="null-wrapper">
				<image src="../../static/icon/null.png" class="null-ico"></image>
				<text class="null-txt">还没有任务哦</text>
			</view>
		</view>
		<view class="page-block index-head">
			<Swiper></Swiper>
			<view class="search-block">
				<view class="search-ico-wapper">
					<image src="../../static/icon/search1.png" class="search-ico"></image>
				</view>
				<input 
					placeholder="搜索任务" 
					maxlength="10" 
					class="search-text" 
					confirm-type="完成"
					v-model="searchInput"
					@confirm="searchMe"
				/>
			</view>
		</view>
		
		<view class="page-block cases-wraper">
			<view class="cases-item no-border">
				<view class="appoint-case"></view>
				<view class="case-txt case-id case-title">
					任务名称
				</view>
				<view class="case-txt case-name case-title">
					任务方式
				</view>
				<view class="case-txt case-status case-title">
					任务佣金
				</view>
				<view class="case-txt case-date case-title">
					截止时间
				</view>
			</view>
		</view>
		<view class="page-block">
			
			<block v-for="(task, index) in data" :key="index">
				<navigator open-type="navigate" :url="'/pages/case/case?caseId='+task.ajid + '&taskId=' + task.id + '&rwyj=' + task.rwyj">
					<view class="cases-item" >
						<image v-show="task.rwzt==2" src="../../static/icon/zhi.png" class="appoint-case"></image>
						<view v-show="task.rwzt!=2" class="appoint-case"></view>
						<view class="case-txt case-id">
							{{task.rwmc}}
						</view>
						<view class="case-txt case-name">
							{{rwfsJson[task.rwfs]}}
						</view>
						<view class="case-txt case-status">
							¥{{task.rwyj}}
						</view>
						<view class="case-txt case-date">
							{{task.jzrq}}
						</view>
					</view>
				</navigator>
			</block>
		</view>
	
		<view class="page-end" v-show="isEnd">
			<view class="end-txt">{{currentPage}}/{{totalPage}}</view>
		</view>
	</view>
</template>

<script>
	import Swiper from '../../components/swiper/swiper.vue'
	const size = 6;
	export default {
		components: {
			Swiper
		},
		data() {
			return {
				currentPage: 1,
				pageSize: size,
				totalPage: 1,
				data: [],
				rwfsJson: {},
				user: {},
				isEnd: true,
				searchInput: '',
				isNull: false
			}
		},
		onLoad() {
			this.user = this.getGlobalUser() != null ? this.getGlobalUser(): {};
			this.$api.post('/dict/findDictListByZddm', {zddm: 'D_SYS_RWFSDM', zxbz: 0}).then((res)=>{
				let data = res.data;
				this.rwfsJson = {};
				data.forEach(item => {
					this.rwfsJson[item.ctdm] = item.ctmc;
				})
				this.getTaskData(this.currentPage, this.pageSize)
			}).catch((err)=>{
				console.log('request fail', err);
			})
		},
		onShow() {
			this.user = this.getGlobalUser() != null ? this.getGlobalUser(): {};
			this.getTaskData(this.currentPage, this.pageSize)
		},
// 		onPullDownRefresh() {
// 			console.log('上一页')
// 			// this.isEnd = false;
// 			if(this.currentPage > 1) {// 查询上一页面
// 				this.currentPage --;
// 			}else {
// 				return
// 			}
// 			this.refresh();
// 		},
		onReachBottom() {
			console.log('下一页');
						// 查询下一页面，当前页数累加1
			if (this.currentPage < this.totalPage) {
				this.currentPage ++;
				this.getTaskData(this.currentPage, this.pageSize);
			}
		},
		methods:{
			getTaskData(page, pagesize) {
				this.isNull = false;
				this.$api.post('/task/findAllByYwyqy', {page: page, pagesize: pagesize, ywyid: this.user.id}).then((res)=>{
					this.data = res.data;
					this.totalPage = res.totalpage;
					if(this.totalPage == 0) {
						this.isEnd = false;
						this.isNull = true;
					}
					this.data.forEach(item => {
						item.jzrq = item.rwjzsj.substring(0, 11)
					})
				}).catch((err)=>{
					console.log('request fail', err);
				})
			},
// 			refresh() {
// 				uni.showNavigationBarLoading();
// 				this.$api.post('/task/findAllByYwyqy', {page: this.currentPage, pagesize: this.pageSize, ywyid: this.user.id}).then((res)=>{
// 					this.data = res.data;
// 					this.totalPage = res.totalpage;
// 					if(this.totalPage == 0) {
// 						this.isEnd = false;
// 					}
// 					this.data.forEach(item => {
// 						item.jzrq = item.rwjzsj.substring(0, 11)
// 					})
// 					uni.hideNavigationBarLoading();
// 					uni.stopPullDownRefresh();
// 					console.log('refresh done')
// 				}).catch((err)=>{
// 					console.log('request fail', err);
// 				})
// 			},
			searchMe(e) {
				this.currentPage = 1;
				this.pageSize = size;
				// this.isEnd = false;
				this.$api.post('/task/findAllByYwyqyAndCondition', {page: this.currentPage, pagesize: this.pageSize, ywyid: this.user.id, param: this.searchInput}).then(res => {
					this.data = res.data;
					this.totalPage = res.totalpage;
					if(this.totalPage == 0) {
						this.isEnd = false;
						this.isNull = true;
					}
					this.data.forEach(item => {
						item.jzrq = item.rwjzsj.substring(0, 11)
					})
				})
			}
		}
	}
</script>

<style>
	@import url("./index.css");
</style>
