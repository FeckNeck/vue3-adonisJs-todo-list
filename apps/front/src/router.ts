import { createWebHistory, createRouter } from "vue-router";
import { useAuth } from "./composable/useAuth";

const { isAuthenticated, check } = useAuth();
const router = createRouter({
  routes: [
    {
      path: "/",
      redirect: "/auth",
    },
    {
      path: "/auth",
      redirect: "/auth/login",
      meta: { requiresAuth: false },
      component: () => import("./pages/Auth.vue"),
      children: [
        {
          path: "/auth/login",
          name: "login",
          meta: { requiresAuth: false },
          component: () => import("./components/auth/Login.vue"),
        },
        {
          path: "/auth/register",
          name: "register",
          meta: { requiresAuth: false },
          component: () => import("./components/auth/Register.vue"),
        },
      ],
    },
    {
      path: "/todo",
      name: "todo",
      meta: { requiresAuth: true },
      component: () => import("./pages/TodoList.vue"),
    },
  ],
  history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
  await check();
  if (!isAuthenticated.value && to.meta.requiresAuth) {
    next("/auth/login");
  } else if (isAuthenticated.value && !to.meta.requiresAuth) {
    next("/todo");
  } else {
    next();
  }
});

export default router;
