<template>
  <div id='app' class="home">
    <div class="block">
      <img src="@/assets/logo.png" alt="" class="vue-logo" width="30px">

      <div class="title">What do I need to do today?</div>

      <input type="text" v-model="myTodo" />
      <button @click="addToDo" class="add">Add</button>
      <div :if="error !=''">{{error}}</div>
    </div>

    <div class="mt20" v-if="this.$store.getters.getItems && this.$store.getters.getItems.length>0">
      <div class="title">
        Tasks to be done today
      </div>


      <div  class='block' v-for="item in this.$store.getters.getItems" :key="item.id">
        <div class="todo">{{item.title}}</div>
        <button class='delete' @click="deleteItem(item.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import {db} from '@/main'

export default {
  name: 'App',
  beforeCreate : function(){
    this.$store.dispatch('setItems')
  },

  data : function(){
    return {
      myTodo : '',
      error:''
    }
  },

  methods:{
    addToDo : function(){
      if(this.myTodo == ''){
        this.error = 'Enter a todo';
      }
      else{

        this.error='';
        console.log(this.myTodo);

        db.collection('items').add({
          title:this.myTodo,
          createdAt : Date.now()
        })
        .then(response => {
          if(response){
            this.myTodo='';
          }
        })
        .catch(err =>{
          this.error = err
        })

        
      }
      
    },

    deleteItem(id){
      if(!id){
        this.error = "No id found"
      }
      else{
        db.collection('items').doc(id).delete().then(function(){
          console.log("delete items");
        })
        .catch(function(err){
          this.error = err
        })
      }
    }

    
  }
}
</script>





<style>
html,body {
font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #767891;
    background: #131421;
}

.block{
  background: #1a1b2a;
  padding:20px;
  margin-top:20px;
}

.home{
  
  width:300px;
  margin:auto;
}
.mt20{margin-top:20px;}

input{background:transparent;color:#767891;border:1px solid #767891;}
button{background:#767891;}
input,.add{padding:12px;margin-top:20px;}

.todo{padding:10px 0;}

.delete{
  padding:5px;
  background:#915d7c;color:#fff;border:none;border-radius:5px;
}
</style>
