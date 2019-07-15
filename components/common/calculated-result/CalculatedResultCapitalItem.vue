<template>
  <tr class="calculated-result-capital-item">
    <th class="heading"><slot name="heading" /></th>
    <td v-if="$store.state.isLoadingCalculation" class="content">
      <span class="value value--skelton"></span> <slot name="unit" />
    </td>
    <td v-else class="content">
      <span class="value"><slot name="value"/></span> <slot name="unit" />
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.heading {
  white-space: nowrap;
  text-align: left;
}

.content {
  text-align: right;
}

.value {
  &--skelton {
    @include skelton-animation;
    display: inline-block;
    width: 80px;
    height: 1rem;
    background: #c5c6ca;
  }
}
</style>
