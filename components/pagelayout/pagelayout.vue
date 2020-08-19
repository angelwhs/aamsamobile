<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		props: {
			pagelayoutId: 0,
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
				
				this.$u.get('/api/cms/frontend/pagelayout/GetPageById', {
					id: this.pagelayoutId
				}).then(res => {
					console.log(res);
				});
			},
		}
	}
</script>

<style>
</style>
