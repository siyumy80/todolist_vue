<template>
 <v-layout row justify-center>
    <v-card>
        <v-card-title>
          <span class="headline">할일 등록</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="제목" v-model="todo.title" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="todo.date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                <template v-slot:activator="{ on }">
                <v-text-field
                        v-model="todo.date"
                        label="Picker in menu"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        required
                ></v-text-field>
                 </template>
                <v-date-picker v-model="todo.date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(todo.date)">OK</v-btn>
                </v-date-picker>
              </v-menu>  
              </v-flex>
              <v-flex xs12>
                 <v-textarea
                    name="desc"
                    label="비고"
                    v-model="todo.desc"
                  ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="tag" v-model="tag" @keyup.enter.native="makeTagChip"></v-text-field>
                <v-chip label color="pink" text-color="white" v-for="(item , index) in todo.tags" :key="index" close @input="removeTag(index)">
                    <v-icon left>label</v-icon>{{item}}
                </v-chip>   
              </v-flex>
             </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="$router.push('/')">Home</v-btn>
          <v-btn color="blue darken-1" flat @click="addTodo()">Save</v-btn>
        </v-card-actions>
      </v-card>

      <v-dialog
        v-model="dialog"
        max-width="290"
      >
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text >
          {{message}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>

export default {
    prop :[
      'id'
    ],
    data(){
        return {
          todo : {
            user_id:'ymshin',
            title : '',
            desc  : '',
            tags  : [],
            date  : new Date().toISOString().substr(0, 10),
          },
          _id  : '',
          userId :'',
          tag : '',
          menu : false,  
          dialog : false ,
          message : ''  
        }
    },
    mounted() {
      if(this.$route.params.id) {
        const result = this.$api.getTodo(this.$route.params.id)
        result.then((response) => {
          this.todo = response.data
          this._id = response.data.id
          this.userId = response.data.userId
        })
      }
    },
    methods: {
        makeTagChip() {
            this.todo.tags.push(this.tag)
            this.tag = ''
        },
        addTodo() {
          if(this.title === '') {
            this.message = '제목을 입력해 주세요.'
            this.dialog = true
            return false
          }
          if(this.date) {
            this.message = '날짜를 입력해 주세요.'
            this.dialog = true
            return false
          }
          if(this.$route.params.id) {
            this.$api.updateTodo(this.$route.params.id, this.todo)
            .then((response) => {
              this.$router.push('/')
            });
          } else {
            let add = this.$api.addTodo(this.todo);
            add.then((response) => {
              this.$router.push('/')
            });
          }
         
        },
        removeTag(idx) {
          this.todo.tags.splice(idx,1)
        }
    }
}
</script>

