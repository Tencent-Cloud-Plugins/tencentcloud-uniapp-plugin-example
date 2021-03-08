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

import getVoicePoint from './get-voice-point.js';
import randStr from './rand-str.js';
import { blob2Base64, blob2ArrayBuffer } from './blob-transfer';
import Recorder from './recorder.js';
import RealTimeVoiceSplit from './real-time-voice-split.js';

export {
  getVoicePoint, // 获取语音评测信息
  randStr, // 生成n位随机码
  blob2Base64, // blob文件转换base64格式
  blob2ArrayBuffer, // blob文件转换ArrayBuffer格式
  Recorder, // 录音类，通过Recorder.getRec()进行进行调用
  RealTimeVoiceSplit // 实时语音数据分片类
};
