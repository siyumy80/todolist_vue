<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title @click="goHome()">Todo's</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-if="!this.$store.state.users">
          <v-btn fla @click="showLoginForm()">Log In</v-btn>
        </template>
        <template v-else>
          <v-btn flat @click="logout()">Log Out</v-btn>
          <v-btn flat @click="$router.push('/mypage')">My Page</v-btn>
        </template>
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
    }
  },
  methods: {
    showLoginForm(){
      this.$EventBus.$emit('showLoginDialog');
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
