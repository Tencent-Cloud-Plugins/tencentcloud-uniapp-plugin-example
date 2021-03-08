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
 * 获取基础语音合成结果（需要调用云函数，请先配置好云函数)  详见文档 https://cloud.tencent.com/document/product/1073/37995
 * @async
 * @param {object} param - 语音合成相关配置参数
 * @param {string} param.Text - 合成语音的源文本，按UTF-8编码统一计算。中文最大支持110个汉字（全角标点符号算一个汉字）；英文最大支持350个字母（半角标点符号算一个字母）；
 * @param {string} param.SessionId -  一次请求对应一个SessionId，会原样返回，建议传入类似于uuid的字符串防止重复
 * @param {integer?} param.ModelType -  模型类型，1-默认模型
 * @param {float?} param.Volume - 音量大小，范围：[0，10]，分别对应11个等级的音量，默认为0，代表正常音量。没有静音选项。输入除以上整数之外的其他参数不生效，按默认值处理。
 * @param {float?} param.Speed - 语速，范围：[-2，2]，分别对应不同语速
 * @param {integer?} param.ProjectId - 项目id，用户自定义，默认为0
 * @param {integer?} param.VoiceType	- 音色
 * @param {integer?} param.PrimaryLanguage - 主语言类型 1：中文（默认） 2：英文
 * @param {integer?} param.SampleRate - 音频采样率：16000：16k（默认）8000：8k
 * @param {string?} param.Codec - 返回音频格式，可取值：wav（默认），mp3
 * @return {Promise<object | null>} 评测信息
 */
export default async function getTtsResult(param) {
  if (!param.Text || !param.SessionId) {
    throw new Error('缺少必传参数');
  }

  param = Object.assign(
    {
      ModelType: 1
    },
    param
  );

  // 调用云函数来获取基础语音合成结果
  const { result } = await uniCloud.callFunction({
    name: 'tencentcloud-plugin',
    data: {
      module: 'TTS',
      action: 'getTtsResult',
      param
    }
  });
  return result;
}
