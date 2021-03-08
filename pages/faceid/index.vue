<template>
  <view class="page-body">
    <view class="btn-area">
      <!-- #ifdef MP-->
      <navigator url="/pages/faceid/livenessRecognition">
        <button type="default">活体人脸核身</button>
      </navigator>
      <navigator url="/pages/faceid/livenessCompare">
        <button type="default">活体人脸比对</button>
      </navigator>
      <!-- #endif -->
      <navigator url="/pages/faceid/imageRecognition">
        <button type="default">照片人脸核身</button>
      </navigator>
      <navigator url="/pages/faceid/checkIdCardInformation">
        <button type="default">身份证人像照片验真</button>
      </navigator>
      <navigator url="/pages/faceid/idCardOCRVerification">
        <button type="default">身份证识别及信息核验</button>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style>
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
