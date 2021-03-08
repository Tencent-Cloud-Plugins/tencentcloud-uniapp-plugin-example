<template>
  <view class="page-body">
    <view class="btn-area">
      <navigator url="/pages/tmt/textTranslate">
        <button type="default">文本翻译</button>
      </navigator>
      <navigator url="/pages/tmt/textTranslateBatch">
        <button type="default">批量文本翻译</button>
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
