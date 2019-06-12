<template>
  <div class="calculating-form">
    <p class="calculating-form__item">
      <span class="form-heading">ポジション</span>
      <button class="position-button">追加</button>
      <button class="position-button">取得</button>
    </p>

    <p class="calculating-form__item">
      <label class="form-heading" for="balance">残高（円）</label>
      <input
        id="balance"
        v-model.number="balanceInherited"
        class="form-control"
        type="number"
        min="0"
        @input="inputBalance(balanceInherited)"
      />
    </p>

    <div class="calculating-form__item">
      <div class="form-heading">取引所</div>

      <p>
        <input id="" type="radio" name="exchange" /> 海外
        <input id="" type="radio" name="exchange" /> 国内
      </p>

      <p>
        <label class="form-heading" for="trading-unit"
          >取引通貨単位（通貨）</label
        >
        <select id="trading-unit" class="form-control">
          <option value="" style="text-align: right">100000</option>
        </select>
      </p>

      <p>
        <label class="form-heading" for="leverage">レバレッジ（倍）</label>
        <select id="leverage" class="form-control">
          <option value="" style="text-align: right">1000</option>
        </select>
      </p>
    </div>

    <div class="calculating-form__item">
      <div class="form-heading">仮定レート</div>

      <p>
        <label class="form-heading" for="usd-jpy">USD/JPY</label>
        <span class="form-separate">
          <button class="current-rate-button">現在値</button>
          <input
            id="usd-jpy"
            value="108.131"
            class="form-control form-control--current-rate"
            type="number"
            min="0"
          />
        </span>
      </p>
    </div>

    <p class="calculating-form__item">
      <label class="form-heading" for="target-margin-level"
        >目標証拠金維持率（％）</label
      >
      <input
        id="target-margin-level"
        v-model.number="targetMarginLevelInherited"
        class="form-control"
        type="number"
        min="0"
        @input="inputTargetMarginLevel(targetMarginLevelInherited)"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    balance: {
      type: Number,
      default: 200000
    },
    targetMarginLevel: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      balanceInherited: this.balance,
      targetMarginLevelInherited: this.targetMarginLevel
    }
  },
  methods: {
    inputBalance(balance) {
      if (balance === '') {
        this.balanceInherited = 0
        balance = 0
      }
      this.$emit('inputBalance', balance)
    },
    inputTargetMarginLevel(targetMarginLevel) {
      if (targetMarginLevel === '') {
        this.targetMarginLevelInherited = 0
        targetMarginLevel = 0
      }
      this.$emit('inputTargetMarginLevel', targetMarginLevel)
    }
  }
}
</script>

<style lang="scss" scoped>
.calculating-form {
  &__item {
    margin-bottom: 1.3em;
  }
}

.form {
  &-heading {
    display: block;
    margin-bottom: 0.4em;
    text-align: center;
  }

  &-control {
    display: block;
    border: solid 1px #dadada;
    border-radius: 3px;
    padding: 0.2em 0.4em;
    width: 100%;
    background: #fff;
    font-size: 1.5em;

    &--current-rate {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  &-separate {
    display: flex;
  }
}

.position-button {
  padding: 0.8em 1.3em;
  border: none;
  border-radius: 3px;
  background: #4ac361;
  color: #fff;
  font-size: 0.9em;
}

.current-rate-button {
  padding: 0.8em 1.3em;
  border: none;
  border-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background: #4ac361;
  color: #fff;
  width: 100px;
  font-size: 0.9em;
}
</style>
