import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    children:[
      {
        path: "/home",
        redirect: "/users_designer_works/getList",
      },
      {
        path: "/pageHome",
        name: "homePage",
        component: () => import("../components/homePage/homePage.vue"),
      },
      {
        path:"/users_designer_works/getList",
        name:"getList",
         component: () => import("../components/AccountSettings/AccountSettings.vue"),
      },
      {
        path:"/users_designer/editInfo",
        name:"editInfo",
        component: ()=> import("../components/personal/personal.vue")
      },
      {
        path:"/MyAdministration",
        name:"MyAdministration",
        component: ()=> import("../components/MyAdministration/MyAdministration.vue")
      },
      {
        path:"/SpecialArea",
        name:'SpecialArea',
        component:()=> import("../components/Designerzone/Designerzone.vue")
      },
      {
        path:"/UploadWorks",
        name:'UploadWorks',
        component:()=> import("../components/UploadWorks/UploadWorks.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
