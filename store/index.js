const currencyPairs = [
  {
    symbol: 'USD/JPY',
    pair: ['USD', 'JPY'],
    currentPrice: 0,
    assumedPrice: 0
  },
  {
    symbol: 'EUR/USD',
    pair: ['EUR', 'USD'],
    currentPrice: 0,
    assumedPrice: 0
  },
  {
    symbol: 'GBP/USD',
    pair: ['GBP', 'USD'],
    currentPrice: 0,
    assumedPrice: 0
  },
  {
    symbol: 'AUD/USD',
    pair: ['AUD', 'USD'],
    currentPrice: 0,
    assumedPrice: 0
  },
  {
    symbol: 'EUR/JPY',
    pair: ['EUR', 'JPY'],
    currentPrice: 0,
    assumedPrice: 0
  },
  {
    symbol: 'GBP/JPY',
    pair: ['GBP', 'JPY'],
    currentPrice: 0,
    assumedPrice: 0
  },
  {
    symbol: 'AUD/JPY',
    pair: ['AUD', 'JPY'],
    currentPrice: 0,
    assumedPrice: 0
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
    return state.balance + getters.floatingPl
  },
  freeMargin(state, getters) {
    return getters.equity - getters.margin
  },

  margin(state, getters) {
    return (
      getters.marginUsdJpy +
      getters.marginEurUsd +
      getters.marginGbpUsd +
      getters.marginAudUsd +
      getters.marginEurJpy +
      getters.marginGbpJpy +
      getters.marginAudJpy
    )
  },
  marginUsdJpy(state) {
    const usdJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'USD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === usdJpy.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]
      const result = (tradingSize * usdJpy.assumedPrice) / leverage

      return sum + result
    }, 0)

    return Math.round(total)
  },
  marginEurUsd(state) {
    const eurUsd = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'EUR/USD'
    )
    const usdJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'USD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === eurUsd.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]
      const result =
        (tradingSize * eurUsd.assumedPrice * usdJpy.assumedPrice) / leverage

      return sum + result
    }, 0)

    return Math.round(total)
  },
  marginGbpUsd(state) {
    const gbpUsd = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'GBP/USD'
    )
    const usdJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'USD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === gbpUsd.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]
      const result =
        (tradingSize * gbpUsd.assumedPrice * usdJpy.assumedPrice) / leverage

      return sum + result
    }, 0)

    return Math.round(total)
  },
  marginAudUsd(state) {
    const audUsd = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'AUD/USD'
    )
    const usdJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'USD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === audUsd.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]
      const result =
        (tradingSize * audUsd.assumedPrice * usdJpy.assumedPrice) / leverage

      return sum + result
    }, 0)

    return Math.round(total)
  },
  marginEurJpy(state) {
    const eurJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'EUR/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === eurJpy.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]
      const result = (tradingSize * eurJpy.assumedPrice) / leverage

      return sum + result
    }, 0)

    return Math.round(total)
  },
  marginGbpJpy(state) {
    const gbpJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'GBP/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === gbpJpy.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]
      const result = (tradingSize * gbpJpy.assumedPrice) / leverage

      return sum + result
    }, 0)

    return Math.round(total)
  },
  marginAudJpy(state) {
    const audJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'AUD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === audJpy.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]
      const result = (tradingSize * audJpy.assumedPrice) / leverage

      return sum + result
    }, 0)

    return Math.round(total)
  },

  floatingPl(state, getters) {
    return (
      getters.floatingPlUsdJpy +
      getters.floatingPlEurUsd +
      getters.floatingPlGbpUsd +
      getters.floatingPlAudUsd +
      getters.floatingPlEurJpy +
      getters.floatingPlGbpJpy +
      getters.floatingPlAudJpy
    )
  },
  floatingPlUsdJpy(state) {
    const usdJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'USD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === usdJpy.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = usdJpy.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const resultBuy = gap * tradingSize
      const resultSell = -gap * tradingSize

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total)
  },
  floatingPlEurUsd(state) {
    const eurUsd = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'EUR/USD'
    )
    const usdJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'USD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === eurUsd.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = eurUsd.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const resultBuy = gap * tradingSize * usdJpy.assumedPrice
      const resultSell = -gap * tradingSize * usdJpy.assumedPrice

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total)
  },
  floatingPlGbpUsd(state) {
    const gbpUsd = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'GBP/USD'
    )
    const usdJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'USD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === gbpUsd.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = gbpUsd.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const resultBuy = gap * tradingSize * usdJpy.assumedPrice
      const resultSell = -gap * tradingSize * usdJpy.assumedPrice

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total)
  },
  floatingPlAudUsd(state) {
    const audUsd = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'AUD/USD'
    )
    const usdJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'USD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === audUsd.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = audUsd.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const resultBuy = gap * tradingSize * usdJpy.assumedPrice
      const resultSell = -gap * tradingSize * usdJpy.assumedPrice

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total)
  },
  floatingPlEurJpy(state) {
    const eurJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'EUR/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === eurJpy.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = eurJpy.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const resultBuy = gap * tradingSize
      const resultSell = -gap * tradingSize

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total)
  },
  floatingPlGbpJpy(state) {
    const gbpJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'GBP/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === gbpJpy.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = gbpJpy.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const resultBuy = gap * tradingSize
      const resultSell = -gap * tradingSize

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total)
  },
  floatingPlAudJpy(state) {
    const audJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'AUD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === audJpy.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = audJpy.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const resultBuy = gap * tradingSize
      const resultSell = -gap * tradingSize

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total)
  },

  floatingPips(state, getters) {
    return (
      getters.floatingPipsUsdJpy +
      getters.floatingPipsEurUsd +
      getters.floatingPipsGbpUsd +
      getters.floatingPipsAudUsd +
      getters.floatingPipsEurJpy +
      getters.floatingPipsGbpJpy +
      getters.floatingPipsAudJpy
    )
  },
  floatingPipsUsdJpy(state) {
    const usdJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'USD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === usdJpy.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = usdJpy.assumedPrice - openTrade.openPrice
      const resultBuy = gap * 100
      const resultSell = -gap * 100

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total * 10) / 10
  },
  floatingPipsEurUsd(state) {
    const eurUsd = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'EUR/USD'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === eurUsd.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = eurUsd.assumedPrice - openTrade.openPrice
      const resultBuy = gap * 10000
      const resultSell = -gap * 10000

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total * 10) / 10
  },
  floatingPipsGbpUsd(state) {
    const gbpUsd = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'GBP/USD'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === gbpUsd.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = gbpUsd.assumedPrice - openTrade.openPrice
      const resultBuy = gap * 10000
      const resultSell = -gap * 10000

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total * 10) / 10
  },
  floatingPipsAudUsd(state) {
    const audUsd = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'AUD/USD'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === audUsd.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = audUsd.assumedPrice - openTrade.openPrice
      const resultBuy = gap * 10000
      const resultSell = -gap * 10000

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total * 10) / 10
  },
  floatingPipsEurJpy(state) {
    const eurJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'EUR/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === eurJpy.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = eurJpy.assumedPrice - openTrade.openPrice
      const resultBuy = gap * 100
      const resultSell = -gap * 100

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total * 10) / 10
  },
  floatingPipsGbpJpy(state) {
    const gbpJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'GBP/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === gbpJpy.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = gbpJpy.assumedPrice - openTrade.openPrice
      const resultBuy = gap * 100
      const resultSell = -gap * 100

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total * 10) / 10
  },
  floatingPipsAudJpy(state) {
    const audJpy = state.currencyPairs.find(
      currencyPair => currencyPair.symbol === 'AUD/JPY'
    )
    const openTrades = state.openTrades.filter(
      openTrade => openTrade.symbol === audJpy.symbol
    )
    const total = openTrades.reduce((sum, openTrade) => {
      const gap = audJpy.assumedPrice - openTrade.openPrice
      const resultBuy = gap * 100
      const resultSell = -gap * 100

      if (openTrade.action === '買') {
        return sum + resultBuy
      } else {
        return sum + resultSell
      }
    }, 0)

    return Math.round(total * 10) / 10
  },

  marginLevel(state, getters) {
    if (state.openTrades.length) {
      return Math.round((getters.equity / getters.margin) * 10000) / 100
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
    const result = Math.round(currentPriceUsdJpy * 1000) / 1000
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
