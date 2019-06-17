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
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        event.preventDefault()
      } else {
        return true
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
