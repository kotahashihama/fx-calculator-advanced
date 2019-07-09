<template>
  <button class="modal-form-button" @click="$emit('click')"><slot /></button>
</template>

<style lang="scss" scoped>
.modal-form-button {
  transition: background 0.3s;
  padding: 0.4em 1.3em;
  border: none;
  border-radius: 3px;
  background: #2b7194;
  color: #fff;
  font-size: 0.9rem;

  &:hover {
    background: #215975;
  }
}
</style>
