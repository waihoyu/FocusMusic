import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入
import VueRouter from 'vue-router'
// use
Vue.use(VueRouter)
// 导入需要通过路由管理的组件
import findmusic from './components/3.findmusic.vue'
import playlis from './components/4.playlis.vue'
import songs from './components/5.songs.vue'
import mvs from './components/6.mvs.vue'
import result from './components/7.result.vue'
import mv from './components/8.MV.vue'

// 创建
let router=new VueRouter({
  routes:[
  {path:"/findmusic",component:findmusic},
  {path:"/playlis",component:playlis},
  {path:"/songs",component:songs},
  {path:"/mvs",component:mvs},
    {path:"/result",component:result},
    {path:"/mv",component:mv}
  ]
})

// 导入element -ui
import ElementUI from 'element-ui'
// 导入element -ui样式
import 'element-ui/lib/theme-chalk/index.css'
// 使用
Vue.use(ElementUI)

// 挂载
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
