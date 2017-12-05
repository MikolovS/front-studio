import VueCharts from 'vue-chartjs'
import {Bar, Line} from 'vue-chartjs'

export default {
  extends: Bar,
  props: ["chartData"],
  mounted() {
    this.renderChart({
      labels: this.chartData.labels,
      datasets: [
        {
          label: 'User/Steps',
          backgroundColor: '#009c95',
          data: this.chartData.data
        }
      ]
    })
  }
}
