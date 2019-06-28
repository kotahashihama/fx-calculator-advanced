<template>
  <nav class="header-dropdown">
    <ul class="header-dropdown-list">
      <li class="header-dropdown-list__item">
        <router-link to="/login" class="header-dropdown-list__item-link"
          >ログイン</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.header-dropdown {
  &-list {
    list-style: none;
    z-index: 10;
    position: absolute;
    top: calc(#{$header-height} - 6px);
    padding: 4px 0;
    border: solid 1px #d0d0d0;
    border-radius: 3px;
    width: 200px;
    background: #fff;

    &__item {
      font-size: 0.8rem;

      &-link {
        transition: all 0.3s;
        display: flex;
        padding: 0.7em 0.9em;
        color: #333;
        text-decoration: none;

        &:hover {
          background: #efefef;
        }
      }
    }
  }
}
</style>
