<template>
  <div class="calculation">
    <div class="container">
      <ul>
        <li>計算結果</li>
        <li>計算結果</li>
        <li>計算結果</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authentication'
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 980px;
}
</style>