<template>
  <div v-if="calculationData" class="calculated-result-open-trade-ratio">
    <div class="chart">
      <CalculatedResultOpenTradeRatioChart
        ref="chart"
        class="chart__body"
        :chart-data="chartData(calculationData)"
        :chart-options="chartOptions"
      />
      <div class="chart__text">
        <span class="value">{{ openTradeLotsTotal(calculationData) }}</span
        ><span v-if="openTradeLotsTotal(calculationData) === 1">lot</span
        ><span v-else>lots</span>
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
  <div v-else class="calculated-result-open-trade-ratio">
    <div class="chart">
      <CalculatedResultOpenTradeRatioChart
        ref="chart"
        class="chart__body"
        :chart-data="chartData()"
        :chart-options="chartOptions"
      />
      <div class="chart__text">
        <span class="value">{{ openTradeLotsTotal() }}</span
        ><span v-if="openTradeLotsTotal() === 1">lot</span
        ><span v-else>lots</span>
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
  props: {
    calculationData: {
      type: Object,
      default: () => {}
    }
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
      return calculationData => {
        const currencyPairs = calculationData
          ? this.calculationData.currencyPairs
          : this.$store.state.currencyPairs
        const openTradeLots = calculationData
          ? this.openTradeLots(this.calculationData)
          : this.openTradeLots()
        const chartColorsMatched = calculationData
          ? this.calculationData.currencyPairs.map(
              savedCurrencyPair =>
                this.$store.state.currencyPairs.find(
                  storeCurrencyPair =>
                    storeCurrencyPair.symbol === savedCurrencyPair.symbol
                ).chartColor
            )
          : currencyPairs.map(currencyPair => currencyPair.chartColor)
        return {
          labels: currencyPairs.map(currencyPair => currencyPair.symbol),
          datasets: [
            {
              data: openTradeLots,
              backgroundColor: chartColorsMatched
            }
          ]
        }
      }
    },
    openTrades() {
      return this.$store.state.openTrades
    },
    openTradeLotsTotal() {
      return calculationData => {
        const openTradeLots = calculationData
          ? this.openTradeLots(calculationData)
          : this.openTradeLots()
        return (
          Math.round(
            openTradeLots.reduce((sum, openTradeLot) => sum + openTradeLot) *
              100
          ) / 100
        )
      }
    },
    openTradeLots() {
      return calculationData => {
        const currencyPairs = calculationData
          ? calculationData.currencyPairs
          : this.$store.state.currencyPairs
        return currencyPairs.map(currencyPair => {
          const openTrades = calculationData
            ? calculationData.openTrades
            : this.$store.state.openTrades
          const openTradesMatched = openTrades.filter(
            openTrade => openTrade.symbol === currencyPair.symbol
          )
          return (
            Math.round(
              openTradesMatched.reduce(
                (sum, openTrade) => sum + openTrade.lot,
                0
              ) * 100
            ) / 100
          )
        })
      }
    }
  },
  watch: {
    openTrades() {
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
