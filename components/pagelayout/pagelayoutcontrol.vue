<template>
	<view style="width: 100%;">
		<template v-if="pagelayout">
			<template v-if="pagelayout.ContentSection && pagelayout.ContentSection.Childs && pagelayout.ContentSection.Childs.length > 0">
				<content-section-control :contentsectionlist="pagelayout.ContentSection.Childs"></content-section-control>
			</template>
		</template>
	</view>
</template>

<script>
	import contentSectionControl from "@/components/pagelayout/common/control/contentsectioncontrol.vue";
	
	export default {
		components: {
			contentSectionControl,
		},
		props: {
			pagelayout: null,
		},
		
		data() {
			return {
				pageLayoutModel: null,
				
				
			}
		},
		methods: {
			
			//初始化页面
			initPage() {
				if(this.pagelayoutId <= 0)
					return;
				
				
			},
		},
		
		watch: {
			
		},
	}
</script>

<style>
</style>
