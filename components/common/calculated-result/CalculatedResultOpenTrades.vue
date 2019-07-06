<template>
  <table v-if="calculationData" class="calculated-result-open-trades">
    <thead>
      <tr>
        <th class="heading">通貨ペア</th>
        <th class="heading">売買</th>
        <th class="heading">ロット</th>
        <th class="heading">注文レート</th>
      </tr>
    </thead>
    <transition-group name="calculated-result-open-trades__item" tag="tbody">
      <CalculatedResultOpenTradesItem
        v-for="openTrade in calculationData.openTrades"
        :key="openTrade.id || 0"
        :calculation-data="calculationData"
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
  <table v-else class="calculated-result-open-trades">
    <thead>
      <tr>
        <th class="heading">通貨ペア</th>
        <th class="heading">売買</th>
        <th class="heading">ロット</th>
        <th class="heading">注文レート</th>
        <th class="heading">操作</th>
      </tr>
    </thead>
    <transition-group name="calculated-result-open-trades__item" tag="tbody">
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
  },
  props: {
    calculationData: {
      type: Object,
      default: () => {}
    }
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

    &-leave-active,
    &-enter-active {
      transition: opacity 0.3s, transform 0.3s ease;
    }
    &-leave-to,
    &-enter {
      opacity: 0;
      transform: translateX(10px);
    }
    &-leave,
    &-enter-to {
      opacity: 1;
    }
    &-move {
      transition: transform 0.3s;
    }
  }
}

.heading {
  padding: 0.4em 0.5em;
  background: #7cb6d4;
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
</style>
