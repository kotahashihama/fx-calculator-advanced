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
  justify-content: center;
  align-items: center;
}

.button {
  white-space: nowrap;
  padding: 0.5em 1.3em;
  border: none;
  border-radius: 25px;
  background: #4ac361;
  color: #fff;
  font-size: 0.9em;
}
</style>
