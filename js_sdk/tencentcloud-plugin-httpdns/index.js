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

/**
 * 获取移动解析结果
 * @param {*} params
 * @param {string} params.domainName - 需要解析的域名
 * @param {string?} params.ip - 用户ip
 * @param {number?} params.ttl - 是否返回递归服务器缓存时间 1:返回
 * @param {number?} params.clientip - 是否返回用户公网出口IP 1:返回
 * @param {boolean}  param.isEnc - 是否加密 true(调用企业版API): 加密 false:不加密(调用免费版API)
 */
async function describeDnsResult({ domainName, ip, ttl, clientip, isEnc }) {
  const domainReg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
  if (!domainName || !domainReg.test(domainName)) {
    throw new Error('请传入正确的域名');
  }

  if (typeof isEnc !== 'boolean') {
    throw new Error('请确认是否加密');
  }

  const { result } = await uniCloud.callFunction({
    name: 'tencentcloud-plugin',
    data: {
      module: 'HTTPDNS',
      action: 'describeDnsResult',
      domainName,
      ip,
      ttl,
      clientip,
      isEnc
    }
  });

  return result;
}

export { describeDnsResult };
