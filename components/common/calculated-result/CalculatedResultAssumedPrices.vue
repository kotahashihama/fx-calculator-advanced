<template>
  <table class="calculated-result-assumed-prices">
    <tbody>
      <CalculatedResultAssumedPricesItem
        v-for="currencyPair in $store.state.currencyPairs"
        :key="currencyPair.symbol"
      >
        <template v-slot:pair>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="currencyPair.emoji"></span>
          {{ currencyPair.symbol }}
        </template>

        <template v-slot:assumed-price>
          {{ currencyPair.assumedPrice | digitSeparator }}
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
