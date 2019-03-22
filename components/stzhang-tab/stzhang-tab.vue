<template>
	<view :class="{'my-tabs':true,'space-between':formatBe}">
		<view  v-for="(item,index) in getModelData" :key="index" :class="{'tab-item':true,'active':activeIndex==index}" @tap="tap(index)">
			{{item.label}}
		</view>
	</view>
</template>

<script>
	export default {
		props:['modelData','initIndex'],
		data() {
			return {
				defaultInfo:{
					data:[
						{label:"基本信息"},
						{label:"工作信息",},
						{label:"联系人信息"},
						{label:"贷款信息"},
						{label:"逾期信息"}
					],
				},
				activeIndex:0,//默认索引
			}
		},
		computed:{
			getModelData(){
				return this.modelData||this.defaultInfo.data
			},
			formatBe(){
				return this.modelData
						?this.modelData.length>4?true:false
						:false
			}
		},
		onLoad() {
			console.log(this.modelData)
		},
		methods: {
			tap(index){
				if(index !== this.activeIndex) {
					this.$emit("change",index);
					this.activeIndex=index;
				}
			},
			/**
			 * @name 初始化activeIndex
			 */
			initActive(){
				this.activeIndex=this.initIndex||this.activeIndex
			}
		},
		created() {
			this.initActive()
		},
	}
</script>
<style lang='scss'>
	.my-tabs::-webkit-scrollbar {
        display: none;
    }
	.my-tabs {
		height: 98upx;
		font-size: 16px;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		box-sizing: border-box;
		/* border-top: 2upx solid #dddddd; */
		border-bottom: 2upx solid #dddddd;
		min-width: 100%;
		overflow-x: auto;
		
		.tab-item{
			color: #555;
			line-height: 58upx;
			padding: 20upx;
			/* min-width: 100upx; */
			white-space: nowrap;
			text-align: center;
			margin: 0 10upx;
		}
		.tab-item.active{
			position: relative;
			color: #333;
			font-weight: bold;
		}
		.tab-item.active::after{
			content: "";
			position: absolute;
			bottom: 0;
			left:50%;
			transform: translateX(-50%);
			width: 100%;
			border-bottom: 4upx solid #00C674;
			animation: test ease 1 1.5s;
		}
	}
	.my-tabs.space-between{
		justify-content: space-between;
	}
	@keyframes test{
		0%{width: 100%}
		50%{width: 150%}
		100%{width: 100%}
	}
</style>
