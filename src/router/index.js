import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Courselist from '@/components/Courselist'
import Male from '@/components/Male'
import Pay from '@/components/Pay'
import Info from '@/components/Info'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/index',
            name: 'Index',
            component: Index
        },
        {
            path: '/courselist',
            name: 'Courselist',
            component: Courselist
        },
        {
            path: '/male',
            name: 'Male',
            component: Male
        },
        {
            path: '/pay',
            name: 'Pay',
            component: Pay
        },
        {
            path: '/info',
            name: 'Info',
            component: Info
        }
    ]
})
