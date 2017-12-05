<template>
  <section class="content" id="countries">
    <search-form v-model="searchQuery"></search-form>
    <table class="ui table stripped">
      <thead>
      <tr>
        <th>Страна</th>
        <th>Аббревиатура</th>
        <th>Флаг</th>
        <th class="text-center">
          <i class="icon settings"></i>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(country, index) in filter(countries, ['name'])">
        <td>{{country.name}}</td>
        <td>{{country.abbreviation}}</td>
        <td>
          <div class="image-loader-container">
            <button class="ui button icon circular basic" v-if="!country.flag">
              <i class="ui icon add"></i>
            </button>
            <img class="ui image small" :src="country.flag">
            <input type="file" accept="image/*" @change="loadNewImage($event, index)">
          </div>
        </td>
        <td class="text-center">
          <div class="ui vertical buttons">
            <button class="ui icon button teal" v-if="country.image" @click="saveCountry(country.abbreviation, index)">
              <i class="save icon"></i>
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import SearchForm from '@/components/seacrh-form/SearchForm';
  import searchFilter from '@/services/search.filter';

  import Axios from '@/axiosInstance';
  import draggable from 'vuedraggable';
  import {countryConstants} from '@/constants';

  export default {
    name: 'countries',
    created: function () {
      let that = this;
      Axios.get(countryConstants.country)
        .then(function (response) {
          that.countries = response.data.data["0"].items;
          for (let i = 0, l = that.countries.length; i < l; i++) {
            that.countries[i].image = null;
          }
        })
        .catch(function (error) {
          that.$notify({

            type: 'error',
            title: 'Ошибка при получении списка стран'
          })
        });
    },
    data() {
      return {
        searchQuery: '',
        image: null,
        countries: [],
      }
    },
    methods: {
      filter: function (array, keys) {
        return searchFilter(array, keys, this.searchQuery)
      },
      loadNewImage: function (e, index) {
        let that = this;
        this.countries[index]["image"] = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
          that.countries[index]["flag"] = reader.result;
        };
        reader.readAsDataURL(this.countries[index]["image"]);
      },
      saveCountry: function (country_abbreviation, index) {
        let that = this;
        let data = new FormData();
        data.append("flag", this.countries[index].image);
        Axios.post(countryConstants.country + country_abbreviation + '/flag', data)
          .then(function (res) {
            that.countries.splice(index, 1, res.data.data["0"].items["0"])
            that.$notify({

              type: 'success',
              title: 'Флаг изменен'
            })
          })
          .catch(function (error) {
            that.$notify({

              type: 'error',
              title: 'Ошибка'
            })
          })
      }
    },
    components: {
      searchForm: SearchForm,
      draggable
    }
  }
</script>

<style lang="sass" scoped>
  .image-loader-container
    width: 150px
    min-height: 40px
    position: relative
    input
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      opacity: 0
      cursor: pointer
      &:disabled
        cursor: default
</style>
