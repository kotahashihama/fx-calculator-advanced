<template>
  <div class="header-user">
    <span class="ame">ゲスト</span>
    <img
      src="https://randomuser.me/api/portraits/men/46.jpg"
      alt="ゲスト"
      class="image"
    />
  </div>
</template>

<style lang="scss" scoped>
.header-user {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 17px;
}

.name {
  margin-right: 0.5em;
  font-size: 0.9rem;
}

.image {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
</style>
