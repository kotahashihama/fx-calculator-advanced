<template>
  <p class="calculating-form-target-margin-level">
    <label for="target-margin-level">
      <CalculatingFormHeading>目標証拠金維持率（％） </CalculatingFormHeading>
    </label>
    <CalculatingFormInput
      id="target-margin-level"
      v-model.number="targetMarginLevel"
    />
  </p>
</template>

<script>
import CalculatingFormHeading from '@/components/calculator/calculating-form/common/CalculatingFormHeading.vue'
import CalculatingFormInput from '@/components/calculator/calculating-form/common/CalculatingFormInput.vue'

export default {
  components: {
    CalculatingFormHeading,
    CalculatingFormInput
  },
  computed: {
    targetMarginLevel: {
      get() {
        return this.$store.state.targetMarginLevel
      },
      set(value) {
        this.$store.commit('updateTargetMarginLevel', value || 0)
      }
    }
  }
}
</script>
