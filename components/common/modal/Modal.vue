<template>
  <transition name="modal">
    <div v-if="$store.state.showsModal" class="modal">
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
  </transition>
</template>

<script>
import ModalOpenTrades from '@/components/common/modal/ModalOpenTrades.vue'
import ModalMyfxbook from '@/components/common/modal/ModalMyfxbook.vue'
import ModalConfirmDeleteCalculation from '@/components/common/modal/ModalConfirmDeleteCalculation.vue'

export default {
  components: {
    ModalOpenTrades,
    ModalMyfxbook,
    ModalConfirmDeleteCalculation
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
.modal {
  position: relative;
  z-index: $modal-z-index;

  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}

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
  transition: color 0.3s;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  border: none;
  background: #fff;

  &:hover {
    color: #e54058;
  }
}

.content {
  margin: 0 38px 32px;
  margin-top: 46px;
}
</style>
