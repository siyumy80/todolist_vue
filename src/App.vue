<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title @click="goHome()">Todo's</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn fla  v-if="!loginStatus" @click="showLoginForm()">Log In</v-btn>
        <v-btn flat v-else  @click="logout()">Log Out</v-btn>
        <v-btn flat @click="moveSignUp()">Sign Up</v-btn>
       </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <login></login>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Login from './components/Login'
import Vue from 'vue'
export default {
  name: 'App',
  components: {
    'login' : Login
  },
  data () {
    return {
      loginStatus : false,
     
    }
  },
  methods: {
    showLoginForm(){
      this.$EventBus.$emit('showLoginDialog')
    },
    logout() {
      
    },
    moveSignUp(){
      this.$router.push({ name: 'signUp'})
    },
    goHome(){
      this.$router.push({ name: 'home'})
    }

  }
}
</script>
