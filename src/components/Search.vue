<template>
    <div class="grid-content">
    <el-col :span="12">
        <el-select v-model="selected" placeholder="Select" @change="changeHandler">
            <el-option label="선택" value=""></el-option>
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-col>
    <el-col :span="12">
        <input type="search" placeholder="Please input" v-model="keywords">
        <el-button icon="el-icon-search" @click="filterTodo"></el-button>
       
    </el-col>
    </div>
</template>
<script>
export default {
    data(){
        return {
            keywords : '',
            selected : '',
            options :[
                {label : '제목', value :'title'},
                {label : 'tag', value : 'tag'},
            ]
        }
    }

    ,methods : {
        filterTodo(){
            if(this.keywords==='') {
                alert('keyword를 입력해 주세요.')
                return false;
            }
            this.$EventBus.$emit('filterTodo', this.selected ,this.keywords)
        },
        changeHandler() {
            if(this.selected==='') {
                this.keywords = ''
            }
        }
    }
}
</script>
