<template>
  <div class="calculator">
    <div class="monitor">
      <CalculatingForm
        class="calculating-form"
        :balance="balance"
        :target-margin-level="targetMarginLevel"
        @inputBalance="updateBalance"
        @inputTargetMarginLevel="updateTargetMarginLevel"
      ></CalculatingForm>
      <CalculatedResult class="calculated-result"></CalculatedResult>
    </div>
    <CalculationProcessor></CalculationProcessor>
  </div>
</template>

<script>
import CalculatingForm from '@/components/calculator/calculating-form/CalculatingForm.vue'
import CalculatedResult from '@/components/common/calculated-result/CalculatedResult.vue'
import CalculationProcessor from '@/components/calculator/calculation-processor/CalculationProcessor.vue'

export default {
  components: {
    CalculatingForm,
    CalculatedResult,
    CalculationProcessor
  },
  data() {
    return {
      balance: 200000,
      targetMarginLevel: 1000
    }
  },
  methods: {
    updateBalance(balance) {
      this.balance = balance
    },
    updateTargetMarginLevel(targetMarginLevel) {
      this.targetMarginLevel = targetMarginLevel
    }
  }
}
</script>

<style lang="scss" scoped>
.calculator {
  height: calc(100vh - (#{$header-height} + #{$footer-height}));
}

.monitor {
  display: flex;
  height: calc(100% - 50px);
}

.calculating-form,
.calculated-result {
  overflow: scroll;
}

.calculating-form {
  border: solid 2px #d0d0d0;
  padding: 2em;
  width: 320px;
}

.calculated-result {
  border: solid 2px #d0d0d0;
  border-left: none;
  padding: 2em;
  width: calc(100% - 320px);
}

.calculation-processer {
  width: 100%;
  height: 50px;
}
</style>
