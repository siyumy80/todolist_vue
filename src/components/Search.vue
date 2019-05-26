<template>
    <v-flex d-flex xs12 order-xs5>
        <v-flex xs3 d-flex>
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
        <v-flex xs12 d-flex v-if="this.select.value == 'T' || this.select.value == 'H'">
            <v-text-field
            label="keywords"
            v-model="keywords"
            ></v-text-field>
        </v-flex>
        <v-flex xs12 d-flex v-if="this.select.value == 'D'">
          
                <v-layout row wrap>
                <v-flex xs6 lg6>
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="date"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                                v-model="date"
                                label="Picker in menu"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                                required
                        ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu> 
                </v-flex>
                <v-flex xs6 lg6>
                    <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="date2"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="date2"
                            label="Picker in menu"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                            required
                        ></v-text-field>
                        </template>
                        <v-date-picker v-model="date2" no-title="true" scrollable>
                         <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu2.save(date2)">OK</v-btn>
                        </v-date-picker>
                    </v-menu> 
                </v-flex>
                </v-layout>
        </v-flex>
        <v-flex  xs1 d-flex>
            <v-btn color="success" @click="searchList()">Search</v-btn>
        </v-flex>
    </v-flex>
</template>
<script>

export default {
    data(){
        return {
            items: [
                {label : '전체'    ,value : '' },
                {label : '제목'    ,value : 'T'},
                {label : 'HashTag' ,value : 'H'},
                {label : '날짜'    ,value : 'D'}
            ],
            select   :'',
            keywords : '',
            menu  : false,  
            menu2 : false,
            date  : new Date().toISOString().substr(0, 10),
            date2 : new Date().toISOString().substr(0, 10),
        }
    },
     components :{

     }
    ,methods : {
        searchList() {
            let param = {};
            if(this.select.value !== '') {
                param['type'] = this.select.value
                param['keywords'] = this.keywords
                if(this.select.value === 'D') {
                    param['stdtDate'] = this.date
                    param['endtDate'] = this.date2
                }
                this.$store.dispatch('searchTodo',param)
            } else {
                this.$store.dispatch('getTodoList')
            }
           
        },
    },
    computed:{
      
    }
}
</script>
