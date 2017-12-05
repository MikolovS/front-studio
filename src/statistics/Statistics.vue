<template>
  <section class="statistics">
    <form @submit.prevent="getStatistics()">
      <div class="ui input">
        <input type="date" required v-model="from">
      </div>
      <div class="ui input">
        <input type="date" required v-model="to">
      </div>
      <button class="ui button teal">Получить статистику</button>
    </form>
    <table class="ui table celled stripped">
      <thead>
      <tr>
        <th>Тип</th>
        <th>Сложность</th>
        <th class="cursor-pointer" @click="filterByColumn('average_steps')">average_steps</th>
        <th class="cursor-pointer" @click="filterByColumn('sum_win_game')">sum_win_game</th>
        <th class="cursor-pointer" @click="filterByColumn('sum_game')">sum_game</th>
        <th class="cursor-pointer" @click="filterByColumn('percent_win_game')">percent_win_game</th>
        <th>Chart</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in statistic">
        <td>{{item.type}}</td>
        <td>{{item.complexity}}</td>
        <td>{{item.average_steps}}</td>
        <td>{{item.sum_win_game}}</td>
        <td>{{item.sum_game}}</td>
        <td>{{item.percent_win_game}}</td>
        <td>
          <button class="ui button" @click="showChart(item)">
            <i class="bar chart icon"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="modal-wrapper" id="modal" v-if="chartModal">
      <div class="modal">
        <button class="ui small icon button teal" id="close-modal" @click="chartModal = !chartModal">
          <i class="window close icon"></i>
        </button>
        <statistics-chart :chart-data="chartData"></statistics-chart>
      </div>
    </div>
  </section>
</template>

<script>
  import Axios from '@/axiosInstance'
  import {statisticsConstants} from '@/constants';
  import StatisticsChart from '@/statistics/Chart';
  import filterNumbers from '@/services/sorting';


  export default {
    name: 'statistics',
    components: {
      StatisticsChart
    },
    data() {
      return {
        from: null,
        to: null,
        statistic: null,
        chartData: {},
        chartModal: false,
        columnsReverse: {
          average_steps: false,
          sum_win_game: false,
          sum_game: false,
          percent_win_game: false
        }
      }
    },
    methods: {
      getStatistics() {
        let that = this;
        let params = {
          from: this.getUnixTime(this.from),
          to: this.getUnixTime(this.to)
        }
        Axios.get(statisticsConstants.stat, {
          params: params
        })
          .then(function (res) {
            that.statistic = res.data.data.items
          })
      },
      showChart(item) {
        let that = this;
        let params = {
          from: this.getUnixTime(this.from),
          to: this.getUnixTime(this.to),
          type: item.type,
          complexity: item.complexity
        }
        Axios.get(statisticsConstants.diagram, {
          params: params
        }).then(function (res) {
          that.createChartData(res.data.data.items)
          that.chartModal = true;
        })
      },
      getUnixTime(time) {
        return new Date(time).getTime() / 1000
      },
      createChartData(items) {
        let labels = [];
        let data = [];
        for (let i = 0, l = items.length; i < l; i++) {
          labels.push(items[i].averege_steps)
          data.push(items[i].users_percent)
        }
        this.chartData = {
          labels: labels,
          data: data
        }
      },
      filterByColumn(key) {
        this.columnsReverse[key] = !this.columnsReverse[key];
        filterNumbers(this.statistic, key, this.columnsReverse[key])
      }
    }
  }
</script>

<style lang="sass" scoped>
  .cursor-pointer
    cursor: pointer !important
  .modal-wrapper
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100vh
    display: flex
    background: rgba(0, 0, 0, 0.7)
    .modal
      width: 700px
      height: 700px
      display: block
      margin: auto
      background: #fff
      position: relative
    #close-modal
      position: absolute
      top: 2px
      right: 2px
</style>
