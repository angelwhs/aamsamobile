<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">
				uView - 多平台快速开发的UI框架
			</text>
		</view>
		<view class="button-demo">
			<u-button :ripple="true">按钮组件演示</u-button>
		</view>
		<view class="button-demo">
			<u-button :ripple="true" @click="gotoLogin">登录界面</u-button>
		</view>
		<u-tabbar :list="vuex_tabbar" :mid-button="false" @change="change"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			gotoLogin() {
				this.$u.route('/pages/login/index');
			},
			
			change(index) {
				console.log('tabbar changed: ' + index);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.title {
		font-size: 28rpx;
		color: $u-content-color;
	}
	
	.button-demo {
		margin-top: 80rpx;
	}
	
	.link-demo {
		margin-top: 80rpx;
	}
</style>
