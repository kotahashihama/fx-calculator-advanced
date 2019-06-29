<template>
  <transition name="flash-message">
    <div v-if="$store.state.showsFlashMessage" class="flash-message">
      <div
        class="box"
        :class="[
          $store.state.flashMessageType
            ? 'box--' + $store.state.flashMessageType
            : ''
        ]"
      >
        <component :is="$store.state.currentFlashMessage" />
      </div>
    </div>
  </transition>
</template>

<script>
import FlashMessageLoggedIn from '@/components/common/flash-message/FlashMessageLoggedIn.vue'
import FlashMessageLoggedOut from '@/components/common/flash-message/FlashMessageLoggedOut.vue'

export default {
  components: {
    FlashMessageLoggedIn,
    FlashMessageLoggedOut
  }
}
</script>

<style lang="scss" scoped>
.flash-message {
  z-index: 25;
  position: fixed;
  top: calc(#{$header-height} - 9px);
  width: 100%;

  &-leave-active,
  &-enter-active {
    transition: opacity 0.3s, transform 0.3s ease;
  }
  &-leave-to,
  &-enter {
    opacity: 0;
    transform: translateY(-14px);
  }
  &-leave,
  &-enter-to {
    opacity: 1;
  }
  &-move {
    transition: transform 0.3s;
  }
}

.box {
  margin: 0 auto;
  padding: 0.9em 1.1em;
  border: solid 1px rgba(0, 0, 0, 0.9);
  border-radius: 3px;
  max-width: 640px;
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-size: 0.9rem;

  &--info {
    background: rgba(227, 244, 255, 0.9);
    color: #16598c;
    border-color: rgba(136, 187, 226, 0.9);
  }
}
</style>
