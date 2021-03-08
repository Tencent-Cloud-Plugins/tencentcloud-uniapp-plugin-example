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
 * 选择并上传视频到腾讯云COS（需要调用云函数签名，请先配置好云函数）
 * @async
 * @return {Promise<string>} 返回成功上传到COS上的文件名称
 */
export default async function chooseAndUploadVideo() {
  const [error, res] = await uni.chooseVideo();
  if (error) {
    throw error;
  }
  // #ifdef H5
  if (!/^video/.test(res.tempFile.type)) {
    throw new Error('文件类型错误');
  }
  // #endif
  uni.showLoading({
    mask: true
  });
  try {
    let file = res.tempFilePath;
    // #ifdef H5
    file = res.tempFile;
    // #endif
    const key = await uploadFile(file);
    return key;
  } catch (error) {
    throw error;
  } finally {
    uni.hideLoading();
  }
}
