<template>
  <div class="calculation-id">
    <div class="container">
      <article class="box">
        <div class="box-header">
          <div class="box-header__texts">
            <div class="date">{{ createdAt }} 保存</div>
            <h1 class="title">{{ calculation.title }}</h1>
          </div>
          <div class="box-header__buttons">
            <button
              class="button button--danger"
              @click="showModalConfirmDeleteCalculation()"
            >
              削除
            </button>
            <button class="button" @click="editCalculation()">編集</button>
          </div>
        </div>
        <CalculatedResult :calculation-data="calculation" />
      </article>
    </div>
  </div>
</template>

<script>
import CalculatedResult from '@/components/common/calculated-result/CalculatedResult.vue'

export default {
  components: {
    CalculatedResult
  },
  data() {
    return {
      createdAt: ''
    }
  },
  computed: {
    calculation() {
      return this.$store.state.calculation
    }
  },
  watch: {
    calculation() {
      const date = this.$store.state.calculation.createdAt.toDate()
      this.createdAt = `${date.getFullYear()}年${date.getMonth() +
        1}月${date.getDate()}日`
    }
  },
  mounted() {
    this.getCalculation()
    this.getCurrentPrices()
  },
  methods: {
    showModalConfirmDeleteCalculation() {
      this.$store.commit('showModal', 'ModalConfirmDeleteCalculation')
    },
    editCalculation() {
      this.$store.commit('enableEditCalculation', this.calculation.id)
      this.$store.commit('setCalculationEdited', this.calculation)
      this.$router.push('/')
    },
    getCalculation() {
      this.$store.dispatch('getCalculation', this.$route.params.id)
    },
    getCurrentPrices() {
      const self = this

      this.$axios
        .get('https://api.ratesapi.io/api/latest?base=JPY')
        .then(function(response) {
          const currentPrices = response.data.rates
          const currencyPairs = self.$store.state.currencyPairs.filter(
            currencyPair => currencyPair.currencies[1] === 'JPY'
          )
          currencyPairs.forEach(currencyPair => {
            const currencies = currencyPair.currencies

            self.$store.commit('getCurrentPrice', {
              baseCurrency: currencies[0],
              quoteCurrency: currencies[1],
              currentPrice: currentPrices[currencies[0]]
            })
          })
        })

      this.$axios
        .get('https://api.ratesapi.io/api/latest?base=USD')
        .then(function(response) {
          const currentPrices = response.data.rates
          const currencyPairs = self.$store.state.currencyPairs.filter(
            currencyPair => currencyPair.currencies[1] === 'USD'
          )
          currencyPairs.forEach(currencyPair => {
            const currencies = currencyPair.currencies

            self.$store.commit('getCurrentPrice', {
              baseCurrency: currencies[0],
              quoteCurrency: currencies[1],
              currentPrice: currentPrices[currencies[0]]
            })
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.calculation-id {
  background: #fff9f5;
}

.container {
  margin: 0 auto;
  padding: 32px 0;
  max-width: calc(100% - #{$calculating-form-width});
}

.box {
  padding: 28px 34px;
  background: #fff;
  border: solid 1px #d0d0d0;

  &-header {
    display: flex;

    &__texts {
      width: 100%;
    }

    &__buttons {
      display: flex;
    }
  }
}

.date {
  font-size: 0.9rem;
  color: #9c9c9c;
}

.title {
  margin-bottom: 0.7em;
}

.button {
  transition: all 0.3s;
  white-space: nowrap;
  margin-right: 9px;
  padding: 0 1.3em;
  border: solid 1px #2b7194;
  border-radius: 3px;
  height: 32px;
  background: #2b7194;
  color: #fff;
  font-size: 0.9rem;

  &:hover {
    background: #215975;
  }

  &:last-of-type {
    margin: 0;
  }

  &--danger {
    border-color: #e54058;
    background: #fff;
    color: #e54058;

    &:hover {
      background: #e54058;
      color: #fff;
    }
  }
}
</style>
