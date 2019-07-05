<template>
  <button class="header-button" @click="$emit('click')"><slot /></button>
</template>

<style lang="scss" scoped>
.header-button {
  transition: all 0.3s;
  padding: 0.7em 1.3em;
  border: none;
  border-radius: 3px;
  background: #e54058;
  color: #fff;
  font-size: 0.9rem;

  &:hover {
    background: #c5364b;
  }
}
</style>
