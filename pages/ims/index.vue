<template>
  <view class="wrapper">
    <view class="content">
      <view class="input">
        <view>图片地址：</view>
        <input id="imageUrl" type="text" placeholder="请输入图片地址" @input="setValue" />
      </view>
      <button @click="scanByUrl">通过图片地址识别</button>
      <button @click="scanByFile">选择图片文件识别</button>
      <view v-if="result" class="result">
        <view>内容：{{ result.EvilFlag ? '可疑' : '正常' }}</view>
        <view>类型：{{ types[`${result.EvilType}`] || result.EvilType }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import imageModeration from '@/js_sdk/tencentcloud-plugin-ims/image-moderation.js';
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-ims/choose-image-2base64.js';

export default {
  data() {
    return {
      imageUrl: '',
      result: null,
      types: {
        100: '正常',
        20001: '政治',
        20002: '色情',
        20006: '涉毒违法',
        20007: '谩骂',
        20105: '广告引流',
        24001: '暴恐'
      }
    };
  },
  methods: {
    setValue(e) {
      const {
        target: { id, value }
      } = e;
      this[id] = value;
    },
    // 通过url识别图片内容
    async scanByUrl() {
      if (!/^https?:\/\//.test(this.imageUrl)) {
        uni.showToast({
          icon: 'none',
          title: '图片地址无效'
        });
        return;
      }
      this.result = null;
      uni.showLoading({
        mask: true
      });
      try {
        const result = await imageModeration(this.imageUrl);
        this.result = result;
        uni.hideLoading();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      }
    },
    // 通过选择文件识别图片内容
    async scanByFile() {
      const base64Data = await chooseImage2Base64();
      uni.showLoading({
        mask: true
      });
      try {
        const result = await imageModeration(base64Data);
        this.result = result;
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
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

.input {
  display: flex;
  margin-top: 20rpx;
}

.input view {
  width: 5rem;
  text-align: right;
  font-size: 0.8rem;
}

.input input {
  flex: 1 0 0;
  border: 1px solid #999;
  border-radius: 8rpx;
  padding: 4rpx 12rpx;
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
