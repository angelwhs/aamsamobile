<template>
	<view style="width: 100%;">
		<u-grid class="grid-box" :col="4" :border="false">
			<template v-for="item in items">
				<u-grid-item>
					<u-image :src="item.ImageThumb_PictureUrl" width="96" height="96"></u-image>
					<view class="grid-text">{{item.Title}}</view>
				</u-grid-item>
			</template>
		</u-grid>
	</view>
</template>

<script>
	export default {
		props: {
			/*
			items: [
				{
					Title: '', //标题
					SubTitle: '', //副标题
					ImageThumb_PictureUrl: '', //图片
					Summary: '', //介绍
					Author: '', //作者
					HeadImgurl: '', //作者头像
					Created: '', //时间
					LinkUrl: '', //跳转页面
					IsLink: false, //是否外链
					ArticleTags: [] //标签列表
					ReadCount: 0,
					CommentCount: 0,
					LikeCount: 0,
					ShareCount: 0,
					AllowComments: false,
					AllowLike: false,
				}
			]
			*/
			items: {
				type: Array,
				default: []
			},
			
			title: {
				type: String,
				default: ''
			},
			
			isshowtitle: {
				type: Boolean,
				default: false
			},
			
			showcount: {
				type: Number,
				default: 3,
			},
		},
		
		data() {
			return {
				
			}
		},
		
		onShow() {
			console.log('menu ready');
		},
		
		methods: {
			initControl() {
				if(!this.pagelayoutitem) 
					return;
					
				
			},
			
			click(index) {
				
			},
		}
	}
</script>

<style scoped lang="scss">
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
	
	.grid-box {
		height: 180rpx;
		width: 100%;
	}
</style>
