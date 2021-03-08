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

import {
  mlidPassportOCR,
  mainlandPermitOCR,
  hmtResidentPermitOCR,
  residenceBookletOCR,
  propOwnerCertOCR,
  businessCardOCR,
  bizLicenseOCR,
  bankCardOCR,
  orgCodeCertOCR,
  institutionOCR,
  estateCertOCR,
  enterpriseLicenseOCR,
  passportOCR,
  permitOCR,
  idCardOCR
} from '@/js_sdk/tencentcloud-plugin-ocr';
// 选择图片转换为base64编码
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-ocr/choose-image-2base64.js';

/**
 * 卡证文字相关demo列表和调用方法
 */
export default {
  list: {
    title: '卡证文字识别',
    child: [
      {
        title: '护照识别（港澳台地区及境外护照）',
        fn: 'handleMLIDPassportOCR'
      },
      {
        title: '港澳台来往内地通行证识别',
        fn: 'handleMainlandPermitOCR'
      },
      {
        title: '港澳台居住证识别',
        fn: 'handleHmtResidentPermitOCR'
      },
      {
        title: '户口本识别',
        fn: 'handleResidenceBookletOCR'
      },
      {
        title: '房产证识别',
        fn: 'handlePropOwnerCertOCR'
      },
      {
        title: '名片识别',
        fn: 'handleBusinessCardOCR'
      },
      {
        title: '营业执照识别',
        fn: 'handleBizLicenseOCR'
      },
      {
        title: '银行卡识别',
        fn: 'handleBankCardOCR'
      },
      {
        title: '组织机构代码证识别',
        fn: 'handleOrgCodeCertOCR'
      },
      {
        title: '事业单位法人证书识别',
        fn: 'handleInstitutionOCR'
      },
      {
        title: '不动产权证识别',
        fn: 'handleEstateCertOCR'
      },
      {
        title: '企业证照识别',
        fn: 'handleEnterpriseLicenseOCR'
      },
      {
        title: '护照识别（中国大陆地区护照）',
        fn: 'handlePassportOCR'
      },
      {
        title: '港澳台通行证识别',
        fn: 'handlePermitOCR'
      },
      {
        title: '身份证识别',
        fn: 'handleIDCardOCR'
      }
    ]
  },
  fn: {
    // 护照识别（港澳台地区及境外护照）
    async handleMLIDPassportOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await mlidPassportOCR({
          imageBase64: img,
          retImage: true
        });
        this.orcResults = [
          `护照ID：${result.ID}`,
          `姓名：${result.Name}`,
          `出生日期：${result.DateOfBirth}`,
          `性别（F女，M男）：${result.Sex}`,
          `有效期：${result.DateOfExpiration}`,
          `发行国：${result.IssuingCountry}`,
          `国籍：${result.Nationality}`
        ];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 港澳台来往内地通行证识别
    async handleMainlandPermitOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await mainlandPermitOCR({
          imageBase64: img
        });
        this.orcResults = [
          `姓名：${result.Name}`,
          `英文姓名：${result.EnglishName}`,
          `证件号：${result.Number}`,
          `性别：${result.Sex}`,
          `有效期限：${result.ValidDate}`,
          `签发机关：${result.IssueAuthority}`,
          `签发地点：${result.IssueAddress}`,
          `出生日期：${result.Birthday}`
        ];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 港澳台居住证识别
    async handleHmtResidentPermitOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await hmtResidentPermitOCR({
          imageBase64: img
        });
        this.orcResults = [
          `证件姓名：${result.Name}`,
          `性别：${result.Sex}`,
          `出生日期：${result.Birth}`,
          `地址：${result.Address}`,
          `身份证号：${result.IdCardNo}`
        ];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 户口本识别
    async handleResidenceBookletOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await residenceBookletOCR({
          imageBase64: img
        });
        this.orcResults = [
          `姓名：${result.Name}`,
          `性别：${result.Sex}`,
          `出生地：${result.BirthPlace}`,
          `民族：${result.Nation}`,
          `籍贯：${result.NativePlace}`,
          `出生日期：${result.BirthDate}`,
          `公民身份证件编号：${result.IdCardNumber}`,
          `文化程度：${result.EducationDegree}`,
          `服务处所：${result.ServicePlace || '无'}`
        ];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 房产证识别
    async handlePropOwnerCertOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await propOwnerCertOCR({
          imageBase64: img
        });
        this.orcResults = [
          `房地产权利人：${result.Owner}`,
          `共有情况：${result.Possession}`,
          `登记时间：${result.RegisterTime}`,
          `规划用途：${result.Purpose}`,
          `房屋性质：${result.Nature}`,
          `房地坐落：${result.Location}`
        ];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 名片识别
    async handleBusinessCardOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await businessCardOCR({
          imageBase64: img
        });
        this.orcResults = result.BusinessCardInfos.map((data) => {
          return `${data.Name}：${data.Value}`;
        });
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 营业执照识别
    async handleBizLicenseOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await bizLicenseOCR({
          imageBase64: img
        });
        this.orcResults = [
          `注册号：${result.RegNum}`,
          `名称：${result.Name}`,
          `类型：${result.Type}`,
          `住所：${result.Address}`,
          `法定代表人：${result.Person}`,
          `注册资本：${result.Capital}`,
          `营业期限：${result.Period}`,
          `成立日期：${result.SetDate}`,
          `经营范围：${result.Business}`
        ];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 银行卡识别
    async handleBankCardOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await bankCardOCR({
          imageBase64: img
        });
        this.orcResults = [`银行：${result.BankInfo}`, `银行卡号：${result.CardNo}`];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 组织机构代码证识别
    async handleOrgCodeCertOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await orgCodeCertOCR({
          imageBase64: img
        });
        this.orcResults = [
          `代码：${result.OrgCode}`,
          `机构名称：${result.Name}`,
          `地址：${result.Address}`,
          `有效期：${result.ValidDate}`
        ];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 事业单位法人证书识别
    async handleInstitutionOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await institutionOCR({
          imageBase64: img
        });
        this.orcResults = [
          `注册号：${result.RegId}`,
          `有效期：${result.ValidDate}`,
          `住所：${result.Location}`,
          `名称：${result.Name}`,
          `法定代表人：${result.LegalPerson}`
        ];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 不动产权证识别
    async handleEstateCertOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await estateCertOCR({
          imageBase64: img
        });
        this.orcResults = [
          `权利人：${result.Obligee}`,
          `共有情况：${result.Ownership}`,
          `坐落：${result.Location}`,
          `不动产单元号：${result.Unit}`,
          `权利类型：${result.Type}`,
          `权利性质：${result.Property}`,
          `用途：${result.Usage}`,
          `面积：${result.Area}`,
          `使用期限：${result.Term}`,
          `图片旋转角度：${result.Angle}`,
          `不动产权号：${result.Number}`
        ];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 企业证照识别
    async handleEnterpriseLicenseOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await enterpriseLicenseOCR({
          imageBase64: img
        });
        this.orcResults = result.EnterpriseLicenseInfos.map((data) => {
          return `${data.Name}：${data.Value}`;
        });
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 护照识别
    async handlePassportOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await passportOCR({
          imageBase64: img
        });
        this.orcResults = [
          `国家码：${result.Country}`,
          `护照号：${result.PassportNo}`,
          `性别：${result.Sex}`,
          `国籍：${result.Nationality}`,
          `出生日期：${result.BirthDate}`,
          `出生地点：${result.BirthPlace}`,
          `签发日期：${result.IssueDate}`,
          `有效期：${result.ExpiryDate}`,
          `最下方第一行 MRZ Code 序列：${result.CodeSet}`,
          `最下方第二行 MRZ Code 序列：${result.CodeCrc}`,
          `姓名：${result.Name}`,
          `姓：${result.FamilyName}`,
          `名：${result.FirstName}`
        ];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 港澳台通行证识别
    async handlePermitOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await permitOCR({
          imageBase64: img
        });
        this.orcResults = [
          `姓名：${result.Name}`,
          `英文姓名：${result.EnglishName}`,
          `证件号：${result.Number}`,
          `性别：${result.Sex}`,
          `有效期限：${result.ValidDate}`,
          `签发机关：${result.IssueAuthority}`,
          `签发地点：${result.IssueAddress}`,
          `出生日期：${result.Birthday}`
        ];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    },
    // 身份证识别
    async handleIDCardOCR(carside) {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await idCardOCR({
          imageBase64: img
        });
        this.orcResults = [
          `姓名（人像面）：${result.Name}`,
          `性别（人像面）：${result.Sex}`,
          `民族（人像面）：${result.Nation}`,
          `出生日期（人像面）：${result.Birth}`,
          `地址（人像面）：${result.Address}`,
          `身份证号（人像面）：${result.IdNum}`,
          `发证机关（国徽面）：${result.Authority}`,
          `证件有效期（国徽面）：${result.ValidDate}`
        ];
        this.$refs.popup.open();
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        uni.hideLoading();
      }
    }
  }
};
