<template>
	<view>
		<view class="cu-custom" :style="[{height:customBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{top:statusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
	// @ts-ignore
	statusBar:any = this.StatusBar;
	// @ts-ignore
    customBar:any = this.CustomBar;

    @Prop({
        default: ''
	}) readonly bgColor!: string;

    @Prop({
        default: false
    }) readonly isBack!: boolean | string;

    @Prop({
        default: ''
    }) readonly bgImage!: string;

    get style() {
        var statusBar = this.statusBar;
        var customBar = this.customBar;
        var bgImage = this.bgImage;
        var style = `height:${customBar}px;padding-top:${statusBar}px;`;
        if (this.bgImage) {
            style = `${style}background-image:url(${bgImage});`;
        }
        return style
    }
	onLoad() {

	}

	BackPage() {
		if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
			let url = '/' + __wxConfig.pages[0]
			return uni.redirectTo({url})
		}
		uni.navigateBack({
			delta: 1
		});
	}
}
</script>

<style>

</style>
