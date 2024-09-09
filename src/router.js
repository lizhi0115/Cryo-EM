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
    meta: { requiresAuth: true },
    children: [
      { path: "", component: Mesh , meta: { requiresAuth: true }},  // 当访问 /index 时，重定向到 /index/mesh
      { path: "volume", component: Volume, meta: { requiresAuth: true } },  // 相对路径，不要使用 "/volume"
      { path: "mesh", component: Mesh, meta: { requiresAuth: true } },      // 相对路径，不要使用 "/mesh"
    ]
  },
  // { path: "/login", component: Sign },
];

const router = VueRouter.createRouter({
  // 使用 hash 模式，并设置基础路径为 /cryoem/
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = document.cookie.includes('satoken'); // 检查 cookie 是否存在

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/'); // 没有登录，重定向到登录页面
  } else {
    next(); // 否则允许访问
  }
});

export default router;
