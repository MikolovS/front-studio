<template>
  <table class="ui table fixed celled">
    <thead>
    <tr>
      <th>Тип</th>
      <th>Сложность</th>
      <th>Default reward</th>
      <th>Min steps</th>
      <th>Max steps</th>
      <th>Ratio</th>
      <th>Continue cost</th>
      <th>Continue steps</th>
      <th class="center aligned">Save</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="config in configs">
      <td>
        {{config.type}}
      </td>
      <td>
        {{config.complexity}}
      </td>
      <td>
        <div class="ui input fluid">
          <input type="number" v-model="config.default_reward">
        </div>
      </td>
      <td>
        <div class="ui input fluid">
          <input type="number" v-model="config.min_steps">
        </div>
      </td>
      <td>
        <div class="ui input fluid">
          <input type="number" v-model="config.max_steps">
        </div>
      </td>
      <td>
        <div class="ui input fluid">
          <input type="text" v-model="config.ratio">
        </div>
      </td>
      <td>
        <div class="ui input fluid">
          <input type="number" v-model="config.continue_cost">
        </div>
      </td>
      <td>
        <div class="ui input fluid">
          <input type="number" v-model="config.continue_steps">
        </div>
      </td>
      <td class="center aligned">
        <button class="ui button teal icon" @click="saveLevelConfig(config)">
          <i class="icon save"></i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import Axios from '@/axiosInstance';
  import {levelConstants} from '@/constants';

  export default {
    data() {
      return {
        configs: null
      }
    },
    created() {
      let that = this;
      Axios.get(levelConstants.config)
        .then(function (res) {
          that.configs = res.data.data.items
        })
        .catch(function (error) {
          that.$notify({

            type: 'error',
            title: 'Ошибка при получении глобальных настроек'
          })
        })
    },
    methods: {
      saveLevelConfig(config) {
        let that = this;
        Axios.put(levelConstants.config, config)
          .then(function (res) {
            that.$notify({

              type: 'success',
              title: 'Сохранено'
            })
          })
          .catch(function (error) {
            that.$notify({

              type: 'error',
              title: 'Ошибка'
            })
          })
      }
    }
  }
</script>
