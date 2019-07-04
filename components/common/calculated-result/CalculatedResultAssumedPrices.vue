<template>
  <table v-if="calculationData" class="calculated-result-assumed-prices">
    <tbody>
      <CalculatedResultAssumedPricesItem
        v-for="currencyPair in $store.state.currencyPairs"
        :key="currencyPair.symbol"
      >
        <template v-slot:pair>
          <!-- eslint-disable vue/no-v-html -->
          <span
            class="emoji"
            v-html="currencyPairInfo('emoji', currencyPair)"
          ></span
          >{{ currencyPairInfo('symbol', currencyPair) }}
          <!-- eslint-enable vue/no-v-html -->
        </template>

        <template v-slot:assumed-price>
          {{ currencyPairInfo('assumedPrice', currencyPair) | digitSeparator }}
        </template>
      </CalculatedResultAssumedPricesItem>
    </tbody>
  </table>
  <table v-else class="calculated-result-assumed-prices">
    <tbody>
      <CalculatedResultAssumedPricesItem
        v-for="currencyPair in $store.state.currencyPairs"
        :key="currencyPair.symbol"
      >
        <template v-slot:pair>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span class="emoji" v-html="currencyPair.emoji"></span
          >{{ currencyPair.symbol }}
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
  },
  props: {
    calculationData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    currencyPairInfo(property, storeCurrencyPair) {
      return (
        ((this.calculationData.currencyPairs || []).find(
          currencyPair => currencyPair.symbol === storeCurrencyPair.symbol
        ) || {})[property] || storeCurrencyPair[property]
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-assumed-prices {
  border-collapse: collapse;
  width: 100%;
}

.emoji {
  margin-right: 4px;
}
</style>
