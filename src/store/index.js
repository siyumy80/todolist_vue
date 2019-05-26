import Vue from 'vue'
import Vuex from 'vuex'
import api from './api/api'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      user     : null,
      todoList :[]
    },
    mutations: {
      setTodo (state, todoList) {
        return state.todoList = todoList
      },
      deleteTodo (state, payload) {
        state.todoList = state.todoList.filter((data) => data._id !== payload)
      },
     
    },
    getters:{
      getList: (state) => {
        return state.todoList
      },
      getUser: (state) => {
        return state.user
      }
    },
    actions :{
      getTodoList({commit}) {
        
        const TodoList = api.getTodoList()
        TodoList.then((response)=>{
          commit('setTodo',response.data);
        })
      },
      deleteTodo({commit}, payload) {
         api.deleteTodo(payload)
        .then(() => {
          commit('deleteTodo', payload)
        })
      },
      searchTodo({commit}, payload) {
        api.searcgTodo(payload)
        .then((response) => {
          commit('setTodo', response.data)
        })
      }
    }
})

export default store