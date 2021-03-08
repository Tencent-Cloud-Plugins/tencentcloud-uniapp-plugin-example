<template>
  <view class="wrapper">
    <view class="content">
      <view class="form-item">功能描述：传入身份信息和人脸照片，判断该照片与公安权威库的证件照是否属于同一个人</view>
      <view class="form-item"
        >demo体验流程：1.输入姓名和身份证号 2.点击'开始核身'按钮，选择或拍摄人脸照片后等待核身结果</view
      >
      <view class="form-item">
        <view class="title">姓名</view>
        <view>
          <input type="text" placeholder="请输入姓名" id="name" :disabled="status" @input="textChange" />
        </view>
      </view>
      <view class="form-item">
        <view class="title">身份证号</view>
        <view>
          <input type="text" placeholder="请输入身份证号" id="idCard" :disabled="status" @input="textChange" />
        </view>
      </view>
      <view>
        <button @click="startDetect" v-bind:disabled="status">{{ status ? '核身中' : '开始核身' }}</button>
      </view>
      <view v-if="detectResult">
        <view>检测结果：{{ detectResult.Description }}</view>
        <view>相识度(相似度大于等于70时可判断为同一人)：{{ detectResult.Sim }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { imageRecognition } from '@/js_sdk/tencentcloud-plugin-faceid';
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-faceid/choose-image-2base64.js';

export default {
  data() {
    return {
      status: false,
      idCard: '',
      name: '',
      detectResult: ''
    };
  },
  methods: {
    textChange(e) {
      this[e.target.id] = e.target.value;
    },
    async startDetect() {
      try {
        const imageBase64 = await chooseImage2Base64();
        this.status = true;
        this.detectResult = '';
        uni.showLoading({
          mask: true
        });
        const params = {
          idCard: this.idCard,
          name: this.name,
          imageBase64
        };
        this.detectResult = await imageRecognition(params);
        uni.hideLoading();
      } catch (error) {
        console.log(error, 1);
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
