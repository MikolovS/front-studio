<template>
  <div id="app">
      <router-view></router-view>
      <notifications position="bottom right"/>
  </div>
</template>

<script>
  import Menu from './components/Menu.vue';
  import MenuComponent from "./components/Menu";
  export default {
    name: 'app'
  }
</script>
