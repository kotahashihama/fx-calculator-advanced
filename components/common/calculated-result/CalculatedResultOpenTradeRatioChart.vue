<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    chartOptions: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  },
  methods: {
    reRenderChart() {
      this.$nextTick(() => {
        this.renderChart(this.chartData, this.chartOptions)
      })
    }
  }
}
</script>
