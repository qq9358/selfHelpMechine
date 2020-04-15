<template>
  <div class="div-keyboard">
    <div class="keyboard-row">
      <div class="keyboard-num" @click="onInput('1')">1</div>
      <div class="keyboard-num" @click="onInput('2')">2</div>
      <div class="keyboard-num" @click="onInput('3')">3</div>
      <div class="keyboard-text" @click="onDelete">删除</div>
    </div>
    <div class="keyboard-row">
      <div class="keyboard-num" @click="onInput('4')">4</div>
      <div class="keyboard-num" @click="onInput('5')">5</div>
      <div class="keyboard-num" @click="onInput('6')">6</div>
      <div class="keyboard-text" @click="onClear">清空</div>
    </div>
    <div class="keyboard-double-row">
      <div class="double-row-left">
        <div class="keyboard-row">
          <div class="keyboard-num" @click="onInput('7')">7</div>
          <div class="keyboard-num" @click="onInput('8')">8</div>
          <div class="keyboard-num" @click="onInput('9')">9</div>
        </div>
        <div class="keyboard-row">
          <div class="keyboard-num" @click="onInput('0')">0</div>
          <div class="keyboard-num" @click="onInput('TN')">TN</div>
          <div class="keyboard-num" @click="onInput('DS')">DS</div>
        </div>
      </div>
      <div class="double-row-right">
        <div class="keyboard-enter" @click="onEnter">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Keyboard",
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  watch: {
    value: function(val, oldVal) {
      this.inputValue = this.value;
    },
    inputValue: function(val, oldVal) {
      this.$emit("on-input", val);
    }
  },
  methods: {
    onDelete() {
      if (this.inputValue) {
        this.inputValue = this.inputValue.substring(
          0,
          this.inputValue.length - 1
        );
      }
    },
    onClear() {
      this.inputValue = "";
    },
    onInput(a) {
      this.inputValue += a;
    },
    onEnter() {
      this.$emit("on-enter");
    }
  }
};
</script>

<style lang="scss" scoped>
.div-keyboard {
  background: #c3c3c3;
  width: 495px;
  margin: 0 auto;
  padding: 20px 10px 15px 10px;
  margin-top: 20px;
  margin-bottom: 30px;
  .keyboard-row {
    display: flex;
    justify-content: space-around;
    padding: 10px 0px 10px 0px;
    .keyboard-num {
      padding: 12px 15px 10px 15px;
      width: 65px;
      font-size: 32px;
      background: #ffffff;
      border-radius: 5px;
    }
    .keyboard-text {
      padding: 10px 15px 10px 15px;
      width: 65px;
      font-size: 32px;
      background: #ffffff;
      border-radius: 5px;
    }
  }
  .keyboard-double-row {
    display: flex;
    .double-row-left {
      width: 75%;
    }
    .double-row-right {
      width: 25%;
      display: flex;
      justify-content: center;
      margin-top: 10px;
      margin-bottom: 10px;
      .keyboard-enter {
        padding: 10px 15px 10px 15px;
        width: 65px;
        font-size: 32px;
        background: #ffffff;
        border-radius: 5px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
