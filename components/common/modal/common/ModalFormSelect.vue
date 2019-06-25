<template>
  <select v-model="innerValue" class="modal-form-select">
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
.modal-form-select {
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
