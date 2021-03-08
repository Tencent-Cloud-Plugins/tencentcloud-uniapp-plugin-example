<template>
  <view class="page-body">
    <view class="btn-area">
      <navigator url="/pages/iai/detectFace">
        <button type="default">人脸检测与分析</button>
      </navigator>
      <navigator url="/pages/iai/compareFace">
        <button type="default">人脸比对</button>
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
