<template>
  <p class="footer-copyright">
    <small class="footer-copyright__text"
      >&copy; ポジション計算機<span class="developed-by"
        >developed by Kota Hashihama</span
      ></small
    >
  </p>
</template>

<style lang="scss" scoped>
.footer-copyright {
  color: #fff;
  text-align: center;

  &__text {
    font-size: 0.75rem;
  }
}

@media screen and (max-width: 720px) {
  .developed-by {
    display: none;
  }
}
</style>
