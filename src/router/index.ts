import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login",
    component: () => import("../views/LoginPage.vue") },
  { path: "/register", name: "Register",
    component: () => import("../views/RegisterPage.vue") },
  { path: "/news", name: "News",
    component: () => import("../views/NewsPage.vue") },
  /**
   para adicionar novas rotas para outras páginas, faça isso de forma dinâmica
   ex:
   {path: "/exemplo", name: "exemplo", component: () => import("path-da-view")}
  */
];

const router = createRouter({
  history: createWebHistory(""),
  routes,
});

export default router;