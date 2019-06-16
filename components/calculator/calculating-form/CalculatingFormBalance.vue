<template>
  <p class="calculating-form-balance">
    <label for="balance">
      <CalculatingFormHeading>残高（円）</CalculatingFormHeading>
    </label>
    <CalculatingFormInput id="balance" v-model.number="balance" type="number" />
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
    balance: {
      get() {
        return this.$store.state.balance
      },
      set(value) {
        this.$store.commit('updateBalance', value || 0)
      }
    }
  }
}
</script>
