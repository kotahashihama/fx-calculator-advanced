<template>
  <tr class="calculated-result-positions-item">
    <td class="calculated-result-positions-item__item">
      <slot name="pair" />
    </td>
    <td class="calculated-result-positions-item__item">
      <slot name="action" />
    </td>
    <td class="calculated-result-positions-item__item">
      <slot name="lot" />
    </td>
    <td class="calculated-result-positions-item__item">
      <slot name="order-rate" />
    </td>
    <td class="calculated-result-positions-item__item">
      <button class="button">編集</button>
      <button class="button">削除</button>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.calculated-result-positions-item {
  &__item {
    padding: 0.6em;
  }
}

.button {
  padding: 0.1em;
  border: none;
  border-radius: 3px;
  background: #4ac361;
  color: #fff;
  font-size: 0.9em;
  width: 45%;
}
</style>
