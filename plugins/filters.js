import Vue from 'vue'

Vue.filter('digitSeparator', value => {
  return value.toLocaleString()
})
