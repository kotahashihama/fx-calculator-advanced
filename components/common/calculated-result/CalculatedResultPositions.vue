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
      <CalculatedResultPositionsItem
        v-for="(position, index) in $store.state.positions"
        :key="index"
      >
        <template v-slot:currency-pair>
          {{ position.currencyPair }}
        </template>
        <template v-slot:action>
          {{ position.action }}
        </template>
        <template v-slot:lot>
          {{ position.lot }}
        </template>
        <template v-slot:order-rate>
          {{ position.rate }}
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
