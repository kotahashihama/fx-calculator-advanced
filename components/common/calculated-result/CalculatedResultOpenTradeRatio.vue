<template>
  <div class="calculated-result-open-trade-ratio">
    <div class="chart">
      <CalculatedResultOpenTradeRatioChart
        ref="chart"
        class="chart__body"
        :chart-data="chartData"
        :chart-options="chartOptions"
      />
      <div class="chart__text">
        <span class="value">{{ openTradeLotsTotal }}</span
        >ロット
      </div>
    </div>
    <div class="chart-legend">
      <ul class="chart-legend-list">
        <li
          v-for="currencyPair in $store.state.currencyPairs"
          :key="currencyPair.symbol"
          class="chart-legend-list__item"
        >
          <span
            class="icon"
            :style="{ background: currencyPair.chartColor }"
          ></span
          >{{ currencyPair.symbol }}
        </li>
      </ul>
    </div>
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
          display: false
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
        return (
          Math.round(
            openTrades.reduce((sum, openTrade) => sum + openTrade.lot, 0) * 100
          ) / 100
        )
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
  margin-bottom: 30px;
}

.chart {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &__body {
    max-height: 250px;
    max-width: 250px;
  }

  &__text {
    position: absolute;
    text-align: center;

    .value {
      display: block;
      font-size: 1.6rem;
      font-weight: bold;
    }
  }
}

.chart-legend {
  display: flex;
  justify-content: center;
  margin-top: 18px;

  &-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    font-size: 0.8rem;

    &__item {
      display: flex;
      align-items: center;
      margin-right: 13px;
    }
  }

  .icon {
    display: block;
    margin-right: 6px;
    border-radius: 50%;
    width: 0.8rem;
    height: 0.8rem;
  }
}
</style>
