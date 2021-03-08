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
 * 获取口语评测信息（需要调用云函数，请先配置好云函数)  详见文档 https://cloud.tencent.com/document/api/884/32605
 * @async
 * @param {string} voiceData - 用户语音数据(BASE64格式),当workMode==0 && isEnd===1时，voiceData可为空字符串；
 * @param {string} refText -  被评估语音对应的文本
 * @param {object} option - 语音评测相关配置参数
 * @param {Integer?} option.seqId -  语音分包序号，从1开始, 非流式时无意义
 * @param {Integer?} option.isEnd - 分包传输结束标志 0:未完成 1:完成 流式时为1返回评测信息，非流式时无意义
 * @param {string} option.sessionId - 语音段唯一标识
 * @param {Integer?} option.workMode - 语音输入模式，0：流式分片，1：非流式一次性评估
 * @param {Integer?} option.evalMode	- 评估模式 0：词模式 1：句子模式 2 ：段落模式 3：自由说模式 4：单词纠错模式
 * @param {Float?} option.scoreCoeff - 评价难度指数 取值为[1.0 - 4.0]范围内的浮点数，用于平滑不同年龄段的分数，1.0为小年龄段，4.0为最高年龄段
 * @param {string?} option.soeAppId - 是用来方便客户管理服务的参数，新的 SoeAppId 可以在控制台【应用管理】下新建
 * @param {Integer?} option.storageMode - 音频存储模式
 * @param {Integer?} option.sentenceInfoEnabled - 输出断句中间结果标识，0：不输出，1：输出
 * @param {Integer?} option.serverType - 评估语言 0：英文，1：中文
 * @param {Integer?} option.textMode - 输入文本模式，0: 普通文本，1：音素结构文本。2：音素注册模式
 * @return {Promise<object | null>} 评测信息
 */
export default async function getVoicePoint(voiceData, refText, option = {}) {
  if ((option.isEnd !== 1 && !voiceData) || !refText || !option.sessionId) {
    throw new Error('缺少必传参数');
  }

  // 默认参数
  const defaultOption = {
    seqId: 1,
    isEnd: 0,
    workMode: 1,
    evalMode: 0,
    scoreCoeff: 2,
    storageMode: 0,
    sentenceInfoEnabled: 0,
    serverType: 0,
    textMode: 0
  };

  const param = Object.assign(
    {
      voiceData,
      refText
    },
    defaultOption,
    option
  );

  // 调用云函数来获取口语评测-语音评测信息
  const { result } = await uniCloud.callFunction({
    name: 'tencentcloud-plugin',
    data: {
      module: 'SOE',
      action: 'getVoicePoint',
      param
    }
  });
  return result;
}
