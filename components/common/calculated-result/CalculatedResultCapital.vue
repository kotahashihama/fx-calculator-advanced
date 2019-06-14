<template>
  <table class="calculated-result-capital">
    <tbody>
      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          残高
        </template>
        <template v-slot:content>
          921,478 円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          有効証拠金
        </template>
        <template v-slot:content>
          921,478 円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          余剰証拠金
        </template>
        <template v-slot:content>
          921,478 円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          必要証拠金
        </template>
        <template v-slot:content>
          921,478 円
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          取引所
        </template>
        <template v-slot:content>
          海外
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          取引通貨単位
        </template>
        <template v-slot:content>
          100,000 通貨
        </template>
      </CalculatedResultCapitalItem>

      <CalculatedResultCapitalItem>
        <template v-slot:heading>
          レバレッジ
        </template>
        <template v-slot:content>
          1,000 ％
        </template>
      </CalculatedResultCapitalItem>
    </tbody>
  </table>
</template>

<script>
import CalculatedResultCapitalItem from '@/components/common/calculated-result/CalculatedResultCapitalItem.vue'

export default {
  components: {
    CalculatedResultCapitalItem
  }
}
</script>

<style lang="scss" scoped>
.calculated-result-capital {
  margin-bottom: 1.4em;
  border: solid 1px #d0d0d0;
  padding: 1em;
  width: 100%;
}
</style>
