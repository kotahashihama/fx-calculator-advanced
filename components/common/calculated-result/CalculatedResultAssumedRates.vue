<template>
  <table class="calculated-result-assumed-rates">
    <tbody>
      <CalculatedResultAssumedRatesItem>
        <template v-slot:pair>
          🇬🇧 GBP/USD
        </template>
        <template v-slot:assumed-rate>
          1.27216
        </template>
      </CalculatedResultAssumedRatesItem>

      <CalculatedResultAssumedRatesItem>
        <template v-slot:pair>
          🇦🇺 AUD/USD
        </template>
        <template v-slot:assumed-rate>
          0.69836
        </template>
      </CalculatedResultAssumedRatesItem>

      <CalculatedResultAssumedRatesItem>
        <template v-slot:pair>
          🇯🇵 USD/JPY
        </template>
        <template v-slot:assumed-rate>
          108.131
        </template>
      </CalculatedResultAssumedRatesItem>

      <CalculatedResultAssumedRatesItem>
        <template v-slot:pair>
          🇪🇺 EUR/USD
        </template>
        <template v-slot:assumed-rate>
          1.1266
        </template>
      </CalculatedResultAssumedRatesItem>
    </tbody>
  </table>
</template>

<script>
import CalculatedResultAssumedRatesItem from '@/components/common/calculated-result/CalculatedResultAssumedRatesItem.vue'

export default {
  components: {
    CalculatedResultAssumedRatesItem
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-assumed-rates {
  border-collapse: collapse;
  padding: 1em;
  width: 100%;
}
</style>
