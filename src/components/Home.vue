<template>
  <section id="home">
    <aside>
      <main-menu></main-menu>
    </aside>
    <main>
      <button class="ui button icon basic inverted teal" @click="goBack()">
        <i class="caret left icon"></i>
      </button>
      <router-view></router-view>
    </main>
  </section>
</template>


<script>
  import Menu from '@/components/Menu'
  export default {
    name: 'home',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      goBack: function () {
        console.log('back button')
        this.$router.back()
      }
    },
    components: {
      MainMenu: Menu
    }
  }
</script>


<style lang="sass" scoped>
  section#home
    width: 100%
  aside
    height: 100vh
    margin-right: 20px
    position: fixed
    .menu
      border-radius: 0 !important
      height: 100vh
    a
      border-radius: 0
  main
    width: calc(100% - 15rem)
    margin-left: 15rem
  @media screen and (max-width: 769px)
    aside
      display: none
    main
      width: 100%
      margin: 0
</style>
