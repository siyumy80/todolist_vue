import axios from 'axios'
const TARGET_URI = 'http://localhost:9000'
const Api = {
    //오늘의 할일
    getTodaysTodo(date){
        return axios.get(`${TARGET_URI}/todo/`)
    },
    //할일 list
    getTodoList(){
       return axios.get(`${TARGET_URI}/todo`)
    },
    //할일 등록
    addTodo(param){
        return axios.post(`${TARGET_URI}/todo`
        , param, {
        headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    },
    getTodo(id){
        return axios.get(`${TARGET_URI}/todo/${id}`)
     },
     searcgTodo(param) {
        return axios.post(`${TARGET_URI}/todo/search`,param)
     },
    //할일 삭제
    deleteTodo(id){
        return axios.delete(`${TARGET_URI}/todo/${id}`)
    },
    //할일 수정
    updateTodo(id, param){
        return axios.put(`${TARGET_URI}/todo/${id}`, param)
    },
    //회원가입
    signIn(param){
        return axios.post(`${TARGET_URI}/signIn`, param)
    },
    //로그인
    login(param){
        return axios.post(`${TARGET_URI}/login`, param)
    },
    chkDupUser(user_id){
        return axios.get(`${TARGET_URI}/chkDupUser/${user_id}`)
    },
}
export default Api