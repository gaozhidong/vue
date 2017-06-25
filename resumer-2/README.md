# resumer

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```
> 为了让 node-sass 顺利安装，请在先在命令运行
```js
export SASS_BINARY_SITE="https://npm.taobao.org/mirrors/node-sass"

npm install --save  sass-loader node-sass

```


遇到的问题 
如果打包后路径出错  把 config下的index.js  assetsPublicPath :'/'  改为 assetsPublicPath :'./'