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
    <transition-group name="open-trade-items" tag="tbody">
      <CalculatedResultOpenTradesItem
        v-for="openTrade in $store.state.openTrades"
        :key="openTrade.id || 0"
        :open-trade="openTrade"
        class="calculated-result-open-trades__item"
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
    </transition-group>
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
  font-size: 0.9rem;

  &__item {
    &:nth-of-type(even) {
      background: #f9f9f9;
    }
  }
}

.heading {
  padding: 0.4em 0.5em;
  background: #6aa3bf;
  color: #fff;

  &:first-of-type {
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  }
  &:last-of-type {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
}

.open-trade-items-leave-active,
.open-trade-items-enter-active {
  transition: opacity 0.3s, transform 0.3s ease;
}
.open-trade-items-leave-to,
.open-trade-items-enter {
  opacity: 0;
  transform: translateX(10px);
}
.open-trade-items-leave,
.open-trade-items-enter-to {
  opacity: 1;
}
.open-trade-items-move {
  transition: transform 0.3s;
}
</style>
