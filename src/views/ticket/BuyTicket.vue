<template>
  <div class="query-ticket-div">
    <div class="background-div">
      <div class="head-div">
        <logo />
        <div class="title-div">
          <div class="title-one">{{titleOne}}</div>
        </div>
      </div>
      <div class="body-div">
        <div class="ticket-type">
          <div class="ticket-type-name">票类</div>
          <div class="ticket-type-price">单价</div>
          <div class="ticket-type-num">数量</div>
          <div class="ticket-type-amount">金额</div>
        </div>
        <div class="div-table">
          <!-- <div class="div-thead">
            <div class="thead-div-name">票类</div>
            <div class="thead-div-price">单价</div>
            <div class="thead-div-num">数量</div>
            <div class="thead-div-amount">金额</div>
          </div>-->
          <div class="div-tbody">
            <div v-for="trow in currentTicketDatas" :key="trow.ticketTypeId" class="div-trow">
              <div class="div-tcol-name">{{trow.ticketTypeName}}</div>
              <div class="div-tcol-price">{{trow.unitPrice.toFixed(2)}}</div>
              <div class="div-tcol-num">
                <el-input-number
                  v-model="trow.quantity"
                  @change="quantityChange(trow.ticketTypeId)"
                  :min="0"
                  :max="trow.maxBuyNum"
                  size="large"
                />
              </div>
              <div class="div-tcol-amount">{{trow.amount.toFixed(2)}}</div>
            </div>
          </div>
        </div>
        <div class="div-total">
          <div class="div-total-num">
            <div class="total-num-text">总数量：</div>
            <div class="total-num-value">{{totalNum}}</div>
            <div class="total-num-text">张</div>
          </div>
          <div class="div-total-amount">
            <div class="total-amount-text">总金额：</div>
            <div class="total-amount-value">{{totalAmount.toFixed(2)}}</div>
          </div>
        </div>
        <!-- <div class="div-page">
          <div class="page-button">上一页</div>
          <div class="page-num">{{currentPage}}/{{totalPage}}</div>
          <div class="page-button">下一页</div>
        </div>-->
        <div class="div-pagination">
          <el-pagination
            background
            layout="prev,pager,next"
            :total="ticketDatas.length"
            :page-size="pageSize"
            @current-change="currentPageChange"
          />
        </div>
      </div>
      <div class="button-back-div">
        <el-button icon="el-icon-refresh-left" class="back-button" @click="onBack">返回</el-button>
        <el-button class="wechat-button" @click="onPayClick('微信')">
          <div class="div-button-slot">
            <div class="div-button-icon">
              <i class="iconfont icon-icon-test" />
            </div>
            <div class="div-button-text">微信支付</div>
          </div>
        </el-button>
        <el-button class="alipay-button" @click="onPayClick('支付宝')">
          <div class="div-button-slot">
            <div class="div-button-icon">
              <i class="iconfont icon-alipay" />
            </div>
            <div class="div-button-text">支付宝支付</div>
          </div>
        </el-button>
      </div>
      <el-dialog
        :title="payTitle"
        :visible.sync="showPayDialog"
        class="div-pay-dialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div class="pay-type-text">{{payTypeName}}扫码付款</div>
        <div class="div-qr-code">
          <img :src="qrCodeSrc" class="qr-code-img" />
        </div>
        <div class="div-expire">
          <div class="expire-text">{{expireSeconds}}</div>
          <div>秒后将关闭</div>
        </div>
        <div class="pay-explain">付款过程中请务关闭窗口</div>
      </el-dialog>

      <!-- <canvas ref="canvasTest" style="display: none" /> -->
    </div>
    <printing
      v-model="showPrintDialog"
      :currentPrintNumProp="currentPrintNum"
      :totalNumProp="totalNum"
    />
    <read-cert
      v-model="showReadCert"
      :ticket-data="currentReadTicketData"
      @on-success="onReadCertSuccess"
      @on-timeout="onReadCertTimeout"
    />
    <ticket-footer />
  </div>
</template>

<script>
import TicketFooter from "./../../components/TicketFooter.vue";
import Logo from "@/components/Logo.vue";
import Printing from "@/components/Printing.vue";
import ReadCert from "@/components/ReadCert.vue";
import qrCodeHelper from "@/utils/qrCodeHelper.js";
import validator from "@/utils/validator.js";
import canvasHelper from "@/utils/canvasHelper.js";
import readTicketHelper from "@/utils/readTicketHelper.js";
import ticketTypeService from "@/services/ticketTypeService.js";
import paymentService from "@/services/paymentService.js";
import orderService from "@/services/orderService.js";
import dayjs from "dayjs";

