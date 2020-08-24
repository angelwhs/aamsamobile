<template>
	<view class="u-flex article-box">
		<template v-if="article">
			<!--文章封面-->
			<view style="width: 200rpx; height: 200rpx;" class="u-flex">
				<template v-if="article.ImageThumb_PictureUrl && article.ImageThumb_PictureUrl != ''">
					<u-image width="160rpx" height="160rpx" :src="article.ImageThumb_PictureUrl"></u-image>
				</template>
			</view>
			<view class="u-flex-6">
				<!--文章标题-->
				<view class="article-title">
					<span>{{ article.Title }}</span>
				</view>
			
				<!--文章作者、时间-->
				<view class="article-author">
					<span>{{ getArticleAuthor(article) }}</span>
					
				</view>
				
				<!--评论数、点赞数-->
				<view class="article-comment-like">
					
				</view>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	props: {
		article: null
	},

	data() {
		return {};
	},

	methods: {
		getArticleAuthor(article) {
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
	}
};
</script>

<style scoped lang="scss">
	.article-box {
		
	}
	
	.article-title {
		
	}
	
	.article-author {
		
	}
	
	.article-comment-like {
		
	}
</style>
