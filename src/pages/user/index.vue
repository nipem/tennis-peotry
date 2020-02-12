<template>
  <view>
    <scroll-view scroll-y class="page">
      <tp-card
        :isCard="true"
        username="username"
        avatar="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
        userinfo="诗酒乘年华"
      >
        <view class="text-gray text-sm">
          <!-- <text class="cuIcon-appreciatefill margin-lr-xs"></text>22 -->
          <!-- <text class="cuIcon-messagefill margin-lr-xs"></text> 33 -->
        </view>
      </tp-card>
      <tp-grid :gridCol="gridCol" :grids="grids.slice(0, gridCol)"></tp-grid>

      <tp-grid title="宫格列表" :gridCol="gridCol" :grids="grids.slice(0, gridCol)"></tp-grid>
      <tp-grid title="宫格列表" :gridCol="gridCol" :grids="grids"></tp-grid>

      <view class="cu-tabbar-height"></view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Grids } from "@/components/Grid.vue";

@Component
export default class extends Vue {
  isCard = true;
  gridCol = 4;
  menuBorder = true;
  menuCard = false;
  menuArrow = true;

  isAuthorized = false;
  userInfo: any = {};

  grids: Grids[] = [
    {
      icon: "cuIcon-cardboardfill",
      color: "text-red",
      badge: 120,
      name: "VR"
    },
    {
      icon: "cuIcon-recordfill",
      color: "text-orange",
      badge: 1,
      name: "录像"
    },
    {
      icon: "cuIcon-picfill",
      color: "text-yellow",
      badge: 0,
      name: "图像"
    },
    {
      icon: "cuIcon-noticefill",
      color: "text-olive",
      badge: 22,
      name: "通知"
    },
    {
      icon: "cuIcon-upstagefill",
      color: "text-cyan",
      badge: 0,
      name: "排行榜"
    },
    {
      icon: "cuIcon-clothesfill",
      color: "text-blue",
      badge: 0,
      name: "皮肤"
    },
    {
      icon: "cuIcon-discoverfill",
      color: "text-purple",
      badge: 0,
      name: "发现"
    }
  ];

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
        console.log("需要用户点击页面的按钮触发授权，才可以获取用户信息。");
      }
    });
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
                title: "请先登录！",
                icon: "none",
                duration: 2000
              });
            }
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
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
              console.log("登录成功！" + res.code);

              // 获取用户信息
              this.WXgetUserInfo();
            } else {
              console.log("登录失败！" + res.errMsg);
            }
          }
        });
      }
    });
  }

  onLoad() {
    this.login();
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
      this.userInfo = data.userInfo;
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
</style>