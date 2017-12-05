<template>
  <section class="content" id="city">
    <header>
      <h2>{{city.name}}</h2>
      <div class="ui small basic icon buttons">
        <button
          v-if="editMode"
          @click="saveCity"
          key="save"
          class="ui button"
          style="background: #009c95 !important; color: #fff !important;"
          title="Сохранить">
          <i class="save icon"></i>
        </button>
        <button @click="editCity" key="edit" class="ui button"><i class="edit icon"></i></button>
        <button @click="deleteCity" key="remove" class="ui button"><i class="remove icon"></i></button>
      </div>
    </header>
    <div class="ui divider"></div>
    <table class="ui table celled stripped editor">
      <thead>
      <tr>
        <th rowspan="2">Название</th>
        <th rowspan="2">Описание</th>
        <th colspan="2">Координаты</th>
        <th rowspan="2">Необходимо звезд</th>
      </tr>
      <tr>
        <th>x</th>
        <th>y</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <div class="ui input fluid">
            <input class="ui input fluid" type="text" v-model="city.name" :disabled="!editMode">
          </div>
        </td>
        <td>
          <div class="ui input fluid">
            <input class="ui input fluid" type="text" v-model="city.description" :disabled="!editMode">
          </div>
        </td>
        <td>
          <div class="ui input fluid">
            <input class="ui input fluid" type="number" v-if="city.coordinates" v-model="city.coordinates.x"
                   :disabled="!editMode">
          </div>
        </td>
        <td>
          <div class="ui input fluid">
            <input class="ui input fluid" type="number" v-if="city.coordinates" v-model="city.coordinates.y"
                   :disabled="!editMode">
          </div>
        </td>
        <td>
          <div class="ui input fluid">
            <input type="number" class="ui input fluid" v-model="city.need_stars" :disabled="!editMode">
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <h2 class="ui dividing header">Уровни</h2>
    <search-form v-model="searchQuery"></search-form>
    <addition-level :add="addLevel" :types="types" :complexities="complexities" :state="currentState"></addition-level>


    <!--Level filters-->

    <div class="ui grid">
      <div class="seven wide column">
        <div class="ui raised segment">
          <h5 class="ui header">
            Сортировать по типу
          </h5>
          <div class="ui buttons">
            <button class="ui button" v-for="type in types" @click="sortLevelsBy('type', type)">{{type}}</button>
          </div>
        </div>
      </div>
      <div class="seven wide column">
        <div class="ui raised segment">
          <h5 class="ui header">
            Сортировать по сложности
          </h5>
          <div class="ui buttons">
            <button class="ui button" v-for="complexity in complexities"
                    @click="sortLevelsBy('complexity', complexity)">{{complexity}}
            </button>
          </div>
        </div>
      </div>
      <div class="two wide column">
        <div class="ui raised segment center aligned">
          <h5 class="ui header">
            Сменить вид
          </h5>
          <button class="ui button icon" @click="levelFullView = !levelFullView">
            <i class="block layout icon"></i>
          </button>
        </div>
      </div>
    </div>


    <!--Level filters-->


    <!--Levels-->
    <div v-bind:class="{'levels-container' : !levelFullView}" v-if="levels && levels.length > 0">
      <level v-for="(item, index) in filter(sortedLevels, ['display'])"
             :level-data="item"
             :level-index="index"
             :key="item.name"
             :types="types"
             :complexities="complexities"
             :delete="deleteLevel">
      </level>
    </div>
  </section>
</template>

