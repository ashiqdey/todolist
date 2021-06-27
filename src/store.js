import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '@/main';

Vue.use(Vuex)


export default new Vuex.Store({
    state : {
        items : []
    },

    getters : {
        getItems: (state) => {
            console.log(`item length `+state.items.length);
            return state.items
        }
    },

    mutations : {
        setItems: (state) => {
            
            db.collection('items').orderBy('createdAt').onSnapshot((snapshot)=>{
                let items = [];
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

