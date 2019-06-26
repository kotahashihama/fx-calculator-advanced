<template>
  <div class="calculated-result-open-trade-ratio">
    <CalculatedResultOpenTradeRatioChart
      ref="chart"
      class="calculated-result-open-trade-ratio__chart"
      :chart-data="chartData"
      :chart-options="chartOptions"
    />
  </div>
</template>

<script>
import CalculatedResultOpenTradeRatioChart from '@/components/common/calculated-result/CalculatedResultOpenTradeRatioChart.vue'

export default {
  components: {
    CalculatedResultOpenTradeRatioChart
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 65,
        legend: {
          position: 'right',
          labels: {
            boxWidth: 30
          }
        }
      }
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.$store.state.currencyPairs.map(
          currencyPair => currencyPair.symbol
        ),
        datasets: [
          {
            data: this.openTradeLots,
            backgroundColor: this.$store.state.currencyPairs.map(
              currencyPair => currencyPair.chartColor
            )
          }
        ]
      }
    },
    openTrades() {
      return this.$store.state.openTrades
    },
    openTradeLotsTotal() {
      return (
        Math.round(
          this.openTradeLots.reduce((sum, openTradeLot) => sum + openTradeLot) *
            100
        ) / 100
      )
    },
    openTradeLots() {
      return this.$store.state.currencyPairs.map(currencyPair => {
        const openTrades = this.$store.state.openTrades.filter(
          openTrade => openTrade.symbol === currencyPair.symbol
        )
        return openTrades.reduce((sum, openTrade) => sum + openTrade.lot, null)
      })
    }
  },
  watch: {
    openTradeLots() {
      this.$refs.chart.reRenderChart()
    }
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-open-trade-ratio {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;

  &__chart {
    height: 250px;
  }
}
</style>
