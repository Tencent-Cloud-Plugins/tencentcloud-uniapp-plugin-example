<template>
  <view class="wrapper">
    <view class="content">
      <button @click="getPackages">点击获取</button>
      <view v-for="(item, index) in packagesStatistics" :key="index" class="result">
        <view>套餐包ID：{{ item.PackageId }}</view>
        <view>套餐类型：{{ item.TypeOfPackage ? '购买' : '赠送' }}</view>
        <view>总条数：{{ item.AmountOfPackage }}</view>
        <view>已用量：{{ item.CurrentUsage }}</view>
        <view>有效期：{{ item.PackageEffectiveTime }} ~ {{ item.PackageExpiredTime }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import getPackagesStatistics from '@/js_sdk/tencentcloud-plugin-sms/get-packages-statistics';

export default {
  data() {
    return {
      packagesStatistics: []
    };
  },
  methods: {
    // 获取套餐包使用状态示例
    async getPackages() {
      this.lastSendStatus = [];
      this.packagesStatistics = [];
      uni.showLoading({
        mask: true
      });
      try {
        const { SmsPackagesStatisticsSet } = await getPackagesStatistics();
        this.packagesStatistics = SmsPackagesStatisticsSet;
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
.content {
  margin: 40rpx;
}

.result {
  margin-top: 20rpx;
  padding: 10rpx;
  border: 1px dashed #81b8ff;
  border-radius: 8rpx;
  font-size: 0.75rem;
  word-break: break-all;
  user-select: text;
}
</style>
