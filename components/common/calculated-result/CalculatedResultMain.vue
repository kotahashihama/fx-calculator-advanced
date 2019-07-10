<template>
  <div
    v-if="calculationData"
    class="calculated-result-main"
    :class="[
      $store.getters.floatingPlTotal(calculationData) < 0
        ? 'calculated-result-main--red'
        : ''
    ]"
  >
    <CalculatedResultMainItem
      current-tooltip="TooltipFloatingPl"
      :calculation-data="calculationData"
      @mouseover="showTooltip('TooltipFloatingPl')"
      @mouseleave="hideTooltip()"
    >
      <template v-slot:heading>
        <span v-if="$store.getters.floatingPlTotal(calculationData) >= 0"
          >含み益</span
        >
        <span v-else>含み損</span>
      </template>
      <template v-slot:value>
        {{ $store.getters.floatingPlTotal(calculationData) | digitSeparator }}
      </template>
      <template v-slot:unit>
        円
      </template>
    </CalculatedResultMainItem>

    <CalculatedResultMainItem
      current-tooltip="TooltipFloatingPip"
      :calculation-data="calculationData"
      @mouseover="showTooltip('TooltipFloatingPip')"
      @mouseleave="hideTooltip()"
    >
      <template v-slot:heading>
        含みピップス
      </template>
      <template v-slot:value>
        {{ $store.getters.floatingPipTotal(calculationData) | digitSeparator }}
      </template>
      <template v-slot:unit>
        <span v-if="$store.getters.floatingPipTotal(calculationData) === 1"
          >pip</span
        ><span v-else>pips</span>
      </template>
    </CalculatedResultMainItem>

    <CalculatedResultMainItem
      current-tooltip="TooltipMarginLevel"
      :calculation-data="calculationData"
      @mouseover="showTooltip('TooltipMarginLevel')"
      @mouseleave="hideTooltip()"
    >
      <template v-slot:heading>
        証拠金維持率
      </template>
      <template v-slot:value>
        {{ $store.getters.marginLevel(calculationData) | digitSeparator }}
      </template>
      <template v-slot:unit>
        ％
      </template>
    </CalculatedResultMainItem>
  </div>
  <div
    v-else
    class="calculated-result-main"
    :class="[
      $store.getters.floatingPlTotal() < 0 ? 'calculated-result-main--red' : ''
    ]"
  >
    <CalculatedResultMainItem
      current-tooltip="TooltipFloatingPl"
      @mouseover="showTooltip('TooltipFloatingPl')"
      @mouseleave="hideTooltip()"
    >
      <template v-slot:heading>
        <span v-if="$store.getters.floatingPlTotal() >= 0">含み益</span>
        <span v-else>含み損</span>
      </template>
      <template v-slot:value>
        {{ $store.getters.floatingPlTotal() | digitSeparator }}
      </template>
      <template v-slot:unit>
        円
      </template>
    </CalculatedResultMainItem>

    <CalculatedResultMainItem
      current-tooltip="TooltipFloatingPip"
      @mouseover="showTooltip('TooltipFloatingPip')"
      @mouseleave="hideTooltip()"
    >
      <template v-slot:heading>
        含みピップス
      </template>
      <template v-slot:value>
        {{ $store.getters.floatingPipTotal() | digitSeparator }}
      </template>
      <template v-slot:unit>
        <span v-if="$store.getters.floatingPipTotal() === 1">pip</span
        ><span v-else>pips</span>
      </template>
    </CalculatedResultMainItem>

    <CalculatedResultMainItem
      current-tooltip="TooltipMarginLevel"
      @mouseover="showTooltip('TooltipMarginLevel')"
      @mouseleave="hideTooltip()"
    >
      <template v-slot:heading>
        証拠金維持率
      </template>
      <template v-slot:value>
        {{ $store.getters.marginLevel() | digitSeparator }}
      </template>
      <template v-slot:unit>
        ％
      </template>
    </CalculatedResultMainItem>
  </div>
</template>

<script>
import CalculatedResultMainItem from '@/components/common/calculated-result/CalculatedResultMainItem.vue'

export default {
  components: {
    CalculatedResultMainItem
  },
  props: {
    calculationData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    showTooltip(currentTooltip) {
      this.$store.commit('showTooltip', currentTooltip)
    },
    hideTooltip() {
      this.$store.commit('hideTooltip')
    }
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 22px;
  padding: 16px;
  border: solid 2px #0090d8;
  border-radius: 99px;
  background: #f3fbff;

  &--red {
    border-color: #e8475f;
    background: #fff7f8;
  }
}
</style>
