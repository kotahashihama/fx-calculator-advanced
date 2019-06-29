<template>
  <header class="header">
    <div class="header__left">
      <TheHeaderLogo />
      <TheHeaderNavigation />
    </div>

    <div class="header__right">
      <TheHeaderUser />
      <TheHeaderButton class="button">新規計算</TheHeaderButton>
    </div>
  </header>
</template>

<script>
import TheHeaderLogo from '@/components/header/TheHeaderLogo.vue'
import TheHeaderNavigation from '@/components/header/TheHeaderNavigation.vue'
import TheHeaderUser from '@/components/header/TheHeaderUser.vue'
import TheHeaderButton from '@/components/header/TheHeaderButton.vue'

export default {
  components: {
    TheHeaderLogo,
    TheHeaderNavigation,
    TheHeaderUser,
    TheHeaderButton
  }
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 15;
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
}

.button {
  display: flex;
  align-items: center;
}
</style>
