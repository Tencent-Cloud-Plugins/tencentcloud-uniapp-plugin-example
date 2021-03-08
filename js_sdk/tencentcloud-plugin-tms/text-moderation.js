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
 * 文本内容检测（需要调用云函数，请先配置好云函数）
 * @async
 * @param {string} content - 需要识别的文本内容
 * @return {Promise<object>} 识别结果
 */
export default async function textModeration(content) {
  // 调用云函数来检测文本
  const { result } = await uniCloud.callFunction({
    name: 'tencentcloud-plugin',
    data: {
      module: 'TMS',
      action: 'textModeration',
      content
    }
  });
  return result;
}
