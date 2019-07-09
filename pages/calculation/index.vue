<template>
  <div class="calculation">
    <div class="container">
      <div class="calculations">
        <h1 class="title">保存済み</h1>

        <div v-if="calculations.length" class="content">
          <ul class="calculations-list">
            <li
              v-for="calculation in calculationsDivided[currentPageNumber - 1]"
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
                    :class="[
                      $store.getters.floatingPlTotal(calculation) < 0
                        ? 'box-info--red'
                        : ''
                    ]"
                  >
                    <div class="box-info__item">
                      <div
                        v-if="$store.getters.floatingPlTotal(calculation) >= 0"
                        class="heading"
                      >
                        含み益
                      </div>
                      <div v-else class="heading">含み損</div>
                      <div class="content">
                        <span class="value">{{
                          $store.getters.floatingPlTotal(calculation)
                            | digitSeparator
                        }}</span>
                        円
                      </div>
                    </div>
                    <div class="box-info__item">
                      <div class="heading">含みピップス</div>
                      <div class="content">
                        <span class="value">{{
                          $store.getters.floatingPipTotal(calculation)
                            | digitSeparator
                        }}</span>
                        pips
                      </div>
                    </div>
                    <div class="box-info__item">
                      <div class="heading">証拠金維持率</div>
                      <div class="content">
                        <span class="value">{{
                          $store.getters.marginLevel(calculation)
                            | digitSeparator
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
        <div v-else class="content content--disabled">
          <p>
            計算結果を保存するとここに表示されます。
          </p>
        </div>

        <Pagination
          :items-per-page-count="calculationsPerPageCount"
          :total-page-count="totalPageCount"
          :page-numbers="pageNumbers"
          :current-page-number="currentPageNumber"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/calculation/pagination/Pagination.vue'

export default {
  // middleware: 'authentication',
  components: {
    Pagination
  },
  data() {
    return {
      calculationsDivided: [],
      calculationsPerPageCount: 5,
      totalPageCount: 1,
      pageNumbers: [],
      currentPageNumber: 1
    }
  },
  computed: {
    calculations() {
      return this.$store.state.calculations
    },
    date: () => timestamp => {
      const date = new Date(timestamp * 1000)
      return `${date.getFullYear()}年${date.getMonth() +
        1}月${date.getDate()}日`
    }
  },
  mounted() {
    this.setCurrentPageNumber()
    this.getCalculations().then(() => {
      this.setTotalPageCount()
      this.setCalculationsPerPage()
      this.setPageNumbers()
    })
  },
  methods: {
    getCalculations() {
      return new Promise(resolve => {
        this.$store.dispatch('getCalculations').then(() => {
          resolve()
        })
      })
    },
    setTotalPageCount() {
      if (this.calculations.length / this.calculationsPerPageCount <= 1) {
        this.totalPageCount = 1
      } else {
        this.totalPageCount = Math.ceil(
          this.calculations.length / this.calculationsPerPageCount
        )
      }
    },
    setCalculationsPerPage() {
      for (let i = 0; i < this.totalPageCount; i++) {
        this.calculationsDivided.push(
          this.calculations.slice(
            i * this.calculationsPerPageCount,
            this.calculationsPerPageCount + i * this.calculationsPerPageCount
          )
        )
      }
    },
    setPageNumbers() {
      for (let i = 0; i < this.totalPageCount; i++) {
        this.pageNumbers.push(i + 1)
      }
    },
    setCurrentPageNumber() {
      this.currentPageNumber = parseInt(this.$route.query.page) || 1
    }
  },
  watch: {
    $route() {
      this.setCurrentPageNumber()
    }
  }
}
</script>

<style lang="scss" scoped>
.calculation {
  background: #f1f1f1;
}

.container {
  margin: 0 auto;
  padding: 32px 0;
  max-width: 720px;
}

.content {
  &--disabled {
    padding: 16px;
    border: dashed 1px #dadada;
    background: #f7f7f7;
    font-size: 0.9rem;
  }
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
  padding-bottom: 0.7em;
  font-size: 1.5rem;
  font-weight: normal;
}

.box {
  padding: 19px 14px;
  color: #333;

  &-date {
    font-size: 0.85rem;
    color: #9c9c9c;
  }

  &-title {
    transition: all 0.3s;
    margin-bottom: 11px;
    font-size: 1.1rem;
  }

  &:hover .box {
    &-title {
      color: #e54058;
    }
  }

  &-info {
    display: flex;
    padding: 9px 18px;
    border: solid 2px #0090d8;
    border-radius: 99px;
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
