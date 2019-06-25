<template>
  <div class="modal-open-trades">
    <ModalTitle v-if="$store.state.editsOpenTrade"
      >保有ポジションの編集</ModalTitle
    >
    <ModalTitle v-else>ポジションの追加</ModalTitle>

    <div class="form">
      <div class="form__left">
        <p class="form-item">
          <label for="currency-pair">
            <span class="form-item__title">通貨ペア</span>
          </label>
          <ModalFormSelect
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
          </ModalFormSelect>
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
          <ModalFormInputNumber
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

          <ModalFormInputNumber
            v-if="isJpyDenominated"
            id="open-price"
            :value="$store.state.openTradeEdited.openPrice"
            step="0.001"
            @input="updateOpenTradeEdited('openPrice', $event)"
          />
          <ModalFormInputNumber
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
      <ModalFormButton
        v-if="$store.state.editsOpenTrade"
        class="button"
        @click="updateOpenTrade()"
        >保存</ModalFormButton
      >
      <ModalFormButton v-else class="button" @click="saveOpenTrade()"
        >追加</ModalFormButton
      >
    </div>
  </div>
</template>

<script>
import ModalTitle from '@/components/common/modal/common/ModalTitle.vue'
import ModalFormSelect from '@/components/common/modal/common/ModalFormSelect.vue'
import ModalFormInputNumber from '@/components/common/modal/common/ModalFormInputNumber.vue'
import ModalFormButton from '@/components/common/modal/common/ModalFormButton.vue'

export default {
  components: {
    ModalTitle,
    ModalFormSelect,
    ModalFormInputNumber,
    ModalFormButton
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
      const max = Math.max(
        ...this.$store.state.openTrades.map(openTrade => openTrade.id)
      )
      const id = isFinite(max) ? max + 1 : 1
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
  }
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 43px;
}
</style>
