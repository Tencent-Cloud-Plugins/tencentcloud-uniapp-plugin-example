<template>
  <view class="wrapper">
    <view class="content">
      <view>
        <button @click="startDetect" v-bind:disabled="status">{{ status ? '检测中' : '开始检测' }}</button>
      </view>
      <view class="form-item" v-if="faceInfo.length">
        <view class="title">识别结果</view>
        <view
          :style="{ border: '1px dotted #333', padding: '10px', marginBottom: '10px' }"
          v-for="(face, index) in faceInfo"
          :key="index"
        >
          <view>性别：{{ face.FaceAttributesInfo.Gender }}</view>
          <view>年龄：{{ face.FaceAttributesInfo.Age }}</view>
          <view>眼镜：{{ face.FaceAttributesInfo.Glass }}</view>
          <view>魅力：{{ face.FaceAttributesInfo.Beauty }}</view>
          <view>帽子：{{ face.FaceAttributesInfo.Hat }}</view>
          <view>口罩：{{ face.FaceAttributesInfo.Mask }}</view>
          <view
            >发型：{{ face.FaceAttributesInfo.Hair.Length }} {{ face.FaceAttributesInfo.Hair.Bang }}
            {{ face.FaceAttributesInfo.Hair.Color }}</view
          >
          <view>是否睁眼：{{ face.FaceAttributesInfo.EyeOpen }}</view>
          <view>上下偏移：{{ face.FaceAttributesInfo.Pitch }}度</view>
          <view>左右偏移：{{ face.FaceAttributesInfo.Yaw }}度</view>
          <view>平面旋转：{{ face.FaceAttributesInfo.Roll }}度</view>
          <view>质量分：{{ face.FaceQualityInfo.Score }}</view>
          <view>清晰分：{{ face.FaceQualityInfo.Sharpness }}</view>
          <view>光照分：{{ face.FaceQualityInfo.Brightness }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getDetectFaceResult } from '@/js_sdk/tencentcloud-plugin-iai';
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-iai/choose-image-2base64.js';
import {
  genderOption,
  expressionOption,
  glassOption,
  hatOption,
  maskOption,
  eyeOpenOption,
  hairOption
} from './constant.js';

export default {
  data() {
    return {
      status: false,
      faceInfo: []
    };
  },
  methods: {
    handerData() {
      this.faceInfo.forEach((face) => {
        if (face.FaceAttributesInfo.Gender < genderOption.gap) {
          face.FaceAttributesInfo.Gender = genderOption.types[0];
        } else {
          face.FaceAttributesInfo.Gender = genderOption.types[1];
        }
        if (face.FaceAttributesInfo.Expression < expressionOption.gap[0]) {
          face.FaceAttributesInfo.Expression = expressionOption.types[0];
        } else if (face.FaceAttributesInfo.Expression < expressionOption.gap[1]) {
          face.FaceAttributesInfo.Expression = expressionOption.types[1];
        } else {
          face.FaceAttributesInfo.Expression = expressionOption.types[2];
        }
        face.FaceAttributesInfo.Glass = glassOption[face.FaceAttributesInfo.Glass];
        face.FaceAttributesInfo.Hat = hatOption[face.FaceAttributesInfo.Hat];
        face.FaceAttributesInfo.Mask = maskOption[face.FaceAttributesInfo.Mask];
        face.FaceAttributesInfo.EyeOpen = eyeOpenOption[face.FaceAttributesInfo.EyeOpen];
        face.FaceAttributesInfo.Hair.Length = hairOption.length[face.FaceAttributesInfo.Hair.Length];
        face.FaceAttributesInfo.Hair.Bang = hairOption.bang[face.FaceAttributesInfo.Hair.Bang];
        face.FaceAttributesInfo.Hair.Color = hairOption.color[face.FaceAttributesInfo.Hair.Color];
      });
    },
    async startDetect() {
      try {
        const img = await chooseImage2Base64();
        this.status = true;
        this.faceInfo = [];
        uni.showLoading({
          mask: true
        });

        const result = await getDetectFaceResult({ image: img, needFaceAttributes: 1, needQualityDetection: 1 });
        this.faceInfo = result.FaceInfos;
        uni.hideLoading();
        this.handerData();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        this.status = false;
      }
    }
  }
};
</script>

<style>
.wrapper {
  margin: 20rpx auto;
}

.content {
  margin: 20rpx 40rpx;
}

.content .title {
  margin-bottom: 8rpx;
}

.content .form-item {
  margin-bottom: 20rpx;
}

.content .form-item .radio {
  margin-right: 10px;
}

.content .form-item input {
  padding: 10px;
  border: 1px solid #c0c0c0;
}

.content button {
  margin: 40rpx 0;
}
</style>
