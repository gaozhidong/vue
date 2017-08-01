import Vue from 'vue'
import {formatDate} from './date.js' 

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    },
    created: function () {//保存代办事项
        // onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
        window.onbeforeunload = () => {
            let dataString = JSON.stringify(this.todoList) // JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
            window.localStorage.setItem('myTodos', dataString) // 看文档https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
        }

        let oldDataString = window.localStorage.getItem('myTodos')
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []

    },
    methods: {
        addTodo: function () {
            this.todoList.push({
                title: this.newTodo,
                createdAt: date(),
                done: false // 添加一个 done 属性
            })
            function date(){
                var date = new Date()
                return date.getTime()
            }
            this.newTodo = ''
        },
        // 加了👇这个函数
        removeTodo: function (todo) {
            let index = this.todoList.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
            this.todoList.splice(index, 1) // 不懂 splice？赶紧看 MDN 文档！
        }
    },
     filters:{
        formatDate(time){
            let date = new Date(time);
            return formatDate(date,'yyyy-MM-dd hh:mm');
            //此处formatDate是一个函数，将其封装在date.js里面，便于全局使用
        }
    }
    
})   