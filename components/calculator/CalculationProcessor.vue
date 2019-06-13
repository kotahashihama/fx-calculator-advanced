<template>
  <div class="calculation-processor">
    <CalculationProcessorInput></CalculationProcessorInput>
    <CalculationProcessorButtons></CalculationProcessorButtons>
  </div>
</template>

<script>
import CalculationProcessorInput from '@/components/calculator/CalculationProcessorInput.vue'
import CalculationProcessorButtons from '@/components/calculator/CalculationProcessorButtons.vue'

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
