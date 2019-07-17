<template>
  <button class="header-hamburger-button" @click="toggleHamburgerNavigation()">
    <i class="material-icons">
      menu
    </i>
  </button>
</template>

<script>
export default {
  methods: {
    toggleHamburgerNavigation() {
      this.$store.commit('toggleHamburgerNavigation')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-hamburger-button {
  border: none;
  background: transparent;
  color: #fff;
  width: 44px;
  height: 44px;
}
</style>
