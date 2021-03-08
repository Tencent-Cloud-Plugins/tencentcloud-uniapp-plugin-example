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
 * 图像质量评估 https://cloud.tencent.com/document/product/865/36899
 * @param {object} params
 * @param {string} params.imageUrl - 图片URL地址, 图片格式：PNG、JPG、JPEG。
 * @param {string} params.imageBase64 - 图片需要base64编码，并且要去掉编码头部
 * @returns {Promise<object>} - 图像识别结果
 */
function assessQuality({ imageUrl, imageBase64 }) {
  return apis.assessQuality({ imageUrl, imageBase64 });
}

/**
 * 恶心检测 https://cloud.tencent.com/document/product/865/38897
 * @param {object} params
 * @param {string} params.imageUrl - 图片URL地址, 图片格式：PNG、JPG、JPEG。
 * @param {string} params.imageBase64 - 图片需要base64编码，并且要去掉编码头部
 * @returns {Promise<object>} - 图像识别结果
 */
function detectDisgust({ imageUrl, imageBase64 }) {
  return apis.detectDisgust({ imageUrl, imageBase64 });
}

/**
 * 不良行为识别 https://cloud.tencent.com/document/product/865/38898
 * @param {object} params
 * @param {string} params.imageUrl - 图片URL地址, 图片格式：PNG、JPG、JPEG。
 * @param {string} params.imageBase64 - 图片需要base64编码，并且要去掉编码头部
 * @returns {Promise<object>} - 图像识别结果
 */
function detectMisbehavior({ imageUrl, imageBase64 }) {
  return apis.detectMisbehavior({ imageUrl, imageBase64 });
}

/**
 * 图像标签 https://cloud.tencent.com/document/product/865/35471
 * @param {object} params
 * @param {string} params.imageUrl - 图片URL地址, 图片格式：PNG、JPG、JPEG。
 * @param {string} params.imageBase64 - 图片需要base64编码，并且要去掉编码头部
 * @param {Array<string>} params.scenes - 本次调用支持的识别场景,默认为WEB。 WEB，针对网络图片优化; CAMERA，针对手机摄像头拍摄图片优化; ALBUM，针对手机相册、网盘产品优化; NEWS，针对新闻、资讯、广电等行业优化；
 * @returns {Promise<object>} - 图像识别结果
 */
function detectLabel({ imageUrl, imageBase64, scenes }) {
  return apis.detectLabel({ imageUrl, imageBase64, scenes });
}

/**
 * 车辆识别 https://cloud.tencent.com/document/product/865/36456
 * @param {object} params
 * @param {string} params.imageUrl - 图片URL地址, 图片格式：PNG、JPG、JPEG。
 * @param {string} params.imageBase64 - 图片需要base64编码，并且要去掉编码头部
 * @returns {Promise<object>} - 图像识别结果
 */
function recognizeCar({ imageUrl, imageBase64 }) {
  return apis.recognizeCar({ imageUrl, imageBase64 });
}

/**
 * 商品识别 https://cloud.tencent.com/document/product/865/36457
 * @param {object} params
 * @param {string} params.imageUrl - 图片URL地址, 图片格式：PNG、JPG、JPEG。
 * @param {string} params.imageBase64 - 图片需要base64编码，并且要去掉编码头部
 * @returns {Promise<object>} - 图像识别结果
 */
function detectProduct({ imageUrl, imageBase64 }) {
  return apis.detectProduct({ imageUrl, imageBase64 });
}

/**
 * 公众人物识别 https://cloud.tencent.com/document/product/865/36900
 * @param {object} params
 * @param {string} params.imageUrl - 图片URL地址, 图片格式：PNG、JPG、JPEG。
 * @param {string} params.imageBase64 - 图片需要base64编码，并且要去掉编码头部
 * @returns {Promise<object>} - 图像识别结果
 */
function detectCelebrity({ imageUrl, imageBase64 }) {
  return apis.detectCelebrity({ imageUrl, imageBase64 });
}

/**
 * 图像清晰度增强 https://cloud.tencent.com/document/product/865/36902
 * @param {object} params
 * @param {string} params.imageUrl - 图片URL地址, 图片格式：PNG、JPG、JPEG。
 * @param {string} params.imageBase64 - 图片需要base64编码，并且要去掉编码头部
 * @returns {Promise<object>} - 图像识别结果
 */
function enhanceImage({ imageUrl, imageBase64 }) {
  return apis.enhanceImage({ imageUrl, imageBase64 });
}

/**
 * 图片智能裁剪 https://cloud.tencent.com/document/product/865/38899
 * @param {object} params
 * @param {string} params.imageUrl - 图片URL地址, 图片格式：PNG、JPG、JPEG。
 * @param {string} params.imageBase64 - 图片需要base64编码，并且要去掉编码头部
 * @param {integer} params.width - 需要裁剪区域的宽度，与Height共同组成所需裁剪的图片宽高比例；输入数字请大于0、小于图片宽度的像素值；
 * @param {integer} params.height - 需要裁剪区域的高度，与Width共同组成所需裁剪的图片宽高比例；输入数字请请大于0、小于图片高度的像素值；
 * @returns {Promise<object>} - 图像识别结果
 */
function cropImage({ imageUrl, imageBase64, width, height }) {
  if (!width || !height) {
    throw new Error('需要传入裁剪区域的宽高比例');
  }
  return apis.cropImage({ imageUrl, imageBase64, width, height });
}

export {
  assessQuality,
  detectDisgust,
  detectMisbehavior,
  detectLabel,
  recognizeCar,
  detectProduct,
  detectCelebrity,
  enhanceImage,
  cropImage
};
