<template>
  <div class="calculation">
    <div class="container">
      <div class="calculations">
        <h1 class="title">保存済み</h1>

        <ul class="calculations-list">
          <li
            v-for="calculation in $store.state.calculations"
            :key="calculation.id"
            class="calculations-list__item"
          >
            <router-link
              :to="'/calculation/' + calculation.id"
              class="calculations-list__item-link"
            >
              <article class="box">
                <div class="box-date">
                  {{ date(calculation.createdAt.seconds) }} 保存
                </div>
                <h1 class="box-title">{{ calculation.title }}</h1>
                <div
                  class="box-info"
                  :class="[calculation.floatingPl < 0 ? 'box-info--red' : '']"
                >
                  <div class="box-info__item">
                    <div class="heading">含み益</div>
                    <div class="content">
                      <span class="value">{{
                        calculation.floatingPl | digitSeparator
                      }}</span>
                      円
                    </div>
                  </div>
                  <div class="box-info__item">
                    <div class="heading">含みピップス</div>
                    <div class="content">
                      <span class="value">{{
                        calculation.floatingPips | digitSeparator
                      }}</span>
                      pips
                    </div>
                  </div>
                  <div class="box-info__item">
                    <div class="heading">証拠金維持率</div>
                    <div class="content">
                      <span class="value">{{
                        calculation.marginLevel | digitSeparator
                      }}</span>
                      ％
                    </div>
                  </div>
                </div>
              </article>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authentication',
  computed: {
    date: () => timestamp => {
      const date = new Date(timestamp * 1000)
      return `${date.getFullYear()}年${date.getMonth() +
        1}月${date.getDate()}日`
    }
  },
  mounted() {
    this.getCalculations()
  },
  methods: {
    getCalculations() {
      this.$store.dispatch('getCalculations')
    }
  }
}
</script>

<style lang="scss" scoped>
.calculation {
  background: #f9f9f9;
}

.container {
  margin: 0 auto;
  padding: 32px 0;
  max-width: 720px;
}

.calculations {
  padding: 28px 34px;
  border: solid 1px #d0d0d0;
  background: #fff;

  &-list {
    list-style: none;
    padding: 0;

    &__item {
      border-top: solid 1px #d6d6d6;

      &:last-of-type {
        border-bottom: solid 1px #d6d6d6;
      }

      &-link {
        text-decoration: none;
      }
    }
  }
}

.title {
  margin-bottom: 0.7em;
  font-size: 1.5rem;
  font-weight: normal;
}

.box {
  padding: 19px 14px;
  color: #333;

  &-date {
    font-size: 0.8rem;
    color: #9c9c9c;
  }

  &-title {
    transition: all 0.3s;
    margin-bottom: 11px;
    font-size: 1rem;
  }

  &:hover .box {
    &-title {
      color: #e54058;
    }
  }

  &-info {
    display: flex;
    padding: 8px 19px;
    border: solid 2px #0090d8;
    border-radius: 3px;
    background: #f3fbff;

    &--red {
      border-color: #e8475f;
      background: #fff7f8;
    }

    &__item {
      display: flex;
      margin-right: 0.9em;
      font-size: 0.8rem;

      .heading {
        margin-right: 0.5em;
      }

      .value {
        font-weight: bold;
      }
    }
  }
}
</style>
