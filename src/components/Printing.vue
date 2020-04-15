<template>
  <el-dialog
    title="正在打印"
    :visible.sync="showPrintDialog"
    class="div-pay-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <div class="print-text">当前打印第{{currentPrintNum}}张，共{{totalNum}}张</div>
  </el-dialog>
</template>

<script>
export default {
  name: "printing",
  props: {
    value: {
      type: Boolean
    },
    currentPrintNumProp: {
      type: Number
    },
    totalNumProp: {
      type: Number
    }
  },
  data() {
    return {
      showPrintDialog: false,
      currentPrintNum: 0,
      totalNum: 0
    };
  },
  watch: {
    value: function(val) {
      this.showPrintDialog = val;
    },
    currentPrintNumProp: function(val) {
      this.currentPrintNum = val;
    },
    totalNumProp: function(val) {
      this.totalNum = val;
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
  }
  .print-text {
    color: #36de14;
    padding: 160px 0px 180px 0px;
  }
}
</style>
