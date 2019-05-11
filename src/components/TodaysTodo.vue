<template>
    <div class="grid-content bg-purple">
        <span>
            오늘의 할일:<el-link type="primary" @click="todoDetail"> {{todoList[0].title}} </el-link>
            <span v-if="1 < todoList.length">외({{todoList.length -1}})건</span>
        </span>
    </div>
</template>
<script>

export default {
    data() {    
        return {
            todoList :[{
                id: '2',
                title: '테슽ㅎㅎㅎㅎ',
                date :'2019-05-05',
                hashTag:['vuejs','totolist','study'],
                desc:'aaaa'
            },
            {
                id: '3',
                title: '테스트3번째',
                date :'2019-05-05',
                hashTag:['vuejs','hello world'],
                desc:'aaaa'
            }]
      
        }
    },
    methods:{
        todoDetail(){
            //
            this.$EventBus.$emit('viewTodoDetail', this.todoList[0])
        }
    }
}
</script>
