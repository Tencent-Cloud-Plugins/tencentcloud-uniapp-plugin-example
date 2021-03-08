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
// 性别 [0~49]为女性，[50，100]为男性
export const genderOption = {
  gap: 50,
  types: ['女性', '男性']
};

// 表情 [0-40] 正常，[40-60] 微笑 [60-100] 大笑
export const expressionOption = {
  gap: [40, 60],
  types: ['正常', '微笑', '大笑']
};

// 识别是否佩戴眼镜
export const glassOption = {
  true: '有',
  false: '无'
};

// 识别是否戴帽子
export const hatOption = {
  true: '有',
  false: '无'
};

// 识别是否戴口罩
export const maskOption = {
  true: '有',
  false: '无'
};

// 识别是否睁眼
export const eyeOpenOption = {
  true: '是',
  false: '否'
};

// 发型
export const hairOption = {
  length: {
    0: '光头',
    1: '短发',
    2: '中发',
    3: '长发',
    4: '绑发'
  },
  bang: {
    0: '有刘海',
    1: '无刘海'
  },
  color: {
    0: '黑色',
    1: '金色',
    2: '棕色',
    3: '灰白色'
  }
};
