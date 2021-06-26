import Vue from 'vue';
import Vuex from 'vuex';
import { db } from './main';

Vue.use(Vuex)


export default new Vuex.Store({
    state : {
        items : []
    },

    getters : {
        getItems: (state) => {
            return state.items
        }
    },

    mutations : {
        setItems: (state) => {
            db.collection('items').orderBy.onSnapshot((snapshot)=>{
                items = [];

                snapshot.forEach(doc => {
                    items.push({
                        id : doc.id,
                        title : doc.data().title
                    })
                });

                state.items = items
            })
        }
    },

    actions : {
        setItems : context =>{
            context.commit('setItems');
        }
    }
})

