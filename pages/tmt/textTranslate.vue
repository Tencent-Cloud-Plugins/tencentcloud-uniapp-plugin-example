<template>
  <view class="wrapper">
    <view class="content">
      <view class="form-item">
        <view class="title">待翻译文本</view>
        <view>
          <textarea
            :value="params.sourceText"
            :disabled="status"
            maxlength="110"
            @input="textChange"
            placeholder="输入文本"
            auto-height
            style="border: 1px solid #c0c0c0; padding: 10px"
          />
        </view>
      </view>
      <view class="form-item">
        <view class="title">目标语言</view>
        <picker @change="translateChange" :value="index" :range="translateOption" range-key="text">
          <view class="uni-input">{{ translateOption[index].text }}</view>
        </picker>
      </view>
      <view>
        <button @click="startTranslate" v-bind:disabled="status">{{ status ? '翻译中' : '开始翻译' }}</button>
      </view>
      <view class="form-item">
        <view class="title">翻译结果</view>
        <view>{{ translateResult }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { translateOption } from './dictionary.js';
import { getTextTranslateResult } from '@/js_sdk/tencentcloud-plugin-tmt';

export default {
  data() {
    return {
      status: false, // 是否开始翻译
      index: 0, // 选择的语言转换选项下标
      translateType: 'zh-en',
      translateOption,
      params: {
        sourceText: '', // 合成文本
        source: 'zh', // 源语言
        target: 'en' // 目标语言
      },
      translateResult: '',
      text1: '你好，欢迎使用腾讯云机器翻译产品！'
    };
  },
  methods: {
    onLoad() {
      this.params.sourceText = this.text1;
    },
    translateChange(e) {
      this.index = e.target.value;
      const arr = this.translateOption[this.index].value.split('-');
      [this.params.source, this.params.target] = arr;
    },
    textChange(e) {
      this.params.sourceText = e.target.value;
    },
    async startTranslate() {
      try {
        this.status = true;
        this.translateResult = '';
        uni.showLoading({
          mask: true
        });

        const paramsData = {
          sourceText: this.params.sourceText,
          source: this.params.source,
          target: this.params.target
        };

        const result = await getTextTranslateResult(paramsData);
        this.translateResult = result.TargetText;
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
  border: 1px solid #c0c0c0;
  padding: 10px;
}

.content button {
  margin: 40rpx 0;
}
</style>
