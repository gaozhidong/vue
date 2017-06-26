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
# 删掉所有双向绑定，改为单向数据流

> 把一切双向绑定的语法都禁用，同时只在一个地方改动数据，那么留下来的就是单向数据流。

## 使用 Vuex 思想重构
1. 双向绑定改为单向绑定
2. 所有数据操作汇总到 store

引入 object-path，方便查找 resume 的属性
npm install --save object-path
