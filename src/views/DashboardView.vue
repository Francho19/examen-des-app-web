<template>
  <div class="dashboard-wrapper d-flex flex-column min-vh-100">
    <!-- Navbar superior - componente reutilizable -->
    <NavbarComponent
      :user-name="session?.nombre"
      :user-role="session?.rol"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
    />

    <!-- Layout principal: sidebar + contenido -->
    <div class="dashboard-body d-flex flex-grow-1">
      <!-- Sidebar lateral - componente reutilizable -->
      <SidebarComponent
        :is-open="sidebarOpen"
        @close="sidebarOpen = false"
      />

      <!-- Área de contenido dinámico con rutas hijas -->
      <main class="dashboard-content flex-grow-1 p-3 p-md-4 overflow-auto">
        <!-- Las vistas hijas se cargan aquí mediante vue-router -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>

    <!-- Footer - componente reutilizable -->
    <FooterComponent />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getSession } from '../services/AuthService'
import NavbarComponent from '../components/NavbarComponent.vue'
import SidebarComponent from '../components/SidebarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

// Obtiene la sesión del usuario actual
const session = getSession()

// Controla apertura del sidebar en móvil
const sidebarOpen = ref(false)
</script>

<style scoped>
.dashboard-body {
  min-height: calc(100vh - 60px - 48px); /* 60px navbar, 48px footer */
}

.dashboard-content {
  background-color: #0d0d0d;
}

/* Transición suave entre vistas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
