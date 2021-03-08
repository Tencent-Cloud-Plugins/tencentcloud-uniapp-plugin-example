<template>
  <view class="wrapper">
    <uni-collapse>
      <uni-collapse-item v-for="collapse in list" :title="collapse.title" :key="collapse.title">
        <uni-list>
          <uni-list-item
            v-for="item in collapse.child"
            :title="item.title"
            @click="fn(item.fn)"
            :key="item.title"
          ></uni-list-item>
        </uni-list>
      </uni-collapse-item>
    </uni-collapse>
    <uni-popup ref="popup" type="center" class="popWrap">
      <div class="popbox" @click="$refs.popup.close()">
        <div>OCR识别结果：</div>
        <div v-for="value in orcResults" :key="value.DetectedText">
          {{ value.DetectedText || value }}
        </div>
      </div>
    </uni-popup>
  </view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
// 选择图片转换为base64编码
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-ocr/choose-image-2base64.js';
// 各OCR分类
import card from './card';
import general from './general';
import bill from './bill';
import car from './car';
import documents from './documents';

export default {
  data() {
    return {
      list: [],
      orcResults: []
    };
  },
  methods: {
    onLoad() {
      this.list = [
        documents.list, // 行业文档识别列表
        card.list, // 卡证文字识别列表
        bill.list, // 票据单据识别列表
        car.list, // 汽车场景识别列表
        general.list // 通用文字识别列表
      ];
    },
    fn(method) {
      this[method]();
    },
    ...documents.fn, // 行业文档识别
    ...card.fn, // 卡证文字识别
    ...bill.fn, // 票据单据识别
    ...car.fn, // 汽车场景识别
    ...general.fn // 通用文字识别
  },
  components: { uniCollapse, uniCollapseItem, uniPopup }
};
</script>

<style>
.wrapper {
  margin: 40rpx;
}
.uni-popup__wrapper-box {
  width: 90%;
}
.popbox {
  border-radius: 4rpx;
  padding: 12rpx;
  box-sizing: border-box;
  background-color: #fff;
  margin: 0 auto;
  font-size: 14px;
}
/* #ifdef H5 */
.popbox {
  width: 90vw;
}
/* #endif */
</style>
