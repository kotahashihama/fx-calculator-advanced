<template>
  <transition name="tooltip">
    <div
      v-if="
        $store.state.showsTooltip &&
          $store.state.currentTooltip === currentTooltip
      "
      class="tooltip"
    >
      <component
        :is="$store.state.currentTooltip"
        :calculation-data="calculationData"
      ></component>
    </div>
  </transition>
</template>

<script>
import TooltipFloatingPl from '@/components/common/tooltip/TooltipFloatingPl.vue'
import TooltipFloatingPip from '@/components/common/tooltip/TooltipFloatingPip.vue'
import TooltipMarginLevel from '@/components/common/tooltip/TooltipMarginLevel.vue'

export default {
  components: {
    TooltipFloatingPl,
    TooltipFloatingPip,
    TooltipMarginLevel
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
.tooltip {
  z-index: $tooltip-z-index;
  position: absolute;
  padding: 13px;
  border-radius: 3px;
  background: #7db6d4;
  color: #fff;
  font-size: 0.8rem;

  &::before {
    position: absolute;
    top: -4px;
    left: 12px;
    content: '';
    width: 9px;
    height: 9px;
    background: #7db6d4;
    transform: rotate(45deg);
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
