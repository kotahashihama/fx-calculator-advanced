<template>
  <select v-model="innerValue" class="modal-select-string">
    <slot />
  </select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    innerValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value || '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-select-string {
  display: block;
  border: solid 1px #dadada;
  border-radius: 3px;
  padding: 0.2em 0.4em;
  width: 100%;
  background: #fff;
  font-size: 1.3rem;
}
</style>
