<template>
  <div class="calculating-form-exchange">
    <CalculatingFormHeading>取引所</CalculatingFormHeading>

    <p class="calculating-form-exchange__item">
      <label
        v-for="(value, key) in $store.state.exchanges"
        :key="key"
        :for="key"
      >
        <input :id="key" v-model="exchange" :value="key" type="radio" />{{
          value
        }}
      </label>
    </p>

    <p class="calculating-form-exchange__item">
      <label for="trading-unit">
        <CalculatingFormSubHeading>
          取引通貨単位（通貨）
        </CalculatingFormSubHeading>
      </label>
      <CalculatingFormSelect id="trading-unit" v-model="tradingUnit">
        <option
          v-for="(value, index) in $store.state.tradingUnits[
            $store.state.exchange
          ]"
          :key="index"
          :value="value"
          >{{ value }}</option
        >
      </CalculatingFormSelect>
    </p>

    <p class="calculating-form-exchange__item">
      <label for="leverage">
        <CalculatingFormSubHeading>
          レバレッジ（倍）
        </CalculatingFormSubHeading>
      </label>
      <CalculatingFormSelect id="leverage" v-model="leverage">
        <option
          v-for="(value, index) in $store.state.leverages[
            $store.state.exchange
          ]"
          :key="index"
          :value="value"
          >{{ value }}</option
        >
      </CalculatingFormSelect>
    </p>
  </div>
</template>

<script>
import CalculatingFormHeading from '@/components/calculator/calculating-form/common/CalculatingFormHeading.vue'
import CalculatingFormSubHeading from '@/components/calculator/calculating-form/common/CalculatingFormSubHeading.vue'
import CalculatingFormSelect from '@/components/calculator/calculating-form/common/CalculatingFormSelect.vue'

export default {
  components: {
    CalculatingFormHeading,
    CalculatingFormSubHeading,
    CalculatingFormSelect
  },
  computed: {
    exchange: {
      get() {
        return this.$store.state.exchange
      },
      set(value) {
        this.$store.commit('updateExchange', value)
      }
    },
    tradingUnit: {
      get() {
        return this.$store.state.tradingUnit[this.exchange]
      },
      set(value) {
        this.$store.commit('updateTradingUnit', value)
      }
    },
    leverage: {
      get() {
        return this.$store.state.leverage[this.exchange]
      },
      set(value) {
        this.$store.commit('updateLeverage', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calculating-form-exchange {
  &__item {
    margin-bottom: 14px;
    text-align: center;
  }
}
</style>
