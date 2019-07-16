<template>
  <header class="header">
    <div class="header__left">
      <TheHeaderHamburgerButton class="header-hamburger-button" />
      <TheHeaderLogo class="header-logo" />
      <TheHeaderNavigation class="header-navitation" />
    </div>

    <div class="header__right">
      <TheHeaderUser />
      <TheHeaderButton class="button" @click="newCalculation()"
        ><span class="button__text">新規計算</span
        ><i class="material-icons">
          add
        </i></TheHeaderButton
      >
    </div>

    <TheHeaderHamburgerNavigation
      v-if="$store.state.showsHamburgerNavigation"
      class="header-navitation"
    />
    <TheHeaderDropdownOverlay />
  </header>
</template>

<script>
import TheHeaderLogo from '@/components/header/TheHeaderLogo.vue'
import TheHeaderNavigation from '@/components/header/TheHeaderNavigation.vue'
import TheHeaderHamburgerButton from '@/components/header/TheHeaderHamburgerButton.vue'
import TheHeaderHamburgerNavigation from '@/components/header/TheHeaderHamburgerNavigation.vue'
import TheHeaderUser from '@/components/header/TheHeaderUser.vue'
import TheHeaderButton from '@/components/header/TheHeaderButton.vue'
import TheHeaderDropdownOverlay from '@/components/header/TheHeaderDropdownOverlay.vue'

export default {
  components: {
    TheHeaderLogo,
    TheHeaderNavigation,
    TheHeaderHamburgerButton,
    TheHeaderHamburgerNavigation,
    TheHeaderUser,
    TheHeaderButton,
    TheHeaderDropdownOverlay
  },
  methods: {
    newCalculation() {
      this.$router.push('/')
      this.$store.dispatch('newCalculationWithFlashMessage')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  z-index: $header-z-index;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
  height: $header-height;
  background: #2f3034;
  color: #fff;

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

  &-hamburger-button {
    display: none;
  }

  &-hamburger-navigation {
    display: none;
  }
}

.button {
  display: flex;
  align-items: center;

  .material-icons {
    display: none;
  }
}

@media screen and (max-width: 800px) {
  .button {
    padding: 0.7em;

    &__text {
      display: none;
    }

    .material-icons {
      display: inline;
    }
  }
}

@media screen and (max-width: 720px) {
  .header {
    padding: 0 2%;

    &-hamburger-button {
      display: inline-block;
    }

    &-hamburger-navigation {
      display: block;
    }

    &-logo {
      display: none;
    }

    &-navigation {
      display: none;
    }
  }
}
</style>
