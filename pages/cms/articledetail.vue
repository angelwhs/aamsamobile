<template>
	<view style="width: 100%;">
		<!--app bar-->
		<u-navbar back-text="返回"></u-navbar>

		<!--article loading-->
		<view class="article-loading" v-if="articleLoading">
			<u-row justify="center">
				<u-loading mode="circle" color="primary" size="40" :show="articleLoading"></u-loading>
			</u-row>
		</view>

		<!--文章正文-->
		<template v-if="!articleLoading && article">
			<view class="content">
				<view class="article-detail">
					<!--标题-->
					<view class="article-title">
						<u-row>{{article.Title}}</u-row>
					</view>

					<!--作者 创作时间-->
					<view class="article-author">
						<view class="u-flex">
							<!--头像-->
							<view style="width: 100rpx; height: 100rpx;" class="u-flex">
								<template v-if="article.HeadImgurl && article.HeadImgurl != ''">
									<u-avatar class="u-m-r-30" size="80" :src="article.HeadImgurl"></u-avatar>
								</template>
								<template v-else>
									<u-avatar class="u-m-r-30" bg-color="#fbb68f" size="72" :text="'王'"></u-avatar>
								</template>
							</view>
							<view class="u-flex-6">
								<view class="article-author-name"><span>{{article.CreateByName}}</span></view>
								<view class="article-author-time"><span>{{article.Created}}</span></view>
							</view>
						</view>
					</view>

					<!--文章标签-->
					<view>

					</view>

					<!--文章正文-->
					<view class="article-content">
						<u-parse :html="article.ArticleContent"></u-parse>
					</view>
				</view>


				<!--分隔线  厚一些-->
				<u-gap height="20" bg-color="#f5f5f5"></u-gap>

				<!--评论列表 & 点赞列表-->
				<view>
					<u-sticky>
						<u-tabs :name="tabConfig.name" :list="tabConfig.list" :is-scroll="tabConfig.isScroll" :current="tabConfig.current"
							@change="tabChange" active-color="#303133" inactive-color="#606266"></u-tabs>
					</u-sticky>
					
					<u-line color="#e4e7ed" />
					<!--评论列表-->
					<template v-if="tabConfig.current == 0">
						<template v-if="commentList && commentList.length > 0">
							
						</template>
						<template v-else>
							<u-empty class="u-m-t-60" :icon-size="60" text="暂无评论,等你来评论哟" mode="message"></u-empty>
						</template>
					</template>

					<!--点赞列表-->
					<template v-else-if="tabConfig.current == 1">
						<view v-if="likeList && likeList.length > 0">
							<u-cell-group>
								<template v-for="item in likeList">
									<u-cell-item :title="item.CreateByName" :label="item.Summary ? item.Summary : '暂无班级信息'" :arrow="false">
										<!--左边icon插槽重写-->
										<template v-if="item.HeadImgurl && item.HeadImgurl != ''">
											<u-avatar class="u-m-r-30" slot="icon" size="80" :src="item.HeadImgurl"></u-avatar>
										</template>
										<template v-else>
											<u-avatar class="u-m-r-30" bg-color="#fbb68f" slot="icon" size="72" :text="'王'"></u-avatar>
										</template>

										<!--右边icon插槽重新-->
										<u-icon class="u-m-r-30" slot="right-icon" name="thumb-up" size="48" label="赞" color="warning" @click="articleLike"></u-icon>
									</u-cell-item>
								</template>
							</u-cell-group>
						</view>
					</template>
				</view>

			</view>
		</template>

		<!--bottom bar-->
		<view class="bottombar ">
			<u-row gutter="16" justify="center" align="center">
				<!--快速评论-->
				<u-col span="6" text-align="center" class="bottombar-item bottombar-separate ">
					<u-icon name="chat" label="评论" size="40" @click="openComment"></u-icon>
				</u-col>

				<!--分享-->
				<u-col span="6" text-align="center" class="bottombar-item ">
					<template v-if="!myLike || myLike.Action != 1">
						<u-icon name="thumb-up" size="40" label="赞" @click="articleLike"></u-icon>
					</template>
					<template v-else-if="myLike && myLike.Action == 1">
						<u-icon name="thumb-up" size="40" label="赞" color="warning" @click="articleLike"></u-icon>
					</template>
				</u-col>

			</u-row>
		</view>

		<!--弹出评论窗体-->
		<u-popup v-model="commentDialog.show" mode="bottom">
			<view class="comment-dialog u-flex">
				<view style="width: 80%; height: 100rpx;" class="u-flex">
					<u-input placeholder="写评论..." :type="commentDialog.inputType" :border="true" :height="100" 
						:auto-height="true" :focus="commentDialog.show" style="background-color: #e4e7ed;" />
				</view>
				<view class="u-col-bottom u-m-l-30">
					<u-button size="medium" style="width: 30rpx; height: 60rpx; font-weight: 600; color:#ff9900">发送</u-button>
				</view>
			</view>
			
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: null,

				myLike: null,

				likeList: [],

				commentList: [],

				articleId: 0,

				articleLoading: false,

				tabConfig: {
					list: [{
							title: '评论',
							id: 1,
						},
						{
							title: '赞',
							id: 2,
						}
					],
					isScroll: false,
					current: 0,
					name: 'title',
				},
				
				commentDialog: {
					show: false,
					inputType: 'textarea',
				},
			}
		},

		onLoad(options) {
			//console.log(options);
			if (options && options.id && options.id > 0) {
				this.articleId = options.id;

				this.loadArticle();
				this.loadMyArticleLike();
				this.loadArticleCommentList();
			}
		},

		methods: {
			//加载文章
			loadArticle() {
				this.articleLoading = true;
				this.$u.get('/api/cms/frontend/article/GetArticleById', {
					id: this.articleId
				}).then(res => {
					//console.log(res);
					this.articleLoading = false;
					this.article = res;
				}).catch(error => {
					this.articleLoading = false;
				});
			},

			//加载文章点赞列表
			loadArticleLikeList() {
				this.likeList = [];
				this.$u.get('/api/cms/frontend/articlelike/List', {
					contentType: 1,
					contentId: this.articleId
				}).then(res => {
					console.log(res);
					if (res && res.Data && res.Data.length > 0) {
						this.likeList = res.Data;
					}
				});
			},

			//加载当前文章我的点赞
			loadMyArticleLike() {
				this.$u.get('/api/cms/frontend/articlelike/GetLike', {
					contentType: 1,
					contentId: this.articleId
				}).then(res => {
					//console.log(res);
					this.myLike = res;
				});
			},

			//加载文章评论列表
			loadArticleCommentList() {

			},

			tabChange(index) {
				this.tabConfig.current = index;

				//如果是赞列表 且赞列表无数据
				if (index == 1) {
					this.loadArticleLikeList();
				}

			},

			articleLike() {

				this.$u.get('/api/cms/frontend/articlelike/Like', {
					contentType: 1,
					contentId: this.articleId,
					likeType: this.myLike ? this.myLike.Action == 1 ? 2 : 1 : 1
				}).then(res => {
					this.myLike = res;
				});
			},

			openComment() {
				this.commentDialog.show = true;
			},

			commitComment() {

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

	.content {
		width: 100%;
	}

	.article-content {
		margin-top: 40rpx;
	}
	
	.article-detail {
		padding: 20rpx;
	}

	.article-title {
		font-size: 40rpx;
		font-weight: 600;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.article-author {
		
	}
	
	.article-author-name {
		font-size: 32rpx;
		font-weight: 600;
	}
	
	.article-author-time {
		font-size: 24rpx;
		margin-top: 0rpx;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.article-loading {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.comment-dialog {
		height: 160rpx;
		
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 6rpx;
		padding-bottom: 6rpx;
	}
</style>
