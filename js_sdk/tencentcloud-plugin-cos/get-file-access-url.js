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
 * 获取腾讯云COS私有读文件的访问地址（需要调用云函数签名，请先配置好云函数）
 * @async
 * @param {string} key - 腾讯云COS上的文件名称
 * @return {Promise<string>} 腾讯云COS文件key的访问地址
 */
export default async function getFileAccessUrl(key) {
  const { result } = await uniCloud.callFunction({
    name: 'tencentcloud-plugin',
    data: {
      module: 'COS',
      action: 'getObjectURL',
      key
    }
  });
  return result;
}
