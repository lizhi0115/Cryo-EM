import * as Vue from "vue";
import * as VueRouter from "vue-router";

import Mesh from "./components/Mesh.vue";
import Volume from "./components/Volume.vue";
import Sign from "./components/Sign.vue";
import Home from "./components/Home.vue";
const routes = [
  { path: "/", component: Sign },
  {
    path: "/index", component: Home,
    children: [
      { path: "", component: Mesh },  // 当访问 /index 时，重定向到 /index/mesh
      { path: "volume", component: Volume },  // 相对路径，不要使用 "/volume"
      { path: "mesh", component: Mesh },      // 相对路径，不要使用 "/mesh"
    ]
  },
  // { path: "/login", component: Sign },
];

const router = VueRouter.createRouter({
  // 使用 hash 模式，并设置基础路径为 /cryoem/
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});


export default router;
