<template>
  <view>
    <scroll-view scroll-y class="page">
      <tp-header bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true">
        <block slot="content">场地上报</block>
      </tp-header>

      <view class="cu-form-group">
        <view class="title">
          名称
          <tp-required></tp-required>
        </view>
        <input placeholder="场地名称" v-model.trim="name"/>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">
          位置
          <tp-required></tp-required>
        </view>
      </view>
      <view class="cu-form-group">
        <view class="relative">
          <map
            id="map"
            ref="map"
            style="width: 100%; height: 200rpx; margin-bottom: 20rpx;"
            :latitude="latitude"
            :longitude="longitude"
            :markers="markers"
            @tap="chooseLocation"
          ></map>
          <image
            v-if="!latitude && !longitude"
            class="defaultImage"
            mode="widthFix"
            src="https://img.jogiter.cn/tennis/map-default.png?imageView2/1/w/345/h/100"
            @tap="chooseLocation"
          />
        </view>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">
          现场拍照
          <tp-required></tp-required>
        </view>
        <view class="action">{{imgList.length}}/{{maxImages}}</view>
      </view>
      <view class="cu-form-group">
        <view class="grid col-4 grid-square flex-sub">
          <view
            class="bg-img"
            v-for="(item, index) of imgList"
            :key="index"
            @click="viewImage"
            :data-url="item"
          >
            <image :src="item" mode="aspectFill" />
            <view class="cu-tag bg-red" @click.stop="deleteImage" :data-index="index">
              <text class="cuIcon-close"></text>
            </view>
          </view>
          <view class="solids" @click="chooseImage" v-if="imgList.length<maxImages">
            <text class="cuIcon-cameraadd"></text>
          </view>
        </view>
      </view>

      <view class="cu-form-group margin-top">
        <view class="title">地址</view>
        <input placeholder="如：深圳市南山区前海湾1号" v-model.trim="address"/>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">
          营业电话
        </view>
      </view>
      <view
        class="cu-form-group"
        v-for="(item, index) of phones"
        v-show="index === 0 || index <= phoneCounts"
        :key="index"
      >
        <input type="number" placeholder="支持固话及手机" v-model="phones[index]" />
        <text :class="index === 0 ? 'cuIcon-roundadd' : 'cuIcon-move'" @click="phoneHandle(index)"></text>
      </view>

      <view class="cu-bar bg-white margin-top">
        <view class="action">
          营业时间
        </view>
      </view>
      <view
        class="cu-form-group business"
        v-for="(item, index) of businessHour"
        v-show="index === 0 || index <= timeCounts"
        :key="index"
      >
        <picker
          mode="multiSelector"
          @change="setTimes($event, index)"
          :value="timeValue"
          :range="timeList"
        >
          <view
            class="picker"
            :style="{color: businessHour[index] === TIMEPLACEHOLDER ? '#777' : '#555'}">
            {{businessHour[index]}}
          </view>
        </picker>
        <text
          :class="index === 0 ? 'cuIcon-roundadd' : 'cuIcon-move'"
          data-target="ChooseModal"
          @click="timeHandle(index)"
        ></text>
      </view>

      <view class="cu-form-group align-start margin-top">
        <view class="title">补充说明</view>
        <textarea
          maxlength="-1"
          placeholder="补充详细的描述，加速审核"
          v-model.trim="description"></textarea>
      </view>

      <button
        class="cu-btn block bg-blue margin-tb-sm lg round margin-lr"
        :disabled="isValid"
        @click="report"
      >提交</button>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

function generateDaytimes() {
  const HOURS = 24;
  return Array.from({ length: HOURS })
    .map((val, hour) => {
      let h = hour < 10 ? `0${hour}` : hour;
      return [`${h}:00`, `${h}:30`];
    })
    .flat();
}

const DAYTIMES = generateDaytimes();
const TIMEPLACEHOLDER = "请选择时间";

interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

@Component
export default class Report extends Vue {
  // 场地名称
  name = '';

  // 位置
  location: Location | null = null;
  latitude: number | null = null;
  longitude: number | null = null;
  markers: any[] = [];

  // 现场拍照
  imgList = [];
  maxImages = 8; // 最多上传 8 张图片

