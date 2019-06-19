<template>
  <table class="calculated-result-capital">
    <tbody>
      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          残高
        </template>
        <template v-slot:content>
          {{ $store.state.balance | digitSeparator }} 円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          有効証拠金
        </template>
        <template v-slot:content>
          {{ $store.getters.equity | digitSeparator }} 円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          余剰証拠金
        </template>
        <template v-slot:content>
          {{ $store.getters.freeMargin | digitSeparator }} 円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          必要証拠金
        </template>
        <template v-slot:content>
          {{ $store.getters.marginTotal | digitSeparator }} 円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          取引所
        </template>
        <template v-slot:content>
          {{ $store.state.brokers[$store.state.broker] }}
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          取引単位
        </template>
        <template v-slot:content>
          {{ $store.state.tradingUnit[$store.state.broker] | digitSeparator }}
          通貨
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          レバレッジ
        </template>
        <template v-slot:content>
          {{ $store.state.leverage[$store.state.broker] | digitSeparator }} ％
        </template>
      </CalculatedResultCapitalItem>
    </tbody>
  </table>
</template>

<script>
import CalculatedResultCapitalItem from '@/components/common/calculated-result/CalculatedResultCapitalItem.vue'

export default {
  components: {
    CalculatedResultCapitalItem
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-capital {
  margin-bottom: 18px;
  border: solid 1px #d0d0d0;
  padding: 16px;
  width: 100%;
}
</style>
