<template>
  <div class="heaader-user">
    <button v-if="$store.state.isLoadingAuthentication" class="button">
      <span class="name name--skelton"></span>
      <span class="image image--skelton"></span>
    </button>
    <button v-else class="button" @click="showDropdown()">
      <template v-if="$store.state.isLoggedIn">
        <span class="name">{{ $store.state.user.displayName }}</span>
        <img
          :src="$store.state.user.photoURL"
          :alt="$store.state.user.displayName"
          class="image"
        />
      </template>
      <template v-else>
        <span class="name">ゲスト</span>
        <img src="@/assets/images/user.png" alt="ゲスト" class="image" />
      </template>
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
  transition: background 0.3s;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.8em;
  max-width: 140px;
  color: #fff;
  font-size: 0.9rem;

  &--skelton {
    @include skelton-animation;
    display: inline-block;
    width: 110px;
    height: 0.9rem;
    background: #898b90;
  }
}

.image {
  border-radius: 50%;
  width: 40px;
  height: 40px;

  &--skelton {
    @include skelton-animation;
    display: inline-block;
    background: #898b90;
  }
}
</style>
