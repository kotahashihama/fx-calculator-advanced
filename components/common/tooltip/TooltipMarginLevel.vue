<template>
  <div class="tooltip-margin-level">
    <div class="content">
      <p>
        目標証拠金維持率{{ $store.state.targetMarginLevel }}％まで<br />
        円の出金が必要です。
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 110px;
}
</style>
