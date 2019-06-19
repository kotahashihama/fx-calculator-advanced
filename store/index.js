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
  title: '無題',
  currencyPairs,
  openTrades: [
    {
      symbol: 'USD/JPY',
      action: '買',
      lot: 0.02,
      openPrice: 108.598
    },
    {
      symbol: 'USD/JPY',
      action: '売',
      lot: 0.02,
      openPrice: 108.598
    },
    {
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

  updateAssumedPriceUsdJpy(state, assumedPriceUsdJpy) {
    state.currencyPairs[0].assumedPrice = assumedPriceUsdJpy
  },
  updateAssumedPriceEurUsd(state, assumedPriceEurUsd) {
    state.currencyPairs[1].assumedPrice = assumedPriceEurUsd
  },
  updateAssumedPriceGbpUsd(state, assumedPriceGbpUsd) {
    state.currencyPairs[2].assumedPrice = assumedPriceGbpUsd
  },
  updateAssumedPriceAudUsd(state, assumedPriceAudUsd) {
    state.currencyPairs[3].assumedPrice = assumedPriceAudUsd
  },
  updateAssumedPriceEurJpy(state, assumedPriceEurJpy) {
    state.currencyPairs[4].assumedPrice = assumedPriceEurJpy
  },
  updateAssumedPriceGbpJpy(state, assumedPriceGbpJpy) {
    state.currencyPairs[5].assumedPrice = assumedPriceGbpJpy
  },
  updateAssumedPriceAudJpy(state, assumedPriceAudJpy) {
    state.currencyPairs[6].assumedPrice = assumedPriceAudJpy
  },

  setCurrentPriceUsdJpy(state) {
    state.currencyPairs[0].assumedPrice = state.currencyPairs[0].currentPrice
  },
  setCurrentPriceEurUsd(state) {
    state.currencyPairs[1].assumedPrice = state.currencyPairs[1].currentPrice
  },
  setCurrentPriceGbpUsd(state) {
    state.currencyPairs[2].assumedPrice = state.currencyPairs[2].currentPrice
  },
  setCurrentPriceAudUsd(state) {
    state.currencyPairs[3].assumedPrice = state.currencyPairs[3].currentPrice
  },
  setCurrentPriceEurJpy(state) {
    state.currencyPairs[4].assumedPrice = state.currencyPairs[4].currentPrice
  },
  setCurrentPriceGbpJpy(state) {
    state.currencyPairs[5].assumedPrice = state.currencyPairs[5].currentPrice
  },
  setCurrentPriceAudJpy(state) {
    state.currencyPairs[6].assumedPrice = state.currencyPairs[6].currentPrice
  },

  getCurrentPriceUsdJpy(state, currentPriceUsdJpy) {
    const result = Math.round((1 / currentPriceUsdJpy) * 1000) / 1000
    state.currencyPairs[0].currentPrice = result
    state.currencyPairs[0].assumedPrice = result
  },
  getCurrentPriceEurUsd(state, currentPriceEurUsd) {
    const result = Math.round((1 / currentPriceEurUsd) * 100000) / 100000
    state.currencyPairs[1].currentPrice = result
    state.currencyPairs[1].assumedPrice = result
  },
  getCurrentPriceGbpUsd(state, currentPriceGbpUsd) {
    const result = Math.round((1 / currentPriceGbpUsd) * 100000) / 100000
    state.currencyPairs[2].currentPrice = result
    state.currencyPairs[2].assumedPrice = result
  },
  getCurrentPriceAudUsd(state, currentPriceAudUsd) {
    const result = Math.round((1 / currentPriceAudUsd) * 100000) / 100000
    state.currencyPairs[3].currentPrice = result
    state.currencyPairs[3].assumedPrice = result
  },
  getCurrentPriceEurJpy(state, currentPriceEurJpy) {
    const result = Math.round((1 / currentPriceEurJpy) * 1000) / 1000
    state.currencyPairs[4].currentPrice = result
    state.currencyPairs[4].assumedPrice = result
  },
  getCurrentPriceGbpJpy(state, currentPriceGbpJpy) {
    const result = Math.round((1 / currentPriceGbpJpy) * 1000) / 1000
    state.currencyPairs[5].currentPrice = result
    state.currencyPairs[5].assumedPrice = result
  },
  getCurrentPriceAudJpy(state, currentPriceAudJpy) {
    const result = Math.round((1 / currentPriceAudJpy) * 1000) / 1000
    state.currencyPairs[6].currentPrice = result
    state.currencyPairs[6].assumedPrice = result
  }
}
