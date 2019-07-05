import firebase, { firestore } from '@/plugins/firebase'

const currencyPairs = [
  {
    symbol: 'USD/JPY',
    currencies: ['USD', 'JPY'],
    emoji: '&#x1f1fa;&#x1f1f8;',
    chartColor: '#CFB225',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.001
  },
  {
    symbol: 'EUR/USD',
    currencies: ['EUR', 'USD'],
    emoji: '&#x1f1ea;&#x1f1fa;',
    chartColor: '#F6C118',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.00001
  },
  {
    symbol: 'GBP/USD',
    currencies: ['GBP', 'USD'],
    emoji: '&#x1f1ec;&#x1f1e7;',
    chartColor: '#FB6319',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.00001
  },
  {
    symbol: 'AUD/USD',
    currencies: ['AUD', 'USD'],
    emoji: '&#x1f1e6;&#x1f1fa;',
    chartColor: '#E61B1C',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.00001
  },
  {
    symbol: 'EUR/JPY',
    currencies: ['EUR', 'JPY'],
    emoji: '&#x1f1ea;&#x1f1fa;',
    chartColor: '#00A450',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.001
  },
  {
    symbol: 'GBP/JPY',
    currencies: ['GBP', 'JPY'],
    emoji: '&#x1f1ec;&#x1f1e7;',
    chartColor: '#BDACEF',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.001
  },
  {
    symbol: 'AUD/JPY',
    currencies: ['AUD', 'JPY'],
    emoji: '&#x1f1e6;&#x1f1fa;',
    chartColor: '#FCC0EC',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.001
  }
]

export const state = () => ({
  isLoading: true,
  isLoggedIn: false,
  user: {},
  calculations: [],
  calculation: {},

  showsDropdown: false,

  showsModal: false,
  currentModal: '',

  showsFlashMessage: false,
  currentFlashMessage: '',
  flashMessagetType: '',

  title: '無題',
  currencyPairs,
  openTrades: [],
  balance: 200000,
  targetMarginLevel: 1000,
  broker: 'international',
  brokers: {
    international: '海外',
    domestic: '国内'
  },
  tradingUnit: {
    international: 100000,
    domestic: 10000
  },
  tradingUnits: {
    international: [100000, 1000],
    domestic: [10000, 1000]
  },
  leverage: {
    international: 1000,
    domestic: 25
  },
  leverages: {
    international: [1000, 888, 500, 200],
    domestic: [25, 20, 10, 5]
  },

  editsOpenTrade: false,
  openTradeDefault: {
    id: 0,
    symbol: 'USD/JPY',
    action: '買',
    lot: 0.01,
    openPrice: 0
  },
  openTradeEdited: {
    id: 0,
    symbol: 'USD/JPY',
    action: '買',
    lot: 0.01,
    openPrice: 0
  },

  myfxbook: {
    email: '',
    session: '',
    accountNumber: ''
  },

  calculationEdited: ''
})

