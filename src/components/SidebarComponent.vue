<template>
  <!-- Sidebar lateral con menú de navegación -->
  <aside :class="['ts-sidebar d-flex flex-column', { 'sidebar-open': isOpen }]">

    <!-- Overlay para cerrar en móvil -->
    <div
      v-if="isOpen"
      class="sidebar-overlay d-md-none"
      @click="$emit('close')"
    ></div>

    <div class="sidebar-inner d-flex flex-column h-100">

      <!-- Encabezado sidebar -->
      <div
        class="sidebar-header p-3 border-bottom"
        style="border-color: var(--ts-border) !important;"
      >
        <span
          class="text-white small text-uppercase fw-semibold"
          style="letter-spacing: 0.1em;"
        >
          Navegación
        </span>
      </div>

      <!-- Menú de navegación -->
      <nav class="flex-grow-1 py-2">
        <ul class="nav flex-column gap-1 px-2">

          <li
            v-for="item in menuItems"
            :key="item.path"
            class="nav-item"
          >
            <router-link
              :to="item.path"
              class="nav-link ts-nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3"
              :class="{ active: isActive(item.path) }"
              @click="handleNavClick"
            >
              <i :class="['bi', item.icon, 'fs-5']"></i>

              <span class="fw-medium">
                {{ item.label }}
              </span>

              <i
                v-if="isActive(item.path)"
                class="bi bi-chevron-right ms-auto small"
              ></i>

            </router-link>
          </li>

        </ul>
      </nav>

      <!-- Versión en el pie del sidebar -->
      <div
        class="p-3 border-top text-center"
        style="border-color: var(--ts-border) !important;"
      >
        <small class="text-white">
          TechStore v2.0 &copy; 2025
        </small>
      </div>

    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

// Props para controlar el estado en móvil
const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

defineEmits(['close'])

const route = useRoute()

// Ítems del menú
const menuItems = [
  { path: '/dashboard', label: 'Inicio', icon: 'bi-house-door-fill' },
  { path: '/dashboard/productos', label: 'Productos', icon: 'bi-box-seam-fill' },
  { path: '/dashboard/usuarios', label: 'Usuarios', icon: 'bi-people-fill' },
]

// Verifica ruta activa
function isActive(path) {
  if (path === '/dashboard') return route.path === '/dashboard'
  return route.path.startsWith(path)
}

// Cierra sidebar en móvil
function handleNavClick() {
  // Emitimos close
}
</script>

<style scoped>
.ts-sidebar {
  background-color: #111111;
  border-right: 1px solid rgba(255, 215, 0, 0.2);
  width: 240px;
  min-height: calc(100vh - 60px);
  position: relative;
  z-index: 100;
  transition: transform 0.3s ease;
}

/* Móvil */
@media (max-width: 767px) {
  .ts-sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
    z-index: 1050;
  }

  .ts-sidebar.sidebar-open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: -1;
  }
}

.sidebar-inner {
  width: 240px;
}

/* Links blancos */
.ts-nav-link {
  color: white;
  transition: all 0.2s;
  text-decoration: none;
}

/* Hover dorado */
.ts-nav-link:hover {
  background-color: rgba(255, 215, 0, 0.08);
  color: #ffd700;
}

/* Activo */
.ts-nav-link.active {
  background-color: rgba(255, 215, 0, 0.15);
  color: #ffd700;
  border-left: 3px solid #ffd700;
}
</style>