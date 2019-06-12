<template>
  <div class="calculator">
    <CalculatingForm
      class="calculating-form"
      :balance="balance"
      :target-margin-level="targetMarginLevel"
      @inputBalance="updateBalance"
      @inputTargetMarginLevel="updateTargetMarginLevel"
    ></CalculatingForm>
    <CalculatedResult class="calculated-result"></CalculatedResult>
  </div>
</template>

<script>
import CalculatingForm from '@/components/calculator/CalculatingForm.vue'
import CalculatedResult from '@/components/common/calculated-result/CalculatedResult.vue'

export default {
  components: {
    CalculatingForm,
    CalculatedResult
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
  display: flex;
  height: calc(100vh - (#{$header-height} + #{$footer-height}));
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
  width: calc(100% - 300px);
}
</style>
