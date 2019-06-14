<template>
  <tr class="calculated-result-capital-item">
    <th class="heading"><slot name="heading" /></th>
    <td class="content"><slot name="content" /></td>
  </tr>
</template>

<style lang="scss" scoped>
.heading {
  text-align: left;
}

.content {
  text-align: right;
}
</style>
