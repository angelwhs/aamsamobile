<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录</view>
			<template v-if="isMobile">
				<u-field class="mobileinput" v-model="tel" icon="account" label-align="center" placeholder="请输入手机号" :field-style="mobileStyle"></u-field>
				<view class="tips">未注册的手机号验证后自动创建账号</view>
				<button @click="submit" :style="[inputStyle]" class="getCaptcha">获取短信验证码</button>
				<view class="alternative">
					<view class="password" @click="changeLoginType">密码登录</view>
					<view class="issue">遇到问题</view>
				</view>
			</template>
			<template v-else>
				<u-field class="accountinput" v-model="account" icon="account" label-align="center" placeholder="请输入手机号/邮箱/账号"
				 :disabled="accountLoginState == 1" :field-style="accountStyle"></u-field>
				<u-field class="accountinput" v-model="pwd" icon="lock" type="password" :disabled="accountLoginState == 1"
				 label-align="center" placeholder="请输入密码" :field-style="accountStyle"></u-field>
				<button @click="accountSubmit" :style="[accountInputStyle]" class="loginBtn" :disabled="accountLoginState == 1"
				 :loading="accountLoginState == 1">
					<template v-if="accountLoginState == 1">
						登录中...
					</template>
					<template v-else>
						登录
					</template>
				</button>
				<view class="alternative">
					<view class="password" @click="changeLoginType">手机号登录</view>
					<view class="issue">遇到问题</view>
				</view>
			</template>

		</view>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon">
						<u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon>
					</view>
					微信
				</view>
				<view class="QQ item">
					<view class="icon">
						<u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon>
					</view>
					QQ
				</view>
			</view>
			<view class="hint">
				登录代表同意
				<text class="link">用户协议、隐私政策，</text>
				并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				tel: '',
				accountStyle: {
					'font-size': '32rpx',
				},
				mobileStyle: {
					'font-size': '40rpx',
				},
				isMobile: true,

				account: '15911745623',
				pwd: '111111',

				accountLoginState: 2,
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.tel) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			},
			accountInputStyle() {
				let style = {};
				if (this.account && this.pwd) {
					if (this.accountLoginState == 2) {
						style.color = "#fff";
						style.backgroundColor = this.$u.color['success'];
					} else if (this.accountLoginState == 1) {

					}
				}
				return style;
			}
		},
		methods: {
			submit() {
				// if(this.$u.test.mobile(this.tel)) {
				// 	this.$u.route({
				// 		url: 'pages/login/code'
				// 	})
				// }

				this.$u.route({
					url: 'pages/login/code'
				})
			},

			accountSubmit() {
				if (this.account && this.pwd) {
					this.accountLoginState = 1;

					this.$u.post('/api/identity/login/GetJwtToken3', JSON.stringify({
						Account: this.account,
						Password: this.pwd
					})).then(res => {
						this.accountLoginState = 2;
						console.log(res);

						this.$u.vuex('vuex_token', res.Token);
						this.$u.vuex('vuex_user', res.User);

						this.$refs.uToast.show({
							title: '登录成功',
							type: 'success',
							url: 'pages/index/index',
							isTab: true,
							duration: 1000
						});
					}).catch(error => {
						this.accountLoginState = 2;
					});
				}
			},


			changeLoginType() {
				this.isMobile = !this.isMobile;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			.mobileinput {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.accountinput {
				text-align: left;
				margin-bottom: 20rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.loginBtn {
				background-color: #E7f7e8;
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;
				margin-top: 80rpx;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
