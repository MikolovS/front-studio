<template>
  <div class="addition-container">
    <button class="ui right labeled icon button teal rounded-button" @click="toggleForm()">
      <i class="caret icon down"></i>
      Добавить
    </button>
    <form v-if="toggled" class="ui form" @submit.prevent="addLevel()">
      <div class="ui input">
        <input type="text" placeholder="Название" v-model="data.name" required>
      </div>
      <div class="ui input">
        <textarea placeholder="Описание" v-model="data.description" required></textarea>
      </div>
      <label class="ui">Тип</label>
      <div class="ui input">
        <select v-model="data.type" required>
          <option v-for="type in this.$attrs.types" :value="type">
            {{type}}
          </option>
        </select>
      </div>
      <label class="ui">Сложность</label>
      <div class="ui input">
        <select v-model="data.complexity" required>
          <option v-for="complexity in this.$attrs.complexities" :value="complexity">
            {{complexity}}
          </option>
        </select>
      </div>
      <!--<div class="ui input">-->
        <!--<input type="number" placeholder="Max Steps" v-model="data.max_steps" required>-->
      <!--</div>-->
      <!--<div class="ui input">-->
        <!--<input type="number" placeholder="Max Soft Coin" v-model="data.max_soft_coin" required>-->
      <!--</div>-->
      <!--<div class="ui input">-->
        <!--<input type="number" placeholder="Continue Cost" v-model="data.continue_cost" required>-->
      <!--</div>-->
      <div class="ui input">
        <input type="file" placeholder="Image" @change="data.image = $event.target.files[0]" required>
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
  export default {
    name: 'AdditionLevelForm',
    data() {
      return {
        toggled: false,
        fact: null,
        data: {},
        ff: 0
      }
    },
    methods: {
      toggleForm() {
        return this.toggled = !this.toggled
      },
      addLevel() {
        this.$attrs.add(this.data);
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
