<template>
  <div class="addition-container">
    <button class="ui right labeled icon button teal rounded-button" @click="toggleForm()">
      <i class="caret icon down"></i>
      Добавить
    </button>
    <form v-if="toggled" class="ui form" @submit.prevent="addItemToStore()">
      <div class="ui input">
        <input type="text" placeholder="Название" v-model="data.name">
      </div>
      <div class="ui input">
        <textarea placeholder="Description" v-model="data.description"></textarea>
      </div>
      <div class="ui input">
        <select v-model="data.type">
          <option value="">тип</option>
        </select>
      </div>
      <div class="ui input">
        <select v-model="data.complexity">
          <option value="">тип</option>
        </select>
      </div>
      <div class="ui input">
        <input type="number" placeholder="Max Steps" v-model="data.max_steps">
      </div>
      <div class="ui input">
        <input type="number" placeholder="Max Soft Coin" v-model="data.max_soft_coin">
      </div>
      <div class="ui input">
        <input type="number" placeholder="Continue Cost" v-model="data.continue_cost">
      </div>
      <div class="ui input">
        <input type="file" placeholder="Image" @change="data.image = $event.target.files[0]">
      </div>
      <button type="submit" class="ui right labeled icon button teal">
        <i class="right add square icon"></i>
        Добавить
      </button>
    </form>
  </div>
</template>

<script>
  import Axios from '@/axiosInstance'
  import {cityConstants} from '@/constants'
  export default {
    name: 'AdditionStoreItemForm',
    data() {
      return {
        toggled: false,
        data: {}
      }
    },
    methods: {
      toggleForm(){
        return this.toggled = !this.toggled
      },
      addItemToStore(){
        Axios.post(cityConstants.city)
          .then(function (res) {
            console.log(res)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style lang="sass" scoped>
  .addition-container
    margin: 10px 0
    .form
      .input
        display: block
        margin: 3px 0
        color: #000
        textarea
          resize: none
</style>
