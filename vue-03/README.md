## Todo 存储数据

我们的数据存在 localStorage 中，这样有很多弊端：

1. 如果用户清空缓存，那么 todoList 就没了……
2. 如果用户换一台电脑，那么 todoList 也看不见了……
3. 使用LeanCloud 存储数据
    **安装LeanCloud SDK** 
    <https://leancloud.cn/docs/sdk_setup-js.html>
    npm install leancloud-storage --save
    **初始化** 
    https://leancloud.cn/docs/sdk_setup-js.html#初始化
    
```js
    import AV from 'leancloud-storage'

    var APP_ID = '8axnRtGoxCJhEzsvNPEAHnol-gzGzoHsz';
    var APP_KEY = '0YH4XkYflb4CUPfA743TGj8G';
    AV.init({
    appId: APP_ID,
    appKey: APP_KEY
    });

```
## 预览地址
<https://gaozhidong.github.io/vue/vue-02/page.html>