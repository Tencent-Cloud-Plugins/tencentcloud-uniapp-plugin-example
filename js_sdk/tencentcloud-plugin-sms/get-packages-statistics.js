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
 * 获取腾讯云SMS产品套餐包状态（需要调用云函数，请先配置好云函数）
 * @async
 * @param {number} limit - 最大上限(需要拉取的套餐包个数)
 * @return {Promise<object>} 短信套餐包状态信息，详见文档 https://cloud.tencent.com/document/api/382/39533
 */
export default async function getPackageStatus(limit = 10) {
  // 调用云函数来查询状态
  const { result } = await uniCloud.callFunction({
    name: 'tencentcloud-plugin',
    data: {
      module: 'SMS',
      action: 'getPackagesStatistics',
      limit
    }
  });
  return result;
}
