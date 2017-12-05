<template>
  <section id="login">
    <form class="ui form" v-on:submit.prevent="login">
      <div class="field">
        <input v-model="username" type="text" placeholder="name" required>
      </div>
      <div class="field">
        <input v-model="password" type="password" placeholder="password" required>
      </div>
      <div class="field">
        <button class="ui teal button">Login</button>
      </div>
    </form>
  </section>
</template>

<script>
  import {auth} from '@/services/auth'
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
        loginForm: {
          login: '',
          password: ''
        }
      }
    },
    methods: {
      login: function () {
        let credentials = {
          name: this.username,
          password: this.password
        };
        auth.login(credentials)
          .then(function (response) {
            auth.setToken(response.data.token)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style lang="sass" scoped>
  section#login
    width: 100%
    height: 100vh
    display: flex
    background: #002b36
    background-size: cover
    form
      width: 280px
      padding: 15px
      box-sizing: border-box
      margin: auto
      background: rgba(#fff, 0.25)
      box-shadow: 3px 3px 3px 0px rgba(0,0,0,0.25)
    button
      width: 100%
</style>
