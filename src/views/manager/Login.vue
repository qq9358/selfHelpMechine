<template>
  <div class="query-ticket-div">
    <div class="background-div">
      <div class="head-div">
        <div class="logo-div">
          <div class="logo-img-div">
            <img :src="logoSrc" class="logo-img" />
          </div>
          <div class="logo-text-div">
            <div class="logo-text-one">Egoal</div>
            <div class="logo-text-two">易高</div>
          </div>
        </div>
        <div class="title-div">
          <div class="title-one">{{titleOne}}</div>
        </div>
      </div>
      <div class="body-div">
        <div class="div-tabs">
          <div class="tab-body">
            <div class="div-form">
              <div class="div-input">
                <div class="input-label">账 户</div>
                <div class="input-content">
                  <el-input v-model="user" placeholder="请输入员工账号" @focus="onFocus('user')" />
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">密 码</div>
                <div class="input-content">
                  <el-input v-model="password" placeholder="请输入登录密码" @focus="onFocus('password')" />
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
        <el-button type="primary" class="back-button" icon="el-icon-refresh-left" @click="onBack">返回</el-button>
      </div>
    </div>
    <ticket-footer />
  </div>
</template>

<script>
import iLogo from "./../../assets/img/logo.png";
import TicketFooter from "./../../components/TicketFooter.vue";
import Keyboard from "./../../components/Keyboard.vue";
import readTicketHelper from "@/utils/readTicketHelper.js";

export default {
  name: "Login",
  components: {
    TicketFooter,
    Keyboard
  },
  data() {
    return {
      logoSrc: iLogo,
      titleOne: "管理员登录",
      user: "",
      password: "",
      currentInput: "user",
      currentInputValue: "",
      showKeyboard: true
    };
  },
  created() { 
    readTicketHelper.playVideo("请输入密码");
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onFocus(a) {
      if (a !== this.currentInput) {
        this.showKeyboard = false;
        this.currentInput = a;
        if (a === "user") {
          this.currentInputValue = this.user;
        } else {
          this.currentInputValue = this.password;
        }
        let self = this;
        setTimeout(function() {
          self.showKeyboard = true;
        }, 500);
      }
    },
    onInput(a) {
      if (this.currentInput === "user") {
        this.user = a;
      } else {
        this.password = a;
      }
    },
    onEnter() {
      this.$router.replace({
        name: "manager"
      });
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
