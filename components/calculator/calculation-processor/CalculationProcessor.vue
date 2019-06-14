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
  padding: 0 1em;
  height: 50px;
}
</style>
