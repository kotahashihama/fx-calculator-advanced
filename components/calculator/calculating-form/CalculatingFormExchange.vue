<template>
  <div class="calculating-form-exchange">
    <CalculatingFormHeading>取引所</CalculatingFormHeading>

    <p class="calculating-form-exchange__item">
      <input id="international" type="radio" name="exchange" />
      <label for="international">海外</label>
      <input id="domestic" type="radio" name="exchange" />
      <label for="domestic">国内</label>
    </p>

    <p class="calculating-form-exchange__item">
      <label for="trading-unit">
        <CalculatingFormSubHeading>
          取引通貨単位（通貨）
        </CalculatingFormSubHeading>
      </label>
      <CalculatingFormSelect id="trading-unit">
        <option value="">100000</option>
      </CalculatingFormSelect>
    </p>

    <p class="calculating-form-exchange__item">
      <label for="leverage">
        <CalculatingFormSubHeading>
          レバレッジ（倍）
        </CalculatingFormSubHeading>
      </label>
      <CalculatingFormSelect id="leverage">
        <option value="">1000</option>
      </CalculatingFormSelect>
    </p>
  </div>
</template>

<script>
import CalculatingFormHeading from '@/components/calculator/calculating-form/common/CalculatingFormHeading.vue'
import CalculatingFormSubHeading from '@/components/calculator/calculating-form/common/CalculatingFormSubHeading.vue'
import CalculatingFormSelect from '@/components/calculator/calculating-form/common/CalculatingFormSelect.vue'

export default {
  components: {
    CalculatingFormHeading,
    CalculatingFormSubHeading,
    CalculatingFormSelect
  }
}
</script>

<style lang="scss" scoped>
.calculating-form-exchange {
  &__item {
    margin-bottom: 14px;
    text-align: center;
  }
}
</style>
