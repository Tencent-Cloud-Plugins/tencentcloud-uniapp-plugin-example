/*
 * Copyright (C) 2020 Tencent Cloud.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// 选择图片转换为base64编码
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-tiia/choose-image-2base64.js';
import {
  assessQuality,
  detectDisgust,
  detectMisbehavior,
  detectLabel,
  recognizeCar,
  detectProduct,
  detectCelebrity,
  enhanceImage,
  cropImage
} from '@/js_sdk/tencentcloud-plugin-tiia';

export default {
  // 图像质量评估
  async handleAssessQuality() {
    try {
      const img = await chooseImage2Base64();
      uni.showLoading({
        mask: true
      });
      const { result } = await assessQuality({ imageBase64: img });
      this.orcResults = [`美观度：${result.AestheticScore}`, `清晰度：${result.ClarityScore}`];
      this.$refs.popup.open();
    } catch (error) {
      uni.showToast({
        icon: 'none',
        title: error.message
      });
    } finally {
      uni.hideLoading();
    }
  },
  // 恶心检测
  async handleDetectDisgust() {
    try {
      const img = await chooseImage2Base64();
      uni.showLoading({
        mask: true
      });
      const { result } = await detectDisgust({ imageBase64: img });
      this.orcResults = [`恶心类别：${result.Type}`];
      this.$refs.popup.open();
    } catch (error) {
      uni.showToast({
        icon: 'none',
        title: error.message
      });
    } finally {
      uni.hideLoading();
    }
  },
  // 不良行为识别
  async handleDetectMisbehavior() {
    try {
      const img = await chooseImage2Base64();
      uni.showLoading({
        mask: true
      });
      const { result } = await detectMisbehavior({ imageBase64: img });
      this.orcResults = [`不良行为类别：${result.Type}`];
      this.$refs.popup.open();
    } catch (error) {
      uni.showToast({
        icon: 'none',
        title: error.message
      });
    } finally {
      uni.hideLoading();
    }
  },
  // 图像标签
  async handleDetectLabel() {
    try {
      const img = await chooseImage2Base64();
      uni.showLoading({
        mask: true
      });
      const { result } = await detectLabel({ imageBase64: img });
      this.orcResults = result.Labels.map((item) => {
        return `${item.Name}：${item.Confidence}%`;
      });
      this.$refs.popup.open();
    } catch (error) {
      uni.showToast({
        icon: 'none',
        title: error.message
      });
    } finally {
      uni.hideLoading();
    }
  },
  // 车辆识别
  async handleRecognizeCar() {
    try {
      const img = await chooseImage2Base64();
      uni.showLoading({
        mask: true
      });
      const { result } = await recognizeCar({ imageBase64: img });
      this.orcResults = result.CarTags.map((item) => {
        return `车系：${item.Serial} 品牌：${item.Brand} 类型：${item.Type} 颜色：${item.Color} 年款：${item.Year} 置信度：${item.Confidence}%`;
      });
      this.$refs.popup.open();
    } catch (error) {
      uni.showToast({
        icon: 'none',
        title: error.message
      });
    } finally {
      uni.hideLoading();
    }
  },
  // 商品识别
  async handleDetectProduct() {
    try {
      const img = await chooseImage2Base64();
      uni.showLoading({
        mask: true
      });
      const { result } = await detectProduct({ imageBase64: img });
      this.orcResults = result.Products.map((item) => {
        return `${item.Name}：${item.Confidence}%`;
      });
      this.$refs.popup.open();
    } catch (error) {
      uni.showToast({
        icon: 'none',
        title: error.message
      });
    } finally {
      uni.hideLoading();
    }
  },
  // 公众人物识别
  async handleDetectCelebrity() {
    try {
      const img = await chooseImage2Base64();
      uni.showLoading({
        mask: true
      });
      const { result } = await detectCelebrity({ imageBase64: img });
      this.orcResults = result.Faces.map((item) => {
        return `${item.Name}：${item.Confidence}%`;
      });
      this.$refs.popup.open();
    } catch (error) {
      uni.showToast({
        icon: 'none',
        title: error.message
      });
    } finally {
      uni.hideLoading();
    }
  },
  // 图像清晰度增强
  async handleEnhanceImage() {
    try {
      const img = await chooseImage2Base64();
      uni.showLoading({
        mask: true
      });
      const { result } = await enhanceImage({ imageBase64: img });
      this.orcResults = { img: `data:image/png;base64,${result.EnhancedImage}` };
      this.$refs.popup.open();
    } catch (error) {
      uni.showToast({
        icon: 'none',
        title: error.message
      });
    } finally {
      uni.hideLoading();
    }
  },
  // 图片智能裁剪
  async handleCropImage() {
    try {
      const img = await chooseImage2Base64();
      uni.showLoading({
        mask: true
      });
      const { result } = await cropImage({ imageBase64: img, width: 1, height: 1 });
      this.orcResults = [
        `建议裁剪坐标X：${result.X}，Y：${result.Y}`,
        `建议裁剪宽高：宽度：${result.Width} ，高度：${result.Height}`
      ];
      this.$refs.popup.open();
    } catch (error) {
      uni.showToast({
        icon: 'none',
        title: error.message
      });
    } finally {
      uni.hideLoading();
    }
  }
};
