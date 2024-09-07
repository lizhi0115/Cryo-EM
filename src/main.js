import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/display.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' 

const app = createApp(App) 
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
   app.component(key, component)  }
   
//const app = createApp(App)
app.use(router)


app.mount('#app')
