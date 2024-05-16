import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import * as echarts from 'echarts'
import axios from 'axios'
import "@/use/polyfill"

const app = createApp(App)
app.provide('$echarts', echarts)
app.provide('$axios', axios)
app.use(router).mount('#app')