export const getters = {
  equity: (state, getters) => (calculationData = null) => {
    const balance = calculationData ? calculationData.balance : state.balance
    const floatingPlTotal = getters.floatingPlTotal(calculationData)

    return balance + floatingPlTotal
  },
  freeMargin: (state, getters) => (calculationData = null) => {
    const equity = getters.equity(calculationData)
    const marginTotal = getters.marginTotal(calculationData)

    return equity - marginTotal
  },

  marginTotal: (state, getters) => (calculationData = null) => {
    const currencyPairs = calculationData
      ? calculationData.currencyPairs
      : state.currencyPairs

    return (currencyPairs || [])
      .map(currencyPair => currencyPair.currencies)
      .reduce((sum, currencies) => {
        const result = getters.margin(
          currencies[0],
          currencies[1],
          calculationData
        )
        return sum + result
      }, 0)
  },
  margin: state => (baseCurrency, quoteCurrency, calculationData) => {
    const currencyPairs = calculationData
      ? calculationData.currencyPairs
      : state.currencyPairs
    const currencyPair = currencyPairs.find(
      currencyPair => currencyPair.symbol === `${baseCurrency}/${quoteCurrency}`
    )
    const usdJpy = currencyPairs.find(
      currencyPair => currencyPair.symbol === 'USD/JPY'
    )
    const openTrades = calculationData
      ? calculationData.openTrades
      : state.openTrades
    const openTradesMatched = openTrades.filter(
      openTrade => openTrade.symbol === currencyPair.symbol
    )
    const leverage = calculationData
      ? calculationData.leverage
      : state.leverage[state.broker]
    const total = openTradesMatched.reduce((sum, openTrade) => {
      const tradingSize = calculationData
        ? calculationData.tradingUnit * openTrade.lot
        : state.tradingUnit[state.broker] * openTrade.lot

      if (quoteCurrency === 'JPY') {
        const result = (tradingSize * currencyPair.assumedPrice) / leverage
        return sum + result
      } else {
        const result =
          (tradingSize * currencyPair.assumedPrice * usdJpy.assumedPrice) /
          leverage
        return sum + result
      }
    }, 0)

    return Math.round(total)
  },

  floatingPlTotal: (state, getters) => (calculationData = null) => {
    const currencyPairs = calculationData
      ? calculationData.currencyPairs
      : state.currencyPairs

    return (currencyPairs || [])
      .map(currencyPair => currencyPair.currencies)
      .reduce((sum, currencies) => {
        const result = getters.floatingPl(
          currencies[0],
          currencies[1],
          calculationData
        )
        return sum + result
      }, 0)
  },
  floatingPl: state => (baseCurrency, quoteCurrency, calculationData) => {
    const currencyPairs = calculationData
      ? calculationData.currencyPairs
      : state.currencyPairs
    const currencyPair = currencyPairs.find(
      currencyPair => currencyPair.symbol === `${baseCurrency}/${quoteCurrency}`
    )
    const openTrades = calculationData
      ? calculationData.openTrades
      : state.openTrades
    const openTradesMatched = openTrades.filter(
      openTrade => openTrade.symbol === currencyPair.symbol
    )
    const total = openTradesMatched.reduce((sum, openTrade) => {
      const gap = currencyPair.assumedPrice - openTrade.openPrice
      const tradingSize = calculationData
        ? calculationData.tradingUnit * openTrade.lot
        : state.tradingUnit[state.broker] * openTrade.lot

      if (quoteCurrency === 'JPY') {
        const resultBuy = gap * tradingSize
        const resultSell = -gap * tradingSize

        if (openTrade.action === '買') {
          return sum + resultBuy
        } else {
          return sum + resultSell
        }
      } else {
        const usdJpy = state.currencyPairs.find(
          currencyPair => currencyPair.symbol === 'USD/JPY'
        )
        const resultBuy = gap * tradingSize * usdJpy.assumedPrice
        const resultSell = -gap * tradingSize * usdJpy.assumedPrice

        if (openTrade.action === '買') {
          return sum + resultBuy
        } else {
          return sum + resultSell
        }
      }
    }, 0)

    return Math.round(total)
  },

  floatingPipsTotal: (state, getters) => (calculationData = null) => {
    const currencyPairs = calculationData
      ? calculationData.currencyPairs
      : state.currencyPairs

    return (currencyPairs || [])
      .map(currencyPair => currencyPair.currencies)
      .reduce((sum, currencies) => {
        const result = getters.floatingPips(
          currencies[0],
          currencies[1],
          calculationData
        )
        return sum + result
      }, 0)
  },
  floatingPips: state => (baseCurrency, quoteCurrency, calculationData) => {
    const currencyPairs = calculationData
      ? calculationData.currencyPairs
      : state.currencyPairs
    const currencyPair = currencyPairs.find(
      currencyPair => currencyPair.symbol === `${baseCurrency}/${quoteCurrency}`
    )
    const openTrades = calculationData
      ? calculationData.openTrades
      : state.openTrades
    const openTradesMatched = openTrades.filter(
      openTrade => openTrade.symbol === currencyPair.symbol
    )
    const total = openTradesMatched.reduce((sum, openTrade) => {
      const gap = currencyPair.assumedPrice - openTrade.openPrice

      if (quoteCurrency === 'JPY') {
        const resultBuy = gap * 100
        const resultSell = -gap * 100

        if (openTrade.action === '買') {
          return sum + resultBuy
        } else {
          return sum + resultSell
        }
      } else {
        const resultBuy = gap * 10000
        const resultSell = -gap * 10000

        if (openTrade.action === '買') {
          return sum + resultBuy
        } else {
          return sum + resultSell
        }
      }
    }, 0)

    return Math.round(total * 10) / 10
  },

  marginLevel: (state, getters) => (calculationData = null) => {
    const openTrades = calculationData
      ? calculationData.openTrades
      : state.openTrades

    if ((openTrades || []).length) {
      return (
        Math.round(
          ((getters.equity(calculationData) /
            getters.marginTotal(calculationData)) |
            0) *
            10000
        ) / 100
      )
    } else {
      return 0
    }
  }
}

export const mutations = {
  disableLoading(state) {
    state.isLoading = false
  },
  enableLoggedIn(state, user) {
    state.isLoggedIn = true
    const { uid, displayName, photoURL } = user
    state.user = { uid, displayName, photoURL }
  },
  disableLoggedIn(state) {
    state.isLoggedIn = false
  },
  setCalculations(state, calculations) {
    state.calculations = calculations
  },
  setCalculation(state, calculation) {
    state.calculation = calculation
  },

  showModal(state, currentModal) {
    state.showsModal = true
    state.currentModal = currentModal
  },
  hideModal(state) {
    state.showsModal = false
    state.currentModal = ''
    state.editsOpenTrade = false
  },

  showDropdown(state) {
    state.showsDropdown = true
  },
  hideDropdown(state) {
    state.showsDropdown = false
  },

  showFlashMessage(state, payload) {
    state.showsFlashMessage = true
    state.currentFlashMessage = payload.currentFlashMessage
    state.flashMessageType = payload.flashMessageType
  },
  hideFlashMessage(state) {
    state.showsFlashMessage = false
    state.currentModal = ''
    state.flashMessageType = ''
  },

  updateTitle(state, title) {
    state.title = title
  },
  updateBalance(state, balance) {
    state.balance = balance
  },
  updateTargetMarginLevel(state, targetMarginLevel) {
    state.targetMarginLevel = targetMarginLevel
  },
  updateBroker(state, broker) {
    state.broker = broker
  },
  updateTradingUnit(state, tradingUnit) {
    state.tradingUnit[state.broker] = tradingUnit
  },
  updateLeverage(state, leverage) {
    state.leverage[state.broker] = leverage
  },
  updateAssumedPrice(state, payload) {
    state.currencyPairs.find(
      currencyPair =>
        currencyPair.currencies[0] === payload.baseCurrency &&
        currencyPair.currencies[1] === payload.quoteCurrency
    ).assumedPrice = payload.assumedPrice
  },
  setCurrentPrice(state, payload) {
    const currencyPair = state.currencyPairs.find(
      currencyPair =>
        currencyPair.currencies[0] === payload.baseCurrency &&
        currencyPair.currencies[1] === payload.quoteCurrency
    )
    currencyPair.assumedPrice = currencyPair.currentPrice
  },
  getCurrentPrice(state, payload) {
    const currencyPair = state.currencyPairs.find(
      currencyPair =>
        currencyPair.currencies[0] === payload.baseCurrency &&
        currencyPair.currencies[1] === payload.quoteCurrency
    )
    if (payload.quoteCurrency === 'JPY') {
      const result = Math.round((1 / payload.currentPrice) * 1000) / 1000
      currencyPair.currentPrice = result
      currencyPair.assumedPrice = result

      if (payload.baseCurrency === 'USD') {
        state.openTradeDefault.openPrice = result
        state.openTradeEdited.openPrice = result
      }
    } else {
      const result = Math.round((1 / payload.currentPrice) * 100000) / 100000
      currencyPair.currentPrice = result
      currencyPair.assumedPrice = result
    }
  },

  enableEditOpenTrade(state) {
    state.editsOpenTrade = true
  },
  disableEditOpenTrade(state) {
    state.editsOpenTrade = false
  },
  setOpenTradeDefault(state) {
    state.openTradeEdited = { ...state.openTradeDefault }
  },
  setOpenTradeEdited(state, openTrade) {
    state.openTradeEdited = { ...openTrade }
  },
  updateOpenTradeEdited(state, payload) {
    state.openTradeEdited[payload.option] = payload.value
  },
  createOpenTrade(state) {
    state.openTrades.push({ ...state.openTradeEdited })
  },
  updateOpenTrade(state) {
    const index = state.openTrades.findIndex(
      openTrade => openTrade.id === state.openTradeEdited.id
    )
    state.openTrades.splice(index, 1, { ...state.openTradeEdited })
  },
  deleteOpenTrade(state, index) {
    state.openTrades.splice(index, 1)
  },

  updateMyfxbook(state, payload) {
    state.myfxbook[payload.option] = payload.value
  },
  getOpenTrades(state, openTrades) {
    state.openTrades = []
    openTrades.forEach(openTrade => {
      const max = Math.max(...state.openTrades.map(openTrade => openTrade.id))
      state.openTrades.push({
        id: isFinite(max) ? max + 1 : 1,
        symbol: `${openTrade.symbol.substr(0, 3)}/${openTrade.symbol.substr(
          3,
          3
        )}`,
        action: openTrade.action === 'Buy' ? '買' : '売',
        lot: Number(openTrade.sizing.value),
        openPrice: openTrade.openPrice
      })
    })
  },

  enableEditCalculation(state, id) {
    state.calculationEdited = id
  },
  setCalculationEdited(state, calculation) {
    state.title = calculation.title
    state.balance = calculation.balance
    state.targetMarginLevel = calculation.targetMarginLevel
    state.broker = calculation.broker
    state.tradingUnit[state.broker] = calculation.tradingUnit
    state.leverage[state.broker] = calculation.leverage
    calculation.currencyPairs.forEach(savedCurrencyPair => {
      const currencyPair = state.currencyPairs.find(
        storeCurrencyPair =>
          storeCurrencyPair.symbol === savedCurrencyPair.symbol
      )
      currencyPair.assumedPrice = savedCurrencyPair.assumedPrice
    })
    state.openTrades = calculation.openTrades
  },
  deleteCalculation(state, index) {
    state.calculations.splice(index, 1)
  }
}

