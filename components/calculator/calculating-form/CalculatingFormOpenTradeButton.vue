<template>
  <button class="calculating-form-open-trade-button" @click="$emit('click')">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.calculating-form-open-trade-button {
  padding: 0.4em 1.3em;
  border: none;
  border-radius: 3px;
  background: #4ac361;
  color: #fff;
  font-size: 0.9rem;
  width: 48%;
}
</style>
