<template>
  <div>
    <div v-if="$store.state.editsOpenTrade" class="title">
      保有ポジションの編集
    </div>
    <div v-else class="title">ポジションの追加</div>

    <div class="form">
      <div class="form__left">
        <p class="form-item">
          <label for="currency-pair">
            <span class="form-item__title">通貨ペア</span>
          </label>
          <ModalSelectString
            id="currency-pair"
            :value="$store.state.openTradeEdited.symbol"
            @input="
              updateOpenTradeEdited('symbol', $event)
              setCurrentPrice()
            "
          >
            <option
              v-for="currencyPair in $store.state.currencyPairs"
              :key="currencyPair.symbol"
              :value="currencyPair.symbol"
              >{{ currencyPair.symbol }}</option
            >
          </ModalSelectString>
        </p>

        <p class="form-item">
          <span class="form-item__title">売買</span>
          <label for="action-buy">
            <input
              id="action-buy"
              value="買"
              name="action"
              type="radio"
              checked
              @input="updateOpenTradeEdited('action', $event)"
            />買
          </label>
          <label for="action-sell">
            <input
              id="action-sell"
              value="売"
              name="action"
              type="radio"
              @input="updateOpenTradeEdited('action', $event)"
            />売
          </label>
        </p>
      </div>

      <div class="form__right">
        <p class="form-item">
          <label for="lot">
            <span class="form-item__title">ロット</span>
          </label>
          <CalculatingFormInput
            id="lot"
            :value="$store.state.openTradeEdited.lot"
            step="0.01"
            @input="updateOpenTradeEdited('lot', $event)"
          />
        </p>

        <p class="form-item">
          <label for="open-price">
            <span class="form-item__title">注文レート</span>
          </label>

          <CalculatingFormInput
            v-if="isJpyDenominated"
            id="open-price"
            :value="$store.state.openTradeEdited.openPrice"
            step="0.001"
            @input="updateOpenTradeEdited('openPrice', $event)"
          />
          <CalculatingFormInput
            v-else
            id="open-price"
            :value="$store.state.openTradeEdited.openPrice"
            step="0.00001"
            @input="updateOpenTradeEdited('openPrice', $event)"
          />
        </p>
      </div>
    </div>

    <div class="buttons">
      <ModalButton
        v-if="$store.state.editsOpenTrade"
        class="button"
        @click="updateOpenTrade()"
        >保存</ModalButton
      >
      <ModalButton v-else class="button" @click="saveOpenTrade()"
        >追加</ModalButton
      >
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
    }
  },
  methods: {
    updateOpenTradeEdited(option) {
      this.$store.commit('updateOpenTradeEdited', {
        option,
        value: isNaN(event.target.value)
          ? event.target.value
          : Number(event.target.value)
      })
    },
    setCurrentPrice() {
      const currencyPair = this.$store.state.currencyPairs.find(
        currencyPair =>
          currencyPair.symbol === this.$store.state.openTradeEdited.symbol
      )
      this.$store.commit('updateOpenTradeEdited', {
        option: 'openPrice',
        value: currencyPair.currentPrice
      })
    },
    saveOpenTrade() {
      const id =
        Math.max(
          ...this.$store.state.openTrades.map(openTrade => openTrade.id)
        ) + 1
      this.$store.commit('updateOpenTradeEdited', {
        option: 'id',
        value: Number(id)
      })
      this.$store.commit('saveOpenTrade')
      this.$store.commit('hideModal')
    },
    updateOpenTrade() {
      this.$store.commit('updateOpenTrade')
      this.$store.commit('hideModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 37px;
  text-align: center;
  font-size: 24px;
}

.form {
  display: flex;
  align-items: flex-start;

  &__left {
    margin-right: 26px;
    width: 230px;
  }

  &__right {
    width: 230px;
  }

  &-item {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    &__title {
      display: block;
      margin-bottom: 0.4em;
    }
  }
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 43px;
}
</style>
