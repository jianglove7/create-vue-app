<template>
  <label class="asda">
    {{label}}
    <!-- 用:value="value是有时间修改value了" -->
    <input class="asd" type="text" :value="value" v-bind="$attrs" v-on="inputListeners">
  </label>
</template>
<script>
export default {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      let vm = this;
      return Object.assign({}, this.$listeners, {
        input: function (event) {
          vm.$emit('input', event.target.value); // 重写 直接返回值
        }
      });
    }
  },
  data() {
    return {};
  },
  mounted () {
    console.log(this.$attrs);
  }
};

</script>
<style lang="scss" scoped>
  input {
    margin-bottom: 10px;
  }
</style>
