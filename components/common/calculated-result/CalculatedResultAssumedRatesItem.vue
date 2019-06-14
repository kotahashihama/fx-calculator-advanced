<template>
  <tr class="calculated-result-assumed-rates-item">
    <td class="heading">
      <slot name="pair" />
    </td>
    <td class="content">
      <slot name="assumed-rate" />
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.calculated-result-assumed-rates-item {
  border-bottom: dotted 1px #b5b5b5;
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
