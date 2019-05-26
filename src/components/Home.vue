<template>
    <v-container
      id="grid"
      fluid
      grid-list-sm
      tag="section">
    <v-layout row wrap>
      <v-flex tag="h1" class="headline">Lorem Ipsum</v-flex>
      <Search/>
      <v-flex d-flex xs12 order-xs5>
          <v-layout column v-if="isLogin">
          <v-flex>
            <v-card flat>
                <span>
                오늘의 할일:<el-link type="primary" @click="todoDetail(todo._id)"> {{todo.title}} </el-link>
                <span v-if="todoList !== null">외({{todoList.length -1}})건</span>
                </span>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card flat>
              <TodoList />
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout column v-else>
          <v-flex>
            <v-card flat>
               <h3>Log In 해주세요.</h3>
            </v-card>
          </v-flex>
         </v-layout>
      </v-flex>
      <v-btn fab dark color="indigo">
        <v-icon dark @click="$router.push('/todo')">add</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>
<script>
import TodoList from './TodoList'
import Search   from './Search'
import {mapGetters} from 'vuex';

export default {
    name:'home',
    components :{
      TodoList,
      Search,
     
    },
    data: () => ({
         todoList : null
        ,todo : {
          title : '',
          _id   : ''
        },
         isLogin : false
    }),
    created() {
      //오늘의 할일 가져오기.
      this.isLogin = true;
    },
    computed: {
      // the spread operator allows to merge these mappers with other local computed properties
      ...mapGetters([
        'getUser', // simple binding
        'getList',
      ])
    },
    methods: {
      moveAddPage() {
        this.$router.push('/todo')
      },
      todoDetail() {

      }
    }

}
</script>
