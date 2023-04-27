import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/login', name: 'Login', component: () => import('../views/Login.vue')},
  {path: '/register', name: 'Register', component: () => import('../views/Register.vue')},
  /** 
   * para adicionar novas rotas para outras páginas, faça isso de forma dinâmica 
   * ex:
   * {path: '/exemplo', name: 'exemplo', component: () => import('path-da-view')}
  */
]

const router = createRouter({
  history: createWebHistory("/financi-web-front-end/"),
  routes
})

export default router;