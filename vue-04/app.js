import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = '5JByJXWAj0vic0v9qs2qPpxO-gzGzoHsz';
var APP_KEY = '1MeAteFvMcvhLAgH4cxxUbig';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: [],
        actionType: 'signUp',
        currentUser: null,
        formData: {
            username: '',
            password: ''
        }
    },
    created: function () {//保存代办事项
        // onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
        /*  window.onbeforeunload = () => {
              let dataString = JSON.stringify(this.todoList) // JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
  
              var AVTodos = AV.Object.extend('AllTodos');
              var avTodos = new AVTodos();
              avTodos.set('content', dataString);
              avTodos.save().then(function (todo) {
                  // 成功保存之后，执行其他逻辑.
                  console.log('保存成功');
              }, function (error) {
                  // 异常处理
                  console.error('保存失败');
              });
  
          }
  
          let oldDataString = window.localStorage.getItem('myTodos')
          let oldData = JSON.parse(oldDataString)
          this.todoList = oldData || []*/

        this.currentUser = this.getCurrentUser();
    },
    methods: {
        saveTodos: function () {
            let dataString = JSON.stringify(this.todoList)
            var AVTodos = AV.Object.extend('AllTodos');
            var avTodos = new AVTodos();
            avTodos.set('content', dataString);
            avTodos.save().then(function (todo) {
                alert('保存成功');
            }, function (error) {
                alert('保存失败');
            });
        },
        addTodo: function () {
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date(),
                done: false // 添加一个 done 属性
            })
            this.newTodo = '';
            this.saveTodos();
        },
        // 加了👇这个函数
        removeTodo: function (todo) {
            let index = this.todoList.indexOf(todo);// Array.prototype.indexOf 是 ES 5 新加的 API
            this.todoList.splice(index, 1);// 不懂 splice？赶紧看 MDN 文档！
            this.saveTodos();
        },
        signUp: function () {//注册
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
            }, (error) => {
                alert('注册失败')
            });
        },
        login: function () {//登录
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
            }, (error) => {
                alert("登录失败")
            });
        },
        getCurrentUser: function () {//获取当前登录的用户  AV.User.current() 
            let current = AV.User.current();
            if (current) {
                let { id, createdAt, attributes: { username } } = current;
                return { id, username, createdAt }
            } else {
                return null
            }
        },
        logout: function () {//登出功能
            AV.User.logOut();
            this.currentUser = null;
            window.localtion.reload();
        }
    }
})   