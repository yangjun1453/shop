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
