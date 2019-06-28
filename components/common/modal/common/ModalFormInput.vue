<template>
  <input v-model="innerValue" class="modal-form-input" />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
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
.modal-form-input {
  display: block;
  border: solid 1px #dadada;
  border-radius: 3px;
  padding: 0 9px;
  width: 100%;
  height: 37px;
  background: #fff;
  font-size: 1.3rem;
}
</style>
