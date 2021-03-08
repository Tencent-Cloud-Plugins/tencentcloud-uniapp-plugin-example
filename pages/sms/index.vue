<template>
  <view class="page-body">
    <view class="btn-area">
      <navigator url="/pages/sms/sms">
        <button type="default">发送短信</button>
      </navigator>
      <navigator url="/pages/sms/verification">
        <button type="default">验证码场景示例</button>
      </navigator>
      <navigator url="/pages/sms/statistics">
        <button type="default">获取短信套餐包信息</button>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style>
.btn-area {
  margin: 40rpx;
}

.btn-area navigator {
  margin-top: 20rpx;
}
</style>
