<template>
  <view class="wrapper">
    <view class="content">
      <view class="input">
        <view>手机号码：</view>
        <input id="phoneNumber" type="text" placeholder="请输入手机号码" @input="setValue" />
      </view>
      <view class="input">
        <view>验证码：</view>
        <input id="verificationCode" type="number" placeholder="请输入验证码" @input="setValue" />
        <button @click="sendCode">点击获取</button>
      </view>
      <button @click="checkCode">（模拟）登录</button>
    </view>
  </view>
</template>

<script>
import sendVerificationCode from '@/js_sdk/tencentcloud-plugin-sms/send-verification-code';
import checkVerificationCode from '@/js_sdk/tencentcloud-plugin-sms/check-verification-code';

export default {
  data() {
    return {
      phoneNumber: '',
      verificationCode: ''
    };
  },
  methods: {
    setValue(e) {
      const {
        target: { id, value }
      } = e;
      this[id] = value;
    },
    // 发送短信验证码示例
    async sendCode() {
      if (!this.phoneNumber) {
        uni.showToast({
          icon: 'none',
          title: '请输入手机号码'
        });
        return;
      }
      uni.showLoading({
        mask: true
      });
      try {
        await sendVerificationCode(this.phoneNumber);
        uni.showToast({
          icon: 'none',
          title: '验证码发送成功'
        });
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      }
    },
    // 校验验证码是否正确
    // 注：此步骤只是为了演示API功能，校验验证码真实使用场景应该是在注册或登录等其它业务流程中的一个环节，而不是单独校验，这样没有意义
    async checkCode() {
      if (!this.phoneNumber || !this.verificationCode) {
        uni.showToast({
          icon: 'none',
          title: '请输入手机号码和验证码'
        });
        return;
      }
      uni.showLoading({
        mask: true
      });
      try {
        await checkVerificationCode(this.phoneNumber, this.verificationCode);
        uni.showToast({
          icon: 'none',
          title: '（模拟）登录成功'
        });
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
  margin-top: 40rpx;
}

.input {
  display: flex;
  align-items: center;
  margin-top: 20rpx;
}

.input view {
  width: 5rem;
  text-align: right;
  font-size: 0.8rem;
}

.input button {
  margin-top: -5rpx;
}

.input input {
  flex: 1 0 0;
  border: 1px solid #999;
  border-radius: 8rpx;
  padding: 4rpx 12rpx;
}
</style>
