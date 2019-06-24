<template>
  <div>
    <div class="title">Myfxbookにログイン</div>

    <div class="form">
      <p class="form-item">
        <label for="email">
          <span class="form-item__title">メールアドレス</span>
        </label>
        <input id="email" type="text" class="input" />
      </p>

      <p class="form-item">
        <label for="password">
          <span class="form-item__title">パスワード</span>
        </label>
        <input id="password" type="password" class="input" />
      </p>
    </div>

    <div class="buttons">
      <ModalButton class="button" @click="updateOpenTrade()"
        >ログイン</ModalButton
      >
    </div>
  </div>
</template>

<script>
import ModalButton from '@/components/common/modal/common/ModalButton.vue'

export default {
  components: {
    ModalButton
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 37px;
  text-align: center;
  font-size: 24px;
}

.form {
  &-item {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    &__title {
      display: block;
      margin-bottom: 0.4em;
    }
  }
}

.input {
  display: block;
  border: solid 1px #dadada;
  border-radius: 3px;
  padding: 0 0.4em;
  width: 100%;
  height: 37px;
  background: #fff;
  font-size: 1.3rem;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 43px;
}
</style>
