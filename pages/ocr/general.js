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

import {
  englishOCR,
  generalBasicOCR,
  generalAccurateOCR,
  generalEfficientOCR,
  generalFastOCR,
  generalHandwritingOCR,
  qrcodeOCR,
  textDetect
} from '@/js_sdk/tencentcloud-plugin-ocr';
// 选择图片转换为base64编码
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-ocr/choose-image-2base64.js';
import ocr from '@/js_sdk/tencentcloud-plugin-ocr/api';
/**
 * 通用文字相关demo列表和调用方法
 */
export default {
  list: {
    title: '通用文字识别',
    child: [
      {
        title: '英文识别',
        fn: 'handleEnglishOCR'
      },
      {
        title: '通用印刷体识别（高精度版）',
        fn: 'handleGeneralAccurateOCR'
      },
      {
        title: '通用印刷体识别（精简版）',
        fn: 'handleGeneralEfficientOCR'
      },
      {
        title: '通用印刷体识别（高速版）',
        fn: 'handleGeneralFastOCR'
      },
      {
        title: '通用手写体识别',
        fn: 'handleGeneralHandwritingOCR'
      },
      {
        title: '二维码和条形码识别',
        fn: 'handleQrcodeOCR'
      },
      {
        title: '快速文本检测',
        fn: 'handleTextDetect'
      }
    ]
  },
  fn: {
    async handleEnglishOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await englishOCR({ imageBase64: img });
        this.orcResults = result.TextDetections;
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
    async handleGeneralBasicOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await generalBasicOCR({ imageBase64: img });
        if (!result.TextDetections) return false;
        this.orcResults = result.TextDetections;
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
    async handleGeneralAccurateOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await generalAccurateOCR({ imageBase64: img });
        if (!result.TextDetections) return false;
        this.orcResults = result.TextDetections;
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
    async handleGeneralEfficientOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await generalEfficientOCR({ imageBase64: img });
        if (!result.TextDetections) return false;
        this.orcResults = result.TextDetections;
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
    async handleGeneralFastOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await generalFastOCR({ imageBase64: img });
        if (!result.TextDetections) return false;
        this.orcResults = result.TextDetections;
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
    async handleQrcodeOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await qrcodeOCR({ imageBase64: img });
        if (!result.CodeResults) return false;
        this.orcResults = [{ DetectedText: `二维码内容：${result.CodeResults[0].Url}` }];
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
    async handleTextDetect() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await textDetect({ imageBase64: img });
        this.orcResults = [{ DetectedText: `图片中${result.HasText ? '有' : '没有'}包含文字` }];
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
    async handleGeneralHandwritingOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await generalHandwritingOCR({ imageBase64: img });
        if (!result.TextDetections) return false;
        this.orcResults = result.TextDetections;
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
  }
};
