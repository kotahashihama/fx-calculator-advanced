<template>
  <nav class="header-navigation">
    <ul class="header-navigation-list">
      <li class="header-navigation-list__item">
        <router-link to="/" class="header-navigation-list__item-link"
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
      margin-right: 1em;

      &-link {
        color: #333;
        text-decoration: none;
      }
    }
  }
}
</style>
