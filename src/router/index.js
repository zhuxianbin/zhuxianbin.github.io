import Vue from "vue";
import Router from "vue-router";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Index from "@/pages/Index";
// import Courselist from '@/pages/Courselist'
import Male from "@/pages/Male";
import Pay from "@/pages/Pay";
import Info from "@/pages/Info";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        },
        {
            path: "/page",
            name: "page",
            component: Layout,
            children: [
                {
                    path: "/index",
                    name: "Index",
                    component: Index
                },
                {
                    path: "/courselist",
                    name: "Courselist",
                    component: () => import("@/pages/Courselist")
                },

                {
                    path: "/info",
                    name: "Info",
                    component: Info
                }
            ]
        },
        {
            path: "/pay",
            name: "Pay",
            component: Pay
        },
        {
            path: "/male",
            name: "Male",
            component: Male
        }
    ]
});
