<template>
  <div class="index-div">
    <div class="head-div">
      <div class="title-div">
        <div class="title-one">{{titleOne}}</div>
        <div class="title-two">{{titleTwo}}</div>
        <div class="title-three">{{titleThree}}</div>
      </div>
    </div>
    <div class="body-div">
      <div class="button-row">
        <div class="button-div-one" @click="onQueryTicket">查票</div>
        <div class="button-div-two" @click="onBuyTicket">购票</div>
      </div>
      <div class="button-row">
        <div class="button-div-three" @click="onGetTicket">取票</div>
        <div class="button-div-four" @click="onSetting">设置</div>
      </div>
      <!-- <div class="div-version">版本号：{{version}}</div> -->
    </div>
  </div>
</template>

<script>
import qWebChannel from "@/utils/qWebChannel.js";
import staffService from "@/services/staffService.js";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      titleOne: "欢迎使用",
      titleTwo: "景区自助服务终端",
      titleThree: "景区快捷办理服务",
      titleEnglish: "Ticket Vending Machine",
      version: "7.3.2.0",
      fileList: []
    };
  },
  async created() {
    if (navigator.userAgent.indexOf("Toon-pc") !== -1) {
      new qWebChannel(window.qt.webChannelTransport, function(channel) {
        window.bridge = channel.objects.cppObject;
      });
    }

    await staffService.loginAsync({
      userName: "admin",
      password: "admin"
    });
  },
  methods: {
    onQueryTicket() {
      this.$router.push({
        name: "queryTicket"
      });
    },
    onBuyTicket() {
      this.$router.push({
        name: "buyTicket"
      });
    },
    onGetTicket() {
      this.$router.push({
        name: "getTicket"
      });
    },
    onSetting() {
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.index-div {
  .head-div {
    background: url("./../../assets/img/indexBackground3.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    height: 842px;
    .title-div {
      .title-one {
        padding: 270px 0px 30px 0px;
        font-size: 45px;
        color: #f1c801;
      }
      .title-two {
        font-size: 85px;
        color: #f1c801;
        font-weight: bold;
        padding: 0px 0px 10px 0px;
      }
      .title-three {
        font-size: 45px;
        color: #f1c801;
      }
    }
  }
  .body-div {
    padding: 60px 0px 150px 0px;
    .button-row {
      display: flex;
      justify-content: center;
      padding: 70px 0px 0px 0px;
      .button-div-one {
        padding: 130px;
        background: #82adfc;
        border-radius: 20px;
        color: #ffffff;
        margin-left: 35px;
        margin-right: 35px;
        font-size: 65px;
      }
      .button-div-two {
        padding: 130px;
        background: #f9b466;
        border-radius: 20px;
        color: #ffffff;
        margin-left: 35px;
        margin-right: 35px;
        font-size: 65px;
      }
      .button-div-three {
        padding: 130px;
        background: #fc83a6;
        border-radius: 20px;
        color: #ffffff;
        margin-left: 35px;
        margin-right: 35px;
        font-size: 65px;
      }
      .button-div-four {
        padding: 130px;
        background: #83fca8;
        border-radius: 20px;
        color: #ffffff;
        margin-left: 35px;
        margin-right: 35px;
        font-size: 65px;
      }
    }
    .div-version {
      text-align: right;
      padding: 50px 100px 20px 0px;
    }
  }
}
</style>
