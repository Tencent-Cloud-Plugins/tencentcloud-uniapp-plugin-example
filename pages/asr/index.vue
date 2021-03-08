<template>
  <div class="wrapper">
    <view class="btn-area">
      <navigator url="/pages/asr/sentenceRecognition">
        <button type="default">一句话语音识别</button>
      </navigator>
      <!-- #ifdef H5-->
      <navigator url="/pages/asr/recTask">
        <button type="default">录音文件识别</button>
      </navigator>
      <!-- #endif -->
      <!-- #ifndef APP-PLUS -->
      <navigator url="/pages/asr/realTime">
        <button type="default">实时语音识别</button>
      </navigator>
      <!-- #endif -->
    </view>
  </div>
</template>

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
