<template>
  <div class="tooltip-floating-pip">
    <div class="heading">内訳</div>
    <div class="content">
      <table class="floating-pip-table">
        <tbody>
          <tr
            v-for="currencyPair in $store.state.currencyPairs"
            :key="currencyPair.symbol"
            class="floating-pip-table__item"
          >
            <th class="floating-pip-table__item-heading">
              {{ currencyPair.symbol }}:
            </th>
            <td class="floating-pip-table__item-content">
              {{
                $store.getters.floatingPip(
                  ...currencyPair.currencies,
                  calculationData
                ) | digitSeparator
              }}
              <span
                v-if="
                  $store.getters.floatingPip(
                    ...currencyPair.currencies,
                    calculationData
                  ) === 1
                "
                >pip</span
              ><span v-else>pips</span>
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

.floating-pip-table {
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
