<template>
  <div class="calculated-result-main">
    <CalculatedResultMainItem>
      <template v-slot:heading>
        含み<span v-if="$store.getters.floatingPl >= 0">益</span
        ><span v-else>損</span>
      </template>
      <template v-slot:value>
        {{ $store.getters.floatingPlTotal | digitSeparator }}
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
        {{ $store.getters.floatingPipsTotal | digitSeparator }}
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
        {{ $store.getters.marginLevel | digitSeparator }}
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
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  border: solid 2px #007aff;
  background: #d6e9ff;
}
</style>
