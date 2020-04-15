<template>
  <div class="query-ticket-div">
    <div class="background-div">
      <div class="head-div">
        <logo />
      </div>
      <div class="div-explain">
        <div class="explain-text-one">打印成功，请取票</div>
        <div class="explain-text-two">Printing succeeded, please get ticket</div>
      </div>
      <div class="button-back-div">
        <el-button icon="el-icon-refresh-left" class="back-button" @click="onBack">返回</el-button>
      </div>
    </div>
    <ticket-footer />
  </div>
</template>

<script>
import TicketFooter from "./../../components/TicketFooter.vue";
import Logo from "@/components/Logo.vue";
import readTicketHelper from "@/utils/readTicketHelper.js";

export default {
  name: "Login",
  components: {
    TicketFooter,
    Logo
  },
  created(){
    readTicketHelper.playVideo("请取票");
  },
  methods: {
    onBack() {
      this.$router.go(-1);
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
  .div-explain {
    padding: 600px 0px 0px 0px;
    color: #ffffff;
    .explain-text-one {
      font-size: 100px;
    }
    .explain-text-two {
      font-size: 50px;
    }
  }
}
</style>
