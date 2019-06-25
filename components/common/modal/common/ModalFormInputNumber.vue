<template>
  <ModalFormInput
    v-model="innerValue"
    class="modal-form-input-number"
    type="number"
    min="0"
    autocomplete="off"
    @keypress="validate"
  />
</template>

<script>
import ModalFormInput from '@/components/common/modal/common/ModalFormInput.vue'

export default {
  components: {
    ModalFormInput
  },

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
