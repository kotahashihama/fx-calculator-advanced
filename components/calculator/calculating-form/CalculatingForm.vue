<template>
  <div class="calculating-form">
    <CalculatingFormOpenTrade
      class="calculating-form__item"
    ></CalculatingFormOpenTrade>

    <CalculatingFormBalance
      class="calculating-form__item"
    ></CalculatingFormBalance>

    <CalculatingFormTargetMarginLevel
      class="calculating-form__item"
    ></CalculatingFormTargetMarginLevel>

    <CalculatingFormBroker
      class="calculating-form__item"
    ></CalculatingFormBroker>

    <CalculatingFormAssumedPrices
      class="calculating-form__item"
    ></CalculatingFormAssumedPrices>
  </div>
</template>

<script>
import CalculatingFormOpenTrade from '@/components/calculator/calculating-form/CalculatingFormOpenTrade.vue'
import CalculatingFormBalance from '@/components/calculator/calculating-form/CalculatingFormBalance.vue'
import CalculatingFormBroker from '@/components/calculator/calculating-form/CalculatingFormBroker.vue'
import CalculatingFormAssumedPrices from '@/components/calculator/calculating-form/CalculatingFormAssumedPrices.vue'
import CalculatingFormTargetMarginLevel from '@/components/calculator/calculating-form/CalculatingFormTargetMarginLevel.vue'

export default {
  components: {
    CalculatingFormOpenTrade,
    CalculatingFormBalance,
    CalculatingFormBroker,
    CalculatingFormAssumedPrices,
    CalculatingFormTargetMarginLevel
  }
}
</script>

<style lang="scss" scoped>
.calculating-form {
  background: #f9f9f9;

  &__item {
    margin-bottom: 22px;
  }
}
</style>
