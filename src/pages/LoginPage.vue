<template>
  <div>
    <div id="LoginPage">
      <div class="log_wrap">
        <div class="login_hd">
          登陆
        </div>
        <div class="login_bd">
          <form method="post">
            
            <div class="row">
              <base-input name="username" v-model="form.userName" @keyup="handleKeyUp($event)"></base-input>
            </div>
            <div class="row">
              <base-input name="password" v-model="form.passWord" @keyup="handleKeyUp($event)"></base-input>
            </div>
            <div class="row">
              <button type="button" @click="submit()">登陆</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      form: {
        userName: '',
        passWord: ''
      }
    };
  },
  mounted() {

  },
  methods: {
    handleKeyUp(event) {
      console.log(event);
      if (event.keyCode === 13) {
        this.submit();
      }
    },
    submit() {
      console.log('submit');
    }
  }
};

</script>

<style lang="scss" scoped>
  #LoginPage {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  input,
  button {
    margin-bottom: 10px;
  }

</style>
