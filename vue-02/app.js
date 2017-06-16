import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: []
    },
    methods: {
        //添加todo
        addTodo: function () {
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date()
            })
            //console.log(this.todoList)
            this.newTodo = '';//变成空
        }
    }
})   