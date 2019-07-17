<template>
  <div class="modal-title"><slot /></div>
</template>

<style lang="scss" scoped>
.modal-title {
  margin-bottom: 37px;
  text-align: center;
  font-size: 1.5rem;
}

@media screen and (max-width: 720px) {
  .modal-title {
    margin-bottom: 28px;
  }
}
</style>