  address = '';

  // 营业电话
  phones = [""];
  phoneCounts = 1;

  // 营业时间
  TIMEPLACEHOLDER = TIMEPLACEHOLDER;
  businessHour = [TIMEPLACEHOLDER];
  timeCounts = 1;
  timeList = [["每日", "工作日", "周末"], DAYTIMES, DAYTIMES];
  timeValue = [0, 18, 42];

  description = '';
  isValid = false;

  chooseLocation() {
    uni.chooseLocation({
      success: (res: any) => {
        const { name, address, latitude, longitude } = res;
        this.location = {
          name, address, latitude, longitude
        };
        this.latitude = latitude;
        this.longitude = longitude;
        this.markers = [
          {
            latitude,
            longitude,
            iconPath: "https://img.jogiter.cn/tennis/ball.png?imageView2/1/w/16"
          }
        ];
      }
    });
  }

  chooseImage() {
    wx.chooseImage({
      sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album"], //从相册选择
      success: (res: any) => {
        if (this.imgList.length != 0) {
          this.imgList = this.imgList.concat(res.tempFilePaths).slice(0, 8);
        } else {
          this.imgList = res.tempFilePaths;
        }
      }
    });
  }

  viewImage(e: any) {
    wx.previewImage({
      urls: this.imgList,
      current: e.currentTarget.dataset.url
    });
  }

  deleteImage(e: any) {
    wx.showModal({
      content: "确定要删除这张图片吗？",
      success: (res: any) => {
        if (res.confirm) {
          this.imgList.splice(e.currentTarget.dataset.index, 1);
        }
      }
    });
  }

  phoneHandle(index: number) {
    if (index === 0) {
      if (this.phoneCounts <= 2) {
        this.phoneCounts += 1;
        this.phones.push("");
      }
    } else {
      this.phoneCounts -= 1;
      this.phones.splice(index, 1);
    }
  }

  timeHandle(index: number) {
    if (index === 0) {
      if (this.timeCounts <= 2) {
        this.timeCounts += 1;
        this.businessHour.push(TIMEPLACEHOLDER);
      }
    } else {
      this.timeCounts -= 1;
      this.businessHour.splice(index, 1);
    }
  }

  setTimes(e: any, index: number) {
    const values = e.detail.value;
    const v = values.map(
      (value: any, index: number) => this.timeList[index][value]
    );
    this.businessHour.splice(index, 1, `${v[0]} ${v[1]}-${v[2]}`);
  }

  toast(title: string) {
    uni.showToast({
      icon: 'none',
      title,
      duration: 1000
    });
  }

  report() {
    const { toast } = this;
    let title = '';
    // if (!this.name) {
    //   return toast('请填写场地名称');
    // }
    // if (!this.location) {
    //   return toast('请定位场地位置');
    // }
    // if (!this.imgList.length) {
    //   return toast('请拍摄现场图片');
    // }
    let timestamp = new Date().getTime();
    const cloudPath = () => 'tennis/court/' + (++timestamp).toString();
    this.uploadImage(this.imgList, cloudPath).then(res => {
      const files = (res as any[]).map(item => item.fileID);
      console.log(files);
      console.log(
        this.name,
        this.location,
        this.address,
        this.phones,
        this.businessHour,
        this.imgList,
        this.description,
        files
      );
      console.log("validation first !");
    });
  }
  uploadImage(list: string[], cloudPath: () => string) {
    const { cloud } = wx;

    cloud.init({
      env: cloud.DYNAMIC_CURRENT_ENV
    });

    cloud.callFunction({name: 'user'}).then(console.log).catch(console.error)
    return;

    const uploadPromises = list.map(img => cloud.uploadFile({
      cloudPath: cloudPath(), // 上传至云端的路径
      filePath: img,
    }));

    return Promise.all(uploadPromises).catch(console.error);
  }
}
</script>

<style lang="css">
.relative {
  position: relative;
  flex: 1;
}
.defaultImage {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.border-top {
  border-top: 2rpx solid #eee;
}
.cu-form-group.business {
  justify-content: flex-start;
}
.cu-form-group.business picker::after {
  content: "";
}
.cu-form-group.business picker .picker {
  text-align: left;
}
</style>