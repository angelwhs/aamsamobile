<template>
	<view style="width: 100%;">
		<template v-if="contentsectionlist && contentsectionlist.length > 0">
			<template v-for="item in contentsectionlist">
				<template v-if="item.Articles && item.Articles.length > 0">
					<template v-if="item.ShowType === 1">
						<banner :items="getBannerList(item.Articles)"></banner>
					</template>
					<template v-else-if="item.ShowType === 2"></template>
					<template v-else-if="item.ShowType === 3"></template>
				</template>
			</template>
		</template>
	</view>
</template>

<script>
	//common
	import banner from "@/components/pagelayout/common/banner/banner.vue";
	import menu from "@/components/pagelayout/common/menu/menu.vue";
	
	//cms
	import articleList from "@/components/pagelayout/cms/articlelist/articlelist.vue";
	
	//alumniassociation
	import myClasses from "@/components/pagelayout/alumniassociation/myclasses/myclasses.vue";
	import applyActionList from "@/components/pagelayout/alumniassociation/applyactionlist/applyactionlist.vue";
	import homeStatistics from "@/components/pagelayout/alumniassociation/homestatistics/homestatistics.vue";
	
	//center
	import myInfo from "@/components/pagelayout/center/myinfo/myinfo.vue";
	
	export default {
		components: {
			banner,
		},
		props: {
			//栏目
			contentsectionlist: {
				type: Array,
				default: []
			},
		},
		
		data() {
			return {
				
			}
		},
		
		methods: {
			getContentSectionItemControl(itemtype) {
				switch(itemtype) {
					case 1:
						return '';
					
				}
			},
			
			getBannerList(articles) {
				let list = [];
				if(articles && articles.length > 0) {
						articles.forEach((v) => {
							let item = {
								image: v.ImageThumb_PictureUrl,
								title: v.Title,
							};
							
							list.push(item);
						});
				}
				console.log(list);
				return list;
			},
		}
	}
</script>

<style>
</style>
