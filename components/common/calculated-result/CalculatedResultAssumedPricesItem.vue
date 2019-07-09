<template>
  <tr class="calculated-result-assumed-prices-item">
    <th class="heading">
      <slot name="pair" />
    </th>
    <td v-if="$store.state.isLoadingCalculation" class="content">
      <span class="value value--skelton"
        ><slot name="assumed-price assumed-price--skelton"
      /></span>
    </td>
    <td v-else class="content">
      <span class="value"><slot name="assumed-price"/></span>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.calculated-result-assumed-prices-item {
  border-bottom: dotted 1px #d6d6d6;
}

.heading {
  padding-top: 0.5em;
  padding-bottom: 0.3em;
  text-align: left;
}

.content {
  padding-top: 0.5em;
  padding-bottom: 0.3em;
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
