<template>
  <view class="content">
    <button @click="uploadImage">上传图片</button>
    <button @click="uploadVideo">上传视频</button>
    <button @click="uploadFile">上传文件</button>
    <view v-if="fileName" class="result">
      上传成功，文件名称是：
      <view>{{ fileName }}</view>
    </view>
    <button v-if="fileName" @click="getUrl">获取访问链接</button>
    <view v-if="fileUrl" class="result">
      访问链接是：
      <view>{{ fileUrl }}</view>
    </view>
  </view>
</template>

<script>
import chooseAndUploadImage from '@/js_sdk/tencentcloud-plugin-cos/choose-and-upload-image';
import chooseAndUploadVideo from '@/js_sdk/tencentcloud-plugin-cos/choose-and-upload-video';
import chooseFile from '@/js_sdk/tencentcloud-plugin-cos/choose-file';
import uploadFile from '@/js_sdk/tencentcloud-plugin-cos/upload-file';
import getFileAccessUrl from '@/js_sdk/tencentcloud-plugin-cos/get-file-access-url';

export default {
  data() {
    return {
      fileName: null,
      fileUrl: null
    };
  },
  methods: {
    // 简单上传图片文件的示例
    async uploadImage() {
      this.fileName = null;
      this.fileUrl = null;
      try {
        const key = await chooseAndUploadImage(); // 选择并上传图片
        this.fileName = key;
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      }
    },
    // 简单上传视频文件的示例
    async uploadVideo() {
      this.fileName = null;
      this.fileUrl = null;
      try {
        const key = await chooseAndUploadVideo(); // 选择并上传视频
        this.fileName = key;
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      }
    },
    // 上传自定义文件的示例
    async uploadFile() {
      this.fileName = null;
      this.fileUrl = null;
      try {
        const [file] = await chooseFile(); // 选择自定义类型文件，仅支持H5平台
        // 上传前文件校验
        if (file.size > 10 * 1024 * 1024) {
          throw new Error('文件大小不能超过10M');
        }
        uni.showLoading({
          mask: true
        });
        // 上传过程中可获取文件上传进度
        const key = await uploadFile(file, null, ({ progress }) => {
          uni.showLoading({
            mask: true,
            title: `文件上传中(${progress}%)`
          });
        });
        this.fileName = key;
        uni.hideLoading();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      }
    },
    // 获取访问链接
    async getUrl() {
      uni.showLoading({
        mask: true
      });
      try {
        const url = await getFileAccessUrl(this.fileName);
        this.fileUrl = url;
        uni.hideLoading();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      }
    }
  }
};
</script>

<style>
.content {
  margin: 40rpx;
}

.content button {
  margin-top: 20rpx;
}

.result {
  margin-top: 20rpx;
  padding: 10rpx;
  border: 1px dashed #81b8ff;
  border-radius: 8rpx;
  font-size: 0.75rem;
  word-break: break-all;
  user-select: text;
}
</style>
