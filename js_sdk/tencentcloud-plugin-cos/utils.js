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
 * 通过文件扩展名获取文件多媒体类型
 * @param {string} ext - 文件扩展名，不包含"."字符
 * @return {string} 多媒体类型image/video/audio/other
 */
export function getMediaType(ext) {
  if (/^(jpg|jpeg|png|gif|bmp|webp)$/.test(ext.toLowerCase())) {
    return 'image';
  }
  if (/^(mp4|mpeg|qsv|mov|avi|3gp)$/.test(ext.toLowerCase())) {
    return 'video';
  }
  if (/^(mp3|wma|wav|m4a)$/.test(ext.toLowerCase())) {
    return 'audio';
  }
  return 'other';
}
