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
import { filePath2Base64, blob2Base64 } from './util.js';

/**
 * 选择视频为Base64格式输出
 * @return {Promise<string>} 返回图片的Base64编码
 */
export default async function chooseVideo2Base64() {
  return new Promise(async (resolve, reject) => {
    const [error, res] = await uni.chooseVideo({
      sourceType: ['camera'],
      compressed: false,
      maxDuration: 6,
      count: 1,
      camera: 'front'
    });
    if (res.size > 3 * 1024 * 1024) {
      return reject(new Error('视频文件不能大于3M'));
    }
    if (error) {
      return reject(new Error(error.errMsg));
    }
    const tempFilePath = res.tempFilePath;
    // #ifdef MP
    uni.getFileSystemManager().readFile({
      filePath: tempFilePath,
      encoding: 'base64',
      success: ({ data }) => {
        resolve(data);
      }
    });
    // #endif
    // #ifndef MP
    reject(new Error('暂时只支持微信小程序'));
    // #endif
  });
}
