<template>
  <div
    v-if="$store.state.isLoadingAuthentication"
    class="calculation-processor-input"
  >
    <span class="input input--skelton"></span>
  </div>
  <div v-else class="calculation-processor-input">
    <template v-if="$store.state.isLoggedIn">
      <input v-model="title" class="input" type="text" @blur="setUntitled()" />
      <div v-if="$store.state.editsCalculation" class="label">
        保存済
      </div>
      <div v-else class="label label--secondary">未保存</div>
    </template>
    <template v-else>
      <span class="input input--disabled"
        >ログインすると、ここから計算結果を保存することができます。<button
          class="button button--danger"
          @click="twitterLogin"
        >
          Twitterでログイン
        </button></span
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
    },
    twitterLogin() {
      this.$store.dispatch('twitterLoginWithFlashMessage')
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
  padding: 0 9px;
  padding-right: 68px;
  width: 100%;
  height: 32px;
  background: #fff;
  font-size: 1rem;

  &--skelton {
    @include skelton-animation;
    display: inline-block;
    border: none;
    background: #c5c6ca;
  }

  &--disabled {
    display: flex;
    align-items: center;
    padding-right: 9px;
    border-style: dashed;
    background: #fff;
    font-size: 0.8rem;
  }
}

.button {
  transition: background 0.3s;
  margin-left: 9px;
  padding: 0.2em 1.3em;
  border: none;
  border-radius: 3px;
  background: #e54058;
  color: #fff;
  font-size: 0.7rem;

  &:hover {
    background: #c5364b;
  }
}

.label {
  position: absolute;
  right: 9px;
  padding: 0.15em 0.7em;
  border: solid 1px #2b7194;
  border-radius: 99px;
  color: #2b7194;
  font-size: 0.7rem;

  &--secondary {
    border: solid 1px #808080;
    border-radius: 99px;
    color: #808080;
  }
}
</style>
