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
        return axios.post(`${TARGET_URI}/todo/add`
        , param, {
        headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
        })
    },
    getTodo(id){
        return axios.get(`${TARGET_URI}/todo/${id}`)
     },
     getSearchList(type, keywords) {
        return axios.get(`${TARGET_URI}/todo/search?type=${type}&keywords=${keywords}`)
     },
//할일 삭제
    deleteTodo(param){
        return axios.post(`${TARGET_URI}/todo/delete`, param)
    },

//할일 수정
    updateTodo(id, param){
        return axios.post(`${TARGET_URI}/todo/update/${id}`, param)
    },

//회원가입
    signUp(param){
        return axios.post(`${TARGET_URI}/signUp`, param)
        .then((response)=>{
            response.data
        })
    },
//로그인
    login(param){
        return axios.post(`${TARGET_URI}/login`, param)
        .then((response)=>{

        })
    },
}

export default Api