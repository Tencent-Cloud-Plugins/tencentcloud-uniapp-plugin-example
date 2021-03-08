<template>
  <view class="wrapper">
    <view class="content">
      <view class="form-item"
        >功能描述：选择身份证人像面照片，用于校验姓名和身份证号的真实性和一致性，并识别身份信息</view
      >
      <view>
        <button @click="startDetect" v-bind:disabled="status">{{ status ? '检测中' : '开始检测' }}</button>
      </view>
      <view v-if="detectResult">
        <view>检测结果:{{ detectResult.Description }}</view>
        <view>
          身份信息如下:<br />
          姓名:{{ detectResult.Name }}<br />
          身份证号:{{ detectResult.IdCard }}<br />
          性别:{{ detectResult.Sex }}<br />
          民族:{{ detectResult.Nation }}<br />
          出生日期:{{ detectResult.Birth }}<br />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { idCardOCRVerification } from '@/js_sdk/tencentcloud-plugin-faceid';
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-faceid/choose-image-2base64.js';

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
        const imageBase64 = await chooseImage2Base64();
        this.status = true;
        this.detectResult = '';
        uni.showLoading({
          mask: true
        });
        const params = {
          imageBase64
        };
        this.detectResult = await idCardOCRVerification(params);
        uni.hideLoading();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          duration: 3000,
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
