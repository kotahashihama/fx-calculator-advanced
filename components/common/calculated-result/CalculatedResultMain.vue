<template>
  <div
    v-if="calculationData"
    class="calculated-result-main"
    :class="[
      $store.getters.floatingPlTotal < 0 ? 'calculated-result-main--red' : ''
    ]"
  >
    <CalculatedResultMainItem>
      <template v-slot:heading>
        <span v-if="$store.getters.floatingPlTotal >= 0">含み益</span>
        <span v-else>含み損</span>
      </template>
      <template v-slot:value>
        {{ $store.getters.floatingPlTotal(calculationData) | digitSeparator }}
      </template>
      <template v-slot:unit>
        円
      </template>
    </CalculatedResultMainItem>

    <CalculatedResultMainItem>
      <template v-slot:heading>
        含みピップス
      </template>
      <template v-slot:value>
        {{ $store.getters.floatingPipsTotal(calculationData) | digitSeparator }}
      </template>
      <template v-slot:unit>
        pips
      </template>
    </CalculatedResultMainItem>

    <CalculatedResultMainItem>
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
      $store.getters.floatingPlTotal < 0 ? 'calculated-result-main--red' : ''
    ]"
  >
    <CalculatedResultMainItem>
      <template v-slot:heading>
        <span v-if="$store.getters.floatingPlTotal >= 0">含み益</span>
        <span v-else>含み損</span>
      </template>
      <template v-slot:value>
        {{ $store.getters.floatingPlTotal() | digitSeparator }}
      </template>
      <template v-slot:unit>
        円
      </template>
    </CalculatedResultMainItem>

    <CalculatedResultMainItem>
      <template v-slot:heading>
        含みピップス
      </template>
      <template v-slot:value>
        {{ $store.getters.floatingPipsTotal() | digitSeparator }}
      </template>
      <template v-slot:unit>
        pips
      </template>
    </CalculatedResultMainItem>

    <CalculatedResultMainItem>
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
