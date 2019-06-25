<template>
  <div class="modal-myfxbook">
    <ModalTitle>Myfxbookにログイン</ModalTitle>

    <form
      v-if="$store.state.myfxbook.session"
      class="form"
      @submit.prevent="getOpenTrades()"
    >
      <div class="form-content">
        <p class="form-content__item">
          <label for="account-number">
            <ModalFormHeading>口座番号</ModalFormHeading>
          </label>
          <ModalFormInput
            id="account-number"
            v-model="accountNumber"
            type="text"
          />
        </p>
      </div>

      <div class="buttons">
        <ModalFormButton class="button" type="submit">取得</ModalFormButton>
      </div>
    </form>
    <form v-else class="form" @submit.prevent="loginMyfxbook()">
      <div class="form-content">
        <p class="form-content__item">
          <label for="email">
            <ModalFormHeading>メールアドレス</ModalFormHeading>
          </label>
          <ModalFormInput id="email" v-model="email" type="text" />
        </p>

        <p class="form-content__item">
          <label for="password">
            <ModalFormHeading>パスワード</ModalFormHeading>
          </label>
          <ModalFormInput id="password" v-model="password" type="password" />
        </p>
      </div>

      <div class="buttons">
        <ModalFormButton class="button" type="submit">ログイン</ModalFormButton>
      </div>
    </form>
  </div>
</template>

<script>
import ModalTitle from '@/components/common/modal/common/ModalTitle.vue'
import ModalFormHeading from '@/components/common/modal/common/ModalFormHeading.vue'
import ModalFormInput from '@/components/common/modal/common/ModalFormInput.vue'
import ModalFormButton from '@/components/common/modal/common/ModalFormButton.vue'

export default {
  components: {
    ModalTitle,
    ModalFormHeading,
    ModalFormInput,
    ModalFormButton
  },
  computed: {
    email: {
      get() {
        return this.$store.state.myfxbook.email
      },
      set(value) {
        this.$store.commit('updateMyfxbookEmail', value)
      }
    },
    password: {
      get() {
        return this.$store.state.myfxbook.password
      },
      set(value) {
        this.$store.commit('updateMyfxbookPassword', value)
      }
    },
    accountNumber: {
      get() {
        return this.$store.state.myfxbook.accountNumber
      },
      set(value) {
        this.$store.commit('updateMyfxbookAccountNumber', value)
      }
    }
  },
  methods: {
    loginMyfxbook() {
      const self = this
      const params = {
        email: this.$store.state.myfxbook.email,
        password: this.$store.state.myfxbook.password
      }

      this.$axios
        .get('https://kotahashihama.com/fx-calculator/myfxbook-login.php', {
          params
        })
        .then(response => {
          if (response.data.error === false) {
            self.$store.commit('updateMyfxbookSession', response.data.session)
          } else {
            alert(
              'ログインできませんでした。時間をおくか、メールアドレスとパスワードをもう一度ご確認ください'
            )
          }
        })
    },
    getOpenTrades() {
      const self = this
      const params = {
        session: this.$store.state.myfxbook.session,
        id: this.$store.state.myfxbook.accountNumber
      }

      this.$axios
        .get('https://kotahashihama.com/fx-calculator/myfxbook-trades.php', {
          params
        })
        .then(response => {
          if (response.data.error === false) {
            self.$store.commit('getOpenTrades', response.data.openTrades)
          } else {
            alert(
              '取得できませんでした。時間をおくか、一度ログアウトしてからお試しください'
            )
          }
        })

      this.$store.commit('hideModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  &-content {
    &__item {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 43px;
}
</style>
