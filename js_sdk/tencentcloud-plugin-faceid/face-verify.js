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
 * 活体人脸核身 https://cloud.tencent.com/document/product/1007/31818
 * @param {object} params
 * @param {string} params.idCard - 身份证号
 * @param {string} params.name - 姓名。中文请使用UTF-8编码
 * @param {string} params.videoBase64 - 用于活体检测的视频，视频的BASE64值；BASE64编码后的大小不超过8M，支持mp4、avi、flv格式
 * @param {string} params.livenessType - 活体检测类型，取值：LIP/ACTION/SILENT。LIP为数字模式，ACTION为动作模式，SILENT为静默模式，三种模式选择一种传入
 * @param {string?} params.validateData - 数字模式传参：数字验证码(1234)，需先调用接口获取数字验证码；动作模式传参：传动作顺序(2,1 or 1,2)，需先调用接口获取动作顺序；静默模式传参：空
 * @param {string?} params.optional - 额外配置，传入JSON字符串
 * @returns {Promise<object>} - 活体人脸核身结果
 */
function livenessRecognition(params) {
  if (!params.idCard || !params.name || !params.videoBase64 || !params.livenessType) {
    throw new Error('请传入必传参数');
  }

  return apis.livenessRecognition(params);
}

/**
 * 活体人脸比对 https://cloud.tencent.com/document/product/1007/31819
 * @param {object} params
 * @param {string} params.imageBase64 - 用于人脸比对的照片，图片的Base64值；Base64编码后的图片数据大小不超过3M，仅支持jpg、png格式
 * @param {string} params.videoBase64 - 用于活体检测的视频，视频的BASE64值；BASE64编码后的大小不超过8M，支持mp4、avi、flv格式
 * @param {string} params.livenessType - 活体检测类型，取值：LIP/ACTION/SILENT。LIP为数字模式，ACTION为动作模式，SILENT为静默模式，三种模式选择一种传入
 * @param {string?} params.validateData - 数字模式传参：数字验证码(1234)，需先调用接口获取数字验证码；动作模式传参：传动作顺序(2,1 or 1,2)，需先调用接口获取动作顺序；静默模式传参：空
 * @param {string?} params.optional - 额外配置，传入JSON字符串
 * @returns {Promise<object>} - 活体人脸比对结果
 */
function livenessCompare(params) {
  if (!params.imageBase64 || !params.videoBase64 || !params.livenessType) {
    throw new Error('请传入必传参数');
  }

  return apis.livenessCompare(params);
}

/**
 * 照片人脸核身 https://cloud.tencent.com/document/product/1007/31820
 * @param {object} params
 * @param {string} params.idCard - 身份证号
 * @param {string} params.name - 姓名。中文请使用UTF-8编码
 * @param {string} params.imageBase64 - 用于人脸比对的照片，图片的Base64值；Base64编码后的图片数据大小不超过3M，仅支持jpg、png格式
 * @returns {Promise<object>} - 照片人脸核身结果
 */
function imageRecognition(params) {
  if (!params.idCard || !params.name || !params.imageBase64) {
    throw new Error('请传入必传参数');
  }

  return apis.imageRecognition(params);
}

/**
 * 获取数字验证码 https://cloud.tencent.com/document/product/1007/31821
 * @returns {Promise<object>} - 获取数字验证码结果
 */
function getLiveCode() {
  return apis.getLiveCode({});
}

/**
 * 获取动作顺序 https://cloud.tencent.com/document/product/1007/31822
 * @returns {Promise<object>} - 获取动作顺序结果
 */
function getActionSequence() {
  return apis.getActionSequence({});
}

export { livenessRecognition, livenessCompare, imageRecognition, getLiveCode, getActionSequence };
