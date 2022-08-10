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
    children: [
      {
        path: "/home",
        redirect: "/SpecialArea",
      },
      {
        path: "/pageHome",
        name: "homePage",
        component: () => import("../components/homePage/homePage.vue"),
      },
      {
        path: "/users_designer_works/getList",
        name: "getList",
        component: () => import("../components/AccountSettings/AccountSettings.vue"),
      },
      {
        path: "/users_designer/editInfo",
        name: "editInfo",
        component: () => import("../components/personal/personal.vue")
      },
      {
        path: "/MyAdministration",
        name: "MyAdministration",
        component: () => import("../components/MyAdministration/MyAdministration.vue")
      },
      {
        path: "/SpecialArea",
        name: 'SpecialArea',
        component: () => import("../components/Designerzone/Designerzone.vue")
      },
      {
        path: "/UploadWorks",
        name: 'UploadWorks',
        component: () => import("../components/UploadWorks/UploadWorks.vue"),
        meta: { keepAlive: true }
      },
      {
        path: "/BusinessChain",
        name: "BusinessChain",
        component: () => import("../components/BusinessChain/BusinessChain.vue")
      },
      {
        path: "/entDetail:name",
        name: "entDetail",
        component: () => import("../components/BusinessChain/Enterprisedetails/Enterprisedetails.vue")
      },
      {
        path: "/address",
        name: "address",
        component: () => import("../components/address/address.vue")
      },
      {
        path: "/brandDetails:id",
        name: "brandDetails",
        component: () => import("../components/MyAdministration/optins/goBand.vue")
      },
      {
        path: "/match",
        name: "match",
        component: () => import("../components/match/match.vue")
      },
      {
        path: "/ptmatch",
        name: "ptmatch",
        component: () => import("../components/match/ptmatch/ptmatch.vue")
      },
      {
        path: "/entmatch",
        name: "entmatch",
        component: () => import("../components/match/entmatch/entmatch.vue")
      },
      {
        path: "/EventDetails:id",
        name: "EventDetails",
        component: () => import("../components/match/EventDetails/EventDetails.vue")
      },
      {
        path: "/compete:id",
        name: "compete",
        component: () => import("../components/match/EventDetails/compete/compete.vue")
      },
      {
        path: "/matchworksShow/:works_id:id",
        name: "matchworksShow",
        component: () => import("../components/match/EventDetails/screeningDetial/screeningDetial.vue")
      },
      {
        path: "/matchattended",
        name: "matchattended",
        component: () => import("../components/matchAttended/matchAttended.vue")
      },
      {
        path: "/OpenMember",
        name: 'OpenMember',
        component: () => import("../components/OpenMember/OpenMember.vue"),
        meta: { keepAlive: true }
      },
      //作品详情
      {
        path: "/workDetails:id",
        name: 'workDetails',
        component: () => import("../components/workDetails/workDetails.vue"),
        meta: { keepAlive: true }
      },
      {
        path: "/Mywork",
        name: 'Mywork',
        component: () => import("../components/Mywork/Mywork.vue"),
        meta: { keepAlive: true }
      },
      //设计师主页
      {
        path: "/DesignerHomepage:id",
        name: 'DesignerHomepage',
        component: () => import("../components/DesignerHomepage/DesignerHomepage.vue"),
        meta: { keepAlive: true }
      },
      {
        path: "/openVip",
        name: "openVip",
        component: () => import("../components/openVip/openVip.vue")
      },
      {
        path: "/download",
        name: "download",
        component: () => import("../components/BusinessChain/Enterprisedetails/downloadapp.vue")
      },
      {
        path: "/vipMember",
        name: 'vipMember',
        component: () => import("../components/openVip/vipMember/vipMember.vue")
      },
      {
        path: "/Circle",
        name: "Circle",
        component: () => import("../components/Circle/Circle.vue")
      },
      {
        path: "/crDetails:id",
        name: "crDetails",
        component: () => import("../components/Circle/CircleList/details/crDetails.vue")
      },
      {
        path: "/Notice:id",
        name: 'Notice',
        component: () => import("../components/Circle/CircleList/details/Notice/Notice.vue")
      },
      {
        path: "/MyMgt:id",
        name: "MyMgt",
        component: () => import("../components/Circle/CircleList/details/Mymgt/Mymgt.vue")
      },
      {
        path: "/getMember:id",
        name: "getMember",
        component: () => import("../components/Circle/CircleList/details/Mymgt/getMember/getMember.vue")
      },
      {
        path: "/Circles/invitation:id",
        name: "Circles/invitation",
        component: () => import("../components/Circle/CircleList/details/Mymgt/managementRen/managementRen.vue")
      },
      {
        path: "/Circles/del:id",
        name: "Circles/del",
        component: () => import("../components/Circle/CircleList/details/Mymgt/managementRen/managementdel.vue")
      }
      , {
        path: "/Forum/showForum:id",
        name: "Forum/showForum",
        component: () => import("../components/Circle/CircleList/createDetils/createDetils.vue")
      },
      {
        path: "/hotTopic",
        name: "hotTopic",
        component: () => import("../components/Circle/CircleList/details/hotTopic/hotTopic.vue"),
      },
      {
        path: "/hotTopicdetail",
        name: "hotTopicdetail",
        component: () => import("../components/Circle/CircleList/details/hotTopic/hotTopicdetail.vue"),
      },
      {
        path:'/DesignerList',
        name:"DesignerList",
        component:()=>import("../components/DesignerList/DesignerList.vue")
      },
      {
        path:'/team',
        name:"team",
        component:()=>import("../components/team/team.vue")
      },
      {
        path:"/worksList",
        name:"worksList",
        component:()=>import("../components/worksList/worksList.vue")
      },
      {
        path:"/news",
        name:"news",
        component:()=>import("../components/news/news.vue")
      },
      {
        path:"/follow",
        name:'follow',
        component:()=> import("../components/Mywork/follow/follow.vue")
      },
      {
        path:"/bond",
        name:"bond",
        component:()=>import("../components/openVip/bond/bond.vue")
      },
      {
        path:"/complaint",
        name:'complaint',
        component:()=> import("../components/complaint/complaint.vue")
      },
      {
        path:"/crowd",
        name:"crowd",
        component:()=>import("../components/workDetails/crowd-funding/crowd-funding.vue")
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
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});
// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") return next();
//   const totoken = window.localStorage.getItem("token");
//   if (!totoken) return next("/login");
//   next();
// });

export default router;
