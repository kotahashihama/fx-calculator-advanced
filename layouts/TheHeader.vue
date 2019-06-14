<template>
  <header class="header">
    <div class="header__left">
      <TheHeaderLogo />
      <TheHeaderNavigation />
    </div>

    <div class="header__right">
      <TheHeaderUser />
      <TheHeaderButton>新規計算</TheHeaderButton>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 27px;
  height: $header-height;
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
</style>
