<template>
  <div v-if="$store.state.isLoading" class="calculation-processor-buttons">
    <span class="button button--skelton"></span>
    <span class="button button--skelton"></span>
  </div>
  <div v-else class="calculation-processor-buttons">
    <button class="button button--danger" @click="resetCalculation()">
      リセット
    </button>
    <template v-if="$store.state.isLoggedIn">
      <template v-if="$store.state.calculationEdited.id">
        <button class="button button--outline" @click="createCalculation()">
          新規保存
        </button>
      </template>
      <template v-else>
        <button class="button" @click="createCalculation()">保存</button>
      </template>
      <button
        v-if="$store.state.calculationEdited.id"
        class="button"
        @click="updateCalculation()"
      >
        上書き保存
      </button>
    </template>
  </div>
</template>

<script>
export default {
  methods: {
    createCalculation() {
      this.$store.dispatch('createCalculationWithFlashMessage')
    },
    updateCalculation() {
      this.$store.dispatch('updateCalculationWithFlashMessage')
    },
    resetCalculation() {
      this.$store.dispatch('resetCalculationWithFlashMessage')
    }
  }
}
</script>

<style lang="scss" scoped>
.calculation-processor-buttons {
  display: flex;
  align-items: center;
}

.button {
  transition: all 0.3s;
  white-space: nowrap;
  margin-right: 9px;
  padding: 0 1.3em;
  border: solid 1px #2b7194;
  border-radius: 3px;
  height: 32px;
  background: #2b7194;
  color: #fff;
  font-size: 0.9rem;

  &:hover {
    background: #215975;
  }

  &:last-of-type {
    margin: 0;
  }

  &--outline {
    border-color: #2b7194;
    background: #fff;
    color: #2b7194;

    &:hover {
      background: #2b7194;
      color: #fff;
    }
  }

  &--danger {
    border-color: #e54058;
    background: #fff;
    color: #e54058;

    &:hover {
      background: #e54058;
      color: #fff;
    }
  }

  &--skelton {
    @include skelton-animation;
    border: none;
    width: 90px;
    background: #c5c6ca;

    &:hover {
      background: #c5c6ca;
    }
  }
}
</style>
