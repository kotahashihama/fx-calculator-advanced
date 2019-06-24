<template>
  <tr class="calculated-result-open-trades-item">
    <td class="calculated-result-open-trades-item__item">
      <slot name="currency-pair" />
    </td>
    <td class="calculated-result-open-trades-item__item">
      <slot name="action" />
    </td>
    <td class="calculated-result-open-trades-item__item">
      <slot name="lot" />
    </td>
    <td class="calculated-result-open-trades-item__item">
      <slot name="order-price" />
    </td>
    <td class="calculated-result-open-trades-item__item">
      <button class="button" @click="showModalEditsOpenTrades()">編集</button>
      <button class="button" @click="deleteOpenTrade()">削除</button>
      {{ openTrade.id }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    openTrade: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    showModalEditsOpenTrades() {
      this.$store.commit('enableEditOpenTrade')
      this.$store.commit('setOpenTradeEdited', this.openTrade)
      this.$store.commit('showModal', 'ModalOpenTrades')
    },
    deleteOpenTrade() {
      const openTrade = this.$store.state.openTrades.findIndex(
        openTrade => openTrade.id === this.openTrade.id
      )
      this.$store.commit('deleteOpenTrade', openTrade)
    }
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-open-trades-item {
  &__item {
    padding: 0.6em;
  }
}

.button {
  padding: 0.1em;
  border: none;
  border-radius: 3px;
  background: #4ac361;
  color: #fff;
  font-size: 0.9rem;
  width: 45%;
}
</style>
