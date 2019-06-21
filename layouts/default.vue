<template>
  <div>
    <transition name="modal">
      <Modal v-if="$store.state.showsModal" />
    </transition>

    <TheHeader />
    <nuxt />
    <TheFooter />
  </div>
</template>

<script>
import Modal from '@/components/common/modal/Modal.vue'
import TheHeader from '@/layouts/TheHeader.vue'
import TheFooter from '@/layouts/TheFooter.vue'

export default {
  components: {
    Modal,
    TheHeader,
    TheFooter
  },
  mounted() {
    document.body.addEventListener('keydown', event => {
      const esc = 27
      if (event.keyCode === esc) {
        this.$store.commit('hideModal')
      }
    })
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: emoji;
  unicode-range: U+1F1E6-1F1FF, U+1F1E8-1F1FC;
  src: local('Apple Color Emoji'), local('Zapf Dingbats'),
    local('Android Emoji'), local('Segoe UI'), local(EmojiSymbols),
    local(Symbola);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  letter-spacing: 0.03em;
}

html {
  font-family: emoji, '游ゴシック Medium', YuGothic, YuGothicM,
    'Hiragino Kaku Gothic ProN', 'Hiragino Kaku Gothic Pro', メイリオ, Meiryo,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #333;
}

button {
  outline: none;
  cursor: pointer;
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
