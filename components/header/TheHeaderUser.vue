<template>
  <button class="header-user">
    <span class="name">ゲスト</span>
    <img
      src="https://randomuser.me/api/portraits/men/46.jpg"
      alt="ゲスト"
      class="image"
    />
  </button>
</template>

<style lang="scss" scoped>
.header-user {
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 14px;
  padding: 0 1em;
  border: none;
  height: $header-height;
  background: transparent;

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
