import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    },
    created: function () {
        let i = 0
        setInterval(() => {
            this.newTodo = i // this.newTodo 就是 data.newTodo，实际上 this.newTodo 是 data.newTodo 的代理
            i += 1
        }, 1000)
    }
})  