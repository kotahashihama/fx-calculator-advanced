<template>
  <footer class="footer">
    <TheFooterCopyright />
  </footer>
</template>

<script>
import TheFooterCopyright from '@/components/footer/TheFooterCopyright.vue'

export default {
  components: {
    TheFooterCopyright
  }
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 13px;
  height: $footer-height;
  background: #f1f1f1;
}
</style>
