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
        <div class="div-tabs">
          <div class="tabs-head">
            <div
              :class="{'tabs-head-div': true, 'tabs-head-selected': currentTab === 0}"
              @click="onTabsClick(0)"
            >身份证取票</div>
            <div
              :class="{'tabs-head-div': true, 'tabs-head-selected': currentTab === 1}"
              @click="onTabsClick(1)"
            >二维码取票</div>
            <div
              :class="{'tabs-head-div': true, 'tabs-head-selected': currentTab === 2}"
              @click="onTabsClick(2)"
            >订单号取票</div>
          </div>
          <div v-if="currentTab === 0" class="tab-body">
            <div class="div-tab-img">
              <img :src="idGetSrc" class="tab-img" />
            </div>
            <div class="div-tab-explain">请将二代身份证置于下方识别区</div>
          </div>
          <div v-if="currentTab === 1" class="tab-body">
            <div class="div-tab-img">
              <img :src="qrGetSrc" class="tab-img" />
            </div>
            <div class="div-tab-explain">请在下方二维码扫描窗口展示取票二维码</div>
          </div>
          <div v-if="currentTab === 2" class="tab-body">
            <div class="div-form">
              <div class="div-input">
                <div class="input-label">{{listNo.label}}</div>
                <div class="input-content">
                  <el-input
                    v-model="listNo.vmodel"
                    placeholder="请输入订单号"
                    @focus="onFocus('listNo')"
                  />
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">{{mobile.label}}</div>
                <div class="input-content">
                  <el-input
                    v-model="mobile.vmodel"
                    placeholder="请输入订票手机号码"
                    @focus="onFocus('mobile')"
                  />
                </div>
              </div>
              <keyboard
                v-if="showKeyboard"
                v-model="currentInputValue"
                @on-input="onInput"
                @on-enter="onEnter"
              />
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
import iIdGetImg from "./../../assets/img/SwapIDCard.png";
import iQrGetImg from "./../../assets/img/ScanQrCode.png";
import TicketFooter from "./../../components/TicketFooter.vue";
import Keyboard from "./../../components/Keyboard.vue";
import Logo from "@/components/Logo.vue";
import readTicketHelper from "@/utils/readTicketHelper.js";
import validator from "@/utils/validator.js";

export default {
  name: "HelloWorld",
  components: {
    TicketFooter,
    Keyboard,
    Logo
  },
  data() {
    return {
      titleOne: "网络取票",
      explainOne: "请使用门票二维码或二代证查询门票信息",
      explainImgSrc: iExplainImg,
      footerText: "服务电话：13203007572",
      currentTab: 0,
      idGetSrc: iIdGetImg,
      qrGetSrc: iQrGetImg,
      listNo: {
        vmodel: "",
        label: "取票号"
      },
      mobile: {
        vmodel: "",
        label: "手机号"
      },
      currentInput: "listNo",
      currentInputValue: "",
      showKeyboard: true,
      readQrCodeTimer: undefined,
      readIdCardTimer: undefined,
      idCard: {
        idNum: ""
      },
      ticket: {
        qrCode: ""
      }
    };
  },
  created() {
    this.onTabsClick(this.currentTab);
  },
  beforeRouteLeave(to, from, next) {
    this.clear();
    next();
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onTabsClick(a) {
      this.currentTab = a;
      this.clear();
      switch (a) {
        case 0:
          this.readIdCard();
          break;
        case 1:
          this.readQrCode();
          break;
        default:
          console.log("default");
      }
    },
    onFocus(a) {
      if (a !== this.currentInput) {
        this.showKeyboard = false;
        this.currentInput = a;
        if (a === "listNo") {
          this.currentInputValue = this.listNo.vmodel;
        } else {
          this.currentInputValue = this.mobile.vmodel;
        }
        let self = this;
        setTimeout(function() {
          self.showKeyboard = true;
        }, 500);
      }
    },
    onInput(a) {
      if (this.currentInput === "listNo") {
        this.listNo.vmodel = a;
      } else {
        this.mobile.vmodel = a;
      }
    },
    readIdCard() {
      let self = this;
      readTicketHelper.playVideo("请刷二代身份证");
      this.readIdCardTimer = setInterval(() => {
        if (self.idCard.idNum) {
          this.$message(self.idCard.idNum);
          clearInterval(self.readIdCardTimer);
          self.selectTicket();
        }
        readTicketHelper.readIdCard(self.idCard);
      }, 250);
    },
    readQrCode() {
      let self = this;
      readTicketHelper.playVideo("请扫描门票二维码");
      this.readQrCodeTimer = setInterval(() => {
        if (self.ticket.qrCode) {
          self.$message(self.ticket.qrCode);
          clearInterval(self.readQrCodeTimer);
          self.selectTicket();
        }
        readTicketHelper.readQrCode(self.ticket);
      }, 250);
    },
    onEnter() {
      let result = validator.validate([
        {
          value: this.listNo.vmodel,
          name: this.listNo.label,
          rules: [
            {
              rule: "required"
            }
          ]
        },
        {
          value: this.mobile.vmodel,
          name: this.mobile.label,
          rules: [
            {
              rule: "required"
            },
            {
              rule: "isMobile"
            }
          ]
        }
      ]);
      if (!result.success) {
        this.$message(validator.errorMessage(result.message));
        return;
      }
      this.$message("enter");
      this.selectTicket();
    },
    selectTicket() {
      this.$router.replace({
        name: "selectTicket"
      });
    },
    clear() {
      clearInterval(this.readQrCodeTimer);
      clearInterval(this.readIdCardTimer);
      this.qrCode = "";
      this.idCard = {};
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
  }
}
</style>
