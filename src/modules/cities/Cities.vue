<template>
  <section class="content" id="cities">
    <search-form v-model="searchQuery"></search-form>
    <addition-city :fields="addCityFields" :add="addCity"></addition-city>
    <table class="ui celled striped table">
      <thead>
      <tr>
        <th>Город</th>
        <th>Описание</th>
        <th>Страна</th>
        <th>Координаты</th>
        <th>Необходимо звезд</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="city in filter(cities, ['name', 'country'])" :key="city.id">
        <td>
          <router-link :to="'/cities/city/' + city.id">
            {{city.name}}
          </router-link>
        </td>
        <td>
          {{city.description}}
        </td>
        <td>
          {{city.country}}
          <i class="flag" v-bind:class="city.country_code"></i>
        </td>
        <td>
          {{city.coordinates}}
        </td>
        <td>
          {{city.stars}}
        </td>
      </tr>
      <tr v-if="filter(cities, ['name', 'country']).length === 0">
        <td colspan="5">
          <h3>Нет данных</h3>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import AdditionForm from '@/components/addition-form/AdditionForm';
  import SearchForm from '@/components/seacrh-form/SearchForm';
  import searchFilter from '@/services/search.filter';
  export default {
    name: 'cities',
    data () {
      return {
        searchQuery: '',
        cities: [
          {
            id: 0,
            name: 'Одесса',
            description: 'Море и шавуха',
            country: 'Украина',
            country_code: 'ua',
            coordinates: ['100', '200'],
            stars: 5
          },
          {
            id: 1,
            name: 'Киев',
            description: 'Столица',
            country: 'Украина',
            country_code: 'ua',
            coordinates: ['100', '200'],
            stars: 5
          },
          {
            id: 2,
            name: 'Харьков',
            description: 'Заводы',
            country: 'Украина',
            country_code: 'ua',
            coordinates: ['100', '200'],
            stars: 5
          },
          {
            id: 3,
            name: 'Москва',
            description: 'Кремль',
            country: 'Россия',
            country_code: 'ru',
            coordinates: ['100', '200'],
            stars: 8
          }
        ],
        addCityFields: [
          {label: 'Название', model: 'name', type: 'text'},
          {label: 'Страна', model: 'country', type: 'select', options: ['Ukraine', 'Russia']},
          {label: 'Координаты', model: 'coordinates', type: 'text'},
          {label: 'Описание', model: 'description', type: 'textarea'},
          {label: 'Звезд, для входа в город', model: 'stars', type:'number'}
        ]
      }
    },
    methods: {
      filter: function (array, keys) {
        return searchFilter(array, keys, this.searchQuery)
      },
      addCity: function(data) {
          console.log('Метод родителя', data)
      }
    },
    components: {
      searchForm: SearchForm,
      additionCity: AdditionForm
    }
  }
</script>

