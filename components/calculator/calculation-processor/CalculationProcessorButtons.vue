<template>
  <div class="calculation-processor-buttons">
    <button class="button button--danger">新規計算</button>
    <button class="button button--danger">リセット</button>
    <button class="button">上書き保存</button>
  </div>
</template>

<style lang="scss" scoped>
.calculation-processor-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  transition: all 0.3s;
  white-space: nowrap;
  margin-right: 9px;
  padding: 0 1.3em;
  border: solid 1px #2b7194;
  border-radius: 3px;
  height: 32px;
  background: #2b7194;
  color: #fff;
  font-size: 0.9rem;

  &:hover {
    background: #215975;
  }

  &:last-of-type {
    margin: 0;
  }

  &--danger {
    border-color: #e54058;
    background: #fff;
    color: #e54058;

    &:hover {
      background: #e54058;
      color: #fff;
    }
  }
}
</style>
