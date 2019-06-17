<template>
  <tr class="calculated-result-open-trades-item">
    <td class="calculated-result-open-trades-item__item">
      <slot name="currency-pair" />
    </td>
    <td class="calculated-result-open-trades-item__item">
      <slot name="action" />
    </td>
    <td class="calculated-result-open-trades-item__item">
      <slot name="lot" />
    </td>
    <td class="calculated-result-open-trades-item__item">
      <slot name="order-price" />
    </td>
    <td class="calculated-result-open-trades-item__item">
      <button class="button">編集</button>
      <button class="button">削除</button>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.calculated-result-open-trades-item {
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
  font-size: 0.9rem;
  width: 45%;
}
</style>
