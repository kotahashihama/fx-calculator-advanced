<template>
  <div class="calculation">
    <div class="container">
      <div class="calculations">
        <h1 class="title">保存済み</h1>

        <template v-if="$store.state.isLoadingCalculation">
          <div class="content">
            <ul class="calculations-list">
              <li class="calculations-list__item">
                <div class="box">
                  <div class="box-date box-date--skelton"></div>
                  <div class="box-title box-title--skelton"></div>
                  <div class="box-info box-info--skelton"></div>
                </div>
              </li>
              <li class="calculations-list__item">
                <div class="box">
                  <div class="box-date box-date--skelton"></div>
                  <div class="box-title box-title--skelton"></div>
                  <div class="box-info box-info--skelton"></div>
                </div>
              </li>
              <li class="calculations-list__item">
                <div class="box">
                  <div class="box-date box-date--skelton"></div>
                  <div class="box-title box-title--skelton"></div>
                  <div class="box-info box-info--skelton"></div>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <div v-if="calculations.length" class="content">
            <ul class="calculations-list">
              <li
                v-for="calculation in calculationsDivided[
                  currentPageNumber - 1
                ]"
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
                          v-if="
                            $store.getters.floatingPlTotal(calculation) >= 0
                          "
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
                          <span
                            v-if="
                              $store.getters.floatingPipTotal(calculation) === 1
                            "
                            >pip</span
                          ><span v-else>pips</span>
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
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/calculation/pagination/Pagination.vue'

export default {
  middleware: 'enable-loading-calculation',
  components: {
    Pagination
  },
  head() {
    return {
      title: '保存済み |'
    }
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
    },
    isLoadingAuthentication() {
      return this.$store.state.isLoadingAuthentication
    }
  },
  watch: {
    $route() {
      this.setCurrentPageNumber()
      if (this.calculations.length !== 0)
        this.$store.commit('disableLoadingCalculation')
    },
    isLoadingAuthentication() {
      if (this.$store.state.isLoggedIn === false) {
        this.$router.push('/')
        this.$store.dispatch('redirectTopWithFlashMessage')
      }
    }
  },
  mounted() {
    this.setCurrentPageNumber()
    this.getCalculations().then(() => {
      this.setTotalPageCount()
      this.setPageNumbers()
      this.setCalculationsPerPage()
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
      this.totalPageCount = Math.ceil(
        this.calculations.length / this.calculationsPerPageCount
      )
    },
    setPageNumbers() {
      this.pageNumbers = [...Array(this.totalPageCount).keys()]
    },
    setCurrentPageNumber() {
      this.currentPageNumber = parseInt(this.$route.query.page) || 1
    },
    setCalculationsPerPage() {
      this.pageNumbers.forEach(pageNumber => {
        this.calculationsDivided.push(
          this.calculations.slice(
            pageNumber * this.calculationsPerPageCount,
            this.calculationsPerPageCount +
              pageNumber * this.calculationsPerPageCount
          )
        )
      })
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
    margin-bottom: 0.3em;
    font-size: 0.85rem;
    color: #9c9c9c;
    line-height: 1;

    &--skelton {
      @include skelton-animation;
      width: 130px;
      height: 0.85rem;
      background: #c5c6ca;
    }
  }

  &-title {
    transition: color 0.3s;
    margin-bottom: 11px;
    font-size: 1.1rem;

    &--skelton {
      @include skelton-animation;
      width: 230px;
      height: 1.1rem;
      background: #c5c6ca;
    }
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
        white-space: nowrap;
        margin-right: 0.5em;
      }

      .value {
        font-weight: bold;
      }
    }

    &--skelton {
      @include skelton-animation;
      border: none;
      height: 39px;
      background: #c5c6ca;
    }
  }
}

@media screen and (max-width: 800px) {
  .container {
    max-width: 96%;
  }

  .calculations {
    padding: 28px 3%;
  }
}

@media screen and (max-width: 720px) {
  .box {
    &-info {
      flex-direction: column;

      &__item {
        justify-content: center;
        margin-bottom: 4px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
