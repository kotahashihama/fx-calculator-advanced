<template>
  <div class="calculating-form-assumed-rates">
    <CalculatingFormHeading>仮定レート</CalculatingFormHeading>

    <p class="calculating-form-assumed-rates__item">
      <label for="usd-jpy">
        <CalculatingFormSubHeading>USD/JPY</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button">現在値</button>
        <CalculatingFormInput id="usd-jpy" class="input"></CalculatingFormInput>
      </span>
    </p>

    <p class="calculating-form-assumed-rates__item">
      <label for="usd-jpy">
        <CalculatingFormSubHeading>USD/JPY</CalculatingFormSubHeading>
      </label>
      <span class="form-separate">
        <button class="button">現在値</button>
        <CalculatingFormInput id="usd-jpy" class="input"></CalculatingFormInput>
      </span>
    </p>
  </div>
</template>

<script>
import CalculatingFormHeading from '@/components/calculator/calculating-form/common/CalculatingFormHeading.vue'
import CalculatingFormSubHeading from '@/components/calculator/calculating-form/common/CalculatingFormSubHeading.vue'
import CalculatingFormInput from '@/components/calculator/calculating-form/common/CalculatingFormInput.vue'

export default {
  components: {
    CalculatingFormHeading,
    CalculatingFormSubHeading,
    CalculatingFormInput
  }
}
</script>

<style lang="scss" scoped>
.calculating-form-assumed-rates {
  &__item {
    margin-bottom: 14px;
    text-align: center;
  }
}

.form-separate {
  display: flex;
}

.input {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.button {
  padding: 0.4em 1.2em;
  border: solid 1px #dadada;
  border-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background: #f1f1f1;
  color: #333;
  width: 100px;
  font-size: 0.9rem;
}
</style>
