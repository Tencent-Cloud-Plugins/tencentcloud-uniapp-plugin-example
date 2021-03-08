<template>
  <view class="wrapper">
    <view class="content">
      <view class="form-item">
        <view class="title">人脸照片A</view>
        <view class="upload-item" @click="upload('A')">
          <img :src="imageA" mode="" v-if="imageA" />
          <span v-else>添加图片</span>
        </view>
      </view>
      <view class="form-item">
        <view class="title">人脸照片B</view>
        <view class="upload-item" @click="upload('B')">
          <img :src="imageB" mode="" v-if="imageB" />
          <span v-else>添加图片</span>
        </view>
      </view>
      <view>
        <button @click="startDetect" v-bind:disabled="status">{{ status ? '比对中' : '开始比对' }}</button>
      </view>
      <view class="form-item" v-if="detectResult">
        <view class="title">识别结果</view>
        <view :style="{ border: '1px dotted #333', padding: '10px' }">
          <view
            >人脸相似度分数(分数0~100，分数越高，相识度越高，一般超过50分则可认定为同一人)：{{
              detectResult.Score
            }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getCompareFaceResult } from '@/js_sdk/tencentcloud-plugin-iai';
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-iai/choose-image-2base64.js';

export default {
  data() {
    return {
      status: false,
      imageA: '',
      imageB: '',
      detectResult: ''
    };
  },
  methods: {
    async upload(type) {
      const img = await chooseImage2Base64();
      this[`image${type}`] = `data:image/jpg;base64,${img}`;
    },
    async startDetect() {
      try {
        this.status = true;
        this.detectResult = '';
        uni.showLoading({
          mask: true
        });

        const params = {
          imageA: this.imageA,
          imageB: this.imageB
        };

        this.detectResult = await getCompareFaceResult(params);
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

.content .form-item .upload-item {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #eee;
}

.content .form-item .upload-item img {
  width: 100%;
  height: 100%;
}

.content .form-item .upload-item span {
  cursor: pointer;
}

.content button {
  margin: 40rpx 0;
}
</style>
