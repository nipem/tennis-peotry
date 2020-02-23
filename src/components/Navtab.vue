<template>
<view>
  <scroll-view scroll-x class="nav" :class="[container, center ? 'text-center' : '']">
    <view class="flex text-center" v-if="equally">
      <view
        class="cu-item flex-sub"
        :class="index==active?activeClass + ' cur':''"
        v-for="(item,index) in list"
        :key="index"
        @click="tabSelect(item, index)">
          <text class="padding-lr-xs" :class="item.icon" v-if="item.icon"></text> {{item.title}}
      </view>
    </view>
    <view
      v-else
      class="cu-item flex-sub"
      :class="index==active?activeClass + ' cur':''"
      v-for="(item,index) in list"
      :key="index"
      @click="tabSelect(item, index)">
        <text class="padding-lr-xs" :class="item.icon" v-if="item.icon"></text> {{item.title}}
    </view>
  </scroll-view>
</view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

export interface Navtab {
  [key: string]: any;
  title: string;
  icon?: string;
}

@Component
export default class NavTab extends Vue {
  /**
   * 激活的导航栏的索引
   * !require
   */
  @Prop({
    default: 0
  }) readonly active!: number;

  /**
   * 导航栏信息数组
   * !require
   */
  @Prop({
    default: () => []
  }) readonly list!: Navtab[];

  /**
   * 设置容器背景颜色
   */
  @Prop({
    default: 'bg-white'
  }) readonly container!: string;

  /**
   * 导航栏是否居中
   */
  @Prop({
    default: false
  }) readonly center!: boolean;

  /**
   * 导航栏是否均分
   */
  @Prop({
    default: false
  }) readonly equally!: boolean;

  /**
   * 设置激活状态的导航栏的类名
   */
  @Prop({
    default: ''
  }) readonly activeClass!: string;

  tabSelect(navTab: Navtab, index: number) {
    this.$emit('on-change', navTab, index);
  }
}
</script>

<style lang="scss">
</style>
