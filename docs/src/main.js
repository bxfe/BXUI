import Vue from 'vue'
import Router from 'vue-router'
import Home from './component/home/'
import Hello from './component/hello/'
import App from './App'

Vue.use(Router)
const config = {
    linkActiveClass: 'active',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
        { path: '/home', component: Home },
        { path: '/hello', component: Hello },
        { path: '*', redirect: '/home' }
    ]
}

App.router = new Router(config)
new Vue(App).$mount('#app')
