<template>
  <el-dialog
    title="请刷二代身份证"
    :visible.sync="showDialog"
    class="div-pay-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <div class="print-text">票类名称：{{ticketData.ticketTypeName}}</div>
    <div class="body-div">
      <div class="explain-text">年龄范围：{{ticketData.startAge}} - {{ticketData.endAge}}</div>
      <div class="explain-content">
        <img :src="explainImgSrc" class="explain-img" />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import iSwapIDCard from "@/assets/img/SwapIDCard.png";
import readTicketHelper from "@/utils/readTicketHelper.js";

export default {
  name: "readCert",
  props: {
    value: {
      type: Boolean
    },
    ticketData: {
      type: Object
    }
  },
  data() {
    return {
      showDialog: false,
      currentReadNum: 0,
      totalNum: 0,
      explainImgSrc: iSwapIDCard,
      idCard: {
        idNum: "",
        name: ""
      },
      readInputTimer: null,
      countDownTimer: null
    };
  },
  watch: {
    value: async function(val) {
      this.showDialog = val;
      if (val) {
        this.countDown();
        await this.loopReadInput();
      }
    },
    totalNumProp: function(val) {
      this.totalNum = val;
    }
  },
  methods: {
    async loopReadInput() {
      let self = this;
      this.readInputTimer = setInterval(async () => {
        if (self.idCard.idNum) {
          await self.handleRead("idCard", self.idCard.idNum);
        }
        readTicketHelper.readIdCard(self.idCard);
      }, 250);
    },
    async handleRead(type, value) {
      // 年龄判断
      const age = readTicketHelper.getIdNumAge(this.idCard.idNum);
      if (age < this.ticketData.startAge || age > this.ticketData.endAge) {
        this.$message("身份证年龄不符合，所购票类要求年龄范围");
        return;
      }
      this.$message(value);
      readTicketHelper.playVideo();

      const tourist = {
        name: this.idCard.name,
        certNo: this.idCard.idNum
      };
      this.idCard.idNum = "";
      this.currentReadNum++;
      if (this.currentReadNum >= this.totalNum) {
        await this.$emit("on-success", tourist);
        this.clear();
      } else {
        await this.loopReadInput;
      }
    },
    clear() {
      clearInterval(this.readInputTimer);
      clearInterval(this.countDownTimer);
    },
    countDown() {
      let second = 30;
      let self = this;
      this.countDownTimer = setInterval(() => {
        second--;
        if (second < 1) {
          self.$emit("on-timeout");
          self.clear();
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
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
    width: 70%;
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
  }
  .print-text {
    color: #36de14;
    padding: 6px 0px 18px 0px;
  }
  .explain-text {
    padding: 0px 0px 20px 0px;
  }
}
</style>
