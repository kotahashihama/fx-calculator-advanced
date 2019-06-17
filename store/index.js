const currencyPairs = {
  USD: {
    EUR: {
      name: 'EUR/USD',
      currentRate: 1,
      assumedRate: 1.2
    },
    GBP: {
      name: 'GBP/USD',
      currentRate: 3,
      assumedRate: 0
    },
    AUD: {
      name: 'AUD/USD',
      currentRate: 5,
      assumedRate: 0
    }
  },
  JPY: {
    USD: {
      name: 'USD/JPY',
      currentRate: 7,
      assumedRate: 110
    },
    EUR: {
      name: 'EUR/JPY',
      currentRate: 9,
      assumedRate: 120
    },
    GBP: {
      name: 'GBP/JPY',
      currentRate: 11,
      assumedRate: 0
    },
    AUD: {
      name: 'AUD/JPY',
      currentRate: 13,
      assumedRate: 0
    }
  }
}

export const state = () => ({
  title: '無題',
  currencyPairs,
  positions: [
    {
      currencyPair: 'USD/JPY',
      action: '売',
      lot: 0.02,
      rate: 108.598
    },
    {
      currencyPair: 'USD/JPY',
      action: '売',
      lot: 0.02,
      rate: 108.598
    },
    {
      currencyPair: 'EUR/USD',
      action: '売',
      lot: 0.02,
      rate: 1.21
    }
  ],
  balance: 200000,
  targetMarginLevel: 1000,
  exchange: 'international',
  exchanges: {
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
    return state.balance + getters.unrealizedValue
  },
  freeMargin(state, getters) {
    return getters.equity - getters.margin
  },

  margin(state, getters) {
    return (
      getters.marginUSDJPY +
      getters.marginEURUSD +
      getters.marginGBPUSD +
      getters.marginAUDUSD +
      getters.marginEURJPY +
      getters.marginGBPJPY +
      getters.marginAUDJPY
    )
  },
  marginUSDJPY(state) {
    let margin = 0
    const USDJPY = state.currencyPairs.JPY.USD
    const positions = state.positions.filter(position => {
      return position.currencyPair === USDJPY.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const tradingSize = state.tradingUnit[state.exchange] * position.lot
      const leverage = state.leverage[state.exchange]

      margin += (tradingSize * USDJPY.assumedRate) / leverage
    }

    return Math.round(margin)
  },
  marginEURUSD(state) {
    let margin = 0
    const EURUSD = state.currencyPairs.USD.EUR
    const USDJPY = state.currencyPairs.JPY.USD
    const positions = state.positions.filter(position => {
      return position.currencyPair === EURUSD.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const tradingSize = state.tradingUnit[state.exchange] * position.lot
      const leverage = state.leverage[state.exchange]

      margin +=
        (tradingSize * EURUSD.assumedRate * USDJPY.assumedRate) / leverage
    }

    return Math.round(margin)
  },
  marginGBPUSD(state) {
    let margin = 0
    const GBPUSD = state.currencyPairs.USD.GBP
    const USDJPY = state.currencyPairs.JPY.USD
    const positions = state.positions.filter(position => {
      return position.currencyPair === GBPUSD.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const tradingSize = state.tradingUnit[state.exchange] * position.lot
      const leverage = state.leverage[state.exchange]

      margin +=
        (tradingSize * GBPUSD.assumedRate * USDJPY.assumedRate) / leverage
    }

    return Math.round(margin)
  },
  marginAUDUSD(state) {
    let margin = 0
    const AUDUSD = state.currencyPairs.USD.AUD
    const USDJPY = state.currencyPairs.JPY.USD
    const positions = state.positions.filter(position => {
      return position.currencyPair === AUDUSD.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const tradingSize = state.tradingUnit[state.exchange] * position.lot
      const leverage = state.leverage[state.exchange]

      margin +=
        (tradingSize * AUDUSD.assumedRate * USDJPY.assumedRate) / leverage
    }

    return Math.round(margin)
  },
  marginEURJPY(state) {
    let margin = 0
    const EURJPY = state.currencyPairs.JPY.EUR
    const positions = state.positions.filter(position => {
      return position.currencyPair === EURJPY.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const tradingSize = state.tradingUnit[state.exchange] * position.lot
      const leverage = state.leverage[state.exchange]

      margin += (tradingSize * EURJPY.assumedRate) / leverage
    }

    return Math.round(margin)
  },
  marginGBPJPY(state) {
    let margin = 0
    const GBPJPY = state.currencyPairs.JPY.GBP
    const positions = state.positions.filter(position => {
      return position.currencyPair === GBPJPY.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const tradingSize = state.tradingUnit[state.exchange] * position.lot
      const leverage = state.leverage[state.exchange]

      margin += (tradingSize * GBPJPY.assumedRate) / leverage
    }

    return Math.round(margin)
  },
  marginAUDJPY(state) {
    let margin = 0
    const AUDJPY = state.currencyPairs.JPY.AUD
    const positions = state.positions.filter(position => {
      return position.currencyPair === AUDJPY.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const tradingSize = state.tradingUnit[state.exchange] * position.lot
      const leverage = state.leverage[state.exchange]

      margin += (tradingSize * AUDJPY.assumedRate) / leverage
    }

    return Math.round(margin)
  },

  unrealizedValue(state, getters) {
    return (
      getters.unrealizedValueUSDJPY +
      getters.unrealizedValueEURUSD +
      getters.unrealizedValueGBPUSD +
      getters.unrealizedValueAUDUSD +
      getters.unrealizedValueEURJPY +
      getters.unrealizedValueGBPJPY +
      getters.unrealizedValueAUDJPY
    )
  },
  unrealizedValueUSDJPY(state) {
    let unrealizedValue = 0
    const USDJPY = state.currencyPairs.JPY.USD
    const positions = state.positions.filter(position => {
      return position.currencyPair === USDJPY.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = USDJPY.assumedRate - position.rate
      const tradingSize = state.tradingUnit[state.exchange] * position.lot

      if (position.action === '買') {
        unrealizedValue += gap * tradingSize
      } else {
        unrealizedValue += -gap * tradingSize
      }
    }

    return Math.round(unrealizedValue)
  },
  unrealizedValueEURUSD(state) {
    let unrealizedValue = 0
    const EURUSD = state.currencyPairs.USD.EUR
    const USDJPY = state.currencyPairs.JPY.USD
    const positions = state.positions.filter(position => {
      return position.currencyPair === EURUSD.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = EURUSD.assumedRate - position.rate
      const tradingSize = state.tradingUnit[state.exchange] * position.lot

      if (position.action === '買') {
        unrealizedValue = gap * tradingSize * USDJPY.assumedRate
      } else {
        unrealizedValue += -gap * tradingSize * USDJPY.assumedRate
      }
    }

    return Math.round(unrealizedValue)
  },
  unrealizedValueGBPUSD(state) {
    let unrealizedValue = 0
    const GBPUSD = state.currencyPairs.USD.GBP
    const USDJPY = state.currencyPairs.JPY.USD
    const positions = state.positions.filter(position => {
      return position.currencyPair === GBPUSD.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = GBPUSD.assumedRate - position.rate
      const tradingSize = state.tradingUnit[state.exchange] * position.lot

      if (position.action === '買') {
        unrealizedValue = gap * tradingSize * USDJPY.assumedRate
      } else {
        unrealizedValue += -gap * tradingSize * USDJPY.assumedRate
      }
    }

    return Math.round(unrealizedValue)
  },
  unrealizedValueAUDUSD(state) {
    let unrealizedValue = 0
    const AUDUSD = state.currencyPairs.USD.AUD
    const USDJPY = state.currencyPairs.JPY.USD
    const positions = state.positions.filter(position => {
      return position.currencyPair === AUDUSD.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = AUDUSD.assumedRate - position.rate
      const tradingSize = state.tradingUnit[state.exchange] * position.lot

      if (position.action === '買') {
        unrealizedValue = gap * tradingSize * USDJPY.assumedRate
      } else {
        unrealizedValue += -gap * tradingSize * USDJPY.assumedRate
      }
    }

    return Math.round(unrealizedValue)
  },
  unrealizedValueEURJPY(state) {
    let unrealizedValue = 0
    const EURJPY = state.currencyPairs.JPY.EUR
    const positions = state.positions.filter(position => {
      return position.currencyPair === EURJPY.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = EURJPY.assumedRate - position.rate
      const tradingSize = state.tradingUnit[state.exchange] * position.lot

      if (position.action === '買') {
        unrealizedValue += gap * tradingSize
      } else {
        unrealizedValue += -gap * tradingSize
      }
    }

    return Math.round(unrealizedValue)
  },
  unrealizedValueGBPJPY(state) {
    let unrealizedValue = 0
    const GBPJPY = state.currencyPairs.JPY.GBP
    const positions = state.positions.filter(position => {
      return position.currencyPair === GBPJPY.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = GBPJPY.assumedRate - position.rate
      const tradingSize = state.tradingUnit[state.exchange] * position.lot

      if (position.action === '買') {
        unrealizedValue += gap * tradingSize
      } else {
        unrealizedValue += -gap * tradingSize
      }
    }

    return Math.round(unrealizedValue)
  },
  unrealizedValueAUDJPY(state) {
    let unrealizedValue = 0
    const AUDJPY = state.currencyPairs.JPY.AUD
    const positions = state.positions.filter(position => {
      return position.currencyPair === AUDJPY.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = AUDJPY.assumedRate - position.rate
      const tradingSize = state.tradingUnit[state.exchange] * position.lot

      if (position.action === '買') {
        unrealizedValue += gap * tradingSize
      } else {
        unrealizedValue += -gap * tradingSize
      }
    }

    return Math.round(unrealizedValue)
  },

  unrealizedPips(state, getters) {
    return (
      getters.unrealizedPipsUSDJPY +
      getters.unrealizedPipsEURUSD +
      getters.unrealizedPipsGBPUSD +
      getters.unrealizedPipsAUDUSD +
      getters.unrealizedPipsEURJPY +
      getters.unrealizedPipsGBPJPY +
      getters.unrealizedPipsAUDJPY
    )
  },
  unrealizedPipsUSDJPY(state) {
    let unrealizedPips = 0
    const USDJPY = state.currencyPairs.JPY.USD
    const positions = state.positions.filter(position => {
      return position.currencyPair === USDJPY.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = USDJPY.assumedRate - position.rate

      if (position.action === '買') {
        unrealizedPips += gap * 100
      } else {
        unrealizedPips += -gap * 100
      }
    }

    return Math.round(unrealizedPips * 10) / 10
  },
  unrealizedPipsEURUSD(state) {
    let unrealizedPips = 0
    const EURUSD = state.currencyPairs.USD.EUR
    const positions = state.positions.filter(position => {
      return position.currencyPair === EURUSD.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = EURUSD.assumedRate - position.rate

      if (position.action === '買') {
        unrealizedPips = gap * 10000
      } else {
        unrealizedPips += -gap * 10000
      }
    }

    return Math.round(unrealizedPips * 10) / 10
  },
  unrealizedPipsGBPUSD(state) {
    let unrealizedPips = 0
    const GBPUSD = state.currencyPairs.USD.GBP
    const positions = state.positions.filter(position => {
      return position.currencyPair === GBPUSD.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = GBPUSD.assumedRate - position.rate

      if (position.action === '買') {
        unrealizedPips = gap * 10000
      } else {
        unrealizedPips += -gap * 10000
      }
    }

    return Math.round(unrealizedPips * 10) / 10
  },
  unrealizedPipsAUDUSD(state) {
    let unrealizedPips = 0
    const AUDUSD = state.currencyPairs.USD.AUD
    const positions = state.positions.filter(position => {
      return position.currencyPair === AUDUSD.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = AUDUSD.assumedRate - position.rate

      if (position.action === '買') {
        unrealizedPips = gap * 10000
      } else {
        unrealizedPips += -gap * 10000
      }
    }

    return Math.round(unrealizedPips * 10) / 10
  },
  unrealizedPipsEURJPY(state) {
    let unrealizedPips = 0
    const EURJPY = state.currencyPairs.JPY.EUR
    const positions = state.positions.filter(position => {
      return position.currencyPair === EURJPY.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = EURJPY.assumedRate - position.rate

      if (position.action === '買') {
        unrealizedPips += gap * 100
      } else {
        unrealizedPips += -gap * 100
      }
    }

    return Math.round(unrealizedPips * 10) / 10
  },
  unrealizedPipsGBPJPY(state) {
    let unrealizedPips = 0
    const GBPJPY = state.currencyPairs.JPY.GBP
    const positions = state.positions.filter(position => {
      return position.currencyPair === GBPJPY.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = GBPJPY.assumedRate - position.rate

      if (position.action === '買') {
        unrealizedPips += gap * 100
      } else {
        unrealizedPips += -gap * 100
      }
    }

    return Math.round(unrealizedPips * 10) / 10
  },
  unrealizedPipsAUDJPY(state) {
    let unrealizedPips = 0
    const AUDJPY = state.currencyPairs.JPY.AUD
    const positions = state.positions.filter(position => {
      return position.currencyPair === AUDJPY.name
    })

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const gap = AUDJPY.assumedRate - position.rate

      if (position.action === '買') {
        unrealizedPips += gap * 100
      } else {
        unrealizedPips += -gap * 100
      }
    }

    return Math.round(unrealizedPips * 10) / 10
  },

  marginLevel(state, getters) {
    if (state.positions.length) {
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
  updateExchange(state, exchange) {
    state.exchange = exchange
  },
  updateTradingUnit(state, tradingUnit) {
    state.tradingUnit[state.exchange] = tradingUnit
  },
  updateLeverage(state, leverage) {
    state.leverage[state.exchange] = leverage
  },

  updateAssumedRateUSDJPY(state, assumedRateUSDJPY) {
    state.currencyPairs.JPY.USD.assumedRate = assumedRateUSDJPY
  },
  updateAssumedRateEURUSD(state, assumedRateEURUSD) {
    state.currencyPairs.USD.EUR.assumedRate = assumedRateEURUSD
  },
  updateAssumedRateGBPUSD(state, assumedRateGBPUSD) {
    state.currencyPairs.USD.GBP.assumedRate = assumedRateGBPUSD
  },
  updateAssumedRateAUDUSD(state, assumedRateAUDUSD) {
    state.currencyPairs.USD.AUD.assumedRate = assumedRateAUDUSD
  },
  updateAssumedRateEURJPY(state, assumedRateEURJPY) {
    state.currencyPairs.JPY.EUR.assumedRate = assumedRateEURJPY
  },
  updateAssumedRateGBPJPY(state, assumedRateGBPJPY) {
    state.currencyPairs.JPY.GBP.assumedRate = assumedRateGBPJPY
  },
  updateAssumedRateAUDJPY(state, assumedRateAUDJPY) {
    state.currencyPairs.JPY.AUD.assumedRate = assumedRateAUDJPY
  },
  getCurrentRateUSDJPY(state) {
    state.currencyPairs.JPY.USD.assumedRate =
      state.currencyPairs.JPY.USD.currentRate
  },
  getCurrentRateEURUSD(state) {
    state.currencyPairs.USD.EUR.assumedRate =
      state.currencyPairs.USD.EUR.currentRate
  },
  getCurrentRateGBPUSD(state) {
    state.currencyPairs.USD.GBP.assumedRate =
      state.currencyPairs.USD.GBP.currentRate
  },
  getCurrentRateAUDUSD(state) {
    state.currencyPairs.USD.AUD.assumedRate =
      state.currencyPairs.USD.AUD.currentRate
  },
  getCurrentRateEURJPY(state) {
    state.currencyPairs.JPY.EUR.assumedRate =
      state.currencyPairs.JPY.EUR.currentRate
  },
  getCurrentRateGBPJPY(state) {
    state.currencyPairs.JPY.GBP.assumedRate =
      state.currencyPairs.JPY.GBP.currentRate
  },
  getCurrentRateAUDJPY(state) {
    state.currencyPairs.JPY.AUD.assumedRate =
      state.currencyPairs.JPY.AUD.currentRate
  }
}
