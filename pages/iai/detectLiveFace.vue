<template>
  <view class="wrapper">
    <view class="content">
      <view>
        <button @click="startDetect" v-bind:disabled="status">{{ status ? '检测中' : '开始检测' }}</button>
      </view>
      <view class="form-item" v-if="detectResult">
        <view class="title">识别结果</view>
        <view :style="{ border: '1px dotted #333', padding: '10px' }">
          <view>活体打分(分数0~100,分数越高，翻拍可能性越低，一般低于40分可判断为翻拍)：{{ detectResult.Score }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getDetectLiveFaceResult } from '@/js_sdk/tencentcloud-plugin-iai';
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-iai/choose-image-2base64.js';

export default {
  data() {
    return {
      status: false,
      detectResult: ''
    };
  },
  methods: {
    async startDetect() {
      try {
        const img = await chooseImage2Base64();
        this.status = true;
        this.detectResult = '';
        uni.showLoading({
          mask: true
        });

        this.detectResult = await getDetectLiveFaceResult({ image: img });
        uni.hideLoading();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        this.status = false;
      }
    }
  }
};
</script>

<style>
.wrapper {
  margin: 20rpx auto;
}

.content {
  margin: 20rpx 40rpx;
}

.content .title {
  margin-bottom: 8rpx;
}

.content .form-item {
  margin-bottom: 20rpx;
}

.content .form-item .radio {
  margin-right: 10px;
}

.content .form-item input {
  padding: 10px;
  border: 1px solid #c0c0c0;
}

.content button {
  margin: 40rpx 0;
}
</style>
