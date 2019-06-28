<template>
  <div
    v-if="$store.state.showsDropdown"
    class="dropdown-overlay"
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
.dropdown-overlay {
  z-index: 5;
  position: absolute;
  display: block;
  width: 100%;
  height: 100vh;
}
</style>
