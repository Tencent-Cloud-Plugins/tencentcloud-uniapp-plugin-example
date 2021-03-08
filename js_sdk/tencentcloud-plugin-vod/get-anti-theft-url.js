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
 * 获取云点播文件防盗链链接（需要调用云函数，请先配置好云函数）
 * @async
 * @param {string} mediaUrl - 云点播文件地址
 * @return {Promise<string>} 云点播文件完整url（包含签名）
 */
export default async function getAntiTheftURL(mediaUrl) {
  // 调用云函数来获取媒体信息
  const { result } = await uniCloud.callFunction({
    name: 'tencentcloud-plugin',
    data: {
      module: 'VOD',
      action: 'getAntiTheftURL',
      mediaUrl
    }
  });
  return result;
}
