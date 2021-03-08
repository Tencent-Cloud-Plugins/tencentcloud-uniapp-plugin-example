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
  tableOCR,
  arithmeticOCR,
  formulaOCR,
  eduPaperOCR,
  insuranceBillOCR,
  sealOCR
} from '@/js_sdk/tencentcloud-plugin-ocr';
// 选择图片转换为base64编码
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-ocr/choose-image-2base64.js';

/**
 * 行业文档相关demo列表和调用方法
 */
export default {
  list: {
    title: '行业文档识别',
    child: [
      {
        title: '表格识别',
        fn: 'handleTableOCR'
      },
      {
        title: '算式识别',
        fn: 'handleArithmeticOCR'
      },
      {
        title: '数学公式识别',
        fn: 'handleFormulaOCR'
      },
      {
        title: '数学试题识别',
        fn: 'handleEduPaperOCR'
      },
      {
        title: '保险单据识别',
        fn: 'handleInsuranceBillOCR'
      },
      {
        title: '印章识别',
        fn: 'handleSealOCR'
      }
    ]
  },
  fn: {
    // 表格识别
    async handleTableOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await tableOCR({ imageBase64: img });
        this.orcResults = [{ DetectedText: `excel Base64编码为：${result.Data}` }];
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
    // 算式识别
    async handleArithmeticOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await arithmeticOCR({ imageBase64: img });
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
    // 数学公式识别
    async handleFormulaOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await formulaOCR({ imageBase64: img });
        this.orcResults = result.FormulaInfos;
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
    // 数学试题识别
    async handleEduPaperOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await eduPaperOCR({ imageBase64: img });
        this.orcResults = result.EduPaperInfos;
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
    // 保险单据识别
    async handleInsuranceBillOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await insuranceBillOCR({ imageBase64: img });
        this.orcResults = result.InsuranceBillInfos.map((data) => {
          return { DetectedText: `${data.Name}:${data.Value}` };
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
    // 印章识别
    async handleSealOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await sealOCR({ imageBase64: img });
        this.orcResults = [{ DetectedText: result.SealBody }];
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
