<template>
  <div class="addition-container">
    <button class="ui right labeled icon button teal rounded-button" @click="toggleForm()">
      <i class="caret icon down"></i>
      Добавить
    </button>
    <form v-if="toggled" class="ui form" @submit.prevent="addCity()">
      <div class="ui input">
        <input type="text" placeholder="Название" v-model="data.name" required>
      </div>
      <div class="ui input">
        <select v-model="data.country" required>
          <option v-for="country in countries" :value="country.abbreviation">{{country.name}}</option>
        </select>
      </div>
      <div class="ui input">
        <textarea placeholder="Описание города" v-model="data.description" required></textarea>
      </div>
      <div class="ui input">
        <input type="number" placeholder="Необходимо звезд" v-model="data.need_stars" required>
      </div>
      <div class="ui input columns-2">
        <input type="number" step="0.01" placeholder="x" v-model="data.coordinate_x" required>
        <input type="number" step="0.01" placeholder="y" v-model="data.coordinate_y" required>
      </div>

      <button type="submit" class="ui right labeled icon button teal"
              v-bind:class="{'loading': this.$attrs.state.loading}" :disabled="this.$attrs.state.loading">
        <i class="right add square icon"></i>
        Добавить
      </button>
    </form>
  </div>
</template>

<script>
  import Axios from '@/axiosInstance';
  import {countryConstants} from '@/constants';

  export default {
    name: 'AdditionLevelForm',
    created: function () {
      var that = this;
      Axios.get(countryConstants.country)
        .then(function (response) {
          that.countries = response.data.data["0"].items;
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    data() {
      return {
        toggled: false,
        countries: null,
        currentState: null,
        data: {}
      }
    },
    methods: {
      toggleForm() {
        return this.toggled = !this.toggled
      },
      addCity() {
        this.data.coordinates = '(' + this.data.coordinate_x.replace(",", ".") + ', ' + this.data.coordinate_y.replace(",", ".") + ')';
        this.$attrs.add(this.data)
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
      .columns-2
        display: flex
        flex-flow: row nowrap
        input
          width: 50%
</style>
