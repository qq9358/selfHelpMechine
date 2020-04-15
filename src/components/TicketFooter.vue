<template>
  <div class="footer-div">
    <div>可售票数：{{surplusNum}}</div>
    <div>
      <i class="el-icon-phone-outline" />
      服务电话{{servicePhone}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ticketFooter',
  data () {
    return {
      servicePhone: "13203007572",
      surplusNum: 219
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-div {
  height: 61px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 50px 0px 50px;
  background: #000000;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
}
</style>
