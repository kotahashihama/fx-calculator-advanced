<template>
  <div class="calculating-form-position">
    <CalculatingFormHeading>ポジション</CalculatingFormHeading>
    <div class="position-processor">
      <button class="position-processor__button">追加</button>
      <button class="position-processor__button">取得</button>
    </div>
  </div>
</template>

<script>
import CalculatingFormHeading from '@/components/calculator/calculating-form/common/CalculatingFormHeading.vue'

export default {
  components: {
    CalculatingFormHeading
  }
}
</script>

<style lang="scss" scoped>
.position-processor {
  display: flex;
  justify-content: space-between;

  &__button {
    padding: 0.4em 1.3em;
    border: none;
    border-radius: 3px;
    background: #4ac361;
    color: #fff;
    font-size: 0.9em;
    width: 48%;
  }
}
</style>
