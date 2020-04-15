<template>
  <div class="practice-html5">
    <div>
      <!-- <canvas ref="canvasTest" />
      <br />
      <img :src="iFfSrc" />

      <br /> -->
      <img :src="rotateImgSrc" />
      <br />
      <a href download="test" id="downloadA">下载</a>

      <div @click="printerTicket" style="font-size: 40px">打印</div>
      <div class="button-back-div">
        <el-button icon="el-icon-refresh-left" class="back-button" @click="onBack">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import canvasHelper from "@/utils/canvasHelper.js";
import qWebChannel from "@/utils/qWebChannel.js";
import qrCodeHelper from "@/utils/qrCodeHelper.js";
import iFfImage from "@/assets/img/ff.jpg";
import iTestPng from "@/assets/img/test.png";
import printTicketService from "@/services/printTicketService.js";

export default {
  data() {
    return {
      ticket: {
        ticketTypeName: "成人票",
        eTime: "2020-03-15 17:59:59",
        personNum: "2    人",
        ticketCode: "JN23412341234",
        companyName: "陈典火雨中国有限公司",
        cTime: "2020-03-14 12:00:03",
        distributorName: "小芬同学",
        reaMoney: 23.56,
        salePointName: "自助售票机1号"
      },
      image: new Image(),
      iFfSrc: iFfImage,
      rotateImgSrc: ""
    };
  },
  async mounted() {
    let dateNow = new Date();
    let validDate = new Date();
    validDate = new Date(validDate.setDate(dateNow.getDate() + 1));
    let ticket = {
      ticketTypeName: "男票",
      eTime: validDate.toLocaleString(),
      personNum: "有多少人",
      ticketCode: "JN23412341234",
      companyName: "你所在的公司",
      cTime: dateNow.toLocaleString(),
      distributorName: "笑了商",
      reaMoney: 12.34,
      salePointName: "陈点",
      changCi: "上午第一场",
      seat: "A区3排4号"
    };

    let result = await printTicketService.print(ticket);

    let bytesToImage = canvasHelper.bytesToImage(result);

    this.iFfSrc = bytesToImage.src;

    await canvasHelper.rotateImage(bytesToImage);

    this.rotateImgSrc = bytesToImage.src;

    let buf = await canvasHelper.imageToNumberArray(bytesToImage);

    let self = this;
    if (process.env.NODE_ENV === "production") {
      bridge.webAPI_print(buf, function(res) {
        self.$message(res.state);
      });
    } else {
      self.$message("print");
    }
  },
  methods: {
    async printerTicket() {
      let buf = await canvasHelper.imageToNumberArray(this.image);
      let aEle = document.createElement("a");
      aEle.setAttribute("download", "");
      aEle.setAttribute("href", this.image.src);
      aEle.click();
      let self = this;
      if (process.env.NODE_ENV === "production") {
        bridge.webAPI_print(buf, function(res) {
          self.$message(res.state);
        });
      } else {
        self.$message("print");
      }
    },
    onBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
#app {
  font-family: "myFont";
}
canvas {
  font-family: "myFont";
  font-size: 0;
}
.practice-html5 {
  width: 100%;
  #canvasTest {
    height: 150px;
    width: 300px;
    background: gray;
  }
}
</style>