<template>
  <div class="logo-div">
    <div class="logo-img-div">
      <img :src="logoSrc" class="logo-img" />
    </div>
    <!-- <div class="logo-text-div">
      <div class="logo-text-one">Egoal</div>
      <div class="logo-text-two">易高</div>
    </div> -->
  </div>
</template>

<script>
import iLogo from "@/assets/img/logo.png";
export default {
  name: "logo",
  data() {
    return {
      logoSrc: iLogo
    };
  }
};
</script>

<style lang="scss" scoped>
.logo-div {
  text-align: left;
  padding: 100px 0px 0px 60px;
  display: flex;
  .logo-img-div {
    background-repeat: no-repeat;
    background-size: 100%;
    height: 100px;
    width: 100px;
    .logo-img {
      height: 100px;
    }
  }
  .logo-text-div {
    padding: 0px 0px 0px 15px;
    font-size: 40px;
  }
}
</style>
