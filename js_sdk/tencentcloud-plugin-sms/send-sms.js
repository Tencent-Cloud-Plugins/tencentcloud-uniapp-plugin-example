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
 * 发送短信（需要调用云函数，请先配置好云函数）
 * @async
 * @param {string[]} phoneNumbers - 手机号列表
 * @param {string} templateId - 短信模板ID
 * @param {string[]} templateParams - 短信模板参数列表
 * @return {Promise<object>} 短信发送状态信息，详见文档 https://cloud.tencent.com/document/api/382/38778
 */
export default async function sendSMS(phoneNumbers, templateId, templateParams) {
  if (!phoneNumbers || !phoneNumbers.length || !templateId) {
    throw new Error('手机号码和短信模板ID为必传参数');
  }
  // 自动为无前缀手机号码添加+86前缀
  const processedPhoneNumbers = phoneNumbers.map((item) => {
    if (item.startsWith('+')) {
      return item;
    }
    return `+86${item}`;
  });
  // 调用云函数来发送短信
  const { result } = await uniCloud.callFunction({
    name: 'tencentcloud-plugin',
    data: {
      module: 'SMS',
      action: 'sendSMS',
      phoneNumbers: processedPhoneNumbers,
      templateId,
      templateParams
    }
  });
  return result;
}
