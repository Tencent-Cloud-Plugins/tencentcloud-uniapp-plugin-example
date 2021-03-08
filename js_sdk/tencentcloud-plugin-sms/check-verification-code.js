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
 * 校验短信验证码（需要调用云函数，请先配置好云函数）
 * @async
 * @param {string} phoneNumber - 手机号码
 * @param {string} verificationCode - 验证码
 * @return {Promise<void>} 验证码校验结果（无异常代表校验成功）
 */
export default async function checkVerificationCode(phoneNumber, verificationCode) {
  if (!phoneNumber || !verificationCode) {
    throw new Error('手机号码和验证码必传');
  }
  // 调用云函数来校验验证码
  await uniCloud.callFunction({
    name: 'tencentcloud-plugin',
    data: {
      module: 'SMS',
      action: 'checkVerificationCode',
      phoneNumber,
      verificationCode
    }
  });
}
