# vue-xss
[vue-xss](https://github.com/Zhjoker/vue-xss) 基于 [js-xss](https://github.com/leizongmin/js-xss/tree/master/),过滤xss,可配置白名单,可快速的在vue的项目中使用,详细文档可见[JS-XSS文档](https://github.com/leizongmin/js-xss/blob/master/README.md)
## 快速开始
``` javascript
npm i vue-xss
```
``` javascript
import xssVue from "xss-vue";
Vue.use(vueXss,?options);
```
## 在vue中使用

### 方法调用
``` javascript
this.$xss(text,?options)
```
### 指令调用

``` javascript
<input v-xss="message">
//自定义参数
<input v-xss="{text:'alert(xss)',option:{}}">
```
## 修饰符
* .lazy 修饰符 在默认情况下，v-xss 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转变为在每次 input 事件触发停止 500ms 后数据进行同步

## options 参数说明
* 参数是非必传参数
* 可以初始化的时候通过 
<font face="STCAIYUN"  color=LightSalmon size=2 >Vue.use</font> 传入参数 或者是在组件中使用的时候传入参数 
* 当 <font face="STCAIYUN"  color=LightSalmon size=2 >Vue.use</font>  和组件使用时 同时传入参数时 以 后者 为准 