import { createWebHashHistory, createRouter } from "vue-router";
import Layout from "../pages/layout/index.vue";
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
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
