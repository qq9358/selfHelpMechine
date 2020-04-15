<template>
  <div class="query-ticket-div">
    <div class="background-div">
      <div class="head-div">
        <logo />
      </div>
      <div class="div-explain">
        <div class="explain-text-one">暂 停 服 务</div>
        <div class="explain-text-two">Out &nbsp;Of &nbsp;Service</div>
      </div>
    </div>
    <ticket-footer />
  </div>
</template>

<script>
import TicketFooter from "./../../components/TicketFooter.vue";
import Logo from "@/components/Logo.vue";

export default {
  name: "Login",
  components: {
    TicketFooter,
    Logo
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
      font-size: 150px;
    }
    .explain-text-two {
      font-size: 100px;
    }
  }
}
</style>
