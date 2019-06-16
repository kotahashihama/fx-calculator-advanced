<template>
  <div class="calculating-form">
    <CalculatingFormPosition
      class="calculating-form__item"
    ></CalculatingFormPosition>

    <CalculatingFormBalance
      class="calculating-form__item"
    ></CalculatingFormBalance>

    <CalculatingFormTargetMarginLevel
      class="calculating-form__item"
    ></CalculatingFormTargetMarginLevel>

    <CalculatingFormExchange
      class="calculating-form__item"
    ></CalculatingFormExchange>

    <CalculatingFormAssumedRates
      class="calculating-form__item"
    ></CalculatingFormAssumedRates>
  </div>
</template>

<script>
import CalculatingFormPosition from '@/components/calculator/calculating-form/CalculatingFormPosition.vue'
import CalculatingFormBalance from '@/components/calculator/calculating-form/CalculatingFormBalance.vue'
import CalculatingFormExchange from '@/components/calculator/calculating-form/CalculatingFormExchange.vue'
import CalculatingFormAssumedRates from '@/components/calculator/calculating-form/CalculatingFormAssumedRates.vue'
import CalculatingFormTargetMarginLevel from '@/components/calculator/calculating-form/CalculatingFormTargetMarginLevel.vue'

export default {
  components: {
    CalculatingFormPosition,
    CalculatingFormBalance,
    CalculatingFormExchange,
    CalculatingFormAssumedRates,
    CalculatingFormTargetMarginLevel
  }
}
</script>

<style lang="scss" scoped>
.calculating-form {
  &__item {
    margin-bottom: 20px;
  }
}
</style>
