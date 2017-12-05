<template>
  <section class="content" id="cities">
    <search-form v-model="searchQuery"></search-form>
    <addition-city :add="addCity" :state="currentState"></addition-city>
    <table class="ui celled striped table">
      <thead>
      <tr>
        <th>#</th>
        <th>Город</th>
        <th>Описание</th>
        <th>Страна</th>
        <th>Координаты</th>
        <th class="cursor-pointer" @click="filterByColumn('need_stars')">Необходимо звезд</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(city, index) in filter(cities, ['name', 'country'])" :key="city.name">
        <td>{{index}}</td>
        <td>
          <router-link :to="'/cities/city?abbreviation=' + city.abbreviation + '&name=' + city.name">
            {{city.name}}
          </router-link>
        </td>
        <td>
          {{city.description}}
        </td>
        <td>
          {{city.country}}
          <i class="flag" v-bind:class="city.relations.items.abbreviation"></i>
        </td>
        <td>
          <span v-if="city.coordinates">
          {{city.coordinates.x}}, {{city.coordinates.y}}
          </span>
        </td>
        <td>
          {{city.need_stars}}
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import AdditionCity from '@/cities/city/AdditionCity';
  import SearchForm from '@/components/seacrh-form/SearchForm';
  import searchFilter from '@/services/search.filter';
  import Axios from '@/axiosInstance';
  import { cityConstants } from '@/constants';
  import filterNumbers from '@/services/sorting';

  export default {
    name: 'cities',
    data() {
      return {
        searchQuery: '',
        cities: [],
        currentState: null,
        columnsReverse: {
            need_stars: false
        },
        states:
          {
            initial: {
              text: 'Добавить',
              loading: false,
              next: 'request'
            },
            request: {
              text: 'Загрузка',
              loading: true,
              next: 'initial'
            }
          }
      }
    },
    methods: {
      changeState() {
        this.currentState = this.states[this.currentState.next]
      },
      filter: function (array, keys) {
        return searchFilter(array, keys, this.searchQuery)
      },
      addCity: function (data) {
        var that = this;
        this.changeState();
        Axios.post(cityConstants.city + data.country, data)
          .then(function (res) {
            let countryObj = res.data.data["0"].items["0"];
            countryObj.country = countryObj.relations["0"].items["0"].name;
            that.cities.push(countryObj);
            that.$notify({

              type: 'success',
              title: 'Успешно добален город'
            });
            that.changeState()
          })
          .catch(function (error) {
            that.$notify({

              type: 'error',
              title: 'Ошибка'
            });
            that.changeState()
          })
      },
        filterByColumn(key) {
            this.columnsReverse[key] = !this.columnsReverse[key];
            filterNumbers(this.cities, key, this.columnsReverse[key])
        }
    },
    created: function () {
      var that = this;
      this.currentState = this.states.initial;
      Axios.get(cityConstants.city)
        .then(function (response) {
          let countries = response.data.data.items;
          console.log(countries)
          for(let i = 0, l = countries.length; i < l; i++) {
            countries[i].country = countries[i].relations.items.name
          }

          that.cities = countries;
        })
        .catch(function (error) {
        })
    },
    components: {
      searchForm: SearchForm,
      additionCity: AdditionCity
    }
  }
</script>

<style lang="sass" scoped>
    .cursor-pointer
        cursor: pointer !important
</style>

