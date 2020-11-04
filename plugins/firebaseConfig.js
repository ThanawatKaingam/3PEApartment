import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyC8W0B6qW8q9HtOAi9cwmRZrqNUU4-WOUg',
    authDomain: 'pe-apartment.firebaseapp.com',
    databaseURL: 'https://pe-apartment.firebaseio.com',
    projectId: 'pe-apartment',
    storageBucket: 'pe-apartment.appspot.com',
    messagingSenderId: '898447694173',
    appId: '1:898447694173:web:65afada1fd71b2dd0ef0b4',
    measurementId: 'G-91GMXJG1LS'
  }
  firebase.initializeApp(firebaseConfig)
}
export const db = firebase.firestore()
export const st = firebase.storage()
