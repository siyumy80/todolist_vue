<template>
  <el-container  id="app">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="12"><todaysTodo /></el-col>
        <el-col :span="10"><search/></el-col>
      </el-row>
    </el-header>
    <el-main>
     <todoList  />
    </el-main>
  </el-container>
</template>
<script>
import TodaysTodo from './components/TodaysTodo';
import Search from './components/Search';
import TodoList from './components/TodoList';
export default {
  name: 'app',
  components:{
    'todaysTodo' : TodaysTodo,
    'search'     : Search,
    'todoList'   : TodoList
  }
}
</script>
