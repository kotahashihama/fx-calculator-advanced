<template>
  <div class="tooltip-floating-pl">
    <div class="heading">内訳</div>
    <div class="content">
      <table class="floating-pl-table">
        <tbody>
          <tr
            v-for="currencyPair in $store.state.currencyPairs"
            :key="currencyPair.symbol"
            class="floating-pl-table__item"
          >
            <th class="floating-pl-table__item-heading">
              {{ currencyPair.symbol }}:
            </th>
            <td class="floating-pl-table__item-content">
              {{
                $store.getters.floatingPl(
                  ...currencyPair.currencies,
                  calculationData
                ) | digitSeparator
              }}
              円
            </td>
          </tr>
        </tbody>
      </table>
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
  }
}
</script>

<style lang="scss" scoped>
.heading {
  margin-bottom: 0.4em;
}

.floating-pl-table {
  &__item {
    &-heading {
      text-align: left;
      font-weight: normal;
    }

    &-content {
      white-space: nowrap;
      text-align: right;
    }
  }
}
</style>
