<template>
  <nav class="header-dropdown">
    <ul class="header-dropdown-list">
      <li class="header-dropdown-list__item">
        <button
          v-if="$store.state.isLoggedIn"
          class="header-dropdown-list__item-link"
          @click="logout()"
        >
          ログアウト
        </button>
        <button
          v-else
          class="header-dropdown-list__item-link"
          @click="twitterLogin()"
        >
          Twitterログイン
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    twitterLogin() {
      this.$store.dispatch('twitterLoginWithFlashMessage')
    },
    logout() {
      this.$store.dispatch('logoutWithFlashMessage')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-dropdown {
  &-list {
    list-style: none;
    z-index: $header-user-dropdown-z-index;
    position: absolute;
    top: calc(#{$header-height} - 6px);
    padding: 4px 0;
    border: solid 1px #d0d0d0;
    border-radius: 3px;
    width: 200px;
    background: #fff;

    &__item {
      &-link {
        transition: background 0.3s;
        display: flex;
        padding: 0.7em 0.9em;
        border: none;
        width: 100%;
        background: #fff;
        color: #333;
        font-size: 0.8rem;
        text-decoration: none;

        &:hover {
          background: #efefef;
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .header-dropdown {
    &-list {
      right: 2%;
    }
  }
}
</style>
