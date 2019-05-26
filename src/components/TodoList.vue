<template>

   <v-data-table
    :headers="headers"
    :items="this.getList"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <tr @click.prevent="$router.push(`/todo/${props.item._id}`)">
        <td>{{ props.item.date }}</td>
        <td >{{ props.item.title }}</td>
        <td>
          <v-chip label color="pink" text-color="white" v-for="(tag, index) in props.item.tags" :key="index">
            <v-icon left>label</v-icon>{{tag}}
          </v-chip> 
        </td>
        <td class="text-xs-right">
          <v-icon @click.stop="deleteTodo(props.item._id)">delete</v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
  

</template>
<script>
import {mapGetters} from 'vuex';

export default {
    created() {
      this.$store.dispatch('getTodoList');
    },
    mounted() {
    
    },
    computed: {
      // the spread operator allows to merge these mappers with other local computed properties
      ...mapGetters([
        'getList', // simple binding
       
      ])
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
              { text: 'Date' , value: 'date' },
              { text: 'Title', value: 'title' },
              { text: 'Tags' , value: 'hashTag' , sortable: false},
              { text: ''     , value: ''  , sortable: false },
            ],
           
        }
    },
    methods :{
        deleteTodo(id) {
          this.$store.dispatch('deleteTodo', id);
        },
    },
}
</script>

<style scoped>

</style>

