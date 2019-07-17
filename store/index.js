import firebase, { firebaseAuth, firestore } from '@/plugins/firebase'

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
  isLoadingAuthentication: true,
  isLoggedIn: false,
  user: {},

  isLoadingCalculation: true,
  calculations: [],
  calculation: {},

  showsDropdown: false,

  showsModal: false,
  currentModal: '',

  showsFlashMessage: false,
  currentFlashMessage: '',
  flashMessagetType: '',

  showsTooltip: false,
  currentTooltip: '',

  showsHamburgerNavigation: false,

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
    symbol: '',
    action: '',
    lot: 0,
    openPrice: 0
  },

  myfxbook: {
    email: '',
    session: '',
    accountNumber: ''
  },

  editsCalculation: false,
  calculationDefault: {
    title: '無題',
    balance: 200000,
    targetMarginLevel: 1000,
    broker: 'international',
    tradingUnit: 100000,
    leverage: 1000,
    currencyPairs: [],
    openTrades: []
  },
  calculationEdited: {
    id: '',
    title: '',
    balance: 0,
    targetMarginLevel: 0,
    broker: '',
    tradingUnit: 0,
    leverage: 0,
    currencyPairs: [],
    openTrades: []
  }
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

  floatingPipTotal: (state, getters) => (calculationData = null) => {
    const currencyPairs = calculationData
      ? calculationData.currencyPairs
      : state.currencyPairs

    return (currencyPairs || [])
      .map(currencyPair => currencyPair.currencies)
      .reduce((sum, currencies) => {
        const result = getters.floatingPip(
          currencies[0],
          currencies[1],
          calculationData
        )
        return sum + result
      }, 0)
  },
  floatingPip: state => (baseCurrency, quoteCurrency, calculationData) => {
    const currencyPairs = calculationData
      ? calculationData.currencyPairs
      : state.currencyPairs
    const currencyPair = (currencyPairs || []).find(
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
  },
  balanceGap: (state, getters) => (calculationData = null) => {
    const targetMarginLevel = calculationData
      ? calculationData.targetMarginLevel
      : state.targetMarginLevel
    return Math.round(
      (targetMarginLevel * getters.marginTotal(calculationData)) / 100 -
        getters.equity(calculationData)
    )
  }
}

