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
  vehicleLicenseOCR,
  licensePlateOCR,
  driverLicenseOCR,
  vinOCR,
  vehicleRegCertOCR
} from '@/js_sdk/tencentcloud-plugin-ocr';
// 选择图片转换为base64编码
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-ocr/choose-image-2base64.js';

/**
 * 汽车相关demo列表和调用方法
 */
export default {
  list: {
    title: '汽车相关识别',
    child: [
      {
        title: '行驶证识别（主页）',
        fn: 'handleVehicleLicenseOCR'
      },
      {
        title: '行驶证识别（副页）',
        fn: 'handleVehicleLicenseBackOCR'
      },
      {
        title: '车牌识别',
        fn: 'handleLicensePlateOCR'
      },
      {
        title: '驾驶证识别',
        fn: 'handleDriverLicenseOCR'
      },
      {
        title: '车辆VIN码识别',
        fn: 'handleVinOCR'
      },
      {
        title: '机动车登记证书识别',
        fn: 'handleVehicleRegCertOCR'
      }
    ]
  },
  fn: {
    // 行驶证识别（主页）
    async handleVehicleLicenseOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await vehicleLicenseOCR({
          imageBase64: img,
          cardSide: 'FRONT'
        });
        this.orcResults = [
          `号牌号码：${result.FrontInfo.PlateNo}`,
          `车辆类型：${result.FrontInfo.VehicleType}`,
          `所有人：${result.FrontInfo.Owner}`,
          `住址：${result.FrontInfo.Address}`,
          `使用性质：${result.FrontInfo.UseCharacter}`,
          `品牌型号：${result.FrontInfo.Model}`,
          `印章信息：${result.FrontInfo.Seal}`,
          `车辆识别代号：${result.FrontInfo.Vin}`,
          `发动机号码：${result.FrontInfo.EngineNo}`,
          `注册日期：${result.FrontInfo.RegisterDate}`,
          `发证日期：${result.FrontInfo.IssueDate}`
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
    // 行驶证识别（副页）
    async handleVehicleLicenseBackOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await vehicleLicenseOCR({
          imageBase64: img,
          cardSide: 'BACK'
        });
        this.orcResults = [
          `号牌号码：${result.BackInfo.PlateNo}`,
          `档案编号：${result.BackInfo.FileNo}`,
          `核定载人数：${result.BackInfo.AllowNum}`,
          `总质量：${result.BackInfo.TotalMass}`,
          `整备质量：${result.BackInfo.CurbWeight}`,
          `检验记录：${result.BackInfo.Record}`,
          `核定载质量：${result.BackInfo.LoadQuality}`,
          `外廓尺寸：${result.BackInfo.ExternalSize}`,
          `准牵引总质量：${result.BackInfo.TotalQuasiMass}`
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
    // 车牌识别
    async handleLicensePlateOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await licensePlateOCR({
          imageBase64: img,
          cardSide: 'BACK'
        });
        this.orcResults = [`车牌号码：${result.Number}`];
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
    // 驾驶证识别
    async handleDriverLicenseOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await driverLicenseOCR({ imageBase64: img });
        this.orcResults = [
          `姓名：${result.Name}`,
          `性别：${result.Sex}`,
          `国籍：${result.Nationality}`,
          `证件号码：${result.CardCode}`,
          `住址：${result.Address}`,
          `出生日期：${result.DateOfBirth}`,
          `初次领证日期：${result.DateOfFirstIssue}`,
          `准驾车型：${result.Class}`,
          `有效期限：${result.StartDate}至${result.EndDate}`
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
    // 车辆VIN码识别
    async handleVinOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await vinOCR({ imageBase64: img });
        this.orcResults = [`车辆VIN码：${result.Vin}`];
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
    // 机动车登记证书识别
    async handleVehicleRegCertOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await vehicleRegCertOCR({ imageBase64: img });
        this.orcResults = result.VehicleRegCertInfos.map((data) => {
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
    }
  }
};
