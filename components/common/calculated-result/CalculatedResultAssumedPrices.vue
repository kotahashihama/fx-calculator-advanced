<template>
  <table class="calculated-result-assumed-prices">
    <tbody>
      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇯🇵 {{ $store.state.currencyPairs[0].symbol }}
        </template>

        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs[0].assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>

      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇪🇺 {{ $store.state.currencyPairs[1].symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs[1].assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>

      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇬🇧 {{ $store.state.currencyPairs[2].symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs[2].assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>

      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇦🇺 {{ $store.state.currencyPairs[3].symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs[3].assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>

      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇪🇺 {{ $store.state.currencyPairs[4].symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs[4].assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>

      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇬🇧 {{ $store.state.currencyPairs[5].symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs[5].assumedPrice | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>

      <CalculatedResultAssumedPricesItem>
        <template v-slot:pair>
          🇦🇺 {{ $store.state.currencyPairs[6].symbol }}
        </template>
        <template v-slot:assumed-price>
          {{ $store.state.currencyPairs[6].assumedPrice | digitSeparator }}
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
