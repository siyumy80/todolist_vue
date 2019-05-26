<template>
 <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card >
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">404 Not Found</h3>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" @click="this.$router.push('/Home')">Home</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
