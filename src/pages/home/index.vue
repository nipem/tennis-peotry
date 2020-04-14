<template>
	<view>
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>

		<tp-navtab
			container="bg-tennis-default"
			activeClass="text-tennis-court"
			:active="activeNavtab"
			:list="navtabs"
			:center="true"
			@on-change="tabSelect">
		</tp-navtab>
		<view class="text-center">
			<image class="w-10 h-10" :src="userInfo.avatarUrl ? userInfo.avatarUrl : '../../static/logo.png'"></image>
			<view>
				<text class="title">{{title}}</text>
			</view>
			<view>
				<text class="icon icon-user"></text>
				<text>{{userInfo.nickName}}</text>
			</view>
			<button v-if="!isAuthorized" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
			<button @click="upload">上传图片</button>
			<image :src="uploadFile"></image>
		</view>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Tabbar } from '@/components/Footer.vue';
import { Navtab } from '@/components/Navtab.vue';

@Component
export default class Index extends Vue {
	dotStyle = true;
	cardCur = 0;
	swiperList = [{
		id: 0,
		type: 'image',
		url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
	}, {
		id: 1,
		type: 'image',
		url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
	}, {
		id: 2,
		type: 'image',
		url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
	}, {
		id: 3,
		type: 'image',
		url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
	}, {
		id: 4,
		type: 'image',
		url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
	}, {
		id: 5,
		type: 'image',
		url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
	}, {
		id: 6,
		type: 'image',
		url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
	}];

	activeNavtab = 0;
	navtabs: Navtab[] = [
		{
			title: '数码',
			icon: 'cuIcon-camerafill'
		},
		{
			title: '排行榜',
			icon: 'cuIcon-camerafill'
		},
		{
			title: '皮肤',
			icon: 'cuIcon-camerafill'
		}
	]

	tabSelect(navTab: Navtab, index: number) {
		this.activeNavtab = index;
		console.log(navTab);
  }

	cardSwiper(e: any) {
		this.cardCur = e.detail.current
	}

	title = 'Hello World';
	activeTabbar = 0;
	isAuthorized = false;
	userInfo: any = {};

	tabbars: Tabbar[] = [
		{
			icon: 'cuIcon-home',
			activeIcon: 'cuIcon-homefill',
			color: 'text-gray',
			activeColor: 'text-green',
			title: '首页',
			path: '/pages/index/index',
        },
        {
			icon: 'cuIcon-people',
			activeIcon: 'cuIcon-peoplefill',
			color: 'text-gray',
			activeColor: 'text-green',
			title: '发现',
			path: '/',
		},
		{
			icon: 'cuIcon-people',
			activeIcon: 'cuIcon-peoplefill',
			color: 'text-gray',
			activeColor: 'text-green',
			title: '我的',
			path: '/pages/user/index',
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

	uploadFile = '';
	upload() {
		wx.chooseImage({
			success: (res: any) => {
				const tempFilePaths = res.tempFilePaths
				const filename = tempFilePaths[0].slice('http://tmp/'.length)
				console.log(res, tempFilePaths, tempFilePaths[0].match(/\.[^.]+?$/)[0]);
				wx.cloud.init({
					env: wx.cloud.DYNAMIC_CURRENT_ENV
				});
				wx.cloud.uploadFile({
					cloudPath: 'tennis/' + new Date().getTime() + tempFilePaths[0].match(/\.[^.]+?$/)[0], // 上传至云端的路径
					filePath: tempFilePaths[0], // 小程序临时文件路径
					success: (res: any) => {
						// 返回文件 ID
						console.log(res, res.fileID)
						this.uploadFile = res.fileID;
					},
					fail: console.error
				})

			}
		})
	}
}
</script>

<style>
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
