<template>
  <div v-if="calculationData" class="tooltip-margin-level">
    <div class="content">
      <p>
        目標証拠金維持率{{
          calculationData.targetMarginLevel | digitSeparator
        }}％まで<br />
        <span v-if="balanceGap >= 0"
          >{{ balanceGap | digitSeparator }}円の入金が必要です</span
        ><span v-else
          >{{ -balanceGap | digitSeparator }}円の出金が可能です。</span
        >
      </p>
    </div>
  </div>
  <div v-else class="tooltip-margin-level">
    <div class="content">
      <p>
        目標証拠金維持率{{
          $store.state.targetMarginLevel | digitSeparator
        }}％まで<br />
        <span v-if="balanceGap >= 0"
          >{{ balanceGap | digitSeparator }}円の入金が必要です</span
        ><span v-else
          >{{ -balanceGap | digitSeparator }}円の出金が可能です。</span
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    calculationData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    balanceGap() {
      return this.$store.getters.balanceGap(this.calculationData)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 110px;
}
</style>
