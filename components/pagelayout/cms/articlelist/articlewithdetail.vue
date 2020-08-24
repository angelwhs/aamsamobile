<template>
		<u-card class="article-box u-m-0 u-m-t-16" :show-head="false" padding="20" box-shadow="2" @click="click(article)"
			:foot-style="sectionConfig.footStyle">
			<view class="u-flex" slot="body">
				<template v-if="article">
					<!--文章封面-->
					<view style="width: 240rpx; height: 200rpx;" class="u-flex">
						<template v-if="article.ImageThumb_PictureUrl && article.ImageThumb_PictureUrl != ''">
							<u-image width="200rpx" height="160rpx" mode="aspectFill" :src="article.ImageThumb_PictureUrl"></u-image>
						</template>
					</view>
					<view class="u-flex-6">
						<!--文章标题-->
						<view class="article-title">
							<span>{{ article.Title }}</span>
						</view>
					
						<!--文章简介-->
						<view class="u-line-2 article-summary">
							<span>{{ article.Summary }}</span>
						</view>
						
						<!--文章作者、时间-->
						<view class="article-author">
							<span>{{ getArticleAuthor(article) }}</span>
							<span>{{ article.Created }}</span>
						</view>
						
						<!--评论数、点赞数-->
						<view class="u-flex article-comment-like">
							<view >{{article.CommentCount}}</view>
							<view >{{article.LikeCount}}</view>
						</view>
					</view>
				</template>
			</view>
			
			<view class="u-flex" slot="foot">
				<view class="u-flex-6 u-row-center u-text-center">
					<u-icon name="chat-fill" size="28" label-size="24" color="" :label="article.CommentCount"></u-icon>
				</view>
				<view class="u-flex-6 u-row-center u-text-center">
					<u-icon name="thumb-up" size="28" label-size="24" color="" :label="article.LikeCount"></u-icon>
				</view>
			</view>
			
		</u-card>
</template>

<script>
export default {
	props: {
		article: null
	},

	data() {
		return {
			sectionConfig: {
				footStyle: {
					'font-size': '24rpx',
				},
			},
		};
	},

	onShow() {
		//console.log(this.articledata);
	},

	methods: {
		getArticleAuthor(article) {
			//console.log(this.articledata);
			//console.log(article);
			let res = '';
			if(article) {
				if(article.Author && article.Author != '') {
					res = article.Author;
				} else {
					if(article.CreateByName && article.CreateByName != '') {
						res = article.CreateByName;
					} else {
						res = '小编';
					}
				}
			}
			return res;
		},
		
		click(article) {
			if(article) {
				if(!article.IsLink) {
					this.$u.route('/pages/cms/articledetail', {
						id: article.Id
					});
				} else {
					
				}
			}
		},
	}
};
</script>

<style scoped lang="scss">
	.article-box {
		width: 100%;
		height: 100%;
	}
	
	.article-author {
		font-size: 24rpx;
		color: #909399;
		margin-top: 8rpx;
	}
	
	.article-title {
		font-size: 30rpx;
		font-weight: 600;
	}
	
	.article-summary {
		font-size: 26rpx;
		color: #606266;
		margin-top: 8rpx;
	}
</style>
