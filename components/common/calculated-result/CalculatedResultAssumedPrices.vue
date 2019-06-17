<template>
  <table class="calculated-result-assumed-prices">
    <tbody>
      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇯🇵 {{ $store.state.currencyPairs.jpy.usd.symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs.jpy.usd.assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>

      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇪🇺 {{ $store.state.currencyPairs.usd.eur.symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs.usd.eur.assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>

      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇬🇧 {{ $store.state.currencyPairs.usd.gbp.symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs.usd.gbp.assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>

      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇦🇺 {{ $store.state.currencyPairs.usd.aud.symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs.usd.aud.assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>

      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇪🇺 {{ $store.state.currencyPairs.jpy.eur.symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs.jpy.eur.assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>

      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇬🇧 {{ $store.state.currencyPairs.jpy.gbp.symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs.jpy.gbp.assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>

      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇦🇺 {{ $store.state.currencyPairs.jpy.aud.symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs.jpy.aud.assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>
    </tbody>
  </table>
</template>

<script>
import CalculatedResultAssumedPricesItem from '@/components/common/calculated-result/CalculatedResultAssumedPricesItem.vue'

export default {
  components: {
    CalculatedResultAssumedPricesItem
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-assumed-prices {
  border-collapse: collapse;
  width: 100%;
}
</style>
