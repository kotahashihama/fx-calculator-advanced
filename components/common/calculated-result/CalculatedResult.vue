<template>
  <div class="calculated-result">
    <CalculatedResultMain />

    <div class="calculation-details">
      <div class="calculation-details__left">
        <CalculatedResultCapital />

        <CalculatedResultAssumedRates />
      </div>

      <div class="calculation-details__right">
        <CalculatedResultPositionRatio />

        <CalculatedResultPositions />
      </div>
    </div>
  </div>
</template>

<script>
import CalculatedResultMain from '@/components/common/calculated-result/CalculatedResultMain.vue'
import CalculatedResultCapital from '@/components/common/calculated-result/CalculatedResultCapital.vue'
import CalculatedResultAssumedRates from '@/components/common/calculated-result/CalculatedResultAssumedRates.vue'
import CalculatedResultPositionRatio from '@/components/common/calculated-result/CalculatedResultPositionRatio.vue'
import CalculatedResultPositions from '@/components/common/calculated-result/CalculatedResultPositions.vue'

export default {
  components: {
    CalculatedResultMain,
    CalculatedResultCapital,
    CalculatedResultAssumedRates,
    CalculatedResultPositionRatio,
    CalculatedResultPositions
  }
}
</script>

<style lang="scss" scoped>
.calculation-details {
  display: flex;

  &__left {
    margin-right: 17px;
    width: 33%;
  }

  &__right {
    width: 67%;
  }
}
</style>
