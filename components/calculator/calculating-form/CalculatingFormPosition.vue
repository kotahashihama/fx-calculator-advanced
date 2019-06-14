<template>
  <div class="calculating-form-position">
    <CalculatingFormHeading>ポジション</CalculatingFormHeading>
    <div class="position-processor">
      <CalculatingFormPositionButton>追加</CalculatingFormPositionButton>
      <CalculatingFormPositionButton>取得</CalculatingFormPositionButton>
    </div>
  </div>
</template>

<script>
import CalculatingFormHeading from '@/components/calculator/calculating-form/common/CalculatingFormHeading.vue'
import CalculatingFormPositionButton from '@/components/calculator/calculating-form/CalculatingFormPositionButton.vue'

export default {
  components: {
    CalculatingFormHeading,
    CalculatingFormPositionButton
  }
}
</script>

<style lang="scss" scoped>
.position-processor {
  display: flex;
  justify-content: space-between;
}
</style>
