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

import apis from './api';

/**
 * 身份证人像照片验真 https://cloud.tencent.com/document/product/1007/47276
 * @param {object} params
 * @param {string?} params.imageBase64 - 身份证人像面的 Base64 值支持的图片格式：PNG、JPG、JPEG，支持的图片大小：所下载图片经Base64编码后不超过 7M。ImageBase64、ImageUrl二者必须提供其中之一。若都提供了，则按照ImageUrl>ImageBase64的优先级使用参数
 * @param {string?} params.imageUrl - 身份证人像面的 Url 地址,支持的图片格式：PNG、JPG、JPEG。支持的图片大小：所下载图片经 Base64 编码后不超过 3M。图片下载时间不超过 3 秒
 * @param {string?} params.config - 活体检测类型，取值：LIP/ACTION/SILENT。LIP为数字模式，ACTION为动作模式，SILENT为静默模式，三种模式选择一种传入
 * @returns {Promise<object>} - 身份证人像照片验真结果
 */
function checkIdCardInformation(params) {
  if (!params.imageBase64 && !params.imageUrl) {
    throw new Error('imageBase64和imageUrl必须传一个');
  }

  return apis.checkIdCardInformation(params);
}

/**
 * 身份证识别及信息核验 https://cloud.tencent.com/document/product/1007/37980
 * @param {object} params
 * @param {string?} params.idCard - 身份证号,姓名和身份证号、ImageBase64、ImageUrl三者必须提供其中之一。若都提供了，则按照姓名和身份证号>ImageBase64>ImageUrl的优先级使用参数。
 * @param {string?} params.name - 姓名
 * @param {string?} params.imageBase64 - 身份证人像面的 Base64 值支持的图片格式：PNG、JPG、JPEG，暂不支持 GIF 格式。支持的图片大小：所下载图片经Base64编码后不超过 3M
 * @param {string?} params.imageUrl - 身份证人像面的 Url 地址支持的图片格式：PNG、JPG、JPEG，暂不支持 GIF 格式。支持的图片大小：所下载图片经Base64编码后不超过 3M
 * @returns {Promise<object>} - 身份证识别及信息核验结果
 */
function idCardOCRVerification(params) {
  if ((!params.idCard || !params.name) && !params.imageBase64 && !params.imageUrl) {
    throw new Error('姓名和身份证号、imageBase64、imageUrl三者必须传一个');
  }

  return apis.idCardOCRVerification(params);
}

export { checkIdCardInformation, idCardOCRVerification };
