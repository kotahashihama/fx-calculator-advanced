<template>
  <div class="calculated-result-main-item">
    <div class="heading"><slot name="heading" /></div>
    <div class="content">
      <span class="value"><slot name="value"/></span> <slot name="unit" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calculated-result-main-item {
  text-align: center;
}

.heading {
  font-size: 0.9rem;
}

.value {
  font-weight: bold;
  font-size: 1.6rem;
}
</style>
