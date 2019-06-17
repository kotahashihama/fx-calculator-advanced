<template>
  <div class="calculating-form-assumed-prices">
    <CalculatingFormHeading>仮定レート</CalculatingFormHeading>

    <p class="calculating-form-assumed-prices__item">
      <label for="Usd-Jpy">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.jpy.usd.symbol
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('setCurrentPriceUsdJpy')">
          現在値
        </button>
        <CalculatingFormInput
          id="Usd-Jpy"
          v-model.number="assumedPriceUsdJpy"
          class="input"
          type="number"
          step="0.001"
        ></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-prices__item">
      <label for="Eur-Usd">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.usd.eur.symbol
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('setCurrentPriceEurUsd')">
          現在値
        </button>
        <CalculatingFormInput
          id="Eur-Usd"
          v-model.number="assumedPriceEurUsd"
          class="input"
          type="number"
          step="0.00001"
        ></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-prices__item">
      <label for="Gbp-Usd">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.usd.gbp.symbol
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('setCurrentPriceGbpUsd')">
          現在値
        </button>
        <CalculatingFormInput
          id="Gbp-Usd"
          v-model.number="assumedPriceGbpUsd"
          class="input"
          type="number"
          step="0.00001"
        ></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-prices__item">
      <label for="Aud-Usd">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.usd.aud.symbol
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('setCurrentPriceAudUsd')">
          現在値
        </button>
        <CalculatingFormInput
          id="Aud-Usd"
          v-model.number="assumedPriceAudUsd"
          class="input"
          type="number"
          step="0.00001"
        ></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-prices__item">
      <label for="Eur-Jpy">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.jpy.eur.symbol
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('setCurrentPriceEurJpy')">
          現在値
        </button>
        <CalculatingFormInput
          id="Eur-Jpy"
          v-model.number="assumedPriceEurJpy"
          class="input"
          type="number"
          step="0.001"
        ></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-prices__item">
      <label for="Gbp-Jpy">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.jpy.gbp.symbol
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('setCurrentPriceGbpJpy')">
          現在値
        </button>
        <CalculatingFormInput
          id="Gbp-Jpy"
          v-model.number="assumedPriceGbpJpy"
          class="input"
          type="number"
          step="0.001"
        ></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-prices__item">
      <label for="Aud-Jpy">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.jpy.aud.symbol
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('setCurrentPriceAudJpy')">
          現在値
        </button>
        <CalculatingFormInput
          id="Aud-Jpy"
          v-model.number="assumedPriceAudJpy"
          class="input"
          type="number"
          step="0.001"
        ></CalculatingFormInput>
      </span>
    </p>
  </div>
</template>

<script>
import CalculatingFormHeading from '@/components/calculator/calculating-form/common/CalculatingFormHeading.vue'
import CalculatingFormSubHeading from '@/components/calculator/calculating-form/common/CalculatingFormSubHeading.vue'
import CalculatingFormInput from '@/components/calculator/calculating-form/common/CalculatingFormInput.vue'

export default {
  components: {
    CalculatingFormHeading,
    CalculatingFormSubHeading,
    CalculatingFormInput
  },
  computed: {
    assumedPriceUsdJpy: {
      get() {
        return this.$store.state.currencyPairs.jpy.usd.assumedPrice
      },
      set(value) {
        this.$store.commit('updateAssumedPriceUsdJpy', value)
      }
    },
    assumedPriceEurUsd: {
      get() {
        return this.$store.state.currencyPairs.usd.eur.assumedPrice
      },
      set(value) {
        this.$store.commit('updateAssumedPriceEurUsd', value)
      }
    },
    assumedPriceGbpUsd: {
      get() {
        return this.$store.state.currencyPairs.usd.gbp.assumedPrice
      },
      set(value) {
        this.$store.commit('updateAssumedPriceGbpUsd', value)
      }
    },
    assumedPriceAudUsd: {
      get() {
        return this.$store.state.currencyPairs.usd.aud.assumedPrice
      },
      set(value) {
        this.$store.commit('updateAssumedPriceAudUsd', value)
      }
    },
    assumedPriceEurJpy: {
      get() {
        return this.$store.state.currencyPairs.jpy.eur.assumedPrice
      },
      set(value) {
        this.$store.commit('updateAssumedPriceEurJpy', value)
      }
    },
    assumedPriceGbpJpy: {
      get() {
        return this.$store.state.currencyPairs.jpy.gbp.assumedPrice
      },
      set(value) {
        this.$store.commit('updateAssumedPriceGbpJpy', value)
      }
    },
    assumedPriceAudJpy: {
      get() {
        return this.$store.state.currencyPairs.jpy.aud.assumedPrice
      },
      set(value) {
        this.$store.commit('updateAssumedPriceAudJpy', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calculating-form-assumed-prices {
  &__item {
    margin-bottom: 14px;
    text-align: center;
  }
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
