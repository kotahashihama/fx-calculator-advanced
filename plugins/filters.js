import Vue from 'vue'

Vue.filter('digitSeparator', value => {
  return value.toLocaleString('ja', { maximumFractionDigits: 5 })
})
