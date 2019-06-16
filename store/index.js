const currencyPairs = {
  USD: {
    EUR: {
      name: 'EUR/USD',
      currentRate: 1,
      assumedRate: 0
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
      assumedRate: 0
    },
    EUR: {
      name: 'EUR/JPY',
      currentRate: 9,
      assumedRate: 0
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
  positions: [],
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
  doubleBalance(state) {
    return state.balance * 2
  }
}

export const mutations = {
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
  updateAssumedRateGBPJPY(st2ate, assumedRateGBPJPY) {
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
