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
            :value="$store.state.myfxbook.accountNumber"
            type="text"
            @input="updateMyfxbook('accountNumber', $event)"
          />
        </p>
      </div>

      <div class="buttons">
        <ModalFormButton
          class="button button--secondary"
          type="button"
          @click="logoutMyfxbook()"
          >ログアウト</ModalFormButton
        >
        <ModalFormButton class="button" type="submit">取得</ModalFormButton>
      </div>
    </form>
    <form v-else class="form" @submit.prevent="loginMyfxbook()">
      <div class="form-content">
        <p class="form-content__item">
          <label for="email">
            <ModalFormHeading>メールアドレス</ModalFormHeading>
          </label>
          <ModalFormInput
            id="email"
            :value="$store.state.myfxbook.email"
            type="text"
            @input="updateMyfxbook('email', $event)"
          />
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
  data() {
    return {
      password: ''
    }
  },
  methods: {
    updateMyfxbook(option) {
      this.$store.commit('updateMyfxbook', {
        option,
        value: event.target.value
      })
    },
    loginMyfxbook() {
      const self = this
      const params = {
        email: this.$store.state.myfxbook.email,
        password: this.password
      }

      this.$axios
        .get('https://kotahashihama.com/fx-calculator/myfxbook-login.php', {
          params
        })
        .then(response => {
          if (response.data.error === false) {
            self.$store.commit('updateMyfxbook', {
              option: 'session',
              value: response.data.session
            })
          } else {
            self.$store.dispatch('showFlashMessage', {
              currentFlashMessage: 'FlashMessageCannotLoginMyfxbook',
              flashMessageType: 'danger'
            })
          }
        })
    },
    logoutMyfxbook() {
      const self = this
      const params = {
        session: this.$store.state.myfxbook.session
      }

      this.$axios
        .get('https://kotahashihama.com/fx-calculator/myfxbook-logout.php', {
          params
        })
        .then(response => {
          if (response.data.error === false) {
            self.$store.commit('updateMyfxbook', {
              option: 'session',
              value: ''
            })
          } else {
            self.$store.dispatch('showFlashMessage', {
              currentFlashMessage: 'FlashMessageCannotLogoutMyfxbook',
              flashMessageType: 'danger'
            })
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
        .get(
          'https://kotahashihama.com/fx-calculator/myfxbook-get-open-trades.php',
          {
            params
          }
        )
        .then(response => {
          if (response.data.error === false) {
            self.$store.commit('getOpenTrades', response.data.openTrades)
          } else {
            self.$store.dispatch('showFlashMessage', {
              currentFlashMessage: 'FlashMessageCannotGetOpenTrades',
              flashMessageType: 'danger'
            })
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

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 43px;

  .button {
    margin-right: 9px;

    &--secondary {
      transition: background 0.3s, color 0.3s;
      border: solid 1px #808080;
      background: #fff;
      color: #808080;

      &:hover {
        background: #808080;
        color: #fff;
      }
    }
  }
}
</style>
