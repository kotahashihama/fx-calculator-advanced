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
