<template>
  <div>
    <TheHeader></TheHeader>
    <nuxt></nuxt>
    <TheFooter></TheFooter>
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
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  letter-spacing: 0.03em;
}

html {
  font-family: '游ゴシック Medium', YuGothic, YuGothicM,
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
