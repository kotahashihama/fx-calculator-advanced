<template>
  <nav class="header-navigation">
    <ul class="header-navigation-list">
      <li class="header-navigation-list__item">
        <router-link to="/calculation" class="header-navigation-list__item-link"
          >保存済み</router-link
        >
      </li>
      <li class="header-navigation-list__item">
        <router-link to="/" class="header-navigation-list__item-link"
          >利用規約</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.header-navigation {
  &-list {
    list-style: none;
    display: flex;
    padding: 0;
    justify-content: space-between;
    align-items: center;

    &__item {
      font-size: 0.9rem;

      &-link {
        transition: all 0.3s;
        display: flex;
        align-items: center;
        padding: 0 1em;
        height: $header-height;
        color: #fff;
        text-decoration: none;

        &:hover {
          background: #3b3c40;
        }
      }
    }
  }
}
</style>
