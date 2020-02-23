<template>
    <view class="cu-card case" :class="isCard?'no-card':''">
        <view class="cu-item shadow">
            <view class="image" v-if="image" @click="clickImage">
                <image :src="image" mode="widthFix"></image>
                <view class="cu-tag bg-blue" v-if="tag.length">{{tag}}</view>
                <view class="cu-bar bg-shadeBottom" v-if="desc.length">
                    <text class="text-cut">{{desc}}</text>
                </view>
            </view>
            <view class="cu-list menu-avatar" v-if="avatar && username && userinfo">
                <view class="cu-item" @click="clickAvatar">
                    <view
                        class="cu-avatar round lg"
                        :style="'background-image:url(' + avatar + ');'"></view>
                    <view class="content flex-sub">
                        <view class="text-grey">{{username}}</view>
                        <view class="text-gray text-sm flex justify-between">
                            {{userinfo}}
                            <slot>
                                <view class="text-gray text-sm">
                                    <text class="cuIcon-attentionfill margin-lr-xs"></text> 10
                                    <text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
                                    <text class="cuIcon-messagefill margin-lr-xs"></text> 30
                                </view>
                            </slot>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
    import {
        Vue,
        Component,
        Prop,
        Emit
    } from 'vue-property-decorator';

    @Component
    export default class Card extends Vue {
        @Prop({
            default: false
        }) readonly isCard!: boolean;

        @Prop({
            default: ''
        }) readonly image!: string;

        @Prop({
            default: ''
        }) readonly tag!: string;

        @Prop({
            default: ''
        }) readonly desc!: string;

        @Prop({
            default: ''
        }) readonly username!: string;

        @Prop({
            default: ''
        }) readonly avatar!: string;

        @Prop({
            default: ''
        }) readonly userinfo!: string;

        clickImage() {
            this.$emit('click-image')
        }

        clickAvatar() {
            this.$emit('click-avatar')
        }
    }
</script>

<style lang="css">
.cu-list.menu-avatar>.cu-item:after,
.cu-list.menu>.cu-item:after {
  border: none !important;
}
</style>