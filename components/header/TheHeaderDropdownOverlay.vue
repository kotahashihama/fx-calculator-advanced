<template>
  <div
    v-if="$store.state.showsDropdown"
    class="header-dropdown-overlay"
    @click="hideDropdown()"
  ></div>
</template>

<script>
export default {
  methods: {
    hideDropdown() {
      this.$store.commit('hideDropdown')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-dropdown-overlay {
  z-index: 15;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100vh;
}
</style>
