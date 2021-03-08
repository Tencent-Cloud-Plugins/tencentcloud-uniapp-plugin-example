<template>
  <view class="page-body">
    <image class="logo" src="/static/logo.png" mode="widthFix" />
    <view class="btn-area">
      <navigator url="/pages/cos/index">
        <button type="default">对象存储(COS)示例</button>
      </navigator>
      <navigator url="/pages/sms/index">
        <button type="default">短信(SMS)示例</button>
      </navigator>
      <navigator url="/pages/ocr/index">
        <button type="default">文字识别(OCR)示例</button>
      </navigator>
      <navigator url="/pages/vod/index">
        <button type="default">云点播(VOD)示例</button>
      </navigator>
      <!-- #ifdef H5-->
      <navigator url="/pages/captcha/index">
        <button type="default">验证码(CAPTCHA)示例</button>
      </navigator>
      <!-- #endif -->
      <navigator url="/pages/tiia/index">
        <button type="default">图像分析(TIIA)示例</button>
      </navigator>
      <navigator url="/pages/tms/index">
        <button type="default">文本安全(TMS)示例</button>
      </navigator>
      <navigator url="/pages/ims/index">
        <button type="default">图片内容安全(IMS)示例</button>
      </navigator>
      <navigator url="/pages/asr/index">
        <button type="default">语音识别(ASR)示例</button>
      </navigator>
      <navigator url="/pages/soe/index">
        <button type="default">口语评测(SOE)示例</button>
      </navigator>
      <navigator url="/pages/httpdns/index">
        <button type="default">移动解析(HTTPDNS)示例</button>
      </navigator>
      <navigator url="/pages/tts/index">
        <button type="default">语音合成(TTS)示例</button>
      </navigator>
      <navigator url="/pages/tmt/index">
        <button type="default">机器翻译(TMT)示例</button>
      </navigator>
      <navigator url="/pages/iai/index">
        <button type="default">人脸识别(IAI)示例</button>
      </navigator>
      <navigator url="/pages/faceid/index">
        <button type="default">人脸核身(FACEID)示例</button>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style>
.page-body {
  padding-bottom: 20rpx;
}

.logo {
  display: block;
  width: 200rpx;
  margin: 100rpx auto;
}

.btn-area {
  margin: 40rpx;
}

.btn-area navigator {
  margin-top: 20rpx;
}
</style>