<script>
  import SearchForm from '@/components/seacrh-form/SearchForm';
  import searchFilter from '@/services/search.filter';
  import AdditionLevel from '@/cities/levels/AdditionLevel';
  import Level from '@/cities/levels/Level';
  import axios from 'axios'

  import Axios from '@/axiosInstance';
  import {levelConstants, cityConstants} from '@/constants';

  export default {
    props: ['id'],
    data: function () {
      return {
        searchQuery: '',
        editableLevel: null,
        editMode: false,
        types: null,
        complexities: null,
        city: [],
        levels: [],
        currentState: null,
        sortedLevels: [],
        levelFullView: false,
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
      editCity: function () {
        this.editMode = true
      },
      saveCity: function () {
        this.editMode = false;
        let that = this;
        let data = Object.assign({}, this.city);
        data.coordinates = '(' + this.city.coordinates.x + ',' + this.city.coordinates.y + ')';
        Axios.put(cityConstants.city + this.city.abbreviation, data)
          .then(function (res) {
            that.$notify({
              type: 'success',
              title: 'Изменено'
            });
            that.city = res.data.data.items;
            //Быстрый костыль
            if (that.city.coordinates === null) {
              that.city.coordinates.x = 0
              that.city.coordinates.y = 0
            }
          })
          .catch(function (error) {
            that.$notify({
              type: 'error',
              title: 'Ошибка'
            })
          })
      },
      deleteCity: function () {
        var that = this;
        if (confirm('Вы уверены что хотите удалить город?')) {
          Axios.delete(cityConstants.city + this.city.abbreviation)
            .then(function (response) {
              console.log(response);
              that.$notify({

                type: 'success',
                title: 'Успешно удалено'
              });
              that.$router.push('/cities')
            })
            .catch(function (error) {
              console.log(error)
            });
        }
      },
      addLevel: function (data) {
        data.display = data.name;
        this.changeState();
        let that = this;
        let form = new FormData();
        for (let key in data) {
          form.append(key, data[key]);
        }
        Axios.post(levelConstants.level + this.city.abbreviation, form)
          .then(function (response) {
            that.$notify({

              type: 'success',
              title: 'Успешно добален уровень'
            });
            console.log(response);
            that.changeState();
            that.levels.push(response.data.data.items);
          })
          .catch(function (error) {
            that.changeState();
            that.$notify({

              type: 'error',
              title: 'Ошибка!'
            });
          });
      },
      deleteLevel: function (index, level) {
        var that = this;
        if (confirm('Вы уверены что хотите удалить уровень?')) {
          Axios.delete(levelConstants.level + level.name)
            .then(function (res) {
              console.log('success', res);
              that.levels.splice(index, 1);
              that.$notify({

                type: 'success',
                title: 'Удалено'
              });
            })
            .catch(function (error) {
              console.log('error', error);
              that.$notify({

                type: 'error',
                title: 'Ошибка'
              });
            });
        }
      },
      filter: function (array, keys) {
        return searchFilter(array, keys, this.searchQuery)
      },
      sortLevelsBy: function (key, value) {
        let sortedLevels = [];
        let levels = this.levels.slice();
        let levels4splice = this.levels.slice();

        for (let i = 0, l = levels.length; i < l; i++) {
          if (levels[i][key] === value) {
            sortedLevels.push(levels[i]);
            levels4splice.splice(i, 1);
          }
        }
        sortedLevels = sortedLevels.concat(levels4splice);
        this.sortedLevels = sortedLevels;
      }
    },
    components: {
      searchForm: SearchForm,
      additionLevel: AdditionLevel,
      level: Level
    },
    created: function () {
      this.currentState = this.states.initial;
      var that = this;
      axios.all([
        Axios.get(levelConstants.types),
        Axios.get(levelConstants.complexities)])
        .then(axios.spread(function (types, complexities) {
            let a = types.data.data.items.pop();
            let b = types.data.data.items.pop();
            types.data.data.items.push(a);
            types.data.data.items.push(b);
            that.types = types.data.data.items;
            that.complexities = complexities.data.data.items;
          }
        ));

      Axios.get(cityConstants.city + this.$route.query.abbreviation)
        .then(function (response) {
          console.log(response)
          that.city = response.data.data.items;
          that.levels = response.data.data.items.relations.items;
          that.sortedLevels = that.levels;
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    beforeRouteLeave(to, from, next) {
      if (this.editMode) {
        if (confirm('На странице есть не сохраненные данные, вы уверены что хотите уйти?')) {
          next();
        } else {
          next(false);
        }
      } else {
        next()
      }
    }
  }
</script>

<style lang="sass">
  .levels-container
    .level-item
      border: 1px solid rgba(#52575c, 10%)
      border-radius: .28571429rem
      padding: 5px
      box-sizing: border-box
      header
        .ui.input
          input
            padding: 2px
            min-width: 500px
      .level
        padding: 0
        background: transparent
        &-thumbnail
          width: 112px
          height: 112px
        &-thumbnail-img
          width: 112px
          height: 112px
          border-radius: .28571429rem
        table:nth-child(1)
          height: 90px
        table:nth-child(2)
          display: none
    header
      display: flex
      flex-flow: row nowrap
      justify-content: space-between
      align-items: center
      padding-bottom: 1rem
      /*border-bottom: 1px solid #094959*/
      h2
        margin: auto 0 !important
      button
        padding: .78571429em 1.5em .78571429em !important
      .divider
        margin-top: 0 !important
</style>
