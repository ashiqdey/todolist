import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import store from './store'

Vue.config.productionTip = false


var firebaseConfig = {
  apiKey: "AIzaSyCBGFpt7UZ4sYrGMWhN2aMAKzSx92kjvK4",
  authDomain: "todolist-6b068.firebaseapp.com",
  projectId: "todolist-6b068",
  storageBucket: "todolist-6b068.appspot.com",
  messagingSenderId: "892923810030",
  appId: "1:892923810030:web:7edba1a6430825b13063ff"
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
