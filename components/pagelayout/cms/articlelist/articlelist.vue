<template>
	<view class="article-list u-card-wrap" style="width: 100%;">
		<template v-if="contentsection">
			<!--标题部分-->
			<template v-if="contentsection.IsShowTitle || contentsection.IsShowMoreButton">
				<u-section class="article-list-contentsection-title" 
				font-size="30" 
				:title="contentsection.IsShowTitle ? contentsection.Title : ''"
				:sub-title="contentsection.IsShowMoreButton ? '更多' : ''"></u-section>
			</template>
			
			<!--文章列表部分-->
			<view class="article-list-box" v-if="contentsection.Articles && contentsection.Articles.length > 0">
				<template v-for="article in contentsection.Articles">
					<template v-if="contentsection.ShowType == 62">
						<article-with-author :aritlce="article"></article-with-author>
					</template>
					<template v-else-if="contentsection.ShowType == 63">
						<article-with-detail :article="article"></article-with-detail>
					</template>
				</template>
			</view>
		</template>
	</view>
</template>

<script>
	import articleWithAuthor from "@/components/pagelayout/cms/articlelist/articlewithauthor.vue";
	import articleWithDetail from "@/components/pagelayout/cms/articlelist/articlewithdetail.vue";
	
	export default {
		components: {
			articleWithAuthor,
			articleWithDetail
		},
		
		props: {
			contentsection: null,
		},
		
		data() {
			return {
			}
		},
		
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.article-list {
		width: 100%;
		padding: 20rpx;
	}
	
	.article-list-contentsection-title {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.article-list-box {
		width: 100%;
	}
	
	.u-card-wrap {
		background-color: $u-bg-color;
	}
</style>
