<template>
  <div class="modal-confirm-delete-calculation">
    <ModalTitle>確認</ModalTitle>

    <p>本当に削除してもよろしいですか？</p>

    <div class="buttons">
      <ModalFormButton
        class="button button--secondary"
        type="button"
        @click="hideModal()"
        >キャンセル</ModalFormButton
      >
      <ModalFormButton class="button" type="submit" @click="deleteCalculation()"
        >OK</ModalFormButton
      >
    </div>
  </div>
</template>

<script>
import ModalTitle from '@/components/common/modal/common/ModalTitle.vue'
import ModalFormButton from '@/components/common/modal/common/ModalFormButton.vue'

export default {
  components: {
    ModalTitle,
    ModalFormButton
  },
  methods: {
    hideModal() {
      this.$store.commit('hideModal')
    },
    deleteCalculation() {
      this.$store.dispatch(
        'deleteCalculationWithFlashMessage',
        this.$route.params.id
      )
      this.$store.commit('hideModal')
      this.$router.push('/calculation')
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: center;
  margin-top: 43px;

  .button {
    margin-right: 9px;

    &--secondary {
      border: solid 1px #808080;
      background: #fff;
      color: #808080;

      &:hover {
        background: #808080;
        color: #fff;
      }
    }
  }
}
</style>
