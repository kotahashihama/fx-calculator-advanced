<template>
  <input
    v-model="innerValue"
    class="calculating-form-input"
    type="number"
    min="0"
    autocomplete="off"
    @keypress="validate"
  />
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
  },
  methods: {
    validate(event) {
      const charCode = event.which ? event.which : event.keyCode
      const zero = 48
      const nine = 57
      const dot = 46
      const backSpace = 8

      if (
        (charCode >= zero && charCode <= nine) ||
        charCode === dot ||
        charCode === backSpace
      ) {
        return true
      } else {
        event.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calculating-form-input {
  display: block;
  border: solid 1px #dadada;
  border-radius: 3px;
  padding: 0.2em 0.4em;
  width: 100%;
  background: #fff;
  font-size: 1.3rem;
}
</style>
