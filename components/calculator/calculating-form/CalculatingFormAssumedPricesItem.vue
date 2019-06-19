<template>
  <p class="calculating-form-assumed-prices-item">
    <label :for="currencyPairSnakeCase">
      <CalculatingFormSubHeading>{{
        currencyPair.symbol
      }}</CalculatingFormSubHeading>
    </label>
    <span class="form-separate">
      <button class="button" @click="setCurrentPrice()">
        現在値
      </button>
      <CalculatingFormInput
        :id="currencyPairSnakeCase"
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
import CalculatingFormSubHeading from '@/components/calculator/calculating-form/common/CalculatingFormSubHeading.vue'
import CalculatingFormInput from '@/components/calculator/calculating-form/common/CalculatingFormInput.vue'

export default {
  components: {
    CalculatingFormSubHeading,
    CalculatingFormInput
  },
  props: {
    currencyPair: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    currencyPairSnakeCase() {
      return `${this.currencyPair.currencies[0].toLowerCase()}-
      ${this.currencyPair.currencies[1].toLowerCase()}`
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
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.button {
  padding: 0.4em 1.2em;
  border: solid 1px #dadada;
  border-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background: #f1f1f1;
  color: #333;
  width: 100px;
  font-size: 0.9rem;
}
</style>
