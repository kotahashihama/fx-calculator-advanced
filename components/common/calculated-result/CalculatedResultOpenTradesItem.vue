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
    <td
      v-if="!calculationData"
      class="calculated-result-open-trades-item__item"
    >
      <button class="button" @click="showModalEditsOpenTrades()">
        編集
      </button>
      <button class="button button--danger" @click="deleteOpenTrade()">
        削除
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    calculationData: {
      type: Object,
      default: () => {}
    },
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
    text-align: center;
  }
}

.button {
  transition: background 0.3s, color 0.3s;
  padding: 0.1em;
  border: solid 1px #2b7194;
  border-radius: 3px;
  width: 45%;
  background: #fff;
  color: #2b7194;
  text-align: center;
  font-size: 0.9rem;

  &:hover {
    background: #2b7194;
    color: #fff;
  }

  &--danger {
    border-color: #e54058;
    color: #e54058;

    &:hover {
      background: #e54058;
      color: #fff;
    }
  }
}
</style>
