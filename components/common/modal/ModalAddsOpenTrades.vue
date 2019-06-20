<template>
  <div>
    <div class="title">ポジションの追加</div>

    <p>
      <label for="currency-pair">
        <span>通貨ペア</span>
      </label>
      <ModalSelectString
        id="currency-pair"
        v-model="openTradeEditedSymbol"
        @input="setCurrentPrice()"
      >
        <option
          v-for="currencyPair in $store.state.currencyPairs"
          :key="currencyPair.symbol"
          >{{ currencyPair.symbol }}</option
        >
      </ModalSelectString>
    </p>

    <p>
      <span>売買</span>
      <label for="action-buy">
        <input
          id="action"
          v-model="openTradeEditedAction"
          value="買"
          type="radio"
        />買
      </label>
      <label for="action-sell">
        <input
          id="action"
          v-model="openTradeEditedAction"
          value="売"
          type="radio"
        />売
      </label>
    </p>

    <p>
      <label for="lot">
        <span>ロット</span>
      </label>
      <CalculatingFormInput id="lot" v-model="openTradeEditedLot" step="0.01" />
    </p>

    <p>
      <label for="open-price">
        <span>注文レート</span>
      </label>

      <CalculatingFormInput
        v-if="isJpyDenominated"
        id="open-price"
        v-model="openTradeEditedOpenPrice"
        step="0.001"
      />
      <CalculatingFormInput
        v-else
        id="open-price"
        v-model="openTradeEditedOpenPrice"
        step="0.00001"
      />
    </p>

    <div class="buttons">
      <ModalButton class="button" @click="saveOpenTrade()">追加</ModalButton>
    </div>
  </div>
</template>

<script>
import ModalSelectString from '@/components/common/modal/common/ModalSelectString.vue'
import CalculatingFormInput from '@/components/calculator/calculating-form/common/CalculatingFormInput.vue'
import ModalButton from '@/components/common/modal/common/ModalButton.vue'

export default {
  components: {
    ModalSelectString,
    CalculatingFormInput,
    ModalButton
  },
  computed: {
    isJpyDenominated() {
      const currencyPair = this.$store.state.currencyPairs.find(
        currencyPair =>
          currencyPair.symbol === this.$store.state.openTradeEdited.symbol
      )
      return currencyPair.currencies[1] === 'JPY'
    },

    openTradeEditedSymbol: {
      get() {
        return this.$store.state.openTradeEdited.symbol
      },
      set(value) {
        this.$store.commit('updateOpenTradeEditedSymbol', value)
      }
    },
    openTradeEditedAction: {
      get() {
        return this.$store.state.openTradeEdited.action
      },
      set(value) {
        this.$store.commit('updateOpenTradeEditedAction', value)
      }
    },
    openTradeEditedLot: {
      get() {
        return this.$store.state.openTradeEdited.lot
      },
      set(value) {
        this.$store.commit('updateOpenTradeEditedLot', value)
      }
    },
    openTradeEditedOpenPrice: {
      get() {
        return this.$store.state.openTradeEdited.openPrice
      },
      set(value) {
        this.$store.commit('updateOpenTradeEditedOpenPrice', value)
      }
    }
  },
  methods: {
    setCurrentPrice() {
      const currencyPair = this.$store.state.currencyPairs.find(
        currencyPair =>
          currencyPair.symbol === this.$store.state.openTradeEdited.symbol
      )
      this.$store.commit(
        'updateOpenTradeEditedOpenPrice',
        currencyPair.currentPrice
      )
    },
    saveOpenTrade() {
      const id =
        Math.max(
          ...this.$store.state.openTrades.map(openTrade => openTrade.id)
        ) + 1
      this.$store.commit('updateOpenTradeEditedId', id)
      this.$store.commit('saveOpenTrade')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
