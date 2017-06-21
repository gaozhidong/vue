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

        this.currentUser = this.getCurrentUser();
        //获取User的AllTodos
        if (this.currentUser) {
            var query = new AV.Query('AllTodos');
            query.find()
                .then((todos) => {
                    let avAllTodos = todos[0] // 因为理论上 AllTodos 只有一个，所以我们取结果的第一项
                    let id = avAllTodos.id
                    this.todoList = JSON.parse(avAllTodos.attributes.content) // 为什么有个 attributes？因为我从控制台看到的
                    this.todoList.id = id // 为什么给 todoList 这个数组设置 id？因为数组也是对象啊
                }, (error) => {
                    console.error(error)
                })
        }
    },
    methods: {
        updateTodos: function () {
            // 想要知道如何更新对象，先看文档 https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
            let dataString = JSON.stringify(this.todoList) // JSON 在序列化这个有 id 的数组的时候，会得出怎样的结果？
            let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id)
            avTodos.set('content', dataString)
            avTodos.save().then(() => {
                console.log('更新成功')
            })
        },
        saveTodos: function () {//保存todo
            let dataString = JSON.stringify(this.todoList)
            var AVTodos = AV.Object.extend('AllTodos');
            var avTodos = new AVTodos();
            var acl = new AV.ACL()
            acl.setReadAccess(AV.User.current(), true) // 只有这个 user 能读
            acl.setWriteAccess(AV.User.current(), true) // 只有这个 user 能写

            avTodos.set('content', dataString);
            avTodos.setACL(acl) // 设置访问控制
            avTodos.save().then((todo) => {
                this.todoList.id = todo.id  // 一定要记得把 id 挂到 this.todoList 上，否则下次就不会调用 updateTodos 了
                alert('保存成功');
            }, (error) => {
                alert('保存失败');
            });
        },
        saveOrUpdateTodos: function () {//如果有 id，那么就更新原有记录，而不是新建
            if (this.todoList.id) {
                this.updateTodos()
            } else {
                this.saveTodos()
            }
        },
        addTodo: function () {
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date(),
                done: false // 添加一个 done 属性
            })
            this.newTodo = '';
            this.saveOrUpdateTodos();// 不能用 saveTodos 了
        },
        // 加了👇这个函数
        removeTodo: function (todo) {
            let index = this.todoList.indexOf(todo);// Array.prototype.indexOf 是 ES 5 新加的 API
            this.todoList.splice(index, 1);// 不懂 splice？赶紧看 MDN 文档！
            this.saveOrUpdateTodos() // 不能用 saveTodos 了
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