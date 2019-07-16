<template>
  <div class="calculated-result">
    <CalculatedResultMain :calculation-data="calculationData" />

    <div class="calculation-details">
      <div class="calculation-details__left">
        <CalculatedResultCapital :calculation-data="calculationData" />

        <CalculatedResultAssumedPrices :calculation-data="calculationData" />
      </div>

      <template v-if="$store.state.isLoadingCalculation">
        <div
          class="calculation-details__right calculation-details__right--skelton"
        ></div>
      </template>
      <template v-else>
        <template v-if="calculationData">
          <div v-if="savedOpenTradesLength" class="calculation-details__right">
            <CalculatedResultOpenTradeRatio
              :calculation-data="calculationData"
            />

            <CalculatedResultOpenTrades :calculation-data="calculationData" />
          </div>
          <div
            v-else
            class="calculation-details__right calculation-details__right--disabled"
          >
            <p>
              ポジションを追加すると、ロットの割合と保有ポジションがここに表示されます。
            </p>
          </div>
        </template>
        <template v-else>
          <div
            v-if="$store.state.openTrades.length"
            class="calculation-details__right"
          >
            <CalculatedResultOpenTradeRatio
              :calculation-data="calculationData"
            />

            <CalculatedResultOpenTrades :calculation-data="calculationData" />
          </div>
          <div
            v-else
            class="calculation-details__right calculation-details__right--disabled"
          >
            <p>
              ポジションを追加すると、ロットの割合と保有ポジションがここに表示されます。
            </p>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import CalculatedResultMain from '@/components/common/calculated-result/CalculatedResultMain.vue'
import CalculatedResultCapital from '@/components/common/calculated-result/CalculatedResultCapital.vue'
import CalculatedResultAssumedPrices from '@/components/common/calculated-result/CalculatedResultAssumedPrices.vue'
import CalculatedResultOpenTradeRatio from '@/components/common/calculated-result/CalculatedResultOpenTradeRatio.vue'
import CalculatedResultOpenTrades from '@/components/common/calculated-result/CalculatedResultOpenTrades.vue'

export default {
  components: {
    CalculatedResultMain,
    CalculatedResultCapital,
    CalculatedResultAssumedPrices,
    CalculatedResultOpenTradeRatio,
    CalculatedResultOpenTrades
  },
  props: {
    calculationData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      savedOpenTradesLength: 0
    }
  },
  computed: {
    savedOpenTrades() {
      if (this.calculationData) {
        return this.calculationData.openTrades
      } else {
        return 0
      }
    }
  },
  watch: {
    savedOpenTrades() {
      this.savedOpenTradesLength = this.savedOpenTrades.length
    }
  }
}
</script>

<style lang="scss" scoped>
.calculation-details {
  display: flex;

  &__left {
    margin-right: 22px;
    width: 380px;
  }

  &__right {
    width: calc(100% - 397px);

    &--disabled {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      border: dashed 1px #dadada;
      background: #f7f7f7;
      font-size: 0.9rem;
    }

    &--skelton {
      @include skelton-animation;
      background: #c5c6ca;
    }
  }
}

@media screen and (max-width: 1280px) {
  .calculation-details {
    flex-direction: column;

    &__left {
      display: flex;
      flex-direction: row;
      margin-bottom: 22px;
      width: 100%;
    }

    &__right {
      width: 100%;
    }
  }
}

@media screen and (max-width: 1080px) {
  .calculation-details {
    &__left {
      flex-direction: column;
    }
  }
}
</style>
