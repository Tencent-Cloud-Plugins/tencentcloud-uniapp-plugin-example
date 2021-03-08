<template>
  <view class="wrapper">
    <view class="content">
      <view class="form-item">
        <view class="title">评测语言</view>
        <radio-group @change="serverTypeChange">
          <label class="radio"> <radio value="0" :checked="true" :disabled="status" />英文</label>
          <label class="radio"> <radio value="1" :disabled="status" />中文</label>
        </radio-group>
      </view>
      <view class="form-item">
        <view class="title">评测对象</view>
        <radio-group @change="scoreCoeffChange">
          <label class="radio"> <radio value="1" checked="true" :disabled="status" />儿童</label>
          <label class="radio"> <radio value="3" :disabled="status" />成人</label>
        </radio-group>
      </view>
      <view class="form-item">
        <view class="title">评测模式</view>
        <radio-group @change="evalModeChange">
          <label class="radio"> <radio value="0" checked="true" :disabled="status" />词模式</label>
          <label class="radio"> <radio value="1" :disabled="status" />句子模式</label>
          <label class="radio"> <radio value="2" :disabled="status" />段落模式</label>
          <label class="radio"> <radio value="3" :disabled="status" />自由说模式</label>
        </radio-group>
      </view>
      <view class="form-item">
        <view class="title">上传方式</view>
        <radio-group @change="workModeChange">
          <label class="radio"> <radio value="1" checked="true" :disabled="status" />非流式</label>
          <label class="radio"> <radio value="0" :disabled="status" />流式分片</label>
        </radio-group>
      </view>
      <view class="form-item">
        <view class="title">评测文本</view>
        <view>
          <input type="text" placeholder="请输入评测文本" :value="refText" :disabled="status" @input="textChange" />
        </view>
      </view>
      <view>
        <button @click="startRecord" v-bind:disabled="status">{{ status ? '正在评测中...' : '开始评测' }}</button>
        <button @click="endRecord" v-bind:disabled="!status">结束评测</button>
      </view>
      <view>你的评测分数：{{ resultText }}</view>
    </view>
  </view>
</template>

<script>
import { serverType, evalMode, workMode } from './constant.js';
import { getVoicePoint, randStr, Recorder, RealTimeVoiceSplit } from '@/js_sdk/tencentcloud-plugin-soe';

export default {
  data() {
    return {
      status: false, // 是否开始评测标志
      option: {
        seqId: 0, // 分片序号
        serverType: 0, // 中英文标志
        scoreCoeff: 1, // 难度指数
        evalMode: 0, // 评估模式
        sessionId: '', // 语音唯一标识
        workMode: 1, // 语音是否分片传输
        storageMode: 1 // 音频存储模式
      },
      refText: 'dog', // 评估语言对应的文本
      voiceData: '', // 评估语音 BASE64格式
      recorder: null, // 录音实例
      realTimeVoice: null, // 录音分片实例,
      resultText: '' // 评测分数
    };
  },
  methods: {
    // 退出时卸载掉正在进行的录音行为
    onUnload() {
      this.recorder && this.recorder.stopRealTime() && this.recorder.stop();
    },
    serverTypeChange(ev) {
      this.option.serverType = ev.target.value;
      this.refTextChange();
    },
    scoreCoeffChange(ev) {
      this.option.scoreCoeff = ev.target.value;
    },
    evalModeChange(ev) {
      this.option.evalMode = ev.target.value;
      this.refTextChange();
    },
    refTextChange() {
      if (this.option.serverType == serverType.en) {
        if (this.option.evalMode == evalMode.word) this.refText = 'dog';
        if (this.option.evalMode == evalMode.sentence || this.option.evalMode == evalMode.freeSpeak)
          this.refText = 'I like dog';
      } else {
        if (this.option.evalMode == evalMode.word) this.refText = '狗';
        if (this.option.evalMode == evalMode.sentence || this.option.evalMode == evalMode.freeSpeak)
          this.refText = '我喜欢狗';
      }
    },
    workModeChange(ev) {
      this.option.workMode = ev.target.value;
    },
    textChange(ev) {
      this.refText = ev.target.value;
    },
    // 流式录音procss
    async onProcess(data, isClose) {
      try {
        let res;
        // #ifdef H5
        // data: 分片后Base64编码的音频 seq: 当前第几个录音分片，初始为1
        res = await this.realTimeVoice.realTimeSendTryH5(this.recorder.rec);
        // #endif
        // #ifndef H5
        // data: 分片后Base64编码的音频 seq: 当前第几个录音分片，初始为1
        res = await this.realTimeVoice.realTimeSendTryMP(data);
        // #endif
        this.option.seqId = res.seq;

        if (isClose) {
          uni.showLoading({
            mask: true
          });
        }

        // 语音评测参数
        const params = {
          sessionId: this.option.sessionId,
          seqId: res.seq,
          isEnd: isClose ? 1 : 0,
          serverType: Number(this.option.serverType),
          scoreCoeff: Number(this.option.scoreCoeff),
          evalMode: 3,
          workMode: Number(this.option.workMode),
          storageMode: this.option.storageMode
        };
        const result = await getVoicePoint(res.data, this.refText, params);
        if (isClose) {
          this.resultText = result && result.SuggestedScore;
        }
      } catch (e) {
      } finally {
        uni.hideLoading();
      }
    },
    // 开始录音
    async startRecord() {
      try {
        // 初始化录音和回调实例
        this.status = true;
        this.resultText = '';
        this.option.sessionId = randStr(16);
        if (this.option.workMode == workMode.stream) {
          // 流式
          this.recorder = new Recorder(this.onProcess);
          this.realTimeVoice = new RealTimeVoiceSplit(1000);
          await this.recorder.startRealTime();
        } else {
          // 非流式
          this.recorder = new Recorder();
          await this.recorder.start();
        }
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
        let voiceBase64 = '';
        if (this.option.workMode == workMode.stream) {
          // 流式
          this.recorder.stopRealTime();
        } else {
          // 非流式
          const res = await this.recorder.stop();
          voiceBase64 = res.voiceBase64;
        }

        // #ifdef MP
        // 小程序平台下流式录音在onProcess回调函数里完成评测
        if (this.option.workMode == workMode.stream) {
          return;
        }
        // #endif

        uni.showLoading({
          mask: true
        });

        const params = {
          sessionId: this.option.sessionId,
          serverType: Number(this.option.serverType),
          scoreCoeff: Number(this.option.scoreCoeff),
          evalMode: Number(this.option.evalMode),
          workMode: Number(this.option.workMode),
          storageMode: this.option.storageMode
        };

        if (this.option.workMode == workMode.stream) {
          params.seqId = this.option.seqId + 1;
          params.isEnd = 1;
        }

        const result = await getVoicePoint(voiceBase64, this.refText, params);
        this.resultText = result && result.SuggestedScore;
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
