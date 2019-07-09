<template>
  <p class="calculating-form-assumed-prices-item">
    <label :for="currencyPairKebabCase">
      <CalculatingFormSubheading>{{
        currencyPair.symbol
      }}</CalculatingFormSubheading>
    </label>
    <span class="form-separate">
      <button
        class="button"
        @click="
          setCurrentPrice(
            currencyPair.currencies[0],
            currencyPair.currencies[1]
          )
        "
      >
        現在値
      </button>
      <CalculatingFormInput
        :id="currencyPairKebabCase"
        :value="currencyPair.assumedPrice"
        class="input"
        type="number"
        :step="currencyPair.step"
        :min="currencyPair.step"
        @input="
          updateAssumedPrice(
            currencyPair.currencies[0],
            currencyPair.currencies[1],
            $event
          )
        "
      ></CalculatingFormInput>
    </span>
  </p>
</template>

<script>
import CalculatingFormSubheading from '@/components/calculator/calculating-form/common/CalculatingFormSubheading.vue'
import CalculatingFormInput from '@/components/calculator/calculating-form/common/CalculatingFormInput.vue'

export default {
  components: {
    CalculatingFormSubheading,
    CalculatingFormInput
  },
  props: {
    currencyPair: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    currencyPairKebabCase() {
      return this.currencyPair.currencies
        .map(currency => currency.toLowerCase())
        .join('-')
    }
  },
  methods: {
    updateAssumedPrice(baseCurrency, quoteCurrency) {
      this.$store.commit('updateAssumedPrice', {
        baseCurrency,
        quoteCurrency,
        assumedPrice: Number(event.target.value)
      })
    },
    setCurrentPrice(baseCurrency, quoteCurrency) {
      this.$store.commit('setCurrentPrice', {
        baseCurrency,
        quoteCurrency
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.calculating-form-assumed-prices-item {
  margin-bottom: 14px;
  text-align: center;
}

.form-separate {
  display: flex;
}

.input {
  border-top: none;
  border-left: none;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  width: calc(100% - 82px);
}

.button {
  transition: background 0.3s;
  padding: 0.4em 1.2em;
  border: solid 1px #dadada;
  border-top: none;
  border-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  background: #f1f1f1;
  color: #333;
  width: 82px;
  font-size: 0.9rem;

  &:hover {
    background: #dadada;
  }
}
</style>
