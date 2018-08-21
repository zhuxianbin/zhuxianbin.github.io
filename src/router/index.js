import Vue from "vue";
import NProgress from "nprogress";
import Router from "vue-router";
import HomeLayout from "@/views/home/layout";
import CenterLayout from "@/views/center/layout";
import LoginLayout from "@/views/login/layout";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            name: "home",
            redirect: "/index",
            component: HomeLayout,
            children: [
                {
                    path: "/index",
                    name: "index",
                    component: () => import("@/views/home/index"),
                    meta: {
                        openMenu: true
                    }
                },
                {
                    path: "/male",
                    name: "male",
                    component: () => import("@/views/home/male")
                },
                {
                    path: "/teacher",
                    name: "teacher",
                    component: () => import("@/views/home/teacher")
                },
                {
                    path: "/about",
                    name: "about",
                    component: () => import("@/views/home/about")
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            redirect: "/login/index",
            component: LoginLayout,
            children: [
                {
                    path: "index",
                    name: "login-index",
                    // component: Login
                    component: () => import("@/views/login/index")
                },
                {
                    path: "forget",
                    name: "login-forget",
                    // component: Login
                    component: () => import("@/views/login/forget")
                },
                {
                    path: "register",
                    name: "login-register",
                    // component: Login
                    component: () => import("@/views/login/register")
                }
            ]
        },
        {
            path: "/center",
            name: "center",
            redirect: "/center/index",
            component: CenterLayout,
            children: [
                {
                    path: "index",
                    name: "center-index",
                    // component: Index
                    component: () => import("@/views/center/index"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: "/courselist",
                    name: "courselist",
                    component: () => import("@/views/center/courselist"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: "/livelist",
                    name: "livelist",
                    component: () => import("@/views/center/livelist"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: "/filelist",
                    name: "filelist",
                    component: () => import("@/views/center/filelist"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: "/info",
                    name: "info",
                    // component: Info
                    component: () => import("@/views/center/userinfo"),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: "/orders",
                    name: "orders",
                    // component: Info
                    component: () => import("@/views/center/orders"),
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
            component: () => import("@/views/Pay")
        }
    ]
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
    // var passPath = ["/", "/login", "/forget", "/register"];
    // if (getToken()) {
    //     if (passPath.indexOf(to.fullPath) >= 0) {
    //         next("/index");
    //     } else {
    //         next();
    //     }
    // } else {
    //     if (passPath.indexOf(to.fullPath) >= 0) {
    //         next();
    //     } else {
    //         next("/login");
    //     }
    //     //next("/login")
    // }
});

router.afterEach(() => {
    NProgress.done(); // finish progress bar
});

export { router };
