<template>
  <select class="calculating-form-select">
    <slot />
  </select>
</template>

<style lang="scss" scoped>
.calculating-form-select {
  display: block;
  border: solid 1px #dadada;
  border-radius: 3px;
  padding: 0.2em 0.4em;
  width: 100%;
  background: #fff;
  font-size: 1.3em;
}
</style>
