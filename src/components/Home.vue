<template>
    <v-container
    id="grid"
    fluid
    grid-list-sm
    tag="section"
  >
    <v-layout row wrap>
      <v-flex tag="h1" class="headline">Lorem Ipsum</v-flex>
      <v-flex xs6 sm2 d-flex>
         <v-select
            v-model="select"
            :items="items"
            item-text="label"
            item-value="value"
            label="조회조건"
            persistent-hint
            return-object
            single-line
        ></v-select>
      </v-flex>
      <v-flex xs12 sm3 d-flex>
        <v-text-field
          label="keywords"
          append-outer-icon="search"
          v-model="keywords"
          @click:append-outer="searchList()"
        ></v-text-field>
      </v-flex>
      <v-flex d-flex xs12 order-xs5>
        <v-layout column v-if="!isLoginFlg">
          <v-flex>
            <v-card flat>
              <TodoList/>
            </v-card>
          </v-flex>
         </v-layout>
         <v-layout column v-else>
          <v-flex>
            <v-card flat>
                <span>
                오늘의 할일:<el-link type="primary" @click="todoDetail"> {{todoList[0].title}} </el-link>
                <span v-if="1 < todoList.length">외({{todoList.length -1}})건</span>
                </span>
            </v-card>
          </v-flex>
        
        </v-layout>
      </v-flex>
    </v-layout>
    <v-btn fab dark color="indigo">
      <v-icon dark @click="$router.push('/todo')">add</v-icon>
    </v-btn>
  </v-container>
</template>
<script>
import TodoList from './TodoList'

export default {
    name:'home',
    components :{
      TodoList
    },
    data: () => ({
      isLoginFlg: false,
      items: [
        {label : '제목'    , value : 'T'},
        {label : 'HashTag' , value : 'H'}
      ],
      select   : '',
      keywords : ''
   
    }),
    created() {
      //오늘의 할일 가져오기.
     
    },
    methods: {
      moveAddPage() {
        this.$router.push('/todo')
      },
      searchList() {
        if(this.keywords === '' || this.select === '') {
          alert('');
          return false;
        }
       
        const result = this.$api.getSearchList( this.select.value, this.keywords)
        result.then((response) => {
          //여기서 todolist에 데이터를 갱신.
          console.log(JSON.stringify(response.data))
          this.serveTodoList(response.data)
         
        })
      },
      serveTodoList(list) {
         this.$EventBus.$emit('filterTodoList', list)
      }
    }

}
</script>
