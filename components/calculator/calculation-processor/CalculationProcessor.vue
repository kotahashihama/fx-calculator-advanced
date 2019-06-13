<template>
  <div class="calculation-processor">
    <Input></Input>
    <Buttons></Buttons>
  </div>
</template>

<script>
import Input from '@/components/calculator/calculation-processor/CalculationProcessorInput.vue'
import Buttons from '@/components/calculator/calculation-processor/CalculationProcessorButtons.vue'

export default {
  components: {
    Input,
    Buttons
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
