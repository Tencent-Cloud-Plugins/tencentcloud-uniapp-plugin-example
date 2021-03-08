<template>
  <view class="wrapper">
    <view class="content">
      <view class="form-item">
        <view class="title">待翻译文本</view>
        <view v-for="(item, index) in textArr" :key="index" style="margin-bottom: 10px">
          <textarea
            :value="item.sourceText"
            :disabled="status"
            maxlength="110"
            :data-index="index"
            @input="textChange"
            placeholder="输入文本"
            auto-height
            style="border: 1px solid #c0c0c0; padding: 10px"
          />
          <view>{{ item.result }}</view>
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
    </view>
  </view>
</template>

<script>
import { translateOption } from './dictionary.js';
import { getTextTranslateResult, getTextTranslateBatchResult } from '@/js_sdk/tencentcloud-plugin-tmt';

export default {
  data() {
    return {
      status: false, // 是否开始翻译
      index: 0, // 选择的语言转换选项下标
      translateType: 'zh-en',
      translateOption,
      textArr: [
        {
          sourceText:
            '机器翻译（Tencent Machine Translation）是腾讯公司研发的人工智能机器翻译产品，基于自研的神经网络翻译引擎，能够从海量语料库中自主学习，在翻译的全过程中整体建模，从而达到翻译结果的高准确率与流畅度',
          result: ''
        },
        {
          sourceText:
            '机器翻译目前支持 15 个语种，83 种语言对的翻译能力，其中中英互译引擎已经在新闻、教育和部分科技领域达到业界领先水平',
          result: ''
        },
        {
          sourceText:
            '机器翻译提供中文、英文、日语、韩语、德语、法语、西班牙语、意大利语、土耳其语、俄语、葡萄牙语、越南语、印尼语、马来语、泰语等15种语言文本的翻译服务',
          result: ''
        }
      ],
      params: {
        sourceTextList: [], // 合成文本
        source: 'zh', // 源语言
        target: 'en' // 目标语言
      }
    };
  },
  methods: {
    onLoad() {},
    translateChange(e) {
      this.index = e.target.value;
      const arr = this.translateOption[this.index].value.split('-');
      [this.params.source, this.params.target] = arr;
    },
    textChange(e) {
      const index = e.target.dataset.index;
      this.textArr[index].sourceText = e.target.value;
    },
    async startTranslate() {
      try {
        this.status = true;
        this.translateResult = '';
        uni.showLoading({
          mask: true
        });

        this.params.sourceTextList = this.textArr.map((item) => {
          return item.sourceText;
        });
        const paramsData = {
          sourceTextList: this.params.sourceTextList,
          source: this.params.source,
          target: this.params.target
        };

        const { TargetTextList } = await getTextTranslateBatchResult(paramsData);
        uni.hideLoading();
        for (const key in TargetTextList) {
          this.textArr[key].result = TargetTextList[key];
        }
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
