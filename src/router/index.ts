import { createWebHashHistory, createRouter } from "vue-router";
import Layout from "../pages/layout/index.vue";
import { supabase } from "../lib/supabaseClient";
const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      { path: "/", component: () => import("../pages/home/index.vue") },
      {
        path: "/products",
        component: () => import("../pages/products/index.vue"),
      },

      {
        path: "/products/:id",
        name: "ProductDetail",
        component: () => import("../pages/products/ProductDetail.vue"),
        props: true, // 可选：将 params 作为 props 传入组件
      },
      {
        path: "/demo",
        component: () => import("../pages/demo/index.vue"),
      },
      {
        path: "cart",
        component: () => import("../pages/cart/index.vue"),
      },
      {
        path: "login",
        component: () => import("../pages/login/index.vue"),
      },
      {
        path: "register",
        component: () => import("../pages/register/index.vue"),
      },
      {
        path: "/profile",
        component: () => import("../pages/profile/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const { data } = await supabase.auth.getUser();

  if (to.path === "/profile" && !data.user) {
    return "/login"; // 未登录则跳转
  }
});
export default router;
