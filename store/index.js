const currencyPairs = [
  {
    symbol: 'USD/JPY',
    currencies: ['USD', 'JPY'],
    emoji: '&#x1f1ef;&#x1f1f5;',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.001
  },
  {
    symbol: 'EUR/USD',
    currencies: ['EUR', 'USD'],
    emoji: '&#x1f1ea;&#x1f1fa;',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.00001
  },
  {
    symbol: 'GBP/USD',
    currencies: ['GBP', 'USD'],
    emoji: '&#x1f1ec;&#x1f1e7;',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.00001
  },
  {
    symbol: 'AUD/USD',
    currencies: ['AUD', 'USD'],
    emoji: '&#x1f1e6;&#x1f1fa;',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.00001
  },
  {
    symbol: 'EUR/JPY',
    currencies: ['EUR', 'JPY'],
    emoji: '&#x1f1ea;&#x1f1fa;',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.001
  },
  {
    symbol: 'GBP/JPY',
    currencies: ['GBP', 'JPY'],
    emoji: '&#x1f1ec;&#x1f1e7;',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.001
  },
  {
    symbol: 'AUD/JPY',
    currencies: ['AUD', 'JPY'],
    emoji: '&#x1f1e6;&#x1f1fa;',
    currentPrice: 0,
    assumedPrice: 0,
    step: 0.001
  }
]

export const state = () => ({
  showsModal: false,
  currentModal: '',

  title: '無題',
  currencyPairs,
  openTrades: [
    {
      id: 1,
      symbol: 'USD/JPY',
      action: '買',
      lot: 0.02,
      openPrice: 108.598
    },
    {
      id: 2,
      symbol: 'USD/JPY',
      action: '売',
      lot: 0.02,
      openPrice: 108.598
    },
    {
      id: 3,
      symbol: 'EUR/USD',
      action: '売',
      lot: 0.02,
      openPrice: 1.21
    }
  ],
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
    password: '',
    session: '',
    accountNumber: ''
  }
})

export const getters = {
  equity(state, getters) {
    return state.balance + getters.floatingPlTotal
  },
  freeMargin(state, getters) {
    return getters.equity - getters.marginTotal
  },

  marginTotal(state, getters) {
    return state.currencyPairs
      .map(currencyPair => currencyPair.currencies)
      .reduce((sum, currencies) => {
        const result = getters.margin(currencies[0], currencies[1])
        return sum + result
      }, 0)
  },
  margin: state => (baseCurrency, quoteCurrency) => {
    const currencyPair = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === `${baseCurrency}/${quoteCurrency}`
    )
    const usdJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'USD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === currencyPair.symbol
    )
    const leverage = state.leverage[state.broker]
    const total = openTrades.reduce((sum, openTrade) => {
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot

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

  floatingPlTotal(state, getters) {
    return state.currencyPairs
      .map(currencyPair => currencyPair.currencies)
      .reduce((sum, currencies) => {
        const result = getters.floatingPl(currencies[0], currencies[1])
        return sum + result
      }, 0)
  },
  floatingPl: state => (baseCurrency, quoteCurrency) => {
    const currencyPair = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === `${baseCurrency}/${quoteCurrency}`
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === currencyPair.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = currencyPair.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot

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

  floatingPipsTotal(state, getters) {
    return state.currencyPairs
      .map(currencyPair => currencyPair.currencies)
      .reduce((sum, currencies) => {
        const result = getters.floatingPips(currencies[0], currencies[1])
        return sum + result
      }, 0)
  },
  floatingPips: state => (baseCurrency, quoteCurrency) => {
    const currencyPair = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === `${baseCurrency}/${quoteCurrency}`
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === currencyPair.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
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

  marginLevel(state, getters) {
    if (state.openTrades.length) {
      return Math.round((getters.equity / getters.marginTotal) * 10000) / 100
    } else {
      return 0
    }
  }
}

export const mutations = {
  showModal(state, currentModal) {
    state.showsModal = true
    state.currentModal = currentModal
  },
  hideModal(state) {
    state.showsModal = false
    state.currentModal = ''
    state.editsOpenTrade = false
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
  saveOpenTrade(state) {
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
        lot: openTrade.sizing.value,
        openPrice: openTrade.openPrice
      })
    })
  }
}
