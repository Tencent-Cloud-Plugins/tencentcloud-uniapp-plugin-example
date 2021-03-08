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

// #ifdef H5
const inputElement = document.createElement('input');
inputElement.type = 'file';
// #endif

/**
 * 选择文件 (仅支持在H5平台运行)
 * @async
 * @param {string} accept - 允许选择的文件类型，比如'image/*'代表只能选择图片，'image/png'代表只能选择PNG图片等，详情请查阅input元素accept属性的相关文档
 * @param {boolean} mutiple - 是否允许选择多个文件
 * @return {Promise<File[]>} 返回用户选择的文件列表
 */
export default function chooseFile(accept, mutiple) {
  return new Promise(async (resolve, reject) => {
    // #ifdef H5
    inputElement.accept = accept || '';
    inputElement.multiple = !!mutiple;
    inputElement.onchange = () => {
      const files = [...inputElement.files];
      inputElement.value = '';
      resolve(files);
    };
    inputElement.click();
    // #endif
    // #ifdef MP
    let error;
    let res;
    if (accept.startsWith('image')) {
      [error, res] = await uni.chooseImage({
        count: 1
      });
    } else if (accept.startsWith('video')) {
      [error, res] = await uni.chooseVideo();
    }
    if (error) {
      reject(error);
    }
    resolve([res]);
    // #endif
    // #ifndef H5 || MP
    reject(new Error('此方法仅支持在H5和小程序平台调用'));
    // #endif
  });
}
