// import xssP from './xss.vue';
import xss from "./xss.js";
let Xss = {}
/**
 * @calss Xss
 * @params Vue vue 实例 vue.use 的时候传入
 * @params ?options {Object}  
 * @private filterXSS 实例对象 
 * */ 
Xss.install = function (Vue, options=null) {
  let filterXSS='';
  if (typeof options == 'object') {//类型为 object 存在参数 实例化
    for (let props in options) {
      if (options.hasOwnProperty(props)) {
        opts[props] = options[props]
      }
    }
    filterXSS = new xss.FilterXSS(opts);
  } else if (typeof options != null) {// 不为null 并且不为 object 全局参数，类型错误
    throw "type error, options must be object"
  }

  Vue.prototype.$xss = function (text, option=null) {// 上面那个options是全局的，也可以通过局部option来替换全局的
     let filterText = '';
    if(typeof filterXSS!='string' && typeof option==null){
      filterText=FilterXSS.process(text);
    }else{
      if(option!=null){
        filterText=xss(text)
      }else{
        filterText=xss(text,option)
      }
    }
    return filterText;
  }


  Vue.directive('xss',{
    update (el , binding , vnode , oldVnode) {
      
    }
  })


}


export default Xss;