export const actions = {
  checkAuthentication({ commit }) {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        commit('disableLoading')
        if (user) {
          commit('enableLoggedIn', user)
          resolve()
        } else {
          commit('disableLoggedIn')
        }
      })
    })
  },
  redirectTopWithFlashMessage({ commit }) {
    commit('showFlashMessage', {
      currentFlashMessage: 'FlashMessageRedirectTop',
      flashMessageType: 'danger'
    })
    setTimeout(() => {
      commit('hideFlashMessage')
    }, 3000)
  },
  async getCalculations({ dispatch, state, commit }) {
    await dispatch('checkAuthentication')
    const docRef = firestore
      .collection('calculations')
      .where('uid', '==', state.user.uid)
      .orderBy('createdAt', 'desc')
    docRef.get().then(querySnapshot => {
      const calculations = []
      querySnapshot.forEach(doc => {
        calculations.push(doc.data())
      })
      commit('setCalculations', calculations)
    })
  },
  async getCalculation({ dispatch, commit }, id) {
    await dispatch('checkAuthentication')
    const docRef = firestore.collection('calculations').doc(id)
    docRef.get().then(doc => {
      commit('setCalculation', doc.data())
    })
  },

  async twitterLogin({ commit }) {
    await firebase
      .auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
    commit('hideDropdown')
  },
  async logout({ commit }) {
    await firebase.auth().signOut()
    commit('hideDropdown')
  },
  async twitterLoginWithFlashMessage({ dispatch, commit }) {
    await dispatch('twitterLogin')
    commit('showFlashMessage', {
      currentFlashMessage: 'FlashMessageLoggedIn',
      flashMessageType: 'success'
    })
    setTimeout(() => {
      commit('hideFlashMessage')
    }, 3000)
  },
  async logoutWithFlashMessage({ dispatch, commit }) {
    await dispatch('logout')
    commit('showFlashMessage', {
      currentFlashMessage: 'FlashMessageLoggedOut',
      flashMessageType: 'success'
    })
    setTimeout(() => {
      commit('hideFlashMessage')
    }, 3000)
  },

  createCalculation({ state }) {
    const generateUuid = () => {
      let characters = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('')
      characters = characters.map(character => {
        if (character === 'x') {
          return Math.floor(Math.random() * 16).toString(16)
        } else if (character === 'y') {
          return (Math.floor(Math.random() * 4) + 8).toString(16)
        } else {
          return character
        }
      })

      return characters.join('')
    }
    const uuid = generateUuid()

    firestore
      .collection('calculations')
      .doc(uuid)
      .set({
        id: uuid,
        uid: state.user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),

        title: state.title,
        balance: state.balance,
        targetMarginLevel: state.targetMarginLevel,
        broker: state.broker,
        tradingUnit: state.tradingUnit[state.broker],
        leverage: state.leverage[state.broker],
        currencyPairs: state.currencyPairs.map(currencyPair => {
          const { symbol, currencies, assumedPrice } = currencyPair
          return { symbol, currencies, assumedPrice }
        }),
        openTrades: state.openTrades
      })
  },
  createCalculationWithFlashMessage({ dispatch, commit }) {
    dispatch('createCalculation')
    commit('showFlashMessage', {
      currentFlashMessage: 'FlashMessageCreateCalculation',
      flashMessageType: 'success'
    })
    setTimeout(() => {
      commit('hideFlashMessage')
    }, 3000)
  },
  deleteCalculation({ state, commit }, id) {
    firestore
      .collection('calculations')
      .doc(id)
      .delete()
      .then(() => {
        const index = state.calculations.findIndex(
          calculation => calculation.id === id
        )
        commit('deleteCalculation', index)
      })
  },
  deleteCalculationWithFlashMessage({ dispatch, commit }, id) {
    dispatch('deleteCalculation', id)
    commit('showFlashMessage', {
      currentFlashMessage: 'FlashMessageDeleteCalculation',
      flashMessageType: 'success'
    })
    setTimeout(() => {
      commit('hideFlashMessage')
    }, 3000)
  }
}
