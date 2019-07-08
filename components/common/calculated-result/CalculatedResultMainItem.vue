<template>
  <div
    class="calculated-result-main-item"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
  >
    <div class="heading"><slot name="heading" /></div>
    <div class="content">
      <span class="value"><slot name="value"/></span> <slot name="unit" />
    </div>
    <Tooltip
      :current-tooltip="currentTooltip"
      :calculation-data="calculationData"
    />
  </div>
</template>

<script>
import Tooltip from '@/components/common/tooltip/Tooltip.vue'

export default {
  components: {
    Tooltip
  },
  props: {
    currentTooltip: {
      type: String,
      default: ''
    },
    calculationData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-main-item {
  position: relative;
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
