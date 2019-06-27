<template>
  <div class="calculated-result">
    <CalculatedResultMain />

    <div class="calculation-details">
      <div class="calculation-details__left">
        <CalculatedResultCapital />

        <CalculatedResultAssumedPrices />
      </div>

      <div
        v-if="$store.state.openTrades.length"
        class="calculation-details__right"
      >
        <CalculatedResultOpenTradeRatio />

        <CalculatedResultOpenTrades />
      </div>
      <div
        v-else
        class="calculation-details__right calculation-details__right--no-open-trades"
      >
        <p>
          ポジションを追加すると、ロットの割合と保有ポジションがここに表示されます。
        </p>
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

    &--no-open-trades {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      background: #f7f7f7;
      font-size: 0.9rem;
    }
  }
}
</style>
