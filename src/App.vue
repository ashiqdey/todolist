<template>
  <div class="home">
    <img src="@/assets/logo.png" alt="" class="vue-logo" width="50px">

    <div class="title">What do I need to do today?</div>

    <input type="text" v-model="myTodo" />
    <button @click="addToDo">Add</button>
    <div :if="error !=''">{{error}}</div>

    <div :if="this.$store.getters.getItems && this.$store.getters.getItems.length>0">
      <div class="title">
        Tasks to be done today
      </div>


      <div :for="item in this.$store.getters.getItems" :key="item.id">
        <div>{{item.title}}</div>
        <button>Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import db from '@/main'

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

        db.collection('item').add({
          title:this.myTodo,
          createdAt : Date.now()
        })
        .then(response => {
          if(response){
            this.myTodo='';
          }
        })
        .catch(err =>{
          this.err = err
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.home{
  
  width:300px;
  margin:auto;
}
input,button{padding:12px;}
</style>
