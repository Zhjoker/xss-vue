// import xssP from './xss.vue';
import xss from "./xss.js";
import _ from 'lodash';
let Xss = {};
let lazyFunc;
/**
 * @calss Xss
 * @param {Vue} vue 实例 vue.use 的时候传入
 * @param {options} [options=null]   
 * @private filterXSS 实例对象 
 * 
 * */
Xss.install = function (Vue, options = null) {
  let filterXSS = '';
  if (typeof options === 'object') {//类型为 object 存在参数 实例化
    for (let props in options) {
      if (options.hasOwnProperty(props)) {
        opts[props] = options[props]
      }
    }
    filterXSS = new xss.FilterXSS(opts);
  } else if (typeof options !== null) {// 不为null 并且不为 object 全局参数，类型错误
    throw "type error, options must be object"
  }

  /**
   * @function  $xss 
   * @param {String} text html片段
   * @param {Object} option 参数 xss.js
   */
  Vue.prototype.$xss = function (text, option = null) {// 上面那个options是全局的，也可以通过局部option来替换全局的
    let filterText = '';
    if (typeof ilterXss != 'string' && typeof option == null) {
      filterText = FilterXSS.process(text);
    } else {
      if (option !== null) {
        filterText = xss(text)
      } else {
        filterText = xss(text, option)
      }
    }
    return filterText;
  }

  Vue.directive('xss', {
    bind(el, binding) {//初次绑定 看是否有 .lazy 修饰符 存在lazy 初始化 debounced 函数
      let { lazy } = binding.modifiers;

      if (lazy) {
        lazyFunc = _.debounced(function (text, option = null) {
          if (typeof ilterXss != 'string' && typeof option == null) {
            return FilterXSS.process(text);
          } else {
            if (option !== null) {
              return xss(text)
            } else {
              return xss(text, option)
            }
          }
        }, 500)
      }
    },
    update(el, binding, vnode, oldVnode) {
      let Doctype = el.tagName;
      if (Doctype === "INPUT") {
        let bindingValue = binding.value;
        let bindingValueType = type of bindingValue;
        let { lazy } = binding.modifiers;

        el.addEventListener("input", function () {
          // 是否存在.lazy 修饰符
          if (lazy) {
            switch (bindingValueType) {
              case "object":
                el.value = lazyFunc({ ...bindingValue })
                break;
              case "string":
                el.value = lazyFunc({ text: bindingValue })
                break;
            }
          } else {

            if (bindingValueType === "object") {
              let { option = null, text } = bindingValue;
            }
            
            if (typeof ilterXss != 'string' && typeof option == null) {
              if (!text) {
                el.value = FilterXSS.process(bindingValue.text);
              } else {
                el.value = FilterXSS.process(text);
              }
            } else {
              if (option !== null) {
                el.value = xss(bindingValue.text)
              } else {
                el.value = xss(bindingValue.text, bindingValue.option)
              }
            }
          }

        })
      } else {
        throw 'el type error,must be input'
      }
    },
    unbind(el) {
      el.removeEventListener('input');
    }
  }
}
export default Xss;


