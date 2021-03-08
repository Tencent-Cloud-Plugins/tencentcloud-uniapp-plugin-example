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
 * 人脸检测与分析 https://cloud.tencent.com/document/product/867/44989
 * @param {object} params
 * @param {integer?} params.maxFaceNum - 最多处理的人脸数目。默认值为1（仅检测图片中面积最大的那张人脸），最大值为120。
 * @param {integer?} params.minFaceSize - 人脸长和宽的最小尺寸，单位为像素。默认为34。建议不低于34。低于MinFaceSize值的人脸不会被检测
 * @param {string?} params.image - 图片 base64 数据，base64 编码后大小不可超过5M。jpg格式长边像素不可超过4000，其他格式图片长边像素不可超2000。支持PNG、JPG、JPEG、BMP，不支持 GIF 图片
 * @param {string？} params.url - 图片的 url 。对应图片 base64 编码后大小不可超过5M。jpg格式长边像素不可超过4000，其他格式图片长边像素不可超2000。url、image必须提供一个，如果都提供，只使用 url
 * @param {integer?} params.needFaceAttributes - 是否需要返回人脸属性信息（FaceAttributesInfo）。0 为不需要返回，1 为需要返回。默认为 0
 * @param {integer?} params.needQualityDetection - 是否开启质量检测。0 为关闭，1 为开启。默认为 0。非 1 值均视为不进行质量检测
 * @param {string?} params.faceModelVersion - 人脸识别服务所用的算法模型版本
 * @param {integer?} params.needRotateDetection - 是否开启图片旋转识别支持。0为不开启，1为开启。默认为0
 * @returns {Promise<object>} - 人脸检测与分析结果
 */
function getDetectFaceResult(params) {
  if (!params.image && !params.url) {
    throw new Error('image和url必须传一个');
  }

  return apis.detectFace(params);
}

/**
 * 人脸比对 https://cloud.tencent.com/document/product/867/44987
 * @param {object} params
 * @param {string？} params.imageA - A 图片 base64 数据，base64 编码后大小不可超过5M
 * @param {string？} params.imageB - B 图片 base64 数据，base64 编码后大小不可超过5M
 * @param {string？} params.urlA - A 图片的 url ，对应图片 base64 编码后大小不可超过5M，url、image必须提供一个，如果都提供，只使用 url
 * @param {string？} params.urlB - B 图片的 url ，对应图片 base64 编码后大小不可超过5M，url、image必须提供一个，如果都提供，只使用 url
 * @param {string?} params.faceModelVersion - 人脸识别服务所用的算法模型版本
 * @param {integer?} params.qualityControl - 图片质量控制。0: 不进行控制；1:较低的质量要求 2: 一般的质量要求 3: 较高的质量要求 4: 很高的质量要求 默认 0
 * @param {integer?} params.needRotateDetection - 是否开启图片旋转识别支持。0为不开启，1为开启。默认为0
 * @returns {Promise<object>} - 人脸比对结果
 */
function getCompareFaceResult(params) {
  if ((!params.imageA && !params.urlA) || (!params.imageB && !params.urlB)) {
    throw new Error('两张图片的image和url必须提供一个');
  }

  return apis.compareFace(params);
}

export { getDetectFaceResult, getCompareFaceResult };
