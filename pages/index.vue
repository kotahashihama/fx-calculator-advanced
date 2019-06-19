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
  components: {
    CalculatingForm,
    CalculatedResult,
    CalculationProcessor
  },
  computed: {
    currencyPairPascalCase: () => (baseCurrency, quoteCurrency) =>
      baseCurrency.charAt(0) +
      baseCurrency.substring(1).toLowerCase() +
      quoteCurrency.charAt(0) +
      quoteCurrency.substring(1).toLowerCase()
  },
  mounted() {
    this.getCurrentPrices()
  },
  methods: {
    getCurrentPrices() {
      const self = this
      const currencyPairs = this.$store.state.currencyPairs

      this.$axios
        .get('https://api.ratesapi.io/api/latest?base=JPY')
        .then(function(response) {
          const currentPrices = response.data.rates
          currencyPairs.forEach(currencyPair => {
            const currencies = currencyPair.currencies
            if (currencies[1] === 'JPY') {
              const currencyPairPascalCase = self.currencyPairPascalCase(
                currencies[0],
                currencies[1]
              )

              self.$store.commit(
                `getCurrentPrice${currencyPairPascalCase}`,
                currentPrices[currencies[0]]
              )
            }
          })
        })

      this.$axios
        .get('https://api.ratesapi.io/api/latest?base=USD')
        .then(function(response) {
          const currentPrices = response.data.rates
          currencyPairs.forEach(currencyPair => {
            const currencies = currencyPair.currencies
            if (currencies[1] === 'USD') {
              const currencyPairPascalCase = self.currencyPairPascalCase(
                currencies[0],
                currencies[1]
              )

              self.$store.commit(
                `getCurrentPrice${currencyPairPascalCase}`,
                currentPrices[currencies[0]]
              )
            }
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
  border: solid 2px #d0d0d0;
  padding: 23px;
  width: 320px;
}

.calculated-result {
  border: solid 2px #d0d0d0;
  border-left: none;
  padding: 23px;
  width: calc(100% - 320px);
}

.calculation-processer {
  width: 100%;
  height: 50px;
}
</style>
