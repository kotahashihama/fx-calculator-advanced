import Vue from 'vue'

Vue.filter('digitSeparator', value =>
  value.toLocaleString('ja', { maximumFractionDigits: 5 })
)
