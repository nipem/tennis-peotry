<template>
	<view class="content">
		<t-header bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">索引</block>
		</t-header>
        <image class="logo" :src="userInfo.avatarUrl ? userInfo.avatarUrl : '../../static/logo.png'"></image>
		<view>
            <text class="title">{{title}}</text>
        </view>
		<view>
			<text class="icon icon-user"></text>
			<text>{{userInfo.nickName}}</text>
		</view>

		<button @click="gopage">
			go webview
		</button>

		<button v-if="!isAuthorized" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>

		<t-footer :tabbars="tabbars" :active="activeTabbar" @on-change="onNavChange"></t-footer>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer, { Tabbar } from '@/components/Footer.vue';

@Component({
	components: {
		't-header': Header,
		't-footer': Footer,
	},
})
export default class Index extends Vue {
	title = 'Hello World';
	activeTabbar = 0;
	isAuthorized = false;
	userInfo: any = {};

	gopage() {
		uni.navigateTo({
			url: '/pages/webview/index'
		})
	}

	tabbars: Tabbar[] = [
		{
			iconClass: 'cuIcon-home',
			iconActiveClass: 'cuIcon-homefill text-green',
			titleClass: 'text-gray',
			titleActiveClass: 'text-green',
			title: '首页',
			path: '/',
		},
		{
			iconClass: 'cuIcon-people',
			iconActiveClass: 'cuIcon-peoplefill text-green',
			titleClass: 'text-gray',
			titleActiveClass: 'text-green',
			title: '我的',
			path: '/',
		}
	]

	WXgetUserInfo() {
		wx.getUserInfo({
			withCredentials: true,
			success: (res: any) => {
				console.log(res);
				this.isAuthorized = true;
				this.userInfo = res.userInfo;
			},
			fail: () => {
				// 需要用户点击页面的按钮触发授权，才可以获取用户信息。
				console.log('需要用户点击页面的按钮触发授权，才可以获取用户信息。');
			}
		})
	}

	getUserPhone() {
		wx.login({
			success: (res: any) => {
				const { code } = res;
				if (code) {
					// 获取用户信息
					wx.getUserInfo({
						withCredentials: true, // encryptedData, iv 等敏感信息
						success: (res: any) => {
							const { encryptedData, iv } = res;
							console.log(encryptedData, iv);
							// todo: 将 encryptedData, iv 和 code 传递到开发者服务器，获取用户手机号等信息
						},
						fail: (e: any) => {
							// 需要用户点击页面的按钮触发授权，才可以获取用户信息。
							wx.showToast({
								title: '请先登录！',
								icon: 'none',
								duration: 2000
							})
						}
					})
				} else {
					console.log('登录失败！' + res.errMsg)
				}
			}
		})
	}

	login() {
		wx.checkSession({
			success: () => {
				//session_key 未过期，并且在本生命周期一直有效
				this.WXgetUserInfo();
			},
			fail: (e: any) => {
				// session_key 已经失效，需要重新执行登录流程
				wx.login({
					success: (res: any) => {
						if (res.code) {
							console.log('登录成功！' + res.code)

							// 获取用户信息
							this.WXgetUserInfo();
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			}
		})
	}

	onLoad() {
		this.login();
	}

	onNavChange(tabbar: Tabbar, index: number) {
		this.activeTabbar = index;
		console.log(tabbar);
	}

	getUserInfo (e: any) {
		const data = e.detail;
		if (data.userInfo) {
			wx.showToast({
				title: '登录成功',
				duration: 2000
			})
			console.log(data);
			this.isAuthorized = true;
			this.userInfo = data.userInfo;
		} else {
			wx.showToast({
				title: '授权失败',
				icon: 'none',
				duration: 2000
			})
		}
	}
}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
