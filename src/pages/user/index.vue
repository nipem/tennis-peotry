<template>
  <view>
    <scroll-view scroll-y class="page">
      <view class="cu-card case" :class="isCard?'no-card':''">
        <view class="cu-item shadow">
          <view class="cu-list menu-avatar">
            <view class="cu-item" @click="clickAvatar">
              <view class="cu-avatar round lg" :style="'background-image:url(' + avatar + ');'"></view>
              <view class="content flex-sub">
                <button
                  class="btn-login text-gray"
                  v-if="!username"
                  open-type="getUserInfo"
                  @getuserinfo="getUserInfo"
                >登录</button>
                <view class="text-gray" v-else>{{username}}</view>
                <view class="text-gray text-sm flex justify-between">
                  {{userinfo}}
                  <slot>
                    <view class="text-gray text-sm">
                      <text class="cuIcon-attentionfill margin-lr-xs"></text>10
                      <text class="cuIcon-appreciatefill margin-lr-xs"></text>20
                      <text class="cuIcon-messagefill margin-lr-xs"></text>30
                    </view>
                  </slot>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <tp-grid :gridCol="gridCol" :grids="userGrids.slice(0, gridCol)"></tp-grid>

      <tp-grid title="工具" :gridCol="gridCol" :grids="grids" @click="toolClick"></tp-grid>
      <!-- <tp-grid title="宫格列表" :gridCol="gridCol" :grids="grids"></tp-grid> -->

      <view class="cu-tabbar-height"></view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Grid } from "@/components/Grid.vue";
import { State, Mutation, Action, namespace } from "vuex-class";

const store = namespace("user");

@Component
export default class extends Vue {
  @store.Mutation updateUserInfo!: (info: any) => void;
  @store.State userInfo!: any;

  isCard = true;
  userinfo = "简介：Play tennis as poetry";

  gridCol = 4;
  menuBorder = true;
  menuCard = false;
  menuArrow = true;

  isAuthorized = false;

  userGrids: Grid[] = [
    {
      icon: "cuIcon-cardboardfill",
      color: "text-red",
      badge: 120,
      name: "我的相册"
    },
    {
      icon: "cuIcon-recordfill",
      color: "text-orange",
      badge: 1,
      name: "我的视频"
    },
    {
      icon: "cuIcon-picfill",
      color: "text-yellow",
      badge: 0,
      name: "我的收藏"
    },
    {
      icon: "cuIcon-noticefill",
      color: "text-olive",
      badge: 22,
      name: "我的订单"
    },
  ]
  grids: Grid[] = [
    {
      icon: "cuIcon-clothesfill",
      color: "text-blue",
      badge: 0,
      name: "场地上报",
      url: '/pages/report/index'
    },
    {
      icon: "cuIcon-discoverfill",
      color: "text-purple",
      badge: 0,
      name: "我的活动"
    },
    {
      icon: "cuIcon-cardboardfill",
      color: "text-red",
      badge: 120,
      name: "浏览历史"
    },
    {
      icon: "cuIcon-recordfill",
      color: "text-orange",
      badge: 1,
      name: "设置"
    },
    {
      icon: "cuIcon-picfill",
      color: "text-yellow",
      badge: 0,
      name: "服务协议"
    },
    {
      icon: "cuIcon-noticefill",
      color: "text-olive",
      badge: 22,
      name: "隐私政策"
    },
    {
      icon: "cuIcon-upstagefill",
      color: "text-cyan",
      badge: 0,
      name: "关于 tennis poetry"
    },
  ];

  get username() {
    return this.userInfo.nickName;
  }
  get avatar() {
    const image =
      "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg";
    return this.userInfo.avatarUrl || image;
  }

  clickAvatar() {}

  toolClick(grid: Grid, index: number) {
    console.log(grid, index);
    uni.navigateTo({
      url: grid.url
    })
  }

  wxGetUserInfo() {
    wx.getUserInfo({
      success: (res: any) => {
        console.log(res);
        this.isAuthorized = true;
        this.updateUserInfo(res.userInfo);
      },
      fail: () => {
        this.isAuthorized = false;
      }
    });
  }

  login(cb: (err?: string | null, code?: string | null) => void) {
    wx.checkSession({
      success: () => {
        //session_key 未过期，并且在本生命周期一直有效
        cb(null, null);
      },
      fail: (e: any) => {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: (res: any) => {
            const { code } = res;
            if (code) {
              cb(null, code);
            } else {
              cb(res.errMsg, null);
            }
          }
        });
      }
    });
  }

  onReady() {
    this.login((err, code) => {
      if (err) {
        this.isAuthorized = false;
        return;
      }

      if (this.userInfo.nickName) {
        this.isAuthorized = true;
        return;
      }

      this.wxGetUserInfo();
    });
  }

  getUserInfo(e: any) {
    const data = e.detail;
    if (data.userInfo) {
      wx.showToast({
        title: "登录成功",
        duration: 2000
      });
      console.log(data);
      this.isAuthorized = true;
      this.isAuthorized = true;
      this.updateUserInfo(data.userInfo);
      // this.userInfo = data.userInfo;
    } else {
      wx.showToast({
        title: "授权失败",
        icon: "none",
        duration: 2000
      });
    }
  }
}
</script>

<style>
/* 覆盖浏览器的默认样式 */
.btn-login {
  margin: 0;
  padding: 0;
  line-height: 1;
  font-size: 30upx;
  text-align: left;
  background-color: inherit;
}
.btn-login:after {
  border: 0;
}
</style>