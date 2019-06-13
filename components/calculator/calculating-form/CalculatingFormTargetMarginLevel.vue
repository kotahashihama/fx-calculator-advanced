<template>
  <p class="calculating-form-target-margin-level">
    <label for="target-margin-level">
      <CalculatingFormHeading>目標証拠金維持率（％） </CalculatingFormHeading>
    </label>
    <CalculatingFormInput
      id="target-margin-level"
      type="number"
    ></CalculatingFormInput>
  </p>
</template>

<script>
import CalculatingFormHeading from '@/components/calculator/calculating-form/common/CalculatingFormHeading.vue'
import CalculatingFormInput from '@/components/calculator/calculating-form/common/CalculatingFormInput.vue'

export default {
  components: {
    CalculatingFormHeading,
    CalculatingFormInput
  }
}
</script>
