import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/mine',
        name: 'home',
        component: Home,
        children: [{
            path: '/mine/home',
            component: () =>
                import ('../views/mine/home.vue')
        }, {
            path: '/mine/constmanage',
            component: () =>
                import ('../views/mine/constmanage.vue')
        }, {
            path: '/mine/meetingmanage',
            component: () =>
                import ('../views/mine/meetingmanage.vue')
        }, {
            path: '/mine/meetingresad',
            component: () =>
                import ('../views/mine/meetingresad.vue')
        }, {
            path: '/mine/myres',
            component: () =>
                import ('../views/mine/myres.vue')
        }, {
            path: '/mine/resad',
            component: () =>
                import ('../views/mine/resad.vue')
        }, {
            path: '/mine/resmeeting',
            component: () =>
                import ('../views/mine/resmeeting.vue')
        }, {
            path: '/mine/respm',
            component: () =>
                import ('../views/mine/respm.vue')
        }, {
            path: '/mine/systemsetup',
            component: () =>
                import ('../views/mine/systemsetup.vue')
        }, {
            path: '/mine',
            redirect: '/mine/home'
        }]
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }, {
        path: '/',
        redirect: '/mine'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router