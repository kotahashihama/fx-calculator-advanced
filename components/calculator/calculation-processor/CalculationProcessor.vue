<template>
  <div class="calculation-processor">
    <CalculationProcessorInput />
    <CalculationProcessorButtons />
  </div>
</template>

<script>
import CalculationProcessorInput from '@/components/calculator/calculation-processor/CalculationProcessorInput.vue'
import CalculationProcessorButtons from '@/components/calculator/calculation-processor/CalculationProcessorButtons.vue'

export default {
  components: {
    CalculationProcessorInput,
    CalculationProcessorButtons
  }
}
</script>

<style lang="scss" scoped>
.calculation-processor {
  display: flex;
  padding: 0 13px;
  border-top: solid 1px #d0d0d0;
  height: $calculation-processor-height;
  background: #f1f1f1;
}

@media screen and (max-width: 800px) {
  .calculation-processor {
    justify-content: center;
    flex-direction: column;
    height: $calculation-processor-sp-height;
  }
}
</style>
