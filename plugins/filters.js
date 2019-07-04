import Vue from 'vue'

Vue.filter('digitSeparator', value =>
  (value || 0).toLocaleString('ja', { maximumFractionDigits: 5 })
)
