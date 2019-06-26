<template>
  <div class="calculating-form-broker">
    <CalculatingFormHeading>取引所</CalculatingFormHeading>

    <p class="calculating-form-broker__item">
      <label
        v-for="(value, key) in $store.state.brokers"
        :key="key"
        :for="`broker-${key}`"
      >
        <input
          :id="`broker-${key}`"
          v-model="broker"
          :value="key"
          class="radio"
          type="radio"
        />{{ value }}
      </label>
    </p>

    <p class="calculating-form-broker__item">
      <label for="trading-unit">
        <CalculatingFormSubheading>
          取引単位（通貨）
        </CalculatingFormSubheading>
      </label>
      <CalculatingFormSelect
        id="trading-unit"
        v-model="tradingUnit"
        class="select"
      >
        <option
          v-for="(value, index) in $store.state.tradingUnits[
            $store.state.broker
          ]"
          :key="index"
          :value="value"
          >{{ value }}</option
        >
      </CalculatingFormSelect>
    </p>

    <p class="calculating-form-broker__item">
      <label for="leverage">
        <CalculatingFormSubheading>
          レバレッジ（倍）
        </CalculatingFormSubheading>
      </label>
      <CalculatingFormSelect id="leverage" v-model="leverage" class="select">
        <option
          v-for="(value, index) in $store.state.leverages[$store.state.broker]"
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
import CalculatingFormSubheading from '@/components/calculator/calculating-form/common/CalculatingFormSubheading.vue'
import CalculatingFormSelect from '@/components/calculator/calculating-form/common/CalculatingFormSelect.vue'

export default {
  components: {
    CalculatingFormHeading,
    CalculatingFormSubheading,
    CalculatingFormSelect
  },
  computed: {
    broker: {
      get() {
        return this.$store.state.broker
      },
      set(value) {
        this.$store.commit('updateBroker', value)
      }
    },
    tradingUnit: {
      get() {
        return this.$store.state.tradingUnit[this.broker]
      },
      set(value) {
        this.$store.commit('updateTradingUnit', value)
      }
    },
    leverage: {
      get() {
        return this.$store.state.leverage[this.broker]
      },
      set(value) {
        this.$store.commit('updateLeverage', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calculating-form-broker {
  &__item {
    margin-bottom: 14px;
    text-align: center;
  }
}

.radio {
  margin-right: 0.5em;
}

.select {
  border-top: none;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
</style>
