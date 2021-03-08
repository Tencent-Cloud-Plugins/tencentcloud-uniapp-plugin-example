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

import uploadFile from './upload-file';

/**
 * 选择并上传图片到腾讯云COS（需要调用云函数签名，请先配置好云函数）
 * @async
 * @return {Promise<string>} 返回成功上传到COS上的文件名称
 */
export default async function chooseAndUploadImage() {
  const [error, res] = await uni.chooseImage({
    count: 1
  });
  if (error) {
    throw error;
  }
  // #ifdef H5
  if (!/^image/.test(res.tempFiles[0].type)) {
    throw new Error('文件类型错误');
  }
  // #endif
  uni.showLoading({
    mask: true
  });
  try {
    let file = res.tempFilePaths[0];
    // #ifdef H5
    file = res.tempFiles[0];
    // #endif
    const key = await uploadFile(file);
    return key;
  } catch (error) {
    throw error;
  } finally {
    uni.hideLoading();
  }
}
