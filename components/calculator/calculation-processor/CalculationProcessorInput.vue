<template>
  <div class="calculation-processor-input">
    <input v-model="title" class="input" type="text" @blur="setUntitled()" />
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
  padding: 0.2em 0.4em;
  width: 100%;
  background: #fff;
  font-size: 1rem;
}
</style>
