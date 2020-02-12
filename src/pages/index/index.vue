<template>
  <view>
    <tp-header bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg">
      <block slot="content">索引</block>
    </tp-header>

    <Home v-if="activeTabbar === 0"></Home>
    <User v-if="activeTabbar === 2"></User>

    <tp-footer :tabbars="tabbars" :active="activeTabbar" @on-change="onNavChange"></tp-footer>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Tabbar } from "@/components/Footer.vue";
import Home from "@/pages/home/index.vue";
import User from "@/pages/user/index.vue";

@Component({
  components: {
    Home,
    User
  }
})
export default class Index extends Vue {
  activeTabbar = 0;

  tabbars: Tabbar[] = [
    {
      icon: "cuIcon-home",
      activeIcon: "cuIcon-homefill",
      color: "text-gray",
      activeColor: "text-green",
      title: "首页",
      path: "/pages/index/index"
    },
    {
      icon: "cuIcon-people",
      activeIcon: "cuIcon-peoplefill",
      color: "text-gray",
      activeColor: "text-green",
      title: "发现",
      path: "/"
    },
    {
      icon: "cuIcon-people",
      activeIcon: "cuIcon-peoplefill",
      color: "text-gray",
      activeColor: "text-green",
      title: "我的",
      path: "/pages/user/index"
    }
  ];

  onNavChange(tabbar: Tabbar, index: number) {
    this.activeTabbar = index;
    console.log(tabbar);
  }
}
</script>

<style>
</style>
