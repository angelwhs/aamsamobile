<template>
	<view style="width: 100%;">
		<u-swiper 
			:effect3d="swiperConfig.effect3d"
			@click="click"
			:indicator-pos="swiperConfig.indicatorPos"
			:mode="swiperConfig.mode"
			:interval="3000"
			:height="250"
			:list="swiperConfig.list"
		></u-swiper>
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

		subtitle: {
			type: String,
			default: ''
		},

		isshowsubtitle: {
			type: Boolean,
			default: false
		},

		isshowmore: {
			type: Boolean,
			default: false
		},

		moretext: {
			type: String,
			default: '更多'
		},

		morelinkurl: {
			type: String,
			default: ''
		},

		showcount: {
			type: Number,
			default: 3
		}
	},

	data() {
		return {
			swiperConfig: {
				title: false,
				mode: 'round',
				indicatorPos: 'bottomCenter',
				effect3d: true,
				list: this.items,
			}
		};
	},

	methods: {
		initControl() {
			if (!this.pagelayoutitem) return;
		},

		click(index) {
			if(this.items && this.items.length > 0) {
				let item = this.items[index];
				//console.log(item);
				if(item && item.article) {
					let article = item.article;
					if(!article.IsLink) {
						this.$u.route('/pages/cms/articledetail', {
							id: article.Id
						});
					} else {
						
					}
				}
			}
		}
	}

	// watch: {
	// 	items(val) {
	// 		console.log(val);
	// 		this.swiperConfig.list = [];

	// 	},
	// },
};
</script>

<style></style>
