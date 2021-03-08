<template>
  <view class="wrapper">
    <view class="content">
      <view class="input">
        <view>手机号码：</view>
        <input id="phoneNumber" type="text" placeholder="多个号码可用英文逗号分割" @input="setValue" />
      </view>
      <view class="input">
        <view>短信模板ID：</view>
        <input id="templateId" type="text" placeholder="短信模板ID(在腾讯云控制台申请查看)" @input="setValue" />
      </view>
      <view class="input">
        <view>模板变量值：</view>
        <input id="templateParam" type="text" placeholder="多个可用英文逗号分割" @input="setValue" />
      </view>
      <button @click="sendSMS">发送短信</button>
      <view v-for="(item, index) in lastSendStatus" :key="index" class="result">
        <view>手机号码：{{ item.PhoneNumber }}</view>
        <view>是否计费：{{ item.Fee ? '是' : '否' }}</view>
        <view>发送结果：{{ item.Code }} - {{ item.Message }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import sendSMS from '@/js_sdk/tencentcloud-plugin-sms/send-sms';

export default {
  data() {
    return {
      phoneNumber: '',
      templateId: '',
      templateParam: '',
      lastSendStatus: []
    };
  },
  methods: {
    setValue(e) {
      const {
        target: { id, value }
      } = e;
      this[id] = value;
    },
    // 发送短信示例
    async sendSMS() {
      this.lastSendStatus = [];
      uni.showLoading({
        mask: true
      });
      try {
        const phoneNumbers = this.phoneNumber && this.phoneNumber.split(',');
        const templateParams = (this.templateParam && this.templateParam.split(',')) || undefined;
        const { SendStatusSet } = await sendSMS(phoneNumbers, this.templateId, templateParams);
        this.lastSendStatus = SendStatusSet;
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
  margin-top: 40rpx;
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
