<template>
  <div class="wrapper">
    <button @click="uploadFile">选择录音文件</button>
    <div style="margin-top: 20rpx">TaskId: {{ taskId }}</div>
    <button @click="getResult" v-bind:disabled="!taskId">发送录音识别请求</button>
    <div style="margin-top: 20rpx">
      语音识别结果：
      <span class="result">{{ resultText }}</span>
    </div>
    <view ref="input" class="inputWrap"></view>
  </div>
</template>

<script>
import { createRecTask, describeTaskStatus, blob2Base64 } from '@/js_sdk/tencentcloud-plugin-asr';

export default {
  data() {
    return {
      inputEl: '',
      taskId: null,
      resultText: '' // 语音识别结果
    };
  },
  methods: {
    // 文件转码上传
    async uploadFile() {
      try {
        const event = await this.chooseFile();
        // 文件转换为base64编码
        const fileBase64 = await blob2Base64(event.target.files[0]);
        this.sendRecord(fileBase64, event.target.files[0].size);
      } catch (error) {
        throw new Error(error);
      }
    },
    // 选择录音文件
    chooseFile() {
      return new Promise((resolve, reject) => {
        if (!this.inputEl) {
          this.inputEl = document.createElement('input');
          this.inputEl.type = 'file';
          this.$refs.input.$el.appendChild(this.inputEl);
        }
        this.inputEl.onchange = (event) => {
          resolve(event);
        };
        this.inputEl.click();
      });
    },
    // 录音文件识别请求
    async sendRecord(file, size) {
      try {
        uni.showLoading({
          mask: true
        });
        const { result } = await createRecTask({
          engineModelType: '8k_zh',
          channelNum: 1,
          resTextFormat: 0,
          sourceType: 1,
          data: (/.+;\s*base64\s*,\s*(.+)$/i.exec(file) || [])[1],
          dataLen: size
        });
        this.taskId = result.Data.TaskId;
        uni.hideLoading();
      } catch (error) {
        throw new Error(error);
      }
    },
    // 录音文件识别结果查询
    async getResult() {
      try {
        uni.showLoading({
          mask: true
        });
        const { result } = await describeTaskStatus(this.taskId);
        /* prettier-ignore */
        this.resultText = (
          result.Data.StatusStr === 'waiting' || result.Data.StatusStr === 'doing'
            ? '正在解析中，请稍后再试'
            : result.Data.Result
        );
        uni.hideLoading();
      } catch (error) {
        throw new Error(error);
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

.inputWrap {
  visibility: hidden;
}
</style>
