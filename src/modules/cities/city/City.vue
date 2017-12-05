<template>
  <section class="content" id="city">
    <header>
      <h2>Название города</h2>
      <div class="ui small basic icon buttons">
        <transition-group name="btn-fade">
          <button
            v-if="editMode"
            @click="save"
            key="save"
            class="ui button"
            style="background: #009c95 !important; color: #fff !important;"
            title="Сохранить">
            <i class="save icon"></i>
          </button>
          <button @click="edit" key="edit" class="ui button"><i class="edit icon"></i></button>
          <button key="remove" class="ui button"><i class="remove icon"></i></button>
        </transition-group>
      </div>
    </header>
    <table class="ui table celled stripped editor">
      <thead>
      <tr>
        <th>Название</th>
        <th>Описание</th>
        <th>Страна</th>
        <th>Звезд</th>
        <th>Кол-во топ1</th>
        <th>Кол-во игроков в городе</th>
        <th>Кол-во звезд в городе</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <div class="ui input fluid">
            <input class="ui input fluid" type="text" value="test" :disabled="!editMode">
          </div>
        </td>
        <td>
          <div class="ui input fluid">
            <input class="ui input fluid" type="text" value="test" :disabled="!editMode">
          </div>
        </td>
        <td>
          <div class="ui input fluid">
            <input class="ui input fluid" type="text" value="test" :disabled="!editMode">
          </div>
        </td>
        <td>
          <div class="ui input fluid">
            <input class="ui input fluid" type="text" value="test" :disabled="!editMode">
          </div>
        </td>
        <td>
          <div class="ui input fluid">
            <input class="ui input fluid" type="text" value="test" :disabled="!editMode">
          </div>
        </td>
        <td>
          <div class="ui input fluid">
            <input class="ui input fluid" type="text" value="test" :disabled="!editMode">
          </div>
        </td>
        <td>
          <div class="ui input fluid">
            <input class="ui input fluid" type="text" value="test" :disabled="!editMode">
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <h2 class="ui dividing header">Уровни</h2>
    <search-form v-model="searchQuery"></search-form>
    <addition-level :fields="addLevelFields"></addition-level>
    <!--Levels-->
    <div>
      <level v-for="(item, index) in filter(levels, ['name'])" :level-data="item" :key="item.id"></level>
    </div>
    <!--No match-->
    <h2 class="ui header" v-if="filter(levels, ['name']).length === 0">
      <i class="info circle icon"></i>
      <div class="content">
        Не найдено
      </div>
    </h2>
  </section>
</template>

<script>
  import SearchForm from '@/components/seacrh-form/SearchForm';
  import searchFilter from '@/services/search.filter';
  import AdditionForm from '@/components/addition-form/AdditionForm';
  import Level from '@/modules/cities/city/Level';
  export default {
    props: ['id'],
    data: function () {
      return {
        searchQuery: '',
        editableLevel: null,
        editMode: false,
        levels: [
          {
            id: 0,
            name: 'Opera Theater',
            level: 'Easy',
            type: 'puzzle',
            img_url: 'http://mytravelworld.ru/wp-content/uploads/2016/07/1459712040_odessa20day.jpg',
            steps: 5,
            details: [2, 4],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, quod?',
            facts: [
              'Lorem ipsum dolor sit amet.',
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum!',
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequatur et impedit possimus.'
            ],
            coin_award: 6,
            gem_award: 12,
            top_player_steps: 2,
            top_player_time: '00:45'
          },
          {
            id: 0,
            name: 'Opera Theater',
            level: 'Easy',
            type: 'puzzle',
            img_url: 'http://mytravelworld.ru/wp-content/uploads/2016/07/1459712040_odessa20day.jpg',
            steps: 5,
            details: [2, 4],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, quod?',
            facts: [
              'Lorem ipsum dolor sit amet.',
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum!',
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequatur et impedit possimus.'
            ],
            coin_award: 6,
            gem_award: 12,
            top_player_steps: 2,
            top_player_time: '00:45'
          }
        ],
        addLevelFields: [
          {label: 'Название', model: 'name', type: 'text'},
          {label: 'Описание', model: 'description', type: 'textarea'},
          {label: 'Тип', model: 'type', type: 'select', options: ['opt1', 'opt2', 'opt3']},
          {label: 'Сложность', model: 'level', type: 'select', options: ['easy', 'middle', 'hard']},
          {label: 'Количество шагов для прохождения', model: 'steps', type: 'number'},
          {label: 'Деталей', model: 'details', type: 'select', options: ['2x2', '3x3']},
          {label: 'Факты', model: 'facts', type: 'extra-facts'}
        ]
      }
    },
    methods: {
      edit: function () {
        this.editMode = true
      },
      save: function () {
        this.editMode = false
      },
      filter: function (array, keys) {
        return searchFilter(array, keys, this.searchQuery)
      }
    },
    components: {
      searchForm: SearchForm,
      additionLevel: AdditionForm,
      level: Level
    },
    beforeRouteLeave(to, from, next) {
      var levelsEditMode = false;
      for (var i = 0, l = this.$children.length; i < l; i++) {
        levelsEditMode = levelsEditMode || this.$children[i].$data.editMode;
      }
      if (this.editMode || levelsEditMode) {
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

<style lang="sass" scoped>
  section#city
    position: relative
    header
      display: flex
      flex-flow: row nowrap
      justify-content: space-between
      align-items: center
      padding-bottom: 1rem
      border-bottom: 1px solid #094959
      h2
        margin: auto 0 !important
      button
        padding: .78571429em 1.5em .78571429em !important
      .editor
        input
          color: #fff !important
        input[disabled]
          opacity: 1 !important
          border: 1px solid transparent
      .btn-fade-enter-active, .btn-fade-leave-active
        opacity: 1
        transition: .3s linear all

      .btn-fade-enter, .btn-fade-leave-to
        opacity: 0
        transition: .3s linear all
</style>
