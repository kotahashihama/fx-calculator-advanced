<template>
  <div class="calculation-id">
    <div class="container">
      <article class="box">
        <div class="box-date">{{ createdAt }} 保存</div>
        <h1 class="box-title">{{ $store.state.calculation.title }}</h1>
        <CalculatedResult :calculation-data="$store.state.calculation" />
      </article>
    </div>
  </div>
</template>

<script>
import CalculatedResult from '@/components/common/calculated-result/CalculatedResult.vue'

export default {
  components: {
    CalculatedResult
  },
  data() {
    return {
      createdAt: ''
    }
  },
  computed: {
    calculation() {
      return this.$store.state.calculation
    }
  },
  watch: {
    calculation() {
      const date = this.$store.state.calculation.createdAt.toDate()
      this.createdAt = `${date.getFullYear()}年${date.getMonth() +
        1}月${date.getDate()}日`
    }
  },
  mounted() {
    this.getCalculation()
  },
  methods: {
    getCalculation() {
      this.$store.dispatch('getCalculation', this.$route.params.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.calculation-id {
  background: #f9f9f9;
}

.container {
  margin: 0 auto;
  padding: 32px 0;
  max-width: calc(100% - #{$calculating-form-width});
}

.box {
  padding: 33px;
  background: #fff;
  border: solid 1px #d0d0d0;

  &-date {
    font-size: 0.9rem;
    color: #9c9c9c;
  }

  &-title {
    margin-bottom: 0.7em;
  }
}
</style>
