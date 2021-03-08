<template>
  <div class="wrapper">
    <div>语音识别结果：</div>
    <div class="result">{{ resultText }}</div>
    <button @click="startRecord" v-bind:disabled="status">{{ status ? '正在录音中...' : '开始录音' }}</button>
    <button @click="endRecord" v-bind:disabled="!status">停止录音</button>
  </div>
</template>
<script>
import { sentenceRecognition, toBase64, Recorder } from '@/js_sdk/tencentcloud-plugin-asr';

export default {
  data() {
    return {
      resultText: '', // 语音识别结果
      rec: '', // recorder实例
      status: false // 是否在录制状态
    };
  },
  methods: {
    onLoad() {
      // 初始化录音实例
      this.rec = new Recorder();
    },
    // 开始录音
    async startRecord() {
      try {
        this.status = true;
        await this.rec.start();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      }
    },
    // 停止录音
    async endRecord() {
      this.status = false;
      try {
        // 录音完成获取录音文件和音频大小
        const { voiceBase64, size } = await this.rec.stop();
        uni.showLoading({
          mask: true
        });
        // 发起一句话识别请求
        const { result } = await sentenceRecognition({
          engSerViceType: '8k_zh',
          sourceType: 1,
          voiceFormat: 'mp3',
          usrAudioKey: 'test',
          dataLen: size,
          data: voiceBase64
        });
        this.resultText = result.Result;
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
.wrapper {
  margin: 40rpx;
}

.wrapper button {
  margin-top: 20rpx;
}

.result {
  color: red;
  font-size: 36rpx;
}
</style>
