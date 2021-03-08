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

import apis from './api';

/**
 * 文本翻译 https://cloud.tencent.com/document/api/551/15619
 * @param {object} params
 * @param {string} params.sourceText -待翻译的文本，文本统一使用utf-8格式编码,html标记等非常规翻译文本可能会翻译失败。单次请求的文本长度需要低于2000
 * @param {string} params.source - 源语言
 * @param {string} params.target - 目标语言
 * @param {integer？} params.projectId - 项目ID，可以根据控制台-账号中心-项目管理中的配置填写
 * @param {string?} params.untranslatedText - 用来标记不希望被翻译的文本内容，如句子中的特殊符号、人名、地名等；每次请求只支持配置一个不被翻译的单词；仅支持配置人名、地名等名词，不要配置动词或短语，否则会影响翻译结果
 * @returns {Promise<object>} - 文本翻译结果
 */
function getTextTranslateResult(params) {
  if (!params.sourceText || !params.source || !params.target) {
    throw new Error('请传入必传参数');
  }

  if (params.sourceText.length > 2000) {
    throw new Error('单次请求的文本长度需要低于2000');
  }
  // 设置默认参数
  params = Object.assign(
    {
      projectId: 0
    },
    params
  );
  return apis.textTranslate(params);
}

/**
 * 批量文本翻译 https://cloud.tencent.com/document/api/551/40566
 * @param {object} params
 * @param {array<string>} params.sourceTextList -待翻译的文本列表，批量接口可以以数组方式在一次请求中填写多个待翻译文本，文本统一使用utf-8格式编码,html标记等非常规翻译文本可能会翻译失败。单次请求的文本长度需要低于2000
 * @param {string} params.source - 源语言
 * @param {string} params.target - 目标语言
 * @param {integer？} params.projectId - 项目ID，可以根据控制台-账号中心-项目管理中的配置填写
 * @returns {Promise<object>} - 文本翻译结果
 */
function getTextTranslateBatchResult(params) {
  if (!params.sourceTextList || !params.source || !params.target) {
    throw new Error('请传入必传参数');
  }

  // 设置默认参数
  params = Object.assign(
    {
      projectId: 0
    },
    params
  );
  return apis.textTranslateBatch(params);
}

/**
 * 语种识别 https://cloud.tencent.com/document/api/551/15620
 * @param {object} params
 * @param {string} params.text - 待识别的文本，文本统一使用utf-8格式编码，非utf-8格式编码字符会翻译失败。单次请求的文本长度需要低于2000。
 * @param {integer？} params.projectId - 项目ID，可以根据控制台-账号中心-项目管理中的配置填写
 * @returns {Promise<object>} - 文本翻译结果
 */
function getLanguageDetectResult(params) {
  if (!params.text) {
    throw new Error('请传入必传参数');
  }

  // 设置默认参数
  params = Object.assign(
    {
      projectId: 0
    },
    params
  );
  return apis.languageDetect(params);
}

export { getTextTranslateResult, getTextTranslateBatchResult, getLanguageDetectResult };
