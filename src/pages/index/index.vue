<template>
	<view class="content">
		<t-header bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">索引</block>
		</t-header>
        <image class="logo" src="../../static/logo.png"></image>
		<view>
            <text class="title">{{title}}</text>
        </view>
		<text class="icon icon-user"></text>

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
	}
})
export default class Index extends Vue {
	title = 'Hello World';
	activeTabbar = 0;
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

	onLoad() {

	}

	onNavChange(tabbar: Tabbar, index: number) {
		this.activeTabbar = index;
		console.log(tabbar);
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
