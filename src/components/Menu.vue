<template>
  <div class="ui vertical tabular menu">
    <div class="user">
        <div class="user-info">
          <img class="ui mini circular image" src="https://semantic-ui.com/images/avatar/large/steve.jpg">
          <div class="content">
            <div class="ui sub header">Стив</div>
            Админ
          </div>
        </div>
        <button class="ui basic button icon">
        <i class="sign out icon"></i>
        </button>
    </div>

    <router-link class="item" v-bind:class="{active: isActive('countries')}" to="/countries">
      Страны
    </router-link>

    <router-link class="item" v-bind:class="{active: isActive('cities')}" to="/cities">
      Города
    </router-link>

    <router-link
      class="sub-menu item"
      v-if="this.$route.path === '/cities/city'"
      v-bind:class="{active: isActive('cities')}"
      :to="this.$route.fullPath">
      {{this.$route.query.name}}
    </router-link>


    <router-link class="item" v-bind:class="{active: isActive('shop')}" to="/shop">
      Магазин
    </router-link>

    <router-link class="item" v-bind:class="{active: isActive('users')}" to="/users">
      Пользователи
    </router-link>

    <router-link class="item" v-bind:class="{active: isActive('bugs')}" to="/bugs">
      Баги
    </router-link>

    <router-link class="item" v-bind:class="{active: isActive('level-configs')}" to="/level-configs">
      Настройки уровней
    </router-link>

    <router-link class="item" v-bind:class="{active: isActive('statistics')}" to="/statistics">
      Статистика
    </router-link>

    <router-link class="item" v-bind:class="{active: isActive('patch-note')}" to="/patch-note">
      Патчи
    </router-link>

    <router-link class="item" v-bind:class="{active: isActive('tracker')}" to="/tracker">
      Трекер
    </router-link>
  </div>
</template>


<script>
  export default {
    methods: {
      isActive: function (currentPath) {
        return this.$route.path.split('/')[1] === currentPath
      }
    }
  }
</script>


<style lang="sass" scoped>
  .user
    padding: .92857143em 1.14285714em !important
    box-sizing: border-box
    display: flex
    align-items: center
    justify-content: space-between
    &-info
      display: flex
      align-items: center
      justify-content: space-between
      .content
        margin: 0 10px
  .sub-menu
    font-size: 12px
    padding: .92857143em 3em !important
    font-weight: normal !important
    border: none !important
</style>
