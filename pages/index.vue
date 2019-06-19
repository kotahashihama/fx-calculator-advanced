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
            if (currencyPair.currencies[1] === 'JPY') {
              self.$store.commit(
                `getCurrentPrice${currencies[0].charAt(0) +
                  currencies[0]
                    .substring(1)
                    .toLowerCase()}${currencies[1].charAt(0) +
                  currencies[1].substring(1).toLowerCase()}`,
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
            if (currencyPair.currencies[1] === 'USD') {
              self.$store.commit(
                `getCurrentPrice${currencies[0].charAt(0) +
                  currencies[0]
                    .substring(1)
                    .toLowerCase()}${currencies[1].charAt(0) +
                  currencies[1].substring(1).toLowerCase()}`,
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
