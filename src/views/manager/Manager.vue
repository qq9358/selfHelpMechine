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
        <div class="div-operation">
          <div class="operation-row">
            <div class="operation-col" @click="onSetting">
              <div class="col-i">
                <i class="el-icon-setting" />
              </div>
              <div class="col-text">系统设置</div>
            </div>
            <div class="operation-col" @click="onReprint">
              <div class="col-i">
                <i class="el-icon-s-ticket" />
              </div>
              <div class="col-text">重印门票</div>
            </div>
            <div class="operation-col" @click="onPrintTest">
              <div class="col-i">
                <i class="el-icon-printer" />
              </div>
              <div class="col-text">打印测试票</div>
            </div>
          </div>
          <div class="operation-row">
            <div class="operation-col-second" @click="onPause">
              <div class="col-i">
                <i class="el-icon-video-pause" />
              </div>
              <div class="col-text">暂停服务</div>
            </div>
            <div class="operation-col-second" @click="onReset">
              <div class="col-i">
                <i class="el-icon-refresh" />
              </div>
              <div class="col-text">重启</div>
            </div>
            <div class="operation-col-second" @click="onClose">
              <div class="col-i">
                <i class="el-icon-switch-button" />
              </div>
              <div class="col-text">退出程序</div>
            </div>
          </div>
        </div>
      </div>
      <div class="button-back-div">
        <el-button icon="el-icon-refresh-left" class="back-button" @click="onBack">返回</el-button>
      </div>
    </div>
    <ticket-footer />
  </div>
</template>

<script>
import iExplainImg from "./../../assets/img/ReadQrAndIDCard.png";
import TicketFooter from "./../../components/TicketFooter.vue";
import Logo from "@/components/Logo.vue";
import validator from "@/utils/validator.js";

export default {
  name: "BuyTicket",
  components: {
    TicketFooter,
    Logo
  },
  data() {
    return {
      titleOne: "系统管理"
    };
  },
  created() {},
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onSetting() {
      this.$router.push({
        name: "setting"
      });
    },
    onReprint() {
      this.$message(validator.errorMessage("未找到要打印的门票"));
    },
    onPrintTest() {
      this.$router.push({
        name: "print"
      });
    },
    onPause() {
      this.$router.push({
        name: "pauseService"
      });
    },
    onReset() {
      location.reload(true);
    },
    onClose() {
      var userAgent = navigator.userAgent;
      if (
        userAgent.indexOf("Firefox") != -1 ||
        userAgent.indexOf("Chrome") != -1
      ) {
        window.location.href = "about:blank";
        window.close();
      } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
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
    .div-operation {
      .operation-row {
        display: flex;
        justify-content: space-around;
        .operation-col {
          width: 282px;
          border: 1px solid;
          padding: 90px 20px 90px 20px;
        }
        .operation-col-second {
          width: 282px;
          border-left: 1px solid;
          border-right: 1px solid;
          border-bottom: 1px solid;
          padding: 100px 20px 100px 20px;
        }
        .col-i {
          font-size: 70px;
          padding: 0px 0px 15px 0px;
        }
        .col-text {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
