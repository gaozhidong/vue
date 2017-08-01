#### webpack2

1. 创建webpack-demo 文件夹
2. cd webpack-demo   
3. npm init -y 
4. npm install --save-dev webpack
5. mkdir app && cd app
6. touch index.js
    

```js
//index.js
function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

document.body.appendChild(component());
 ```
 7. 在webpack-demo目录下 touch index.html

```js
<html>
  <head>
    <title>webpack 2 demo</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="app/index.js"></script>
  </body>
</html>
```
8. npm install --save lodash

```js
// app/js  第一行添加 import _ from 'lodash';
import _ from 'lodash';

function component () {
  ...
```

```touch
 <html>
   <head>
     <title>webpack 2 demo</title>
-    <script src="https://unpkg.com/lodash@4.16.6"></script>
   </head>
   <body>
-    <script src="app/index.js"></script>
+    <script src="dist/bundle.js"></script>
   </body>
 </html>

```
9. ./node_modules/.bin/webpack app/index.js dist/bundle.js


整体的结构
```touch
.
├── app
│   └── index.js
├── dist
│   └── bundle.js
├── index.html
├── node_modules/
└── package.json
```


```touch
1. ./node_modules/.bin/webpack app/index.js dist/bundle.js 将 app/index.js 变成 dist/bundle.js
2. index.html 引用的是 dist/bundle.js
3. lodash 被安装在 node_modules 里
4. webpack 也被安装在 node_modules里，
5. ./node_modules/.bin/webpack 就是一个可执行文件
6. webpack、lodash 的版本号都被写在 package.json 里了
```