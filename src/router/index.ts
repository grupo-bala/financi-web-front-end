import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'

const routes = [
  {path: '/', name: 'News', component: News}
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