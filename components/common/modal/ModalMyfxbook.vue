<template>
  <div>
    <div class="title">Myfxbookにログイン</div>

    <template v-if="$store.state.myfxbook.session">
      <div class="form">
        <p class="form-item">
          <label for="account-number">
            <span class="form-item__title">口座番号</span>
          </label>
          <input
            id="account-number"
            v-model="accountNumber"
            type="text"
            class="input"
          />
        </p>
      </div>

      <div class="buttons">
        <ModalButton class="button" @click="getOpenTrades()">取得</ModalButton>
      </div>
    </template>
    <template v-else>
      <div class="form">
        <p class="form-item">
          <label for="email">
            <span class="form-item__title">メールアドレス</span>
          </label>
          <input id="email" v-model="email" type="text" class="input" />
        </p>

        <p class="form-item">
          <label for="password">
            <span class="form-item__title">パスワード</span>
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="input"
          />
        </p>
      </div>

      <div class="buttons">
        <ModalButton class="button" @click="loginMyfxbook()"
          >ログイン</ModalButton
        >
      </div>
    </template>
  </div>
</template>

<script>
import ModalButton from '@/components/common/modal/common/ModalButton.vue'

export default {
  components: {
    ModalButton
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
              'ログインできませんでした。メールアドレスとパスワードをもう一度お試しください'
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
