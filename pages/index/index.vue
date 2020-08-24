<template>
	<view class="content">
		<!--搜索框-->
		
		<!--loading-->
		<view class="div-loading " v-if="pageLoading">
			<u-row justify="center">
				<u-loading mode="circle" color="primary" size="40" :show="pageLoading"></u-loading>
			</u-row>
		</view>
		
		<!--如果有PageLayout数据-->
		<template v-if="pageLayout">
			<page-layout-control :pagelayout="pageLayout"></page-layout-control>
		</template>
		
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">
				uView - 多平台快速开发的UI框架
			</text>
		</view>
		<view class="button-demo">
			<u-button :ripple="true" @click="test">测试按钮</u-button>
		</view>
		<view class="button-demo">
			<u-button :ripple="true" @click="gotoArticle">跳转文章</u-button>
		</view>
		<view class="button-demo">
			<u-button :ripple="true" @click="gotoLogin">登录界面</u-button>
		</view>
		<u-tabbar :list="vuex_tabbar" :mid-button="false" @change="change" ></u-tabbar>
	</view>
</template>

<script>
	import pageLayoutControl from "@/components/pagelayout/pagelayoutcontrol.vue";
	
	export default {
		components: {
			pageLayoutControl,
		},
		data() {
			return {
				title: 'Hello',
				
				pageLoading: false,
				
				pageLayout: null,
			}
		},
		
		//监听页面加载
		onLoad() {

		},
		
		//监听页面初次渲染完成
		onReady() {
			this.initPage();
		},
		
		onShow() {
		},
		
		computed:{
			
		},
		
		methods: {
			gotoLogin() {
				this.$u.route('/pages/login/index');
			},
			
			change(index) {
				console.log('tabbar changed: ' + index);
			},
			
			initPage() {
				let pagename = 'homepage';
				
				this.pageLoading = true;
				let pagelayout = this.$store.getters.getPagelayoutByPageName('homepage', true);
				//console.log(pagelayout);
				if(!pagelayout) {
					this.$store.dispatch('loadPageLayoutData', pagename).then(res => {
						//console.log(res.pagelayout);
						this.pageLayout = res.pagelayout;
						this.pageLoading = false;
					});
				} else {
					this.pageLayout = pagelayout.pagelayout;
					this.pageLoading = false;
				}
				
				//this.pageLoading = false;
			},
			
			gotoArticle() {
				this.$u.route('/pages/cms/articledetail', {
					id: 1
				});
			},
			
			test() {
				this.$u.get('/api/cms/frontend/articlelike/Like', {
					contentType: 1,
					contentId: 1,
					likeType: 1
				}).then(res => {
					console.log(res);
				});
			},
			
		},
		
		watch: {
			
		}, 
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.title {
		font-size: 28rpx;
		color: $u-content-color;
	}
	
	.button-demo {
		margin-top: 80rpx;
	}
	
	.link-demo {
		margin-top: 80rpx;
	}
	
	.div-loading {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
</style>
