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
        <div class="tab-div">
          <el-table
            ref="selectTable"
            :data="ticketDatas"
            class="select-tab"
            stripe
            @selection-change="ticketSelectChange"
          >
            <el-table-column type="selection" min-width="40" />
            <el-table-column prop="rowNum" label="序号" min-width="40" />
            <el-table-column prop="ticketTypeName" label="票类" min-width="90" />
            <el-table-column prop="ticketCode" label="票号" min-width="145" />
            <el-table-column prop="personNum" label="人数" min-width="40" />
            <el-table-column prop="reaMoney" label="金额" min-width="60" />
            <el-table-column prop="ctime" label="起始日期" min-width="100" />
            <el-table-column prop="etime" label="截止日期" min-width="100" />
          </el-table>
        </div>
        <div class="div-pagination">
          <el-pagination background layout="prev,pager,next" :total="ticketDatas.length" />
        </div>
      </div>
      <div class="button-back-div">
        <el-button icon="el-icon-printer" class="print-button" @click="printerTickets">确认打印</el-button>
        <el-button icon="el-icon-refresh-left" class="back-button" @click="onBack">返回</el-button>
      </div>
    </div>
    <printing
      v-model="showPrintDialog"
      :currentPrintNumProp="currentPrintNum"
      :totalNumProp="totalNum"
    />
    <ticket-footer />
  </div>
</template>

<script>
import canvasHelper from "@/utils/canvasHelper.js";
import readTicketHelper from "@/utils/readTicketHelper.js";
import validator from "@/utils/validator.js";
import Logo from "@/components/Logo.vue";
import Printing from "@/components/Printing.vue";
import TicketFooter from "./../../components/TicketFooter.vue";

export default {
  name: "HelloWorld",
  components: {
    TicketFooter,
    Logo,
    Printing
  },
  props: {
    ticketDatas: {
      type: Array
    }
  },
  data() {
    return {
      titleOne: "选择取票",
      selections: [],
      showPrintDialog: false,
      currentPrintNum: 0,
      totalNum: 0,
      printState: "",
      companyName: "陈典火雨中国有限公司",
      distributorName: "小芬同学",
      salePointName: "自助售票机1号"
    };
  },
  created() {
  },
  methods: {
    onBack() {
      this.$router.go({
        name: 'index'
      });
    },
    ticketSelectChange(val) {
      this.selections = val;
    },
    async printerTickets() {
      if (this.selections.length < 1) {
        this.$message(validator.errorMessage("请先选择要打印的门票"));
        return;
      }
      this.totalNum = this.selections.length;
      this.currentPrintNum = 0;
      this.showPrintDialog = true;
      let tickets = [];
      for (let i = 0; i < this.selections.length; i++) {
        tickets.push(this.setPrintTicket(this.selections[i]));
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
        reaMoney: ticketData.reaMoney,
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
    .tab-div {
      .select-tab {
        font-size: 17px;
        width: 100%;
        /deep/ .el-checkbox__inner {
          width: 18px;
          height: 18px;
        }
        /deep/ .el-checkbox {
          font-size: 22px;
        }
        /deep/ .el-checkbox__inner::after {
          height: 10px;
          left: 6px;
        }
        /deep/ .el-checkbox__inner::before {
          top: 7px;
        }
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
  .button-back-div {
    flex-direction: row;
    justify-content: flex-end;
    .print-button {
      font-size: 35px;
      padding: 25px 40px 25px 40px;
      color: #ffffff;
      border: 0px;
      border-radius: 15px;
      margin-right: 30px;
      background: #0095ff;
    }
  }
}
</style>
