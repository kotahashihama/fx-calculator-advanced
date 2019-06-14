<template>
  <table class="calculated-result-positions">
    <thead>
      <tr>
        <th class="heading">通貨ペア</th>
        <th class="heading">売買</th>
        <th class="heading">ロット</th>
        <th class="heading">注文レート</th>
        <th class="heading">操作</th>
      </tr>
    </thead>
    <tbody>
      <CalculatedResultPositionsItem>
        <template v-slot:pair>
          GBP/USD
        </template>
        <template v-slot:action>
          買
        </template>
        <template v-slot:lot>
          0.02
        </template>
        <template v-slot:order-rate>
          1.27041
        </template>
      </CalculatedResultPositionsItem>

      <CalculatedResultPositionsItem>
        <template v-slot:pair>
          GBP/USD
        </template>
        <template v-slot:action>
          買
        </template>
        <template v-slot:lot>
          0.02
        </template>
        <template v-slot:order-rate>
          1.27041
        </template>
      </CalculatedResultPositionsItem>

      <CalculatedResultPositionsItem>
        <template v-slot:pair>
          GBP/USD
        </template>
        <template v-slot:action>
          買
        </template>
        <template v-slot:lot>
          0.02
        </template>
        <template v-slot:order-rate>
          1.27041
        </template>
      </CalculatedResultPositionsItem>
    </tbody>
  </table>
</template>

<script>
import CalculatedResultPositionsItem from '@/components/common/calculated-result/CalculatedResultPositionsItem.vue'

export default {
  components: {
    CalculatedResultPositionsItem
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-positions {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
}

.heading {
  padding: 0.5em;
  background: #f5f5f5;
  font-weight: normal;
}
</style>
