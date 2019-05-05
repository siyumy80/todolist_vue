<template>
   <el-container style="height: 800px; border: 1px solid #eee">
    <el-main>
    <el-table
    :data="todoList"
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      label="Date"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="제목"
      width="180">
    </el-table-column>
    <el-table-column
      label="HashTags"
      prop="hashTag"
      >
     </el-table-column>
     <el-table-column
        label="edit">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-main>
    <el-footer>
      <el-col :span="24" style="text-align: right"> <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true"></el-button></el-col>
    </el-footer>
    <el-dialog title="할일 등록" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="제목" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" :readonly="!this.editable"></el-input>
        </el-form-item>
        <el-form-item label="날짜" :label-width="formLabelWidth">
          <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a date" 
          :readonly="!this.editable">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="desc" :label-width="formLabelWidth">
          <el-input type="textarea"
                    :rows="5"
                    placeholder="Please input" v-model="form.desc"
                    :readonly="!this.editable"></el-input>
        </el-form-item>
        <el-form-item label="HashTag" :label-width="formLabelWidth">
          <!--
          <el-input @keyup.enter.native="makeHashTags" :readonly="!this.editable"></el-input>-->
          <input type="text" v-model="tag" @keydown.enter="makeHashTags" :readonly="!this.editable">
          <el-tag type="success" v-for="(tag, index) in taglist" 
                  v-bind:key="index"   
                  closable 
                  :disable-transitions="false"
                  @close="handleClose(tag)">{{tag}}</el-tag>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reset">Cancel</el-button>
        <el-button type="primary" @click="addTodo()">등록</el-button>
      </span>
    </el-dialog>
  </el-container>
      
</template>
<script>

export default {
    props:{
     
    },
    created() {
      this.$EventBus.$on('filterTodo',     this.filterTodoList )
      this.$EventBus.$on('viewTodoDetail', this.viewTodoDetail )
    },
    data() {
        return {
            dialogFormVisible: false,
            editableFlg:'C',
            editableIdx:0,
            tag : '',
            editable : true,
            form: {
                title: '',
                date: '',
                hashTag:[],
                desc: ''
            },
            formLabelWidth: '120px',
            taglist :[],
            todoList : [{
                id: '2',
                title: '테슽ㅎㅎㅎㅎ',
                date :'2019-05-01',
                hashTag:['vuejs','totolist','study'],
                desc: ''
            },
            {
                id: '3',
                title: '프로젝트 미팅',
                date :'2019-05-02',
                hashTag:[],
                desc: ''
            }]
        }
    },
    methods :{
        handleEdit(idx, row) {
           // alert(id)
           this.editableIdx = idx
           this.editableFlg = 'U'
           this.form = this.todoList[idx]
           this.taglist = this.todoList[idx].hashTag
           this.dialogFormVisible = true

        },
        handleDelete(idx, row) {
           // alert(id)
            this.todoList.splice(idx, 1);

        },
        makeHashTags(object) {
            if(object.target.value === '') {
                return false
            }
            this.tag = ''
            this.taglist.push(object.target.value)
            // document.querySelector('#tag').append(`<el-tag type="info">{{object.target.value}}</el-tag>`)
            console.log(`<el-tag type="info">{{object.target.value}}</el-tag>`)
        },
        reset() {
            this.form = {}
            this.taglist = []
            this.dialogFormVisible = false
            this.editableFlg = 'C'
            this.editable = true
        },
        handleClose(t) {
            this.taglist.splice(this.taglist.indexOf(t), 1)
        },
        addTodo(){
            let newTodo = {
                title : this.form.title,
                date  : this.form.date,
                hashTag: this.taglist,
                desc : this.form.desc
            }
            if(this.editableFlg === 'U') {
                this.todoList[this.editableIdx] = newTodo
                
            } else {
                this.todoList.push(newTodo)
            }
            this.reset()
            
        },
        filterTodoList(type, keywords) {
       
          this.keywords = keywords
          if(type === 'title') {
            this.todoList = this.todoList.filter(data => !this.keywords || data.title.toLowerCase().includes(this.keywords.toLowerCase()))
          } else {
            return this.todoList.filter( data  => {
              this.todoList =!this.keywords || data.hashTag.includes(this.keywords.toLowerCase())
            })
          }
         
        },
        viewTodoDetail(todo) {
          
          this.form = todo
          this.taglist = todo.hashTag
          this.dialogFormVisible = true
          this.editable = false
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

