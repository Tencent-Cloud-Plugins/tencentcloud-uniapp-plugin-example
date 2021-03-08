<template>
  <view class="wrapper">
    <view class="content">
      <view class="form-item">
        <view class="title">语言</view>
        <radio-group @change="languageChange">
          <label class="radio" v-for="item in languageOption" :key="item.value">
            <radio
              id="PrimaryLanguage"
              :value="item.value"
              :checked="params.PrimaryLanguage === item.value"
              :disabled="status"
            />{{ item.text }}
          </label>
        </radio-group>
      </view>
      <view class="form-item">
        <view class="title">音色</view>
        <radio-group @change="voiceTypeChange">
          <label class="radio" v-for="item in voiceTypeOption" :key="item.value">
            <radio :value="item.value" :checked="params.VoiceType === item.value" :disabled="status" />{{ item.text }}
          </label>
        </radio-group>
      </view>
      <view class="form-item">
        <view class="title">音量</view>
        <view>
          <slider :value="params.Volume" @change="volumeChange" min="0" max="10" show-value />
        </view>
      </view>
      <view class="form-item">
        <view class="title">语速</view>
        <radio-group @change="speedChange">
          <label class="radio" v-for="item in speedOption" :key="item.value">
            <radio :value="item.value" :checked="params.Speed === item.value" :disabled="status" />{{ item.text }}
          </label>
        </radio-group>
      </view>
      <view class="form-item">
        <view class="title">合成文本</view>
        <view>
          <textarea
            :value="params.Text"
            :disabled="status"
            maxlength="110"
            @input="textChange"
            placeholder="输入文本"
            auto-height
            style="border: 1px solid #c0c0c0; padding: 10px"
          />
        </view>
      </view>
      <view>
        <button @click="startCompound" v-bind:disabled="status">{{ status ? '语音合成中' : '合成语音' }}</button>
        <audio :src="audioSrc" controls v-if="audioSrc"></audio>
      </view>
    </view>
  </view>
</template>

<script>
import { languageType } from './constant.js';
import { languageOption, voiceTypeOption, volumeOption, speedOption } from './dictionary.js';
import { getTtsResult, randStr } from '@/js_sdk/tencentcloud-plugin-tts';

export default {
  data() {
    return {
      status: false, // 是否开始合成
      languageType,
      languageOption,
      voiceTypeOption,
      speedOption,
      params: {
        Text: '', // 合成文本
        PrimaryLanguage: '1', // 合成语言
        VoiceType: '0', // 合成语音音色
        Volume: '0', // 合成语音音量
        Speed: '0' // 合成语音语速
      },
      audioSrc: '',
      text1: '腾讯云语音合成提供多种高拟真度音色，广泛应用于客服场景、新闻播报、机器人服务等。',
      text2: 'Hello, can I talk with Mr.Davy please?'
    };
  },
  methods: {
    onLoad() {
      this.params.Text = this.text1;
    },
    languageChange(e) {
      this.params.PrimaryLanguage = e.target.value;
      this.params.Text = this.params.PrimaryLanguage === languageType.zh ? this.text1 : this.text2;
    },
    voiceTypeChange(e) {
      this.params.VoiceType = e.target.value;
    },
    volumeChange(e) {
      this.params.Volume = e.target.value;
    },
    speedChange(e) {
      this.params.Speed = e.target.value;
    },
    textChange(e) {
      this.params.Text = e.target.value;
    },
    // 开始合成语音
    async startCompound() {
      try {
        this.status = true;
        this.audioSrc = '';
        uni.showLoading({
          mask: true
        });

        const paramsData = {
          Text: this.params.Text,
          SessionId: randStr(6),
          PrimaryLanguage: Number(this.params.PrimaryLanguage),
          VoiceType: Number(this.params.VoiceType),
          Volume: Number(this.params.Volume),
          Speed: Number(this.params.Speed)
        };

        const result = await getTtsResult(paramsData);
        this.audioSrc = result.Audio && `data:audio/wav;base64,${result.Audio}`;
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
