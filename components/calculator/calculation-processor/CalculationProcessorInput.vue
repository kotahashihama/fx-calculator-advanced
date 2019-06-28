<template>
  <div v-if="$store.state.isLoading" class="calculation-processor-input">
    <span class="input input--skelton"></span>
  </div>
  <div v-else class="calculation-processor-input">
    <template v-if="$store.state.isLoggedin">
      <input v-model="title" class="input" type="text" @blur="setUntitled()" />
      <div class="label">未保存</div>
    </template>
    <template v-else>
      <span class="input input--disabled"
        >Twitterでログインすると、ここから計算結果を保存することができます。</span
      >
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    title: {
      get() {
        return this.$store.state.title
      },
      set(value) {
        this.$store.commit('updateTitle', value || '')
      }
    }
  },
  methods: {
    setUntitled() {
      if (this.title === '') this.$store.commit('updateTitle', '無題')
    }
  }
}
</script>

<style lang="scss" scoped>
.calculation-processor-input {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-right: 1em;
}

.input {
  display: block;
  border: solid 1px #dadada;
  border-radius: 3px;
  padding: 0 0.4em;
  padding-right: 64px;
  width: 100%;
  height: 32px;
  background: #fff;
  font-size: 1rem;

  &--skelton {
    display: inline-block;
    border-color: #c5c6ca;
    background: #c5c6ca;
  }

  &--disabled {
    display: flex;
    align-items: center;
    border-style: dashed;
    background: #f7f7f7;
    font-size: 0.8rem;
  }
}

.label {
  position: absolute;
  right: 9px;
  padding: 0.15em 0.5em;
  border: solid 1px #757575;
  color: #757575;
  font-size: 0.7rem;
}
</style>
