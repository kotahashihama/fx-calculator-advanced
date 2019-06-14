<template>
  <div class="calculation-processor-buttons">
    <button class="button">新規計算</button>
    <button class="button">リセット</button>
    <button class="button">上書き保存</button>
  </div>
</template>

<style lang="scss" scoped>
.calculation-processor-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
}

.button {
  white-space: nowrap;
  padding: 0.4em 1.3em;
  border: none;
  border-radius: 3px;
  background: #4ac361;
  color: #fff;
  font-size: 0.9rem;
}
</style>
