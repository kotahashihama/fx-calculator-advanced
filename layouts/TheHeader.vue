<template>
  <header class="header">
    <div class="header__left">
      <div class="logo">
        <router-link to="/" class="logo-link">ポジション計算機</router-link>
      </div>

      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-list__item">
            <router-link to="/" class="nav-list__item-link"
              >保存済み</router-link
            >
          </li>
          <li class="nav-list__item">
            <router-link to="/" class="nav-list__item-link"
              >利用規約</router-link
            >
          </li>
        </ul>
      </nav>
    </div>

    <div class="header__right">
      <div class="user">
        <span class="user__name">ゲスト</span>
        <img
          src="https://randomuser.me/api/portraits/men/46.jpg"
          alt="ゲスト"
          class="user__image"
        />
      </div>

      <button class="button">新規計算</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8em;
  height: 64px;
  background: #f1f1f1;

  &__left {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.logo {
  margin-right: 2.7em;

  &-link {
    font-size: 1.5em;
    color: #333;
    text-decoration: none;
  }
}

.nav {
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

.user {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.2em;

  &__name {
    margin-right: 0.5em;
    font-size: 0.9em;
  }

  &__image {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
}

.button {
  padding: 0.8em 1.3em;
  border: none;
  border-radius: 3px;
  background: #4ac361;
  color: #fff;
  font-size: 0.9em;
}
</style>
