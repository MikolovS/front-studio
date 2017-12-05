<template>
  <div class="level-item">
    <header>
      <h3>{{item.name}}</h3>
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
    <div class="level">
      <div class="level-thumbnail">
        <div class="level-thumbnail-img" :style="{ background: 'url(' + item.img_url + ')'}"></div>
        <div class="ui labeled input fluid img-link">
          <div class="ui label">
            <i class="icon linkify"></i>
          </div>
          <input type="text" :disabled="!editMode" v-model="item.img_url">
        </div>
      </div>
      <div class="level-data">
        <table class="ui table celled stripped">
          <thead>
          <tr>
            <th>Описание</th>
            <th>Тип</th>
            <th>Сложность</th>
            <th>
              <i class="child icon" title="Количество шагов для прохождения"></i>
            </th>
            <th>Деталей</th>
            <th>
              <i class="trophy icon" title="Максимальная награда за уровень"></i>
            </th>
            <th>
              <i class="star icon" title="Награда за 3 звезды в паззлгемах"></i>
            </th>
            <th>
              <i class="exchange icon" title="Ходов Топ1"></i>
            </th>
            <th>
              <i class="wait icon" title="Время прохождения Топ1"></i>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <textarea rows="2" :disabled="!editMode">{{item.description}}</textarea>
            </td>
            <td>
              <select name="" id="" :disabled="!editMode">
                <option value="">Тип</option>
              </select>
            </td>
            <td>
              <select name="" id="" :disabled="!editMode">
                <option value="">Сложность</option>
              </select>
            </td>

            <td>
              <input type="number" value="45" :disabled="!editMode">
            </td>

            <td>
              <select name="" id="" :disabled="!editMode">
                <option value="">Деталей</option>
              </select>
            </td>

            <td>
              <span>123</span>
            </td>

            <td>
              <span>123</span>
            </td>

            <td>
              <span>123</span>
            </td>

            <td>
              <span>123</span>
            </td>

          </tr>
          </tbody>
        </table>
        <table class="ui table celled stripped">
          <thead>
          <tr>
            <th :colspan="item.facts.length">
              Факты
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td v-for="fact in item.facts">
              <textarea rows="2" :disabled="!editMode">{{fact}}</textarea>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
  export default{
    data: function () {
      return {
        item: this.$attrs['level-data'],
        editMode: false
      }
    },
    methods: {
      edit: function () {
        this.editMode = true
      },
      save: function() {
        this.editMode = false
      }
    }
  }
</script>

<style lang="sass" scoped>
  .level-item
    margin: 15px 0
  .level
    display: flex
    flex-flow: row nowrap
    padding: 20px
    background: rgba(255, 255, 255, 0.15)
    .img-link
      margin-top: 4px
      i
        margin: 0
    .level-data
      width: 100%
      overflow: auto
      input, select, textarea
        background: #4f6c72
        border: none
        border-radius: .28571429rem
        width: 100%
        resize: none
        overflow: auto
      textarea,select
        padding: .67857143em 1em
      input[type="number"]
        width: 70px
        padding: 0 1em
        text-align: center
    &-thumbnail
      width: 200px
      margin-right: 15px
      padding: 1px
      box-sizing: border-box
      flex-shrink: 0
      &-img
        width: 200px
        height: 200px
        background-size: cover !important
        background-position: 50% 50% !important
  header
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    align-items: center
    padding-bottom: 10px
    h3
      margin: auto 0 !important
    button
      padding: .78571429em 1.5em .78571429em !important
    .editor
      input
        color: #fff !important
      input[disabled]
        opacity: 1 !important
        border: 1px solid transparent
    .add-item
      margin: 15px 0
    .btn-fade-enter-active, .btn-fade-leave-active
      opacity: 1
      transition: .3s linear all

    .btn-fade-enter, .btn-fade-leave-to
      opacity: 0
      transition: .3s linear all
</style>
