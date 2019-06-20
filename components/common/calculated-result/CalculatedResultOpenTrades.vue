<template>
  <table class="calculated-result-open-trades">
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
      <CalculatedResultOpenTradesItem
        v-for="openTrade in $store.state.openTrades"
        :key="openTrade.id"
        :open-trade="openTrade"
      >
        <template v-slot:currency-pair>
          {{ openTrade.symbol }}
        </template>
        <template v-slot:action>
          {{ openTrade.action }}
        </template>
        <template v-slot:lot>
          {{ openTrade.lot }}
        </template>
        <template v-slot:order-price>
          {{ openTrade.openPrice }}
        </template>
      </CalculatedResultOpenTradesItem>
    </tbody>
  </table>
</template>

<script>
import CalculatedResultOpenTradesItem from '@/components/common/calculated-result/CalculatedResultOpenTradesItem.vue'

export default {
  components: {
    CalculatedResultOpenTradesItem
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-open-trades {
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
