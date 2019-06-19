<template>
  <div class="calculating-form-assumed-prices">
    <CalculatingFormHeading>仮定レート</CalculatingFormHeading>

    <CalculatingFormAssumedPricesItem
      v-for="currencyPair in $store.state.currencyPairs"
      :key="currencyPair.symbol"
      :currency-pair="currencyPair"
    >
    </CalculatingFormAssumedPricesItem>
  </div>
</template>

<script>
import CalculatingFormHeading from '@/components/calculator/calculating-form/common/CalculatingFormHeading.vue'
import CalculatingFormAssumedPricesItem from '@/components/calculator/calculating-form/CalculatingFormAssumedPricesItem.vue'

export default {
  components: {
    CalculatingFormHeading,
    CalculatingFormAssumedPricesItem
  }
}
</script>
