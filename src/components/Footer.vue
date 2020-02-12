<template>
    <view class="cu-bar tabbar bg-white shadow foot">
        <view class="action" @click="NavChange(tabbar, index)" v-for="(tabbar, index) of tabbars" :key="index">
            <view class='cuIcon-cu-image'>
                <text :class="index === active ? [tabbar.activeIcon, tabbar.activeColor] : [tabbar.icon, tabbar.color]"></text>
            </view>
            <view :class="index === active ? tabbar.activeColor : tabbar.color">{{ tabbar.title }}</view>
        </view>
    </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

export interface Tabbar {
    icon: string;
    activeIcon: string;
    color: string;
    activeColor: string;
    title: string;
    path: string;
}

@Component
export default class Footer extends Vue {
    @Prop({
        default: 0
    }) readonly active!: number;

    @Prop({
        default: () => []
    }) readonly tabbars!: Tabbar[];

    NavChange(tabbar: Tabbar, index: number) {
        this.$emit('on-change', tabbar, index)
    }
}
</script>

<style lang="scss">
</style>
