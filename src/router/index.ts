import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import { useProfileStore } from "../stores/userStore";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login",
    component: () => import("../views/LoginPage.vue") },
  { path: "/register", name: "Register",
    component: () => import("../views/RegisterPage.vue") },
  { path: "/news", name: "News",
    component: () => import("../views/NewsPage.vue") },
  { path: "/dashboard", name: "Dashboard",
    component: () => import("../views/DashboardPage.vue") },
  { path: "/news/:id", name: "FullNews",
    component: () => import("../views/FullNewsPage.vue") },
  { path: "/ops", name: "Ops",
    component: () => import("../views/NotFound.vue") },
  { path: "/transactions", name: "Transactions",
    component: () => import("../views/TransactionsPage.vue") },
  { path: "/reports", name: "Reports",
    component: () => import("../views/ReportsPage.vue") },
  { path: "/courses", name: "Courses",
    component: () => import("../views/CoursesPage.vue") },
  { path: "/goals", name: "Goals",
    component: () => import("../views/GoalsPage.vue") },
  { path: "/courses/:id", name: "Lessons",
    component: () => import("../views/LessonsPage.vue") },
  { path: "/profile", name: "Profile",
    component: () => import("../views/ProfilePage.vue") },
  { path: "/add-news", name: "Adicionar Notícia",
    component: () => import("../views/AddNewsPage.vue") },
];

const noAuthRoutes = [
  "Login",
  "Register",
  "News",
  "FullNews",
  "NotFound",
  "Home",
];

const authRoutes = ["Adicionar Notícia"];
const router = createRouter({
  history: createWebHistory(""),
  routes,
});

router.beforeEach((to) => {
  const { isLogged, isAdmin } = useProfileStore();
  if (
    !noAuthRoutes.includes(to.name?.toString() ?? "") &&
    isLogged !== true
  ) {
    router.push("/login");
  }
  if(authRoutes.includes(to.name?.toString() ?? "") &&
    isAdmin !== true
  ) {
    router.push("/ops");
  }
});

export default router;