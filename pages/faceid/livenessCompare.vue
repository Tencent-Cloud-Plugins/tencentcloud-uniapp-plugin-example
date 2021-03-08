<template>
  <view class="wrapper">
    <view class="content">
      <view class="form-item"
        >功能描述：传入人脸照片和人脸视频，先判断视频中是否为真人，判断为真人后，再判断该视频中的人与上传照片是否属于同一个人</view
      >
      <view class="form-item"
        >demo体验流程：1.点击下方'添加图片'按钮选择或拍摄人脸照片 2.点击'开始比对'按钮，拍摄人脸视频后等待比对结果</view
      >
      <view class="form-item">
        <view class="title">选择对比图片</view>
        <view class="upload-item" @click="upload()">
          <img :src="`data:image/jpg;base64,${imageBase64}`" mode="" v-if="imageBase64" />
          <span v-else>添加图片</span>
        </view>
      </view>
      <view>
        <button @click="startDetect" v-bind:disabled="status">{{ status ? '比对中' : '开始对比' }}</button>
      </view>
      <view v-if="detectResult">
        <view>检测结果：{{ detectResult.Description }}</view>
        <view>相识度(相似度大于等于70时可判断为同一人)：{{ detectResult.Sim }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { livenessCompare } from '@/js_sdk/tencentcloud-plugin-faceid';
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-faceid/choose-image-2base64.js';
import chooseVideo2Base64 from '@/js_sdk/tencentcloud-plugin-faceid/choose-video-2base64.js';

export default {
  data() {
    return {
      status: false,
      imageBase64: '',
      detectResult: ''
    };
  },
  methods: {
    async upload(type) {
      try {
        this.imageBase64 = await chooseImage2Base64();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          duration: 3000,
          title: error.message
        });
      }
    },
    async startDetect() {
      try {
        const videoBase64 = await chooseVideo2Base64();
        this.status = true;
        this.detectResult = '';
        uni.showLoading({
          mask: true
        });
        const params = {
          imageBase64: this.imageBase64,
          videoBase64,
          livenessType: 'SILENT'
        };
        this.detectResult = await livenessCompare(params);
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
</style>
