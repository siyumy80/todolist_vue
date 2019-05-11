<template>
     <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline"></span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Email*" required v-model="email"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password*" type="password" required v-model="password"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed @click="dialog=false">Close</v-btn>
            <v-btn depressed color="primary" @click.prevent="loginProcess()">Log In</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
</template>
<script>
export default {
    name :'login',
    props:['loginShow'],
    data() {
        return {
            dialog: false,
            email : '',
            password : ''
        }
    },
    mounted(){
        this.$EventBus.$on('showLoginDialog', this.showLoginDialog)
    },
    methods:{
        showLoginDialog() {
            this.dialog = true
        },
        loginProcess() {
            let param ={
                id : this.email,
                password : this.password
            }
        }
    }
}
</script>
