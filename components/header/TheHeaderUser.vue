<template>
  <div class="heaader-user">
    <button class="button" @click="showDropdown()">
      <span class="name">ゲスト</span>
      <img
        src="https://randomuser.me/api/portraits/men/46.jpg"
        alt="ゲスト"
        class="image"
      />
    </button>

    <TheHeaderUserDropdown v-if="$store.state.showsDropdown" />
  </div>
</template>

<script>
import TheHeaderUserDropdown from '@/components/header/TheHeaderUserDropdown.vue'

export default {
  components: {
    TheHeaderUserDropdown
  },
  methods: {
    showDropdown() {
      this.dropdown = true
      this.$store.commit('showDropdown')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-user {
  position: relative;
}

.button {
  transition: all 0.3s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 9px;
  padding: 0 1em;
  padding-right: 31px;
  border: none;
  height: $header-height;
  background: transparent;
  color: #fff;

  &::before {
    position: absolute;
    right: 7px;
    content: 'arrow_drop_down';
    font-size: 1.1rem;
    font-family: 'Material Icons';
  }

  &:hover {
    background: #3b3c40;
  }
}

.name {
  margin-right: 0.8em;
  color: #fff;
  font-size: 0.9rem;
}

.image {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
</style>
