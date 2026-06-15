<template>
  <!-- Navbar superior reutilizable -->
  <nav class="navbar navbar-dark ts-navbar px-3 px-md-4">
    <div class="d-flex align-items-center gap-3">
      <!-- Botón toggle sidebar (móvil) -->
      <button
        class="btn btn-link text-warning p-0 d-md-none"
        @click="$emit('toggle-sidebar')"
        title="Menú"
      >
        <i class="bi bi-list fs-4"></i>
      </button>

      <!-- Logo y nombre del negocio -->
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-cpu-fill" style="color: var(--ts-gold); font-size: 1.6rem;"></i>
        <span class="navbar-brand mb-0 fw-bold fs-5">
          Tech<span style="color: var(--ts-gold);">Store</span>
        </span>
      </div>
    </div>

    <!-- Info usuario y cierre de sesión -->
    <div class="d-flex align-items-center gap-3">
      <div class="d-none d-sm-flex align-items-center gap-2">
        <i class="bi bi-person-circle" style="color: var(--ts-gold); font-size: 1.2rem;"></i>
        <span class="text-light small">{{ userName }}</span>
        <span class="badge ts-badge-role">{{ userRole }}</span>
      </div>
      <button
        class="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
        @click="handleLogout"
        title="Cerrar sesión"
      >
        <i class="bi bi-box-arrow-right"></i>
        <span class="d-none d-sm-inline">Salir</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { logout, getSession } from '../services/AuthService'

// Props recibidas del componente padre
const props = defineProps({
  userName: { type: String, default: 'Usuario' },
  userRole: { type: String, default: 'Vendedor' }
})

// Emite eventos al padre
defineEmits(['toggle-sidebar'])

const router = useRouter()

/**
 * Cierra la sesión y redirige al login.
 */
function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.ts-navbar {
  background-color: #111111;
  border-bottom: 2px solid rgba(255, 215, 0, 0.3);
  min-height: 60px;
}

.ts-badge-role {
  background-color: rgba(255, 215, 0, 0.15);
  color: #ffd700;
  border: 1px solid rgba(255, 215, 0, 0.3);
  font-size: 0.7rem;
}
</style>
