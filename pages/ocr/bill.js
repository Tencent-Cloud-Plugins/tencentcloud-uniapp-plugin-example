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
  vatInvoiceOCR,
  waybillOCR,
  finanBillSliceOCR,
  finanBillOCR,
  vatRollInvoiceOCR,
  tollInvoiceOCR,
  shipInvoiceOCR,
  mixedInvoiceOCR,
  mixedInvoiceDetect,
  invoiceGeneralOCR,
  busInvoiceOCR,
  trainTicketOCR,
  dutyPaidProofOCR,
  taxiInvoiceOCR,
  quotaInvoiceOCR,
  flightInvoiceOCR,
  carInvoiceOCR
} from '@/js_sdk/tencentcloud-plugin-ocr';
// 选择图片转换为base64编码
import chooseImage2Base64 from '@/js_sdk/tencentcloud-plugin-ocr/choose-image-2base64.js';

/**
 * 票据相关demo列表和调用方法
 */
export default {
  list: {
    title: '票据单据识别',
    child: [
      {
        title: '增值税发票识别',
        fn: 'handleVatInvoiceOCR'
      },
      {
        title: '运单识别',
        fn: 'handleWaybillOCR'
      },
      {
        title: '金融票据切片识别',
        fn: 'handleFinanBillSliceOCR'
      },
      {
        title: '金融票据整单识别',
        fn: 'handleFinanBillOCR'
      },
      {
        title: '增值税发票（卷票）识别',
        fn: 'handleVatRollInvoiceOCR'
      },
      {
        title: '过路过桥费发票识别',
        fn: 'handleTollInvoiceOCR'
      },
      {
        title: '轮船票识别',
        fn: 'handleShipInvoiceOCR'
      },
      {
        title: '混贴票据识别',
        fn: 'handleMixedInvoiceOCR'
      },
      {
        title: '混贴票据分类',
        fn: 'handleMixedInvoiceDetect'
      },
      {
        title: '通用机打发票识别',
        fn: 'handleInvoiceGeneralOCR'
      },
      {
        title: '汽车票识别',
        fn: 'handleBusInvoiceOCR'
      },
      {
        title: '火车票识别',
        fn: 'handleTrainTicketOCR'
      },
      {
        title: '完税证明识别',
        fn: 'handleDutyPaidProofOCR'
      },
      {
        title: '出租车发票识别',
        fn: 'handleTaxiInvoiceOCR'
      },
      {
        title: '定额发票识别',
        fn: 'handleQuotaInvoiceOCR'
      },
      {
        title: '机票行程单识别',
        fn: 'handleFlightInvoiceOCR'
      },
      {
        title: '购车发票识别',
        fn: 'handleCarInvoiceOCR'
      }
    ]
  },
  fn: {
    // 增值税发票
    async handleVatInvoiceOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await vatInvoiceOCR({ imageBase64: img });
        this.orcResults = result.VatInvoiceInfos.map((data) => {
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
    // 运单识别
    async handleWaybillOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await waybillOCR({ imageBase64: img });
        this.orcResults = [
          `收件人姓名：${result.TextDetections.RecName.Text}`,
          `收件人电话：${result.TextDetections.RecNum.Text}`,
          `收件人地址：${result.TextDetections.RecAddr.Text}`,
          `寄件人姓名：${result.TextDetections.SenderName.Text}`,
          `寄件人地址：${result.TextDetections.SenderAddr.Text}`,
          `运单号：${result.TextDetections.WaybillNum.Text}`
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
    // 金融票据切片识别
    async handleFinanBillSliceOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await finanBillSliceOCR({ imageBase64: img });
        this.orcResults = result.FinanBillSliceInfos.map((data) => {
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
    // 金融票据整单识别
    async handleFinanBillOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await finanBillOCR({ imageBase64: img });
        this.orcResults = result.FinanBillInfos.map((data) => {
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
    // 增值税发票（卷票）识别
    async handleVatRollInvoiceOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await vatRollInvoiceOCR({ imageBase64: img });
        this.orcResults = result.VatRollInvoiceInfos.map((data) => {
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
    // 过路过桥费发票识别
    async handleTollInvoiceOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await tollInvoiceOCR({ imageBase64: img });
        this.orcResults = result.TollInvoiceInfos.map((data) => {
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
    // 轮船票识别
    async handleShipInvoiceOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await shipInvoiceOCR({ imageBase64: img });
        this.orcResults = result.ShipInvoiceInfos.map((data) => {
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
    // 混贴票据识别
    async handleMixedInvoiceOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await mixedInvoiceOCR({ imageBase64: img });
        this.orcResults = result.MixedInvoiceItems.map((data) => {
          return data.SingleInvoiceInfos.map((data) => {
            return `${data.Name}：${data.Value}`;
          });
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
    // 混贴票据分类
    async handleMixedInvoiceDetect() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await mixedInvoiceDetect({ imageBase64: img });
        this.orcResults = result.InvoiceDetectInfos.map((data) => {
          return invoiceType(data.Type);
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
    // 通用机打发票识别
    async handleInvoiceGeneralOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await invoiceGeneralOCR({ imageBase64: img });
        this.orcResults = result.InvoiceGeneralInfos.map((data) => {
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
    // 汽车票识别
    async handleBusInvoiceOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await busInvoiceOCR({ imageBase64: img });
        this.orcResults = result.BusInvoiceInfos.map((data) => {
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
    // 火车票识别
    async handleTrainTicketOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await trainTicketOCR({ imageBase64: img });
        this.orcResults = [
          `编号：${result.TicketNum}`,
          `出发站：${result.StartStation}`,
          `到达站：${result.DestinationStation}`,
          `出发时间：${result.Date}`,
          `车次：${result.TrainNum}`,
          `座位号：${result.Seat}`,
          `姓名：${result.Name}`,
          `票价：${result.Price}`,
          `席别：${result.SeatCategory}`
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
    // 完税证明识别
    async handleDutyPaidProofOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await dutyPaidProofOCR({ imageBase64: img });
        this.orcResults = result.DutyPaidProofInfos.map((data) => {
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
    // 出租车发票识别
    async handleTaxiInvoiceOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await taxiInvoiceOCR({ imageBase64: img });
        this.orcResults = [
          `发票代码：${result.InvoiceNum}`,
          `发票号码：${result.InvoiceCode}`,
          `日期：${result.Date}`,
          `金额：${result.Fare}`,
          `上车时间：${result.GetOnTime}`,
          `下车时间：${result.GetOffTime}`,
          `里程：${result.Distance}`
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
    // 定额发票识别
    async handleQuotaInvoiceOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await quotaInvoiceOCR({ imageBase64: img });
        this.orcResults = [
          `发票号码：${result.InvoiceNum}`,
          `发票代码：${result.InvoiceCode}`,
          `大写金额：${result.Rate}`
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
    // 机票行程单识别
    async handleFlightInvoiceOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await flightInvoiceOCR({ imageBase64: img });
        this.orcResults = result.FlightInvoiceInfos.map((data) => {
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
    // 购车发票识别
    async handleCarInvoiceOCR() {
      try {
        const img = await chooseImage2Base64();
        uni.showLoading({
          mask: true
        });
        const { result } = await carInvoiceOCR({ imageBase64: img });
        this.orcResults = result.CarInvoiceInfos.map((data) => {
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

// 根据混贴发票type获取对应名称
function invoiceType(type) {
  switch (type) {
    case 0:
      return '出租车发票';
    case 1:
      return '定额发票';
    case 2:
      return '火车票';
    case 3:
      return '增值税发票';
    case 5:
      return '机票行程单';
    case 8:
      return '通用机打发票';
    case 9:
      return '汽车票';
    case 10:
      return '轮船票';
    case 11:
      return '增值税发票（卷票 ）';
    case 12:
      return '购车发票';
    case 13:
      return '过路过桥费发票';
    default:
      return '未知类型';
  }
}
