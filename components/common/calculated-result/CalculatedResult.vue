<template>
  <div class="calculated-result">
    <CalculatedResultMain />

    <div class="calculation-details">
      <div class="calculation-details__left">
        <CalculatedResultCapital />

        <CalculatedResultAssumedPrices />
      </div>

      <div class="calculation-details__right">
        <CalculatedResultOpenTradeRatio />

        <CalculatedResultOpenTrades />
      </div>
    </div>
  </div>
</template>

<script>
import CalculatedResultMain from '@/components/common/calculated-result/CalculatedResultMain.vue'
import CalculatedResultCapital from '@/components/common/calculated-result/CalculatedResultCapital.vue'
import CalculatedResultAssumedPrices from '@/components/common/calculated-result/CalculatedResultAssumedPrices.vue'
import CalculatedResultOpenTradeRatio from '@/components/common/calculated-result/CalculatedResultOpenTradeRatio.vue'
import CalculatedResultOpenTrades from '@/components/common/calculated-result/CalculatedResultOpenTrades.vue'

export default {
  components: {
    CalculatedResultMain,
    CalculatedResultCapital,
    CalculatedResultAssumedPrices,
    CalculatedResultOpenTradeRatio,
    CalculatedResultOpenTrades
  }
}
</script>

<style lang="scss" scoped>
.calculation-details {
  display: flex;

  &__left {
    margin-right: 17px;
    width: 380px;
  }

  &__right {
    width: calc(100% - 397px);
  }
}
</style>
