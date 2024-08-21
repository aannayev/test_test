<template>
  <div class="login">

    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(login)" class="login-card">
        <div class="login-card-title">
          <h6>Авторизация</h6>
        </div>

        <inputPhone v-model="username"/>
        <inputPassword rules="required" v-model="password"/>

        <button type="submit" class="login-card-btn">
          Войти
        </button>
      </form>
    </ValidationObserver>

  </div>
</template>
<script>
import axios from 'redaxios';

import inputPhone from '@/components/input/phone.vue'
import inputPassword from '@/components/input/password.vue'

import {extend} from 'vee-validate';

extend('phone', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
});

export default {
  components: {
    inputPhone,
    inputPassword
  },
  data () {
    return {
      username: "9122333444",
      password: "123456",
    }
  },
  methods:{
    login(){
      axios.post("https://dev.moydomonline.ru/api/auth/login/", {
        username: `7${this.username}`,
        password: this.password
      }).then((response) => {
        console.log(response.data)
        this.$store.dispatch("updateUser", {
          ...response.data,
          token: btoa(`7${this.username}` + ':' + this.password)
        })
        this.$router.push("/")
      }).catch((error) => {
        if (error) {
          console.log(error)
          this.$store.dispatch("updateSnackbar", ["Имя пользователя или пароль неверны", "error"])
        }
      })
    }
  }
}

</script>