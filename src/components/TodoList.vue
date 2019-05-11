<template>

   <v-data-table
    :headers="headers"
    :items="todoList"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <tr @click.prevent="$router.push(`/todo/${props.item.id}`)">
        <td>{{ props.item.date }}</td>
        <td >{{ props.item.title }}</td>
        <td>
          <v-chip label color="pink" text-color="white" v-for="(tag, index) in props.item.tags" :key="index">
            <v-icon left>label</v-icon>{{tag}}
          </v-chip> 
        </td>
        <td class="text-xs-right">
          <v-icon @click.stop="deleteTodo(props.item.id)">delete</v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
  

</template>
<script>

export default {
    created() {
      this.$EventBus.$on('filterTodo',     this.filterTodoList )
    },
    mounted() {
      const TodoList = this.$api.getTodoList()
      TodoList.then((response)=>{
        this.todoList = response.data;
        console.log(JSON.stringify(response.data))
      })
    },
    data() {
        return {
            dialogFormVisible: false,
            editableFlg:'C',
            editableIdx:0,
            tag : '',
            editable : true,
            taglist :[],
             headers: [
              { text: 'Date' , sortable: false, value: 'date' },
              { text: 'Title', value: 'title' },
              { text: 'Tags' , value: 'hashTag' },
              { text: ''     , value: '' },
            ],
            todoList : []
        }
    },
    methods :{
       
        deleteTodo(id) {
          let param = {
            id : id
          }

          this.$api.deleteTodo(param)
          .then((response) => {
            this.todoList = this.todoList.filter((todo) => todo.id !== id)
          })
        },
        filterTodoList(resultList) {
          this.todoList = resultList
        }
    },
    computed : {
        makeHasTags() {
            return hashTag.join('#')
        }
    },

}
</script>

<style scoped>

</style>

