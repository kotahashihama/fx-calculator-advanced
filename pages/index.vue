<template>
  <div class="calculator">
    <div class="monitor">
      <CalculatingForm class="calculating-form"></CalculatingForm>
      <CalculatedResult class="calculated-result"></CalculatedResult>
    </div>
    <CalculationProcessor></CalculationProcessor>
  </div>
</template>

<script>
import CalculatingForm from '@/components/calculator/calculating-form/CalculatingForm.vue'
import CalculatedResult from '@/components/common/calculated-result/CalculatedResult.vue'
import CalculationProcessor from '@/components/calculator/calculation-processor/CalculationProcessor.vue'

export default {
  middleware: 'disable-loading-calculation',
  components: {
    CalculatingForm,
    CalculatedResult,
    CalculationProcessor
  },
  head() {
    return {
      titleTemplate: 'ポジション計算機'
    }
  },
  computed: {
    currencyPairPascalCase: () => (baseCurrency, quoteCurrency) =>
      baseCurrency.charAt(0) +
      baseCurrency.substring(1).toLowerCase() +
      quoteCurrency.charAt(0) +
      quoteCurrency.substring(1).toLowerCase()
  },
  mounted() {
    if (
      !this.$store.state.editsCalculation &&
      this.$store.state.currencyPairs[0] === 0
    )
      this.getCurrentPrices()
  },
  methods: {
    getCurrentPrices() {
      const self = this

      this.$axios
        .get('https://kotahashihama.com/fx-calculator/ratesapi.php?base=JPY')
        .then(function(response) {
          const currentPrices = response.data.rates
          const currencyPairs = self.$store.state.currencyPairs.filter(
            currencyPair => currencyPair.currencies[1] === 'JPY'
          )
          currencyPairs.forEach(currencyPair => {
            const currencies = currencyPair.currencies

            self.$store.commit('getCurrentPrice', {
              baseCurrency: currencies[0],
              quoteCurrency: currencies[1],
              currentPrice: currentPrices[currencies[0]]
            })
          })
        })

      this.$axios
        .get('https://kotahashihama.com/fx-calculator/ratesapi.php?base=USD')
        .then(function(response) {
          const currentPrices = response.data.rates
          const currencyPairs = self.$store.state.currencyPairs.filter(
            currencyPair => currencyPair.currencies[1] === 'USD'
          )
          currencyPairs.forEach(currencyPair => {
            const currencies = currencyPair.currencies

            self.$store.commit('getCurrentPrice', {
              baseCurrency: currencies[0],
              quoteCurrency: currencies[1],
              currentPrice: currentPrices[currencies[0]]
            })
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.calculator {
  height: calc(100vh - (#{$header-height} + #{$footer-height}));
}

.monitor {
  display: flex;
  height: calc(100% - 50px);
}

.calculating-form,
.calculated-result {
  overflow: scroll;
}

.calculating-form {
  border-right: solid 1px #d0d0d0;
  padding: 23px;
  width: $calculating-form-width;
}

.calculated-result {
  padding: 23px;
  width: calc(100% - 320px);
}

.calculation-processer {
  width: 100%;
  height: 50px;
}
</style>
