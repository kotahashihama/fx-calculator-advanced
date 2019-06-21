<template>
  <select v-model="innerValue" class="calculating-form-select">
    <slot />
  </select>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    innerValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value || 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calculating-form-select {
  display: block;
  border: solid 1px #dadada;
  border-radius: 3px;
  padding: 0 0.4em;
  width: 100%;
  height: 37px;
  background: #fff;
  font-size: 1.3rem;
}
</style>