export const mutations = {
  disableLoadingAuthentication(state) {
    state.isLoadingAuthentication = false
  },
  enableLoggedIn(state, user) {
    state.isLoggedIn = true
    const { uid, displayName, photoURL } = user
    state.user = { uid, displayName, photoURL }
  },
  disableLoggedIn(state) {
    state.isLoggedIn = false
  },
  enableLoadingCalculation(state) {
    state.isLoadingCalculation = true
  },
  disableLoadingCalculation(state) {
    state.isLoadingCalculation = false
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
    state.currentFlashMessage = ''
    state.flashMessageType = ''
  },

  showTooltip(state, currentTooltip) {
    state.showsTooltip = true
    state.currentTooltip = currentTooltip
  },
  hideTooltip(state) {
    state.showsTooltip = false
    state.currentTooltip = ''
  },

  toggleHamburgerNavigation(state) {
    state.showsHamburgerNavigation = !state.showsHamburgerNavigation
  },
  hideHamburgerNavigation(state) {
    state.showsHamburgerNavigation = false
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

  enableEditCalculation(state) {
    state.editsCalculation = true
  },
  disableEditCalculation(state) {
    state.editsCalculation = false
  },
  setCalculationDefault(state) {
    const calculationDefault = state.calculationDefault
    state.id = ''
    state.title = calculationDefault.title
    state.balance = calculationDefault.balance
    state.targetMarginLevel = calculationDefault.targetMarginLevel
    state.broker = calculationDefault.broker
    state.tradingUnit[state.broker] = calculationDefault.tradingUnit
    state.leverage[state.broker] = calculationDefault.leverage
    calculationDefault.currencyPairs.forEach(savedCurrencyPair => {
      const currencyPair = state.currencyPairs.find(
        storeCurrencyPair =>
          storeCurrencyPair.symbol === savedCurrencyPair.symbol
      )
      currencyPair.assumedPrice = savedCurrencyPair.assumedPrice
    })
    state.openTrades = [...calculationDefault.openTrades]
  },
  setCalculationEdited(state, calculation) {
    const calculationEdited = state.calculationEdited
    calculationEdited.id = calculation.id
    calculationEdited.title = calculation.title
    calculationEdited.balance = calculation.balance
    calculationEdited.targetMarginLevel = calculation.targetMarginLevel
    calculationEdited.broker = calculation.broker
    calculationEdited.tradingUnit = calculation.tradingUnit
    calculationEdited.leverage = calculation.leverage
    calculationEdited.currencyPairs = calculation.currencyPairs
    calculationEdited.openTrades = [...calculation.openTrades]
  },
  getCalculationEdited(state) {
    const calculationEdited = state.calculationEdited
    state.title = calculationEdited.title
    state.balance = calculationEdited.balance
    state.targetMarginLevel = calculationEdited.targetMarginLevel
    state.broker = calculationEdited.broker
    state.tradingUnit[state.broker] = calculationEdited.tradingUnit
    state.leverage[state.broker] = calculationEdited.leverage
    calculationEdited.currencyPairs.forEach(savedCurrencyPair => {
      const currencyPair = state.currencyPairs.find(
        storeCurrencyPair =>
          storeCurrencyPair.symbol === savedCurrencyPair.symbol
      )
      currencyPair.assumedPrice = savedCurrencyPair.assumedPrice
    })
    state.openTrades = [...calculationEdited.openTrades]
  },
  deleteCalculation(state, index) {
    state.calculations.splice(index, 1)
  }
}

export const actions = {
  showFlashMessage({ commit }, payload) {
    commit('showFlashMessage', {
      currentFlashMessage: payload.currentFlashMessage,
      flashMessageType: payload.flashMessageType
    })
    setTimeout(() => {
      commit('hideFlashMessage')
    }, 5000)
  },

  checkAuthentication({ commit }) {
    return new Promise(resolve => {
      firebaseAuth.onAuthStateChanged(user => {
        commit('disableLoadingAuthentication')
        if (user) {
          commit('enableLoggedIn', user)
          resolve()
        } else {
          commit('disableLoggedIn')
        }
      })
    })
  },
  redirectTopWithFlashMessage({ dispatch }) {
    dispatch('showFlashMessage', {
      currentFlashMessage: 'FlashMessageRedirectTop',
      flashMessageType: 'danger'
    })
  },
  getCalculations({ dispatch, state, commit }) {
    return new Promise(async resolve => {
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
        commit('disableLoadingCalculation')
        resolve()
      })
    })
  },
  async getCalculation({ dispatch, commit }, id) {
    await dispatch('checkAuthentication')
    const docRef = firestore.collection('calculations').doc(id)
    docRef.get().then(doc => {
      commit('setCalculation', doc.data())
      commit('disableLoadingCalculation')
    })
  },

  async twitterLogin({ commit }) {
    await firebaseAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
    commit('hideDropdown')
  },
  async logout({ commit }) {
    await firebaseAuth.signOut()
    commit('hideDropdown')
  },
  async twitterLoginWithFlashMessage({ dispatch, commit }) {
    await dispatch('twitterLogin')
    dispatch('showFlashMessage', {
      currentFlashMessage: 'FlashMessageLoggedIn',
      flashMessageType: 'success'
    })
  },
  async logoutWithFlashMessage({ dispatch, commit }) {
    await dispatch('logout')
    dispatch('showFlashMessage', {
      currentFlashMessage: 'FlashMessageLoggedOut',
      flashMessageType: 'success'
    })
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
  createCalculationWithFlashMessage({ state, dispatch, commit }) {
    const docRef = firestore
      .collection('calculations')
      .where('uid', '==', state.user.uid)
      .orderBy('createdAt', 'desc')
    docRef.get().then(querySnapshot => {
      const savedCalculationLength = querySnapshot.size
      if (savedCalculationLength < 15) {
        dispatch('createCalculation')
        dispatch('showFlashMessage', {
          currentFlashMessage: 'FlashMessageCreateCalculation',
          flashMessageType: 'success'
        })
      } else {
        dispatch('showFlashMessage', {
          currentFlashMessage: 'FlashMessageCannotCreateCalculation',
          flashMessageType: 'danger'
        })
      }
    })
  },
  updateCalculation({ state }) {
    firestore
      .collection('calculations')
      .doc(state.calculationEdited.id)
      .update({
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),

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
  updateCalculationWithFlashMessage({ dispatch, commit }) {
    dispatch('updateCalculation')
    dispatch('showFlashMessage', {
      currentFlashMessage: 'FlashMessageUpdateCalculation',
      flashMessageType: 'success'
    })
  },
  deleteCalculation({ state }, id) {
    return new Promise(resolve => {
      firestore
        .collection('calculations')
        .doc(id)
        .delete()
        .then(() => {
          resolve()
        })
    })
  },
  deleteCalculationWithFlashMessage({ dispatch, commit }, id) {
    return new Promise(async resolve => {
      await dispatch('deleteCalculation', id)
      dispatch('showFlashMessage', {
        currentFlashMessage: 'FlashMessageDeleteCalculation',
        flashMessageType: 'success'
      })
      resolve()
    })
  },
  resetCalculationWithFlashMessage({ state, commit, dispatch }) {
    if (state.editsCalculation) {
      commit('getCalculationEdited')
    } else {
      commit('setCalculationDefault')
    }
    dispatch('showFlashMessage', {
      currentFlashMessage: 'FlashMessageResetCalculation',
      flashMessageType: 'success'
    })
  },
  newCalculationWithFlashMessage({ commit, dispatch }) {
    commit('disableEditCalculation')
    commit('setCalculationDefault')
    dispatch('showFlashMessage', {
      currentFlashMessage: 'FlashMessageNewCalculation',
      flashMessageType: 'info'
    })
  }
}
