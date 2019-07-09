import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyAlLED25GNB9JKqeWnXJykkA_7C88NQ0QI',
  authDomain: 'fx-calculator-advanced.firebaseapp.com',
  databaseURL: 'https://fx-calculator-advanced.firebaseio.com',
  projectId: 'fx-calculator-advanced',
  storageBucket: '',
  messagingSenderId: '519332817494',
  appId: '1:519332817494:web:57ffe8fd412ba3f9'
}
firebase.initializeApp(config)

export const firebaseAuth = firebase.auth()
export const firestore = firebase.firestore()
export default firebase
