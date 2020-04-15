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
        <!-- <div class="div-tabs">
          <el-tabs type="border-card" v-model="settingType">
            <el-tab-pane label="数据库设置">数据库设置</el-tab-pane>
            <el-tab-pane label="系统设置">系统设置</el-tab-pane>
            <el-tab-pane label="设备设置">设备设置</el-tab-pane>
          </el-tabs>
        </div>-->
        <div class="div-tabs">
          <div class="tabs-head">
            <div
              :class="{'tabs-head-div': true, 'tabs-head-selected': currentTab === 0}"
              @click="onTabsClick(0)"
            >数据库设置</div>
            <div
              :class="{'tabs-head-div': true, 'tabs-head-selected': currentTab === 1}"
              @click="onTabsClick(1)"
            >系统设置</div>
            <div
              :class="{'tabs-head-div': true, 'tabs-head-selected': currentTab === 2}"
              @click="onTabsClick(2)"
            >设备设置</div>
          </div>
          <div v-if="currentTab === 0" class="tab-body">
            <div class="div-form">
              <div class="div-input">
                <div class="input-label">数据库类型</div>
                <div class="input-content">
                  <el-input v-model="databaseInput.dbType" readonly />
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">服务器名</div>
                <div class="input-content">
                  <el-input v-model="databaseInput.dataSrouce" placeholder="请输入数据库链接" />
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">数据库名</div>
                <div class="input-content">
                  <el-select v-model="databaseInput.initialCatalog" filterable placeholder="请选择">
                    <el-option
                      v-for="initialCatalog in initialCatalogs"
                      :key="initialCatalog.value"
                      :label="initialCatalog.displayText"
                      :value="initialCatalog.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">用户名</div>
                <div class="input-content">
                  <el-input v-model="databaseInput.userId" placeholder="请输入用户名" />
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">密码</div>
                <div class="input-content">
                  <el-input v-model="databaseInput.password" placeholder="请输入密码" />
                </div>
              </div>
            </div>
          </div>
          <div v-if="currentTab === 1" class="tab-body">
            <div class="div-form">
              <div class="div-input">
                <div class="input-label">售票点</div>
                <div class="input-content">
                  <el-select v-model="systemInput.salePointId" filterable placeholder="请选择">
                    <el-option
                      v-for="salePoint in salePoints"
                      :key="salePoint.value"
                      :label="salePoint.displayText"
                      :value="salePoint.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">售票员</div>
                <div class="input-content">
                  <el-select v-model="systemInput.loginStaffId" filterable placeholder="请选择">
                    <el-option
                      v-for="staff in staffs"
                      :key="staff.value"
                      :label="staff.displayText"
                      :value="staff.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">前置服务器</div>
                <div class="input-content">
                  <el-input v-model="systemInput.foreServeUrl" placeholder="请输入支付前置服务器地址" />
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">单笔售票上限</div>
                <div class="input-content">
                  <el-input v-model="systemInput.orderMaxNum" placeholder="请输入单笔订单售票数上限" />
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">启用取票</div>
                <div class="input-content">
                  <el-select v-model="systemInput.enableGetTicket" placeholder="请选择">
                    <el-option
                      v-for="enableGetTicket in enableGetTickets"
                      :key="enableGetTicket.value"
                      :label="enableGetTicket.displayText"
                      :value="enableGetTicket.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">当前票数量</div>
                <div class="input-content">
                  <el-input v-model="systemInput.maxTicketSaleNum" placeholder="请输入当前可售票数量" />
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">授权码路径</div>
                <div class="input-content">
                  <el-input v-model="systemInput.gkKeyFilePath" placeholder="请输入自助机授权码路径" />
                </div>
              </div>
            </div>
          </div>
          <div v-if="currentTab === 2" class="tab-body">
            <div class="div-form">
              <div class="div-input">
                <div class="input-label">UTC端口</div>
                <div class="input-content">
                  <el-select v-model="systemInput.utcPort" filterable placeholder="请选择">
                    <el-option
                      v-for="utcPort in utcPorts"
                      :key="utcPort.value"
                      :label="utcPort.displayText"
                      :value="utcPort.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">条码打印机</div>
                <div class="input-content">
                  <el-select v-model="systemInput.ticketPrinter" filterable placeholder="请选择">
                    <el-option
                      v-for="ticketPrinter in ticketPrinters"
                      :key="ticketPrinter.value"
                      :label="ticketPrinter.displayText"
                      :value="ticketPrinter.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">打印机监控口</div>
                <div class="input-content">
                  <el-select v-model="systemInput.ticketPrinterPort" filterable placeholder="请选择">
                    <el-option
                      v-for="ticketPrinterPort in ticketPrinterPorts"
                      :key="ticketPrinterPort.value"
                      :label="ticketPrinterPort.displayText"
                      :value="ticketPrinterPort.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">纸张类型</div>
                <div class="input-content">
                  <el-select v-model="systemInput.ticketPaperType" placeholder="请选择">
                    <el-option
                      v-for="ticketPaperType in ticketPaperTypes"
                      :key="ticketPaperType.value"
                      :label="ticketPaperType.displayText"
                      :value="ticketPaperType.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="div-input">
                <div class="input-label">打印机口灯条颜色</div>
                <div class="input-content">
                  <el-select v-model="systemInput.utcLedId" placeholder="请选择">
                    <el-option
                      v-for="utcLed in utcLeds"
                      :key="utcLed.value"
                      :label="utcLed.displayText"
                      :value="utcLed.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <div class="div-submit">
            <el-button icon="el-icon-s-claim" class="save-button" @click="onSave">保存</el-button>
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

export default {
  name: "BuyTicket",
  components: {
    TicketFooter,
    Logo
  },
  data() {
    return {
      titleOne: "系统设置",
      currentTab: 0,
      databaseInput: {
        dbType: "SqlServer",
        dataSource: "",
        initialCatalog: "",
        userId: "",
        password: ""
      },
      systemInput: {
        salePointId: 1,
        loginStaffId: 1,
        foreServeUrl: "",
        orderMaxNum: 10,
        enableGetTicket: 0,
        maxTicketSaleNum: 200,
        gkKeyFilePath: ""
      },
      equipment: {
        utcPort: "COM1",
        ticketPrinter: "LG-SA",
        ticketPrinterPort: "COM2",
        ticketPaperType: 2,
        utcLedId: 1
      },
      initialCatalogs: [],
      salePoints: [],
      staffs: [],
      enableGetTickets: [],
      utcPorts: [],
      ticketPrinters: [],
      ticketPrinterPorts: [],
      ticketPaperTypes: [],
      utcLeds: []
    };
  },
  created() {},
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onTabsClick(a) {
      this.currentTab = a;
    },
    onSave() {
      console.log("save");
    }
  }
};
</script>
<style lang="scss" scoped>
.background-div {
  .head-div {
    .title-div {
      .title-one {
        padding: 70px 0px 80px 0px;
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
    .div-submit {
      padding: 0px 0px 35px 0px;
    }
  }
}
</style>
