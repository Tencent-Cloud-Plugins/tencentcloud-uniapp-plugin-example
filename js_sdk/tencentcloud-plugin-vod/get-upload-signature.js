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

/**
 * 获取文件上传签名（需要调用云函数，请先配置好云函数）
 * @async
 * @return {Promise<string>} 签名信息
 */
export default async function getUploadSignature(callback) {
  // 调用云函数来获取签名信息
  const { result } = await uniCloud.callFunction({
    name: 'tencentcloud-plugin',
    data: {
      module: 'VOD',
      action: 'getUploadSignature'
    }
  });
  // #ifdef H5
  return result;
  // #endif
  // #ifdef MP-WEIXIN
  return callback(result);
  // #endif
}
