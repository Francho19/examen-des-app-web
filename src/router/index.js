/**
 * Configuración de rutas con vue-router.
 * Incluye guardia de navegación (beforeEach) para proteger rutas autenticadas.
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { isAuthenticated } from '../services/AuthService'

// Importación lazy de vistas para mejor rendimiento
const LoginView    = () => import('../views/LoginView.vue')
const DashboardView = () => import('../views/DashboardView.vue')
const HomeView     = () => import('../views/HomeView.vue')
const ProductView  = () => import('../views/ProductView.vue')
const UsersView    = () => import('../views/UsersView.vue')

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      { path: '',        name: 'Home',      component: HomeView },
      { path: 'productos', name: 'Productos', component: ProductView },
      { path: 'usuarios',  name: 'Usuarios',  component: UsersView },
    ]
  },
  // Ruta comodín → redirige al login
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// ─── Guardia de navegación global ─────────────────────────────────
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login')                    // no autenticado → login
  } else if (to.path === '/login' && isAuthenticated()) {
    next('/dashboard')                // ya autenticado → dashboard
  } else {
    next()
  }
})

export default router
