<template>
  <table class="calculated-result-assumed-rates">
    <tbody>
      <CalculatedResultAssumedRatesItem>
        <template v-slot:pair>
          🇯🇵 {{ $store.state.currencyPairs.JPY.USD.name }}
        </template>
        <template v-slot:assumed-rate>
          {{ $store.state.currencyPairs.JPY.USD.assumedRate | digitSeparator }}
        </template>
      </CalculatedResultAssumedRatesItem>

      <CalculatedResultAssumedRatesItem>
        <template v-slot:pair>
          🇪🇺 {{ $store.state.currencyPairs.USD.EUR.name }}
        </template>
        <template v-slot:assumed-rate>
          {{ $store.state.currencyPairs.USD.EUR.assumedRate | digitSeparator }}
        </template>
      </CalculatedResultAssumedRatesItem>

      <CalculatedResultAssumedRatesItem>
        <template v-slot:pair>
          🇬🇧 {{ $store.state.currencyPairs.USD.GBP.name }}
        </template>
        <template v-slot:assumed-rate>
          {{ $store.state.currencyPairs.USD.GBP.assumedRate | digitSeparator }}
        </template>
      </CalculatedResultAssumedRatesItem>

      <CalculatedResultAssumedRatesItem>
        <template v-slot:pair>
          🇦🇺 {{ $store.state.currencyPairs.USD.AUD.name }}
        </template>
        <template v-slot:assumed-rate>
          {{ $store.state.currencyPairs.USD.AUD.assumedRate | digitSeparator }}
        </template>
      </CalculatedResultAssumedRatesItem>

      <CalculatedResultAssumedRatesItem>
        <template v-slot:pair>
          🇪🇺 {{ $store.state.currencyPairs.JPY.EUR.name }}
        </template>
        <template v-slot:assumed-rate>
          {{ $store.state.currencyPairs.JPY.EUR.assumedRate | digitSeparator }}
        </template>
      </CalculatedResultAssumedRatesItem>

      <CalculatedResultAssumedRatesItem>
        <template v-slot:pair>
          🇬🇧 {{ $store.state.currencyPairs.JPY.GBP.name }}
        </template>
        <template v-slot:assumed-rate>
          {{ $store.state.currencyPairs.JPY.GBP.assumedRate | digitSeparator }}
        </template>
      </CalculatedResultAssumedRatesItem>

      <CalculatedResultAssumedRatesItem>
        <template v-slot:pair>
          🇦🇺 {{ $store.state.currencyPairs.JPY.AUD.name }}
        </template>
        <template v-slot:assumed-rate>
          {{ $store.state.currencyPairs.JPY.AUD.assumedRate | digitSeparator }}
        </template>
      </CalculatedResultAssumedRatesItem>
    </tbody>
  </table>
</template>

<script>
import CalculatedResultAssumedRatesItem from '@/components/common/calculated-result/CalculatedResultAssumedRatesItem.vue'

export default {
  components: {
    CalculatedResultAssumedRatesItem
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-assumed-rates {
  border-collapse: collapse;
  width: 100%;
}
</style>
