<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			
			//
			//this.$store.dispatch('loadTabbarList');
		},
		onShow: function() {
			console.log('App Show')
			
			this.$store.dispatch('loadTabbarList');
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
