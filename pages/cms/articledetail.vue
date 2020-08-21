<template>
	<view style="width: 100%;">
		<!--app bar-->
		<u-navbar back-text="返回"></u-navbar>
		
		<!--文章正文-->
		<view class="article-content">
			<!--标题-->
			
			
			<!--作者 创作时间-->
			
			
			<!--文章标签-->
			
			
			<!--文章正文-->
			
			
			<!--分隔线  厚一些-->
			<u-gap height="20" bg-color="#bbb"></u-gap>
			
			<!--评论列表-->
			
		</view>
		
		
		<!--bottom bar-->
		<view class="bottombar ">
			<u-row gutter="16" justify="center" align="center">
				<!--快速评论-->
				<u-col span="6" text-align="center" class="bottombar-item bottombar-separate ">
					<u-icon name="chat" label="评论" size="40" ></u-icon>
				</u-col>
				
				<!--分享-->
				<u-col span="6" text-align="center" class="bottombar-item ">
					<u-icon name="thumb-up" size="40" label="赞"></u-icon>
				</u-col>
				
			</u-row>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: null,
			}
		},
		methods: {
			loadArticle() {
				
			},
		}
	}
</script>

<style scoped lang="scss">
	.bottombar {
		height: 80rpx;
		width: 100%;
		background-color: #EEEEEE;
		position: fixed;
		left: 0px;
		bottom: 0px;
		z-index: 9999;
		padding: 20rpx;
		
		border-top-style: solid;
		border-color: #C0C4CC;
		border-width: 1rpx;
	}
	
	.bottombar-item {
		height: 40rpx;
		width: 100%;
	}
	
	.bottombar-separate {
		border-right-style: solid;
		border-color: #C0C4CC;
		border-width: 1rpx;
		
	}
	
	.article-content {
		width: 100%;
		height: 2000rpx;
	}
	
	.bg-purple {
			background: #d3dce6;
	}
</style>
