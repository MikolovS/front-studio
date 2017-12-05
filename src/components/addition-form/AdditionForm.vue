<template>
  <div class="add-container">
    <button class="ui right labeled icon button teal rounded-button" @click="toggle">
      <i class="caret icon" :class="[toggled ? 'up ' : 'down']"></i>
      Добавить
    </button>
    <div class="add-item" v-show="toggled">
      <form class="ui form" v-model="formData" @submit.prevent="addItem">
        <field
          v-for="field in fields"
          :data="field"
          :key="field.name"
          v-model="formData[field.model]"
        >
        </field>
        <div class="field right">
          <button class="ui right labeled icon button teal" type="submit">
            <i class="right add square icon"></i>
            Добавить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import AdditionFormField from '@/components/addition-form/AdditionFormField';
  export default {
      name: 'AddItem',
      data: function () {
        return {
            toggled: false,
            fields: this.$attrs.options,
            formData: {}
        }
      },
      methods: {
          toggle: function () {
              this.toggled = !this.toggled
          },
          addItem: function(){
            return this.$attrs.add(this.formData)
          }
      },
      components:{
          field: AdditionFormField
      }
  }
</script>

<style lang="sass" scoped>
  .add-container
    margin: 10px 0
</style>
