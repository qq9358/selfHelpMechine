<template>
  <div class="query-ticket-div">
    <div class="background-div">
      <div class="head-div">
        <logo />
        <div class="title-div">
          <div class="title-one">{{titleOne}}</div>
        </div>
      </div>
      <div v-if="!showQueryResult" class="body-div">
        <div class="explain-text">{{explainOne}}</div>
        <div class="explain-content">
          <img :src="explainImgSrc" class="explain-img" />
        </div>
        <div>{{ticket.qrCode}}</div>
        <div>{{idCard.idNum}}</div>
      </div>
      <div v-else class="body-div">
        <div class="explain-text">
          <div>票号：{{queryResult.ticketCode}}</div>
          <div>状态：{{queryResult.statusName}}</div>
        </div>
        <div class="tab-div">
          <div class="tab-head">
            <div class="head-div-park">区域</div>
            <div class="head-div-total">总次数</div>
            <div class="head-div-surplus">剩余次数</div>
            <div class="head-div-time">最后检票时间</div>
          </div>
          <div class="tab-body">
            <div v-for="park in queryResult.parks" :key="park.id" class="tab-row">
              <div class="row-div-park">{{park.name}}</div>
              <div class="row-div-total">{{park.totalNum}}</div>
              <div class="row-div-surplus">{{park.surplusNum}}</div>
              <div class="row-div-time">{{park.lastCheckTime}}</div>
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
import qWebChannel from "@/utils/qWebChannel.js";
import readTicketHelper from "@/utils/readTicketHelper.js";
import Logo from "@/components/Logo.vue";

export default {
  name: "HelloWorld",
  components: {
    TicketFooter,
    Logo
  },
  data() {
    return {
      titleOne: "自助查询",
      explainOne: "请使用门票二维码或二代证查询门票信息",
      explainImgSrc: iExplainImg,
      footerText: "服务电话：13203007572",
      idCard: {
        idNum: ""
      },
      ticket: {
        qrCode: ""
      },
      readInputTimer: undefined,
      showQueryResult: false,
      queryResult: {
        ticketCode: "TN23420341234324",
        statusName: "待使用",
        parks: [
          {
            name: "大门",
            totalNum: 5,
            surplusNum: 1,
            lastCheckTime: "2020-05-01 11:59:59"
          },
          {
            name: "馆一",
            totalNum: 5,
            surplusNum: 1,
            lastCheckTime: "2020-05-01 11:59:59"
          },
          {
            name: "奇观",
            totalNum: 5,
            surplusNum: 1,
            lastCheckTime: "2020-05-01 11:59:59"
          },
          {
            name: "妙林",
            totalNum: 5,
            surplusNum: 1,
            lastCheckTime: "2020-05-01 11:59:59"
          },
          {
            name: "止水",
            totalNum: 5,
            surplusNum: 1,
            lastCheckTime: "2020-05-01 11:59:59"
          }
        ]
      }
    };
  },
  created() {
    this.loopReadInput();
  },
  beforeRouteLeave(to, from, next) {
    this.clear();
    next();
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    loopReadInput() {
      let self = this;
      this.readInputTimer = setInterval(() => {
        if (self.idCard.idNum) {
          self.queryTicket("idCard", self.idCard.idNum);
        }
        if (self.ticket.qrCode) {
          self.queryTicket("qrCode", self.ticket.qrCode);
        }
        readTicketHelper.readIdCard(self.idCard);
        readTicketHelper.readQrCode(self.ticket);
      }, 250);
    },
    queryTicket(type, value) {
      this.$message(value);
      readTicketHelper.playVideo();
      this.clear();
      this.showQueryResult = true;
    },
    clear() {
      clearInterval(this.readInputTimer);
    },
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
    .explain-text {
      display: flex;
      justify-content: space-between;
      background: #004b75;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      color: #ffffff;
      padding: 20px;
      font-size: 25px;
    }
    .explain-content {
      background: #ffffff;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      padding: 150px 50px 150px 50px;
      .explain-img {
        width: 100%;
      }
    }
    .tab-div {
      background-color: #ffffff;
      padding: 10px 25px 30px 25px;
      .tab-head {
        display: flex;
        justify-content: space-around;
        padding: 15px 0px 15px 0px;
        border-bottom: 1px solid #e6e6e6;
        font-size: 25px;
        .head-div-park {
          width: 150px;
        }
        .head-div-total {
          width: 100px;
        }
        .head-div-surplus {
          width: 100px;
        }
        .head-div-time {
          width: 250px;
        }
      }
      .tab-body {
        font-size: 23px;
        .tab-row {
          padding: 15px 0px 15px 0px;
          display: flex;
          justify-content: space-around;
          border-bottom: 1px solid #e6e6e6;
          .row-div-park {
            width: 150px;
          }
          .row-div-total {
            width: 100px;
          }
          .row-div-surplus {
            width: 100px;
          }
          .row-div-time {
            width: 250px;
          }
        }
      }
    }
  }
}
</style>
