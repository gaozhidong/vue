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

## 预览功能
#### ResumePreview的数据(data) 从哪来？ 

从ResumeEditor来

#### 怎么拿到数据

那么最傻的办法就是在 ResumePreview 里面去读 ResumeEditor 的 data。

这种办法可以是可以，但是有一个「耦合性」太高的问题。

假设 ResumePreview 代码是这样的：
```js
export default {
  name: 'ResumePreview',
  data: function(){
     return readResumeFromResumeEditor() // 这个函数的具体实现我们不管
  }
}
```
你会发现，ResumePreview 严重依赖 ResumeEditor，换句话说，ResumePreview 必须和 ResumeEditor 在一起，ResumePreview 不能从其他的地方读入 resume 数据。

这样的代码就很不优雅。

方案二：

讲数据抽离出来。我们能不能把 resume 的数据独立出来，专门供 ResumeEditor、ResumePreview 甚至其他组件来使用呢？可以。大概思路是这样：
```js
// ResumeEditor
import globalData from 'globalData'
export default {
  name: 'ResumeEditor',
  data: function(){
    return {
      selected: 'profile',
      resume: globalData.getResume()
    }
  }
}

// ResumePreview
import globalData from 'globalData'
export default {
  name: 'ResumePreview',
  data: function(){
    return {
      resume: globalData.getResume()
    }
  }
}
```
这样一来，ResumeEditor 和 ResumePreview 互不干涉，只是数据来自同一个地方。

ResumeEditor 改了 resume 之后，由于 ResumePreview 用的是同一个 resume，所以立马就知道 resume 变化了（Vue.js 可以监听任意一个对象的变化）。

> Tips：可以通过添加中间层来降低耦合

## Vuex

### 全局数据源

> 基于方案二，我们再进一步想，为什么不把所有的数据都交给 globalData 来控制呢？

> 上文中 ResumeEditor 的 selected 属性没有交给 globalData 管理，万一另一个组件要用这个 selected 呢？所以我们还不如把所有的数据都交给 globalData 来控制。

> 这样，globalData 就叫做全局数据源，管理所有的数据。

