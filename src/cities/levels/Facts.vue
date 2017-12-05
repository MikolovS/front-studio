<template>
  <table class="ui table celled stripped">
    <thead>
    <tr>
      <th>
        <div class="flex-row between">
          Факты
        </div>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>
        <draggable :list="facts" @start="drag=true" @end="drag=false">
          <div class="fact" v-for="(fact, index) in facts">
            <textarea rows="3" v-model="facts[index].text"></textarea>
            <button class="ui mini button teal icon" @click="deleteFact(fact, index)">
              <i class="ui icon delete"></i>
            </button>
          </div>
        </draggable>
      </td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
      <td>
        <button class="ui button icon fluid" @click="additionFactsForm = !additionFactsForm">
          <i class="ui icon arrow" v-bind:class="{'down': !additionFactsForm, 'up': additionFactsForm}"></i>
          <span>Добавить факт</span>
        </button>
      </td>
    </tr>
    <tr>
      <td class="padding-0">
        <transition name="accordeon">
          <form @submit.prevent="addFact()" v-if="additionFactsForm">
            <textarea v-model="newFact"></textarea>
            <button class="ui button teal fluid" type="submit" :disabled="newFact === null">
              Добавить факт
            </button>
          </form>
        </transition>
      </td>
    </tr>
    </tfoot>
  </table>
</template>

<script>
  import Axios from '@/axiosInstance';
  import {levelConstants} from '@/constants';
  import draggable from 'vuedraggable';

  export default {
    data() {
      return {
        facts: this.$attrs.items,
        additionFactsForm: false,
        newFact: null
      }
    },
    computed: {
      edit: function () {
        return this.$attrs.edit ? this.$attrs.edit : false
      }
    },
    methods: {
      addFact() {
        if (this.facts.length < 5) {
          this.$attrs.addFact({
            facts: [{
              text: this.newFact,
              order: this.facts.length
            }]
          });
          this.newFact = null;
        } else {
          this.$notify({
            type: 'warning',
            title: 'Нельзя добавить больше 5 фактов'
          })
        }
      },
      deleteFact(fact, index) {
        var that = this;
        Axios.delete(levelConstants.facts + fact.id).then(function (response) {
          that.facts.splice(index, 1);
          that.$notify({
            type: 'success',
            title: 'Факт удален'
          })
        }).catch(function (error) {
          that.$notify({

            type: 'error',
            title: 'Ошибка'
          })
        })
      }
    },
    components: {
      draggable
    }
  }
</script>

<style lang="sass" scoped>
  .fact
    display: flex
    flex-flow: row nowrap
    margin: 0 0 10px 0
    textarea
      border-radius: 5px 0 0 5px
    button
      border-radius: 0 5px 5px 0 !important
    &:last-child
      margin: 0
    .accordeon-enter-active, .accordeon-leave-active
      height: 82px
      opacity: 1
      transition: .3s all
    .accordeon-enter, .accordeon-leave-to
      height: 0px
      opacity: 0
    .padding-0
      padding: 0 11px 11px 11px !important
</style>
