import Vue from "vue";
import Router from "vue-router";
// import Layout from "@/pages/Layout";
// import Login from "@/pages/Login";
//import Index from "@/pages/Index";
// import Courselist from '@/pages/Courselist'
//import Male from "@/pages/Male";
// import Pay from "@/pages/Pay";
// import Info from "@/pages/Info";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Login",
            component: () => import("@/pages/Login")
        },
        {
            path: "/login",
            name: "Login",
            // component: Login
            component: () => import("@/pages/Login")
        },
        {
            path: "/page",
            name: "page",
            // component: Layout,
            component: () => import("@/pages/Layout"),
            children: [
                {
                    path: "/index",
                    name: "Index",
                    // component: Index
                    component: () => import("@/pages/Index"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: "/courselist",
                    name: "Courselist",
                    component: () => import("@/pages/courselist"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: "/livelist",
                    name: "livelist",
                    component: () => import("@/pages/livelist"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: "/filelist",
                    name: "filelist",
                    component: () => import("@/pages/filelist"),
                    meta: {
                        keepAlive: true
                    }
                },

                {
                    path: "/info",
                    name: "Info",
                    // component: Info
                    component: () => import("@/pages/Info"),
                    meta: {
                        keepAlive: true
                    }
                },{
                    path: "/orders",
                    name: "orders",
                    // component: Info
                    component: () => import("@/pages/orders"),
                    meta: {
                        keepAlive: true
                    }
                }
            ]
        },
        {
            path: "/pay/:id?",
            name: "Pay",
            // component: Pay
            component: () => import("@/pages/Pay")
        },
        {
            path: "/male",
            name: "Male",
            component: () => import("@/pages/Male"),
            meta: {
                keepAlive: true
            }
        }
    ]
});
