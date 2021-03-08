<template>
  <div class="wrapper">
    <div>语音识别结果：</div>
    <div class="result">{{ resultText }}</div>
    <button @click="startRecord" v-bind:disabled="status">{{ status ? '正在录音中...' : '开始录音' }}</button>
    <button @click="endRecord" v-bind:disabled="!status">停止录音</button>
  </div>
</template>

<script>
import { realtimeVoice, randStr, Recorder, blob2Base64, RealTimeVoiceSplit } from '@/js_sdk/tencentcloud-plugin-asr';

export default {
  data() {
    return {
      resultText: '', // 语音识别结果
      status: false, // 录音状态
      voice_id: '', // 识别音频的唯一id
      recorder: null, // 录音实例
      realTimeVoice: null // 录音分片实例
    };
  },
  methods: {
    onUnload() {
      // 离开页面时卸载掉正在进行的录音行为
      this.recorder && this.recorder.stopRealTime();
    },
    /**
     * 实时语音录音回调
     * @param {string} data 实时音频的返回结果
     * @param {boolean} isClose 是否为录音的最后一段
     */
    async onProcess(data, isClose) {
      let res;
      // #ifdef H5
      // data: 分片后Base64编码的音频 seq: 当前第几个录音分片，初始为1
      res = await this.realTimeVoice.realTimeSendTryH5(this.recorder.rec);
      // #endif
      // #ifndef H5
      // data: 分片后Base64编码的音频 seq: 当前第几个录音分片，初始为1
      res = await this.realTimeVoice.realTimeSendTryMP(data);
      // #endif
      // 实时语音参数
      const params = {
        engine_model_type: '16k_zh',
        seq: res.seq - 1,
        end: isClose ? 1 : 0,
        voice_id: this.voice_id,
        res_type: 0,
        voice_format: 8
      };
      // 调用实时语音识别的jssdk
      const { result } = await realtimeVoice(res.data, params);
      // 语音识别的文本结果
      this.resultText = result.text;
    },
    // 开始录音
    async startRecord() {
      try {
        // 初始化录音和回调实例
        this.voice_id = randStr(16);
        // 实时语音需要在初始化Recorder时传入回调函数接收语音的回调
        this.recorder = new Recorder(this.onProcess);
        // 初始化语音分片类，H5平台可以传入参数设定语音分片的间隔
        this.realTimeVoice = new RealTimeVoiceSplit();
        this.status = true;
        await this.recorder.startRealTime();
      } catch (e) {
        throw new Error(e);
      }
    },
    // 停止录音
    async endRecord() {
      this.status = false;
      // 停止语音录制
      this.recorder.stopRealTime();
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

.inputWrap {
  visibility: hidden;
}
</style>
