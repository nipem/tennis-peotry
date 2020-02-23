<template>
  <view>
    <view class="cu-bar bg-white solid-bottom margin-top" v-if="title">
      <view class="action">
        <text class="cuIcon-title" :class="titleClass" v-if="titleClass"></text>
        {{title}}
      </view>
    </view>
    <view class="cu-list grid" :class="['col-' + gridCol, gridBorder?'':'no-border']">
      <view class="cu-item" v-for="(grid, index) of grids" :key="index" @click="onclick(grid, index)">
        <view :class="[grid.icon, grid.color]">
          <view class="cu-tag badge" v-if="grid.badge !== 0">
            <block v-if="grid.badge !== 1">{{grid.badge>99?"99+":grid.badge}}</block>
          </view>
        </view>
        <text>{{grid.name}}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

export interface Grid {
  [key: string]: any;
  url?: string;
  icon: string;
  color: string;
  badge: number;
  name: string;
}

@Component
export default class GridComponent extends Vue {
  @Prop({
    default: ""
  })
  readonly title!: string;

  @Prop({
    default: ""
  })
  readonly titleClass!: string;

  @Prop({
    default: ""
  })
  readonly gridCol!: number;

  @Prop({
    default: false
  })
  readonly gridBorder!: boolean;

  @Prop({
    default: () => []
  })
  readonly grids!: Grid[];

  onclick(grid: Grid, index: number) {
    this.$emit('click', grid, index);
  }
}
</script>
