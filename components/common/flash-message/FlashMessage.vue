<template>
  <transition name="flash-message">
    <div v-if="$store.state.showsFlashMessage" class="flash-message">
      <div class="container">
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
  z-index: 10;
  position: fixed;
  top: calc(#{$header-height} - 6px);
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

.container {
  margin: 0 auto;
  padding: 0.9em 1.1em;
  border: solid 1px rgba(0, 0, 0, 0.9);
  border-radius: 3px;
  max-width: 640px;
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-size: 0.9rem;
}
</style>
