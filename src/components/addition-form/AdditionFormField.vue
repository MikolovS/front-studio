<template>
<div>
  <label>{{field.label}}</label>

  <input type="text" v-if="field.type === 'text'" v-bind:value="value" v-on:input="updateValue($event.target.value)">
  <input type="number" v-if="field.type === 'number'" v-on:input="updateValue($event.target.value)" step="0.001">

  <select v-if="field.type === 'select'" v-on:change="updateValue($event.target.value)">
    <option v-if="option[field.options_value]" v-for="option in field.options" :value="option[field.options_value]">{{option[field.options_view]}}</option>
    <option v-if="!option[field.options_value]" v-for="option in field.options" :value="option">{{option}}</option>
  </select>

  <textarea rows="3" v-if="field.type === 'textarea'" v-on:input="updateValue($event.target.value)"></textarea>

  <!--EXTRA FACTS -->
  <div class="add-facts dividing" v-if="field.type === 'extra-facts'">
    <ul>
      <li v-for="(fact, index) in facts">
        <span>"{{fact}}"</span>
        <button class="ui button icon teal" @click="deleteFact(index)">
          <i class="icon delete"></i>
        </button>
      </li>
    </ul>
    <div class="ui action input">
      <input type="text" placeholder="Текст факта" v-model="factText">
      <button class="ui teal right icon button" @click="addFact">
        <i class="add icon"></i>
      </button>
    </div>
  </div>
</div>
</template>

<script>
  export default {
      props: ['value'],
      data: function() {
          return {
              field: this.$attrs.data,
              factText: '',
              facts: []
          }
      },
    methods: {
      addFact: function() {
        this.facts.length < 5 ? this.facts.push(this.factText) : false
        this.updateValue()
      },
      deleteFact: function(index) {
        this.facts.splice(index, 1)
      },
      updateValue: function (value) {
          if(this.field.type !== 'extra-facts') {
            this.$emit('input', value)
          } else {
            this.$emit('input', this.facts)
          }
      }
    }
  }
</script>

<style lang="sass" scoped>
  input, select, textarea
    border: 1px solid #52575c !important
    color: #272b30 !important
  ul
    padding: 0
  li
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    margin: 5px 0
</style>
