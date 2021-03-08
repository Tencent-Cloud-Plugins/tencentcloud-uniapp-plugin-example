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
import { toUpperCase } from './util.js';

function apis() {}

// API创建公共方法
function apiCreater(name) {
  if (!name) new Error('请传入人脸识别对应Action名称');
  return async function (args) {
    try {
      // 将参数key的首字母大写
      const payload = toUpperCase(args);
      // 调用云函数来进行图像识别
      const { result } = await uniCloud.callFunction({
        name: 'tencentcloud-plugin',
        data: {
          module: 'IAI',
          action: 'getIaiResult',
          name,
          payload
        }
      });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  };
}

const functionNames = ['DetectFace', 'CompareFace'];

// 方法注册
for (let i = 0; i < functionNames.length; i++) {
  const name = functionNames[i];
  apis[name.charAt(0).toLowerCase() + name.slice(1)] = apiCreater(functionNames[i]);
}

export default apis;
