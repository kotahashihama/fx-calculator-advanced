<template>
  <table v-if="calculationData" class="calculated-result-capital">
    <tbody>
      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          残高
        </template>
        <template v-slot:value>
          {{ calculationData.balance | digitSeparator }}
        </template>
        <template v-slot:unit>
          円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          有効証拠金
        </template>
        <template v-slot:value>
          {{ $store.getters.equity(calculationData) | digitSeparator }}
        </template>
        <template v-slot:unit>
          円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading
          >余剰証拠金
        </template>
        <template v-slot:value>
          {{ $store.getters.freeMargin(calculationData) | digitSeparator }}
        </template>
        <template v-slot:unit>
          円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          必要証拠金
        </template>
        <template v-slot:value>
          {{ $store.getters.marginTotal(calculationData) | digitSeparator }}
        </template>
        <template v-slot:unit>
          円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          取引所
        </template>
        <template v-slot:value>
          {{ $store.state.brokers[calculationData.broker] }}
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          取引単位
        </template>
        <template v-slot:value>
          {{ calculationData.tradingUnit | digitSeparator }}
        </template>
        <template v-slot:unit>
          通貨
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          レバレッジ
        </template>
        <template v-slot:value>
          {{ calculationData.leverage | digitSeparator }}
        </template>
        <template v-slot:unit>
          ％
        </template>
      </CalculatedResultCapitalItem>
    </tbody>
  </table>
  <table v-else class="calculated-result-capital">
    <tbody>
      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          残高
        </template>
        <template v-slot:value>
          {{ $store.state.balance | digitSeparator }} 円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          有効証拠金
        </template>
        <template v-slot:value>
          {{ $store.getters.equity() | digitSeparator }} 円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          余剰証拠金
        </template>
        <template v-slot:value>
          {{ $store.getters.freeMargin() | digitSeparator }} 円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          必要証拠金
        </template>
        <template v-slot:value>
          {{ $store.getters.marginTotal() | digitSeparator }} 円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          取引所
        </template>
        <template v-slot:value>
          {{ $store.state.brokers[$store.state.broker] }}
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          取引単位
        </template>
        <template v-slot:value>
          {{ $store.state.tradingUnit[$store.state.broker] | digitSeparator }}
          通貨
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          レバレッジ
        </template>
        <template v-slot:value>
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
.calculated-result-capital {
  margin-bottom: 22px;
  border: solid 1px #d6d6d6;
  padding: 16px;
  width: 100%;
}

@media screen and (max-width: 1280px) {
  .calculated-result-capital {
    margin-right: 22px;
  }
}

@media screen and (max-width: 1080px) {
  .calculated-result-capital {
    margin-right: 0;
  }
}
</style>
