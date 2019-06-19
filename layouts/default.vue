<template>
  <div>
    <TheHeader />
    <nuxt />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/layouts/TheHeader.vue'
import TheFooter from '@/layouts/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheFooter
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
</style>
