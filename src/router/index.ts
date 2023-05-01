import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {path: '/', name: 'Home', component: Home}
  /** 
   * para adicionar novas rotas para outras páginas, faça isso de forma dinâmica 
   * ex:
   * {path: '/exemplo', name: 'exemplo', component: () => import('path-da-view')}
  */
]

const router = createRouter({
  history: createWebHistory(""),
  routes
})

export default router;