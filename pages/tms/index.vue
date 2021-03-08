<template>
  <view class="wrapper">
    <view class="content">
      <textarea id="content" class="input" placeholder="请输入文本内容" @input="setValue" />
      <button @click="scan">内容安全识别</button>
      <view v-if="result" class="result">
        <view>内容：{{ result.EvilFlag ? '可疑' : '正常' }}</view>
        <view>类型：{{ types[`${result.EvilType}`] || result.EvilType }}</view>
        <view>建议：{{ suggestions[result.Suggestion] || result.Suggestion }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import textModeration from '@/js_sdk/tencentcloud-plugin-tms/text-moderation.js';

export default {
  data() {
    return {
      content: '',
      result: null,
      types: {
        100: '正常',
        20001: '政治',
        20002: '色情',
        20006: '涉毒违法',
        20007: '谩骂',
        20105: '广告引流',
        24001: '暴恐'
      },
      suggestions: {
        Normal: '正常',
        Block: '打击',
        Review: '复审'
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
    // 文本检查
    async scan() {
      this.result = null;
      if (!this.content) {
        uni.showToast({
          icon: 'none',
          title: '内容不能为空'
        });
        return;
      }
      uni.showLoading({
        mask: true
      });
      try {
        const result = await textModeration(this.content);
        this.result = result;
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

.input {
  box-sizing: border-box;
  width: 100%;
  margin-top: 20rpx;
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
