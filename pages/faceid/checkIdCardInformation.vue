<template>
  <view class="wrapper">
    <view class="content">
      <view class="form-item"
        >功能描述：传入身份证人像面照片，识别身份证照片上的信息，并将姓名、身份证号、身份证人像照片与公安权威库的证件照进行比对，是否属于同一个人，从而验证身份证信息的真实性</view
      >
      <view>
        <button @click="startDetect" v-bind:disabled="status">{{ status ? '核身中' : '开始核身' }}</button>
      </view>
      <view v-if="detectResult">
        <view>检测结果:{{ detectResult.Description }}</view>
        <view>相识度(相似度大于等于70时可判断为同一人):{{ detectResult.Sim }}</view>
        <view>
          身份信息如下:<br />
          姓名:{{ detectResult.Name }}<br />
          身份证号:{{ detectResult.IdNum }}<br />
          性别:{{ detectResult.Sex }}<br />
          民族:{{ detectResult.Nation }}<br />
          出生日期:{{ detectResult.Birth }}<br />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { checkIdCardInformation } from '@/js_sdk/tencentcloud-plugin-faceid';
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
        this.detectResult = await checkIdCardInformation(params);
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
