<template>
  <div class="calculating-form">
    <CalculatingFormPosition
      class="calculating-form__item"
    ></CalculatingFormPosition>

    <CalculatingFormBalance
      class="calculating-form__item"
    ></CalculatingFormBalance>

    <CalculatingFormExchange
      class="calculating-form__item"
    ></CalculatingFormExchange>

    <CalculatingFormAssumedRates
      class="calculating-form__item"
    ></CalculatingFormAssumedRates>

    <CalculatingFormTargetMarginLevel
      class="calculating-form__item"
    ></CalculatingFormTargetMarginLevel>
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
  },
  data() {
    return {
      balanceInherited: this.balance,
      targetMarginLevelInherited: this.targetMarginLevel
    }
  },
  methods: {
    inputBalance(balance) {
      if (balance === '') {
        this.balanceInherited = 0
        balance = 0
      }
      this.$emit('inputBalance', balance)
    },
    inputTargetMarginLevel(targetMarginLevel) {
      if (targetMarginLevel === '') {
        this.targetMarginLevelInherited = 0
        targetMarginLevel = 0
      }
      this.$emit('inputTargetMarginLevel', targetMarginLevel)
    }
  }
}
</script>

<style lang="scss" scoped>
.calculating-form {
  &__item {
    margin-bottom: 1.3em;
  }
}
</style>
