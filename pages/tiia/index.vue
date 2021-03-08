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
        <div>图像识别结果：</div>
        <div v-if="orcResults.img">
          <img class="resImg" :src="orcResults.img" />
        </div>
        <div v-else v-for="value in orcResults" :key="value">
          {{ value }}
        </div>
      </div>
    </uni-popup>
  </view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import fns from './fn';

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
        {
          title: '图像质量检测相关接口',
          child: [
            {
              title: '图像质量评估',
              fn: 'handleAssessQuality'
            }
          ]
        },
        {
          title: '图像审核相关接口',
          child: [
            {
              title: '恶心检测',
              fn: 'handleDetectDisgust'
            },
            {
              title: '不良行为识别',
              fn: 'handleDetectMisbehavior'
            }
          ]
        },
        {
          title: '图像理解相关接口',
          child: [
            {
              title: '图像标签',
              fn: 'handleDetectLabel'
            },
            {
              title: '车辆识别',
              fn: 'handleRecognizeCar'
            },
            {
              title: '商品识别',
              fn: 'handleDetectProduct'
            },
            {
              title: '公众人物识别',
              fn: 'handleDetectCelebrity'
            }
          ]
        },
        {
          title: '图片处理相关接口',
          child: [
            {
              title: '图像清晰度增强',
              fn: 'handleEnhanceImage'
            },
            {
              title: '图片智能裁剪',
              fn: 'handleCropImage'
            }
          ]
        }
      ];
    },
    fn(method) {
      this[method]();
    },
    ...fns
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
.resImg {
  width: 100%;
}
</style>
