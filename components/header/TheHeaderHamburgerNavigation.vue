<template>
  <transition name="header-hamburger-navigation">
    <nav class="header-hamburger-navigation">
      <ul class="header-hamburger-navigation-list">
        <li
          v-if="$store.state.isLoggedIn"
          class="header-hamburger-navigation-list__item"
        >
          <router-link
            to="/"
            class="header-hamburger-navigation-list__item-link"
            >計算機</router-link
          >
        </li>
        <li
          v-if="$store.state.isLoggedIn"
          class="header-hamburger-navigation-list__item"
        >
          <router-link
            to="/calculation"
            class="header-hamburger-navigation-list__item-link"
            >保存済み</router-link
          >
        </li>
        <li class="header-hamburger-navigation-list__item">
          <router-link
            to="/terms"
            class="header-hamburger-navigation-list__item-link"
            >利用規約</router-link
          >
        </li>
      </ul>
    </nav>
  </transition>
</template>

<style lang="scss" scoped>
.header-hamburger-navigation {
  position: absolute;
  top: $header-height;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  width: 100%;

  &-list {
    padding: 0;

    &__item {
      border-bottom: solid 1px #5f6166;

      &-link {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        height: 44px;
        text-decoration: none;
      }
    }
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
