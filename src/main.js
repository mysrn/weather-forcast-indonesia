import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/js/bootstrap.js"
import {createRouter, createWebHistory} from 'vue-router'
import Home from './components/Home.vue'
import 'aos/dist/aos.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/weather-forcast-indonesia',
      name: 'Home',
      component: Home
    },
  ]
})

app.config.globalProperties.$http = axios
app.use(router)
app.mount('#app')
