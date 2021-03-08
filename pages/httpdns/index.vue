<template>
  <view class="wrapper">
    <view class="content">
      <view class="input">
        <input type="text" placeholder="输入待解析的域名,如www.baidu.com" @input="setValue" />
      </view>
      <button @click="startResolution">{{ !status ? '开始解析' : '解析中···' }}</button>
      <div v-if="ipArr.length" class="result">
        <p>
          域名<span :style="{ color: 'red' }">{{ domainText }}</span
          >对应的ip为：
        </p>
        <p v-for="ip in ipArr" :key="ip">{{ ip }}</p>
      </div>
    </view>
  </view>
</template>

<script>
import { describeDnsResult } from '@/js_sdk/tencentcloud-plugin-httpdns/index.js';

export default {
  data() {
    return {
      status: false,
      domainName: '', // 域名
      domainText: '',
      ipArr: []
    };
  },
  methods: {
    // 设置域名
    setValue(e) {
      this.domainName = e.target.value;
    },
    // 开始DNS解析
    async startResolution() {
      try {
        uni.showLoading({
          mask: true
        });
        this.status = true;
        this.ipArr = [];
        const params = {
          domainName: this.domainName,
          isEnc: true
        };
        const result = await describeDnsResult(params);
        this.ipArr = result.split(';');
        this.domainText = this.domainName;
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
