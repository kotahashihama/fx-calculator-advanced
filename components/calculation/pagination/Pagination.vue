<template>
  <nav class="pagination">
    <ul class="pagination-list">
      <li
        v-for="(pageNumber, index) in pageNumbers"
        :key="index"
        class="pagination-list__item"
      >
        <span v-if="pageNumber === currentPageNumber">{{ pageNumber }}</span>
        <template v-else>
          <router-link
            v-if="pageNumber === 1"
            to="/calculation"
            class="pagination-list__item-link"
            >{{ pageNumber }}</router-link
          >
          <router-link
            v-else
            :to="'/calculation?page=' + pageNumber"
            class="pagination-list__item-link"
            >{{ pageNumber }}</router-link
          >
        </template>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    itemsPerPageCount: {
      type: Number,
      default: 0
    },
    totalPageCount: {
      type: Number,
      default: 0
    },
    pageNumbers: {
      type: Array,
      default: () => []
    },
    currentPageNumber: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 28px;

  &-list {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;

    &__item {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 6px;
      border: solid 1px #2b7194;
      width: 38px;
      height: 38px;
      color: #2b7194;
      font-size: 0.9rem;

      &-link {
        transition: all 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #2b7194;
        color: #fff;
        text-decoration: none;

        &:hover {
          background: #215975;
        }
      }
    }
  }
}
</style>
