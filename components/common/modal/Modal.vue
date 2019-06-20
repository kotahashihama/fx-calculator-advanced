<template>
  <div class="modal">
    <div class="overlay" @click="hideModal()">
      <div class="window" @click="keepModal($event)">
        <button class="close-button" @click="hideModal()">
          <i class="material-icons">close</i>
        </button>

        <div class="content">
          <component :is="$store.state.currentModal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalAddsOpenTrades from '@/components/common/modal/ModalAddsOpenTrades.vue'
import ModalGetsCurrentPrices from '@/components/common/modal/ModalGetsCurrentPrices.vue'

export default {
  components: {
    ModalAddsOpenTrades,
    ModalGetsCurrentPrices
  },
  methods: {
    hideModal() {
      this.$store.commit('hideModal')
    },
    keepModal(event) {
      event.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
}

.window {
  position: relative;
  background: #fff;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  border: none;
}

.content {
  margin: 18px;
  margin-top: 44px;
}
</style>
