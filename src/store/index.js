import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      todo: {},
      todoList:[]
    },
    mutations: {
      setTodo (state) {
        state.count++
      },
     
    }
})

export default store