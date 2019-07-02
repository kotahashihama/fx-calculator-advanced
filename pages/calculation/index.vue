<template>
  <div class="calculation">
    <div class="container">
      <ul>
        <li
          v-for="calculation in $store.state.calculations"
          :key="calculation.id"
        >
          {{ calculation.id }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authentication',
  mounted() {
    this.getCalculations()
  },
  methods: {
    getCalculations() {
      this.$store.dispatch('getCalculations')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 980px;
}
</style>
