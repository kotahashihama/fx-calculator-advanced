<template>
  <div class="calculating-form-assumed-rates">
    <CalculatingFormHeading>仮定レート</CalculatingFormHeading>

    <p class="calculating-form-assumed-rates__item">
      <label for="usd-jpy">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.JPY.USD.name
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('getCurrentRateUSDJPY')">
          現在値
        </button>
        <CalculatingFormInput
          id="usd-jpy"
          v-model.number="assumedRateUSDJPY"
          class="input"
          type="number"
        ></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-rates__item">
      <label for="eur-usd">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.USD.EUR.name
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('getCurrentRateEURUSD')">
          現在値
        </button>
        <CalculatingFormInput
          id="eur-usd"
          v-model.number="assumedRateEURUSD"
          class="input"
          type="number"
        ></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-rates__item">
      <label for="gbp-usd">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.USD.GBP.name
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('getCurrentRateGBPUSD')">
          現在値
        </button>
        <CalculatingFormInput
          id="gbp-usd"
          v-model.number="assumedRateGBPUSD"
          class="input"
          type="number"
        ></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-rates__item">
      <label for="aud-usd">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.USD.AUD.name
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('getCurrentRateAUDUSD')">
          現在値
        </button>
        <CalculatingFormInput
          id="aud-usd"
          v-model.number="assumedRateAUDUSD"
          class="input"
          type="number"
        ></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-rates__item">
      <label for="eur-jpy">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.JPY.EUR.name
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('getCurrentRateEURJPY')">
          現在値
        </button>
        <CalculatingFormInput
          id="eur-jpy"
          v-model.number="assumedRateEURJPY"
          class="input"
          type="number"
        ></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-rates__item">
      <label for="gbp-jpy">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.JPY.GBP.name
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('getCurrentRateGBPJPY')">
          現在値
        </button>
        <CalculatingFormInput
          id="gbp-jpy"
          v-model.number="assumedRateGBPJPY"
          class="input"
          type="number"
        ></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-rates__item">
      <label for="aud-jpy">
        <CalculatingFormSubHeading>{{
          $store.state.currencyPairs.JPY.AUD.name
        }}</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button" @click="$store.commit('getCurrentRateAUDJPY')">
          現在値
        </button>
        <CalculatingFormInput
          id="aud-jpy"
          v-model.number="assumedRateAUDJPY"
          class="input"
          type="number"
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
    assumedRateUSDJPY: {
      get() {
        return this.$store.state.currencyPairs.JPY.USD.assumedRate
      },
      set(value) {
        this.$store.commit('updateAssumedRateUSDJPY', value)
      }
    },
    assumedRateEURUSD: {
      get() {
        return this.$store.state.currencyPairs.USD.EUR.assumedRate
      },
      set(value) {
        this.$store.commit('updateAssumedRateEURUSD', value)
      }
    },
    assumedRateGBPUSD: {
      get() {
        return this.$store.state.currencyPairs.USD.GBP.assumedRate
      },
      set(value) {
        this.$store.commit('updateAssumedRateGBPUSD', value)
      }
    },
    assumedRateAUDUSD: {
      get() {
        return this.$store.state.currencyPairs.USD.AUD.assumedRate
      },
      set(value) {
        this.$store.commit('updateAssumedRateAUDUSD', value)
      }
    },
    assumedRateEURJPY: {
      get() {
        return this.$store.state.currencyPairs.JPY.EUR.assumedRate
      },
      set(value) {
        this.$store.commit('updateAssumedRateEURJPY', value)
      }
    },
    assumedRateGBPJPY: {
      get() {
        return this.$store.state.currencyPairs.JPY.GBP.assumedRate
      },
      set(value) {
        this.$store.commit('updateAssumedRateGBPJPY', value)
      }
    },
    assumedRateAUDJPY: {
      get() {
        return this.$store.state.currencyPairs.JPY.AUD.assumedRate
      },
      set(value) {
        this.$store.commit('updateAssumedRateAUDJPY', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calculating-form-assumed-rates {
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
