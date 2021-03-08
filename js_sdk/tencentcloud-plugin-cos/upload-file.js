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

import UUID from 'uuid';
import { getMediaType } from './utils';

/**
 * 上传文件到腾讯云COS（需要调用云函数签名，请先配置好云函数）
 * @async
 * @param {string|File} file - 需要上传的文件，小程序环境选择的filePath或H5环境选择的File对象
 * @param {string?} key - 存储在COS上的文件名称，如果不传，则会生成uuid代替
 * @param {function?} onProgressUpdate - 上传进度回调，回调参数详见uni.uploadFile API
 * @return {Promise<string>} 返回成功上传到COS上的文件名称
 */
export default async function uploadFile(file, key, onProgressUpdate) {
  if (!file) {
    throw new Error('file不能为空');
  }
  // 获取签名信息
  const { result } = await uniCloud.callFunction({
    name: 'tencentcloud-plugin',
    data: {
      module: 'COS',
      action: 'signPostObjectAPI'
    }
  });
  const signData = result;
  return new Promise((resolve, reject) => {
    let filePath = undefined;
    let fileExt;
    if (typeof file === 'string') {
      filePath = file;
      file = undefined;
      fileExt = filePath.split('?')[0].split('.').pop();
    } else {
      fileExt = file.name.split('.').pop();
    }
    // 支付宝小程序上传文件API必传fileType
    // 通过支付宝小程序环境下选择文件的时候，通过返回的filePath取得的扩展名可能是image/video/audio
    let fileType = undefined;
    // ifdef MP-ALIPAY
    if (fileExt === 'image') {
      fileExt = 'jpg';
    } else if (fileExt === 'video') {
      fileExt = 'mp4';
    } else if (fileExt === 'audio') {
      fileExt = 'mp3';
    }
    fileType = getMediaType(fileExt);
    // endif
    if (!key) {
      key = `${UUID.v1()}.${fileExt}`;
    }
    const uploadTask = uni.uploadFile({
      url: signData.host,
      file,
      filePath,
      fileType,
      name: 'file',
      formData: {
        key,
        'q-sign-algorithm': signData.signAlgorithm,
        'q-ak': signData.ak,
        'q-key-time': signData.keyTime,
        'q-signature': signData.signature,
        policy: signData.policy
      },
      success(response) {
        if (response.statusCode !== 204) {
          reject(new Error('文件上传失败'));
        } else {
          resolve(key);
        }
      },
      fail(error) {
        // 支付宝小程序环境下会将返回的204状态码识别为异常而触发fail回调，实际上是上传成功了的
        if (error.statusCode === 204) {
          resolve(key);
        } else {
          reject(error);
        }
      }
    });
    onProgressUpdate && uploadTask.onProgressUpdate(onProgressUpdate);
  });
}
