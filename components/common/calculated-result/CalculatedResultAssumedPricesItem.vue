<template>
  <tr class="calculated-result-assumed-prices-item">
    <th class="heading">
      <slot name="pair" />
    </th>
    <td class="content">
      <slot name="assumed-price" />
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
</style>
