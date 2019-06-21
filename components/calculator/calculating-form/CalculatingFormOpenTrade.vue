<template>
  <div class="calculating-form-open-trade">
    <CalculatingFormHeading>ポジション</CalculatingFormHeading>
    <div class="open-trade-processor">
      <CalculatingFormOpenTradeButton @click="showModalCreatesOpenTrades()"
        >追加</CalculatingFormOpenTradeButton
      >
      <CalculatingFormOpenTradeButton @click="showModalGetsCurrentPrices()"
        >取得</CalculatingFormOpenTradeButton
      >
    </div>
  </div>
</template>

<script>
import CalculatingFormHeading from '@/components/calculator/calculating-form/common/CalculatingFormHeading.vue'
import CalculatingFormOpenTradeButton from '@/components/calculator/calculating-form/CalculatingFormOpenTradeButton.vue'

export default {
  components: {
    CalculatingFormHeading,
    CalculatingFormOpenTradeButton
  },
  methods: {
    showModalCreatesOpenTrades() {
      this.$store.commit('setOpenTradeDefault')
      this.$store.commit('showModal', 'ModalOpenTrades')
    },
    showModalGetsCurrentPrices() {
      this.$store.commit('showModal', 'ModalGetsCurrentPrices')
    }
  }
}
</script>

<style lang="scss" scoped>
.open-trade-processor {
  display: flex;
  justify-content: space-between;
}
</style>
