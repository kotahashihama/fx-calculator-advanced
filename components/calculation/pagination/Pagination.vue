<template>
  <nav class="pagination">
    <ul class="pagination-list">
      <li
        v-for="pageNumber in pageNumbers"
        :key="pageNumber"
        class="pagination-list__item"
      >
        <span v-if="pageNumber + 1 === currentPageNumber">{{
          pageNumber + 1
        }}</span>
        <template v-else>
          <router-link
            :to="
              '/calculation' +
                (pageNumber > 0 ? '?page=' + (pageNumber + 1) : '')
            "
            class="pagination-list__item-link"
            >{{ pageNumber + 1 }}</router-link
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
        transition: background 0.3s;
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
