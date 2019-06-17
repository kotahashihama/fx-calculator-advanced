const currencyPairs = {
  usd: {
    eur: {
      symbol: 'EUR/USD',
      currentPrice: 1,
      assumedPrice: 1.2
    },
    gbp: {
      symbol: 'GBP/USD',
      currentPrice: 3,
      assumedPrice: 0
    },
    aud: {
      symbol: 'AUD/USD',
      currentPrice: 5,
      assumedPrice: 0
    }
  },
  jpy: {
    usd: {
      symbol: 'USD/JPY',
      currentPrice: 7,
      assumedPrice: 110
    },
    eur: {
      symbol: 'EUR/JPY',
      currentPrice: 9,
      assumedPrice: 120
    },
    gbp: {
      symbol: 'GBP/JPY',
      currentPrice: 11,
      assumedPrice: 0
    },
    aud: {
      symbol: 'AUD/JPY',
      currentPrice: 13,
      assumedPrice: 0
    }
  }
}

export const state = () => ({
  title: '無題',
  currencyPairs,
  openTrades: [
    {
      symbol: 'USD/JPY',
      action: '売',
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
    let margin = 0
    const usdJpy = state.currencyPairs.jpy.usd
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === usdJpy.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]

      margin += (tradingSize * usdJpy.assumedPrice) / leverage
    }

    return Math.round(margin)
  },
  marginEurUsd(state) {
    let margin = 0
    const eurUsd = state.currencyPairs.usd.eur
    const usdJpy = state.currencyPairs.jpy.usd
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === eurUsd.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]

      margin +=
        (tradingSize * eurUsd.assumedPrice * usdJpy.assumedPrice) / leverage
    }

    return Math.round(margin)
  },
  marginGbpUsd(state) {
    let margin = 0
    const gbpUsd = state.currencyPairs.usd.gbp
    const usdJpy = state.currencyPairs.jpy.usd
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === gbpUsd.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]

      margin +=
        (tradingSize * gbpUsd.assumedPrice * usdJpy.assumedPrice) / leverage
    }

    return Math.round(margin)
  },
  marginAudUsd(state) {
    let margin = 0
    const audUsd = state.currencyPairs.usd.aud
    const usdJpy = state.currencyPairs.jpy.usd
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === audUsd.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]

      margin +=
        (tradingSize * audUsd.assumedPrice * usdJpy.assumedPrice) / leverage
    }

    return Math.round(margin)
  },
  marginEurJpy(state) {
    let margin = 0
    const eurJpy = state.currencyPairs.jpy.eur
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === eurJpy.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]

      margin += (tradingSize * eurJpy.assumedPrice) / leverage
    }

    return Math.round(margin)
  },
  marginGbpJpy(state) {
    let margin = 0
    const gbpJpy = state.currencyPairs.jpy.gbp
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === gbpJpy.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]

      margin += (tradingSize * gbpJpy.assumedPrice) / leverage
    }

    return Math.round(margin)
  },
  marginAudJpy(state) {
    let margin = 0
    const audJpy = state.currencyPairs.jpy.aud
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === audJpy.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot
      const leverage = state.leverage[state.broker]

      margin += (tradingSize * audJpy.assumedPrice) / leverage
    }

    return Math.round(margin)
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
    let floatingPl = 0
    const usdJpy = state.currencyPairs.jpy.usd
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === usdJpy.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = usdJpy.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot

      if (openTrade.action === '買') {
        floatingPl += gap * tradingSize
      } else {
        floatingPl += -gap * tradingSize
      }
    }

    return Math.round(floatingPl)
  },
  floatingPlEurUsd(state) {
    let floatingPl = 0
    const eurUsd = state.currencyPairs.usd.eur
    const usdJpy = state.currencyPairs.jpy.usd
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === eurUsd.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = eurUsd.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot

      if (openTrade.action === '買') {
        floatingPl = gap * tradingSize * usdJpy.assumedPrice
      } else {
        floatingPl += -gap * tradingSize * usdJpy.assumedPrice
      }
    }

    return Math.round(floatingPl)
  },
  floatingPlGbpUsd(state) {
    let floatingPl = 0
    const gbpUsd = state.currencyPairs.usd.gbp
    const usdJpy = state.currencyPairs.jpy.usd
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === gbpUsd.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = gbpUsd.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot

      if (openTrade.action === '買') {
        floatingPl = gap * tradingSize * usdJpy.assumedPrice
      } else {
        floatingPl += -gap * tradingSize * usdJpy.assumedPrice
      }
    }

    return Math.round(floatingPl)
  },
  floatingPlAudUsd(state) {
    let floatingPl = 0
    const audUsd = state.currencyPairs.usd.aud
    const usdJpy = state.currencyPairs.jpy.usd
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === audUsd.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = audUsd.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot

      if (openTrade.action === '買') {
        floatingPl = gap * tradingSize * usdJpy.assumedPrice
      } else {
        floatingPl += -gap * tradingSize * usdJpy.assumedPrice
      }
    }

    return Math.round(floatingPl)
  },
  floatingPlEurJpy(state) {
    let floatingPl = 0
    const eurJpy = state.currencyPairs.jpy.eur
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === eurJpy.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = eurJpy.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot

      if (openTrade.action === '買') {
        floatingPl += gap * tradingSize
      } else {
        floatingPl += -gap * tradingSize
      }
    }

    return Math.round(floatingPl)
  },
  floatingPlGbpJpy(state) {
    let floatingPl = 0
    const gbpJpy = state.currencyPairs.jpy.gbp
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === gbpJpy.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = gbpJpy.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot

      if (openTrade.action === '買') {
        floatingPl += gap * tradingSize
      } else {
        floatingPl += -gap * tradingSize
      }
    }

    return Math.round(floatingPl)
  },
  floatingPlAudJpy(state) {
    let floatingPl = 0
    const audJpy = state.currencyPairs.jpy.aud
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === audJpy.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = audJpy.assumedPrice - openTrade.openPrice
      const tradingSize = state.tradingUnit[state.broker] * openTrade.lot

      if (openTrade.action === '買') {
        floatingPl += gap * tradingSize
      } else {
        floatingPl += -gap * tradingSize
      }
    }

    return Math.round(floatingPl)
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
    let floatingPips = 0
    const usdJpy = state.currencyPairs.jpy.usd
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === usdJpy.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = usdJpy.assumedPrice - openTrade.openPrice

      if (openTrade.action === '買') {
        floatingPips += gap * 100
      } else {
        floatingPips += -gap * 100
      }
    }

    return Math.round(floatingPips * 10) / 10
  },
  floatingPipsEurUsd(state) {
    let floatingPips = 0
    const eurUsd = state.currencyPairs.usd.eur
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === eurUsd.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = eurUsd.assumedPrice - openTrade.openPrice

      if (openTrade.action === '買') {
        floatingPips = gap * 10000
      } else {
        floatingPips += -gap * 10000
      }
    }

    return Math.round(floatingPips * 10) / 10
  },
  floatingPipsGbpUsd(state) {
    let floatingPips = 0
    const gbpUsd = state.currencyPairs.usd.gbp
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === gbpUsd.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = gbpUsd.assumedPrice - openTrade.openPrice

      if (openTrade.action === '買') {
        floatingPips = gap * 10000
      } else {
        floatingPips += -gap * 10000
      }
    }

    return Math.round(floatingPips * 10) / 10
  },
  floatingPipsAudUsd(state) {
    let floatingPips = 0
    const audUsd = state.currencyPairs.usd.aud
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === audUsd.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = audUsd.assumedPrice - openTrade.openPrice

      if (openTrade.action === '買') {
        floatingPips = gap * 10000
      } else {
        floatingPips += -gap * 10000
      }
    }

    return Math.round(floatingPips * 10) / 10
  },
  floatingPipsEurJpy(state) {
    let floatingPips = 0
    const eurJpy = state.currencyPairs.jpy.eur
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === eurJpy.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = eurJpy.assumedPrice - openTrade.openPrice

      if (openTrade.action === '買') {
        floatingPips += gap * 100
      } else {
        floatingPips += -gap * 100
      }
    }

    return Math.round(floatingPips * 10) / 10
  },
  floatingPipsGbpJpy(state) {
    let floatingPips = 0
    const gbpJpy = state.currencyPairs.jpy.gbp
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === gbpJpy.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = gbpJpy.assumedPrice - openTrade.openPrice

      if (openTrade.action === '買') {
        floatingPips += gap * 100
      } else {
        floatingPips += -gap * 100
      }
    }

    return Math.round(floatingPips * 10) / 10
  },
  floatingPipsAudJpy(state) {
    let floatingPips = 0
    const audJpy = state.currencyPairs.jpy.aud
    const openTrades = state.openTrades.filter(openTrade => {
      return openTrade.symbol === audJpy.symbol
    })

    for (let i = 0; i < openTrades.length; i++) {
      const openTrade = openTrades[i]
      const gap = audJpy.assumedPrice - openTrade.openPrice

      if (openTrade.action === '買') {
        floatingPips += gap * 100
      } else {
        floatingPips += -gap * 100
      }
    }

    return Math.round(floatingPips * 10) / 10
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
    state.currencyPairs.jpy.usd.assumedPrice = assumedPriceUsdJpy
  },
  updateAssumedPriceEurUsd(state, assumedPriceEurUsd) {
    state.currencyPairs.usd.eur.assumedPrice = assumedPriceEurUsd
  },
  updateAssumedPriceGbpUsd(state, assumedPriceGbpUsd) {
    state.currencyPairs.usd.gbp.assumedPrice = assumedPriceGbpUsd
  },
  updateAssumedPriceAudUsd(state, assumedPriceAudUsd) {
    state.currencyPairs.usd.aud.assumedPrice = assumedPriceAudUsd
  },
  updateAssumedPriceEurJpy(state, assumedPriceEurJpy) {
    state.currencyPairs.jpy.eur.assumedPrice = assumedPriceEurJpy
  },
  updateAssumedPriceGbpJpy(state, assumedPriceGbpJpy) {
    state.currencyPairs.jpy.gbp.assumedPrice = assumedPriceGbpJpy
  },
  updateAssumedPriceAudJpy(state, assumedPriceAudJpy) {
    state.currencyPairs.jpy.aud.assumedPrice = assumedPriceAudJpy
  },
  getCurrentPriceUsdJpy(state) {
    state.currencyPairs.jpy.usd.assumedPrice =
      state.currencyPairs.jpy.usd.currentPrice
  },
  getCurrentPriceEurUsd(state) {
    state.currencyPairs.usd.eur.assumedPrice =
      state.currencyPairs.usd.eur.currentPrice
  },
  getCurrentPriceGbpUsd(state) {
    state.currencyPairs.usd.gbp.assumedPrice =
      state.currencyPairs.usd.gbp.currentPrice
  },
  getCurrentPriceAudUsd(state) {
    state.currencyPairs.usd.aud.assumedPrice =
      state.currencyPairs.usd.aud.currentPrice
  },
  getCurrentPriceEurJpy(state) {
    state.currencyPairs.jpy.eur.assumedPrice =
      state.currencyPairs.jpy.eur.currentPrice
  },
  getCurrentPriceGbpJpy(state) {
    state.currencyPairs.jpy.gbp.assumedPrice =
      state.currencyPairs.jpy.gbp.currentPrice
  },
  getCurrentPriceAudJpy(state) {
    state.currencyPairs.jpy.aud.assumedPrice =
      state.currencyPairs.jpy.aud.currentPrice
  }
}
