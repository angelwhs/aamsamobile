<template>
	<view>
		<template v-if="contentsectionlist && contentsectionlist.length > 0">
			<template v-for="item in contentsectionlist">
				<template v-if="item.ShowType === 1">
					<banner :items="item.Articles"></banner>
				</template>
				<template v-else-if="item.ShowType === 2"></template>
				<template v-else-if="item.ShowType === 3"></template>
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
			contentsectionlist: [],
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
			}
		}
	}
</script>

<style>
</style>