export default {
  name: "BuyTicket",
  components: {
    TicketFooter,
    Logo,
    Printing,
    ReadCert
  },
  data() {
    return {
      titleOne: "票类选择",
      ticketDatas: [
        {
          ticketTypeId: 1,
          ticketTypeName: "成人票",
          unitPrice: 12.34,
          quantity: 0,
          amount: 0,
          personNum: "1    人"
        },
        {
          ticketTypeId: 2,
          ticketTypeName: "学生票",
          unitPrice: 23.4,
          quantity: 0,
          amount: 0,
          personNum: "2    人"
        },
        {
          ticketTypeId: 3,
          ticketTypeName: "学生票",
          unitPrice: 34,
          quantity: 0,
          amount: 0,
          personNum: "3    人"
        }
      ],
      currentTicketDatas: [],
      totalNum: 0,
      totalAmount: 0,
      currentPage: 1,
      totalPage: 3,
      showPayDialog: false,
      payTitle: "支付0.01元",
      payTypeName: "微信",
      payTypeId: 0,
      expireSeconds: 5,
      qrCodeSrc: "",
      payTimer: -1,
      companyName: "陈典火雨中国有限公司",
      distributorName: "小芬同学",
      salePointName: "自助售票机1号",
      ticket: {
        ticketTypeName: "成人票",
        eTime: "2020-03-15 17:59:59",
        personNum: "2    人",
        ticketCode: "JN23412341234",
        companyName: "陈典火雨中国有限公司",
        cTime: "2020-03-14 12:00:03",
        distributorName: "小芬同学",
        reaMoney: 23.56,
        salePointName: "自助售票机1号"
      },
      currentVideo: 0,
      showPrintDialog: false,
      currentPrintNum: 0,
      printState: "",
      pageSize: 5,
      listNo: "",
      currentReadNum: 0,
      alreadyReadNum: 0,
      currentReadTicketData: {},
      showReadCert: false
    };
  },
  async created() {
    await this.getTicketDatas();
  },
  methods: {
    async getTicketDatas() {
      const ticketTypes = await ticketTypeService.getTicketTypesForSelfHelpAsync(
        {
          publicSaleFlag: true
        }
      );
      if (ticketTypes) {
        this.ticketDatas = ticketTypes.map(d => {
          return {
            ticketTypeId: d.id,
            ticketTypeName: d.name,
            unitPrice: d.price,
            quantity: 0,
            amount: 0,
            personNum: "1    人",
            needCertFlag: d.needCertFlag,
            startAge: 10,
            endAge: 45,
            tourists: [],
            minBuyNum: d.minBuyNum,
            maxBuyNum: d.maxBuyNum
          };
        });
        this.getCurrentTicketDatas(1);
      }
    },
    getCurrentTicketDatas(currentPage) {
      this.currentTicketDatas = [];
      for (
        let i = (currentPage - 1) * this.pageSize;
        i < currentPage * this.pageSize;
        i++
      ) {
        if (i < this.ticketDatas.length) {
          this.currentTicketDatas.push(this.ticketDatas[i]);
        }
      }
    },
    onBack() {
      this.$router.go(-1);
    },
    quantityChange(changeTicketTypeId) {
      let ticketData = null;
      this.totalNum = 0;
      this.totalAmount = 0;
      for (let i = 0; i < this.ticketDatas.length; i++) {
        ticketData = this.ticketDatas[i];
        if (ticketData.ticketTypeId === changeTicketTypeId) {
          ticketData.amount = ticketData.quantity * ticketData.unitPrice;
        }
        this.totalNum += ticketData.quantity;
        this.totalAmount += ticketData.amount;
      }
    },
    currentPageChange(event) {
      this.getCurrentTicketDatas(event);
    },
    async onPayClick(event) {
      if (this.totalAmount <= 0) {
        this.$message(validator.errorMessage("请先选择要支付的票类数量"));
      } else {
        this.payTypeName = event;
        this.currentReadNum = 0;
        this.alreadyReadNum = 0;
        this.startReadCert();
      }
    },
    startReadCert() {
      let ticketData = this.ticketDatas[this.currentReadNum++];
      console.log(ticketData);
      if (ticketData.quantity > 0 && ticketData.needCertFlag) {
        this.currentReadTicketData = ticketData;
        this.showReadCert = true;
      } else {
        this.startReadCert();
      }
    },
    async onReadCertSuccess(tourist) {
      this.showReadCert = false;
      this.currentReadTicketData.tourists.push(tourist);

      this.$message("读取身份证成功");
      this.alreadyReadNum++;
      if (this.alreadyReadNum === this.totalNum) {
        await this.createOrder();
        await this.startPay();
        clearInterval(this.readCertTimer);
      } else {
        let self = this;
        setTimeout(function() {
          self.startReadCert();
        }, 2000);
      }
    },
    onReadCertTimeout() {
      this.showReadCert = false;
      self.$message("读取身份证信息超时，请重新发起订单");
      clearInterval(self.readCertTimer);
    },
    async createOrder() {
      const createOrderInput = {
        travelDate: dayjs().toDateString(),
        items: this.ticketDatas.filter(a => a.quantity > 0)
      };
      const createResult = await orderService.createSelfHelpOrderAsync(
        createOrderInput
      );
      this.listNo = createResult.listNo;
      if (createResult.shouldPay) {
        this.showPayDialog = true;
      }
    },
    async startPay() {
      if (this.payTypeName === "微信") {
        await this.weChatPay();
        readTicketHelper.playVideo("请使用微信扫码付款");
      } else {
        await this.aliPay();
        readTicketHelper.playVideo("请使用支付宝扫码付款");
      }

      this.expireSeconds = 555;
      this.showPayDialog = true;
      this.payTitle = `支付 ${this.totalAmount.toFixed(2)} 元`;
      this.payTimer = setInterval(async () => {
        this.expireSeconds--;
        if (this.expireSeconds < 1) {
          this.$message("订单支付超时，请重新发起订单");
          this.clear();
          this.showPayDialog = false;
        }
        const netPayResult = await paymentService.getNetPayOrderAsync(
          this.listNo
        );
        if (netPayResult.paySuccess) {
          this.$message("订单支付成功");
          this.showPayDialog = false;
          await this.onClose();
        }
      }, 1000);
    },

    async weChatPay() {
      const payResult = await paymentService.nativePayAsync({
        listNo: this.listNo,
        payTypeId: 8
      });
      this.qrCodeSrc = await qrCodeHelper.createQrCodeAsync(payResult, 300);
    },
    async aliPay() {
      const payResult = await paymentService.nativePayAsync({
        listNo: this.listNo,
        payTypeId: 9
      });
      this.qrCodeSrc = await qrCodeHelper.createQrCodeAsync(payResult, 300);
    },
    clear() {
      clearInterval(this.payTimer);
    },
    beforeRouteLeave(to, from, next) {
      this.clear();
      next();
    },
    async onClose() {
      this.clear();
      this.showPrintDialog = true;
      await this.printerTickets();
    },
    async printerTickets() {
      let tickets = [];
      for (let i = 0; i < this.ticketDatas.length; i++) {
        for (let j = 0; j < this.ticketDatas[i].quantity; j++) {
          tickets.push(this.setPrintTicket(this.ticketDatas[i]));
        }
      }

      readTicketHelper.playVideo("交易正在进行请稍后");
      this.printState = "未开始";
      let printTimer = setInterval(async () => {
        if (this.printState != "") {
          this.printState = "";
          if (this.currentPrintNum >= this.totalNum) {
            clearInterval(printTimer);
            this.showPrintDialog = false;
            this.currentPrintNum = 0;
            this.$router.replace({
              name: "printSuccess"
            });
          } else {
            await this.printerTicket(tickets[this.currentPrintNum++]);
          }
        }
      }, 250);
    },
    setPrintTicket(ticketData) {
      let dateNow = new Date();
      let validDate = new Date();
      validDate = new Date(validDate.setDate(dateNow.getDate() + 1));
      let ticket = {
        ticketTypeName: ticketData.ticketTypeName,
        eTime: validDate.toLocaleString(),
        personNum: ticketData.personNum,
        ticketCode: "JN23412341234",
        companyName: this.companyName,
        cTime: dateNow.toLocaleString(),
        distributorName: this.distributorName,
        reaMoney: ticketData.unitPrice,
        salePointName: this.salePointName,
        changCi: "上午第一场",
        seat: "A区3排4号"
      };
      return ticket;
    },
    async printerTicket(ticket) {
      // let myCanvas = document.createElement("canvas");
      // let image = new Image();
      // image.src = await canvasHelper.setCanvas(myCanvas, ticket);

      let buf = await canvasHelper.getPrinterArray(ticket);
      let self = this;
      if (process.env.NODE_ENV === "production") {
        window.bridge.webAPI_print(buf, function(res) {
          self.$message(res.state);
          self.printState = res.state;
        });
      } else {
        self.printState = "dn";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.background-div {
  .head-div {
    .title-div {
      .title-one {
        padding: 270px 0px 80px 0px;
        font-size: 55px;
        color: #f1c801;
      }
    }
  }
  .body-div {
    padding: 20px 20px 20px 20px;
    margin-left: 60px;
    margin-right: 60px;
    background: #a0b7dd;
    font-size: 30px;
    .ticket-type {
      background: #004b75;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      color: #ffffff;
      padding: 20px;
      font-size: 25px;
      display: flex;
      justify-content: space-around;
      .ticket-type-name {
        padding: 0px 30px 0px 30px;
      }
      .ticket-type-price {
        padding: 0px 20px 0px 20px;
      }
      .ticket-type-num {
        padding: 0px 10px 0px 10px;
      }
      .ticket-type-amount {
        padding: 0px 20px 0px 20px;
      }
    }
    .explain-content {
      background: #ffffff;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      padding: 150px 50px 150px 50px;
    }
    .div-table {
      .div-thead {
        display: flex;
        justify-content: space-around;
        .thead-div-name {
          width: 30%;
        }
        .thead-div-price {
          width: 20%;
        }
        .thead-div-num {
          width: 30%;
        }
        .thead-div-amount {
          width: 20%;
        }
      }
      .div-tbody {
        .div-trow {
          display: flex;
          justify-content: space-around;
          background: #f1f0e9;
          padding: 20px 0px 20px 0px;
          align-items: center;
          border-bottom: 1px solid #c7c7c7;
          .div-tcol-name {
            width: 30%;
          }
          .div-tcol-price {
            width: 20%;
            color: #ff0000;
          }
          .div-tcol-num {
            width: 30%;
          }
          .div-tcol-amount {
            width: 20%;
            color: #ff0000;
          }
          /deep/ .el-input__inner {
            font-size: 30px;
          }
          /deep/ .el-input-number__decrease,
          .el-input-number__increase {
            font-size: 30px;
          }
          /deep/ .el-input-number__increase {
            font-size: 30px;
          }
        }
      }
    }
    .div-total {
      padding: 30px 50px 30px 50px;
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      font-size: 35px;
      border-bottom: 1px solid #555555;
      .div-total-num {
        display: flex;
        .total-num-text {
        }
        .total-num-value {
          color: #ff0000;
          font-size: 40px;
          padding: 3px 6px 0px 3px;
        }
      }
      .div-total-amount {
        display: flex;
        .total-amount-text {
        }
        .total-amount-value {
          color: #ff0000;
          font-size: 40px;
          padding: 3px 3px 0px 3px;
        }
      }
    }
    .div-page {
      padding: 20px 0px 25px 0px;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      .page-button {
        padding: 10px 30px 10px 30px;
        background: #004b75;
        color: #ffffff;
      }
      .page-num {
        padding: 0px 15px 0px 15px;
      }
    }
    .div-pagination {
      padding: 10px 0px 0px 0px;
      /deep/ .el-pager li {
        padding: 0 14px;
        font-size: 20px;
        height: 34px;
        line-height: 34px;
      }
      /deep/ .el-icon {
        font-size: 20px;
      }
      /deep/ .el-pagination button {
        height: 34px;
        line-height: 34px;
        min-width: 36px;
      }
    }
  }
  .div-pay-dialog {
    /deep/ .el-dialog__body {
      font-size: 36px;
    }
    /deep/ .el-dialog__title {
      font-size: 40px;
    }
    /deep/ .el-dialog__headerbtn {
      font-size: 36px;
      border-radius: 50px;
      width: 46px;
      border: 2px solid #ffffff;
      color: #ffffff;
    }
    /deep/ .el-dialog {
      background: #004b75;
      width: 60%;
    }
    /deep/ .el-dialog__title {
      color: #ffffff;
    }
    /deep/ .el-dialog__headerbtn .el-dialog__close {
      color: #ffffff;
    }
    /deep/ .el-dialog__body {
      background: #ffffff;
    }
    /deep/ .el-dialog__header {
      padding: 30px 20px 30px 40px;
      text-align: left;
      margin-top: 33vh;
    }
    .pay-type-text {
      color: #36de14;
    }
    .div-qr-code {
      width: 300px;
      margin: 0 auto;
    }
    .div-expire {
      display: flex;
      justify-content: center;
      .expire-text {
        color: #ff0000;
        padding: 6px 1px 0px 0px;
      }
    }
    .pay-explain {
      padding: 20px 0px 0px 0px;
      color: #b34708;
    }
  }
}
</style>
