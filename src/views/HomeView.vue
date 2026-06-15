<template>
  <div>

    <!-- Encabezado de bienvenida -->
    <div class="mb-4">

      <h2 class="fw-bold mb-1 text-white">
        Bienvenido,
        <span style="color: var(--ts-gold);">
          {{ session?.nombre?.split(' ')[0] }}
        </span>
        👋
      </h2>

      <!-- Fondo negro → texto blanco -->
      <p class="text-white">
        Panel de control de TechStore &mdash; {{ today }}
      </p>

    </div>

    <!-- Accesos rápidos -->
    <h5 class="fw-bold mb-3 text-white">
      Accesos rápidos
    </h5>

    <!-- Tarjetas de estadísticas -->
    <div class="row g-3 mb-4">

      <!-- Total productos -->
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="stat-card p-4 rounded-4 h-100">

          <div class="d-flex align-items-center justify-content-between mb-3">

            <div>

              <!-- Fondo negro → texto blanco -->
              <p class="text-white small mb-1">
                Total Productos
              </p>

              <h3
                class="fw-bold mb-0"
                style="color: var(--ts-gold);"
              >
                {{ stats.totalProductos }}
              </h3>

            </div>

            <div class="stat-icon">
              <i
                class="bi bi-box-seam-fill fs-2"
                style="color: var(--ts-gold);"
              ></i>
            </div>

          </div>

          <div class="progress" style="height: 4px; background: #333;">
            <div
              class="progress-bar"
              style="width: 100%; background: var(--ts-gold);"
            ></div>
          </div>

        </div>
      </div>

      <!-- Inventario -->
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="stat-card p-4 rounded-4 h-100">

          <div class="d-flex align-items-center justify-content-between mb-3">

            <div>

              <!-- Fondo negro → texto blanco -->
              <p class="text-white small mb-1">
                Valor en Inventario
              </p>

              <h3
                class="fw-bold mb-0"
                style="color: #22c55e; font-size: 1.1rem;"
              >
                {{ stats.valorInventario }}
              </h3>

            </div>

            <div class="stat-icon">
              <i
                class="bi bi-currency-dollar fs-2"
                style="color: #22c55e;"
              ></i>
            </div>

          </div>

          <div class="progress" style="height: 4px; background: #333;">
            <div
              class="progress-bar"
              style="width: 75%; background: #22c55e;"
            ></div>
          </div>

        </div>
      </div>

      <!-- Categorías -->
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="stat-card p-4 rounded-4 h-100">

          <div class="d-flex align-items-center justify-content-between mb-3">

            <div>

              <!-- Fondo negro → texto blanco -->
              <p class="text-white small mb-1">
                Categorías
              </p>

              <h3
                class="fw-bold mb-0"
                style="color: #3b82f6;"
              >
                {{ stats.categorias }}
              </h3>

            </div>

            <div class="stat-icon">
              <i
                class="bi bi-tags-fill fs-2"
                style="color: #3b82f6;"
              ></i>
            </div>

          </div>

          <div class="progress" style="height: 4px; background: #333;">
            <div
              class="progress-bar"
              style="width: 60%; background: #3b82f6;"
            ></div>
          </div>

        </div>
      </div>

      <!-- Bajo stock -->
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="stat-card p-4 rounded-4 h-100">

          <div class="d-flex align-items-center justify-content-between mb-3">

            <div>

              <!-- Fondo negro → texto blanco -->
              <p class="text-white small mb-1">
                Bajo Stock (&lt;5)
              </p>

              <h3
                class="fw-bold mb-0"
                style="color: #ef4444;"
              >
                {{ stats.bajoStock }}
              </h3>

            </div>

            <div class="stat-icon">
              <i
                class="bi bi-exclamation-triangle-fill fs-2"
                style="color: #ef4444;"
              ></i>
            </div>

          </div>

          <div class="progress" style="height: 4px; background: #333;">
            <div
              class="progress-bar"
              style="width: 30%; background: #ef4444;"
            ></div>
          </div>

        </div>
      </div>

    </div>

    <!-- Accesos rápidos -->
    <h5 class="fw-bold mb-3 text-white">
      Accesos rápidos
    </h5>

    <div class="row g-3">

      <!-- Productos -->
      <div class="col-12 col-md-6">

        <div class="quick-card p-4 rounded-4 d-flex align-items-center gap-3">

          <div class="quick-icon">
            <i
              class="bi bi-box-seam-fill fs-1"
              style="color: var(--ts-gold);"
            ></i>
          </div>

          <div class="flex-grow-1">

            <!-- Fondo negro → texto blanco -->
            <h6 class="fw-bold mb-1 text-white">
              Gestión de Productos
            </h6>

            <!-- Fondo negro → texto blanco -->
            <p class="text-white small mb-2">
              Ver, crear, editar y eliminar productos del inventario.
            </p>

            <router-link
              to="/dashboard/productos"
              class="btn btn-gold btn-sm"
            >
              <i class="bi bi-arrow-right me-1"></i>
              Ir a Productos
            </router-link>

          </div>

        </div>
      </div>

      <!-- Usuarios -->
      <div class="col-12 col-md-6">

        <div class="quick-card p-4 rounded-4 d-flex align-items-center gap-3">

          <div class="quick-icon">
            <i
              class="bi bi-people-fill fs-1"
              style="color: #3b82f6;"
            ></i>
          </div>

          <div class="flex-grow-1">

            <!-- Fondo negro → texto blanco -->
            <h6 class="fw-bold mb-1 text-white">
              Gestión de Usuarios
            </h6>

            <!-- Fondo negro → texto blanco -->
            <p class="text-white small mb-2">
              Administra los usuarios del sistema registrados en MockAPI.
            </p>

            <router-link
              to="/dashboard/usuarios"
              class="btn btn-sm btn-outline-info"
            >
              <i class="bi bi-arrow-right me-1"></i>
              Ir a Usuarios
            </router-link>

          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { getSession } from '../services/AuthService'
import { getProducts } from '../services/ProductService'

const session = getSession()

const products = ref([])

onMounted(async () => {
  try {
    products.value = await getProducts()
  } catch (error) {
    console.error('Error cargando productos:', error)
  }
})

// Fecha actual formateada
const today = new Date().toLocaleDateString('es-CO', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

const stats = computed(() => {
  const lista = products.value

  const totalProductos = lista.length

  const valorInventario = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(
    lista.reduce((acc, p) => acc + p.precio * p.stock, 0)
  )

  const categorias = [
    ...new Set(lista.map(p => p.categoria))
  ].length

  const bajoStock = lista.filter(p => p.stock < 5).length

  return {
    totalProductos,
    valorInventario,
    categorias,
    bajoStock
  }
})
</script>

<style scoped>
.stat-card,
.quick-card {
  background: #1a1a1a;
  border: 1px solid rgba(255, 215, 0, 0.15);
  transition: border-color 0.2s, transform 0.2s;
}

.stat-card:hover,
.quick-card:hover {
  border-color: rgba(255, 215, 0, 0.4);
  transform: translateY(-2px);
}

.btn-gold {
  background-color: #ffd700;
  border-color: #ffd700;
  color: #000;
  font-weight: 600;
}

.btn-gold:hover {
  background-color: #ccac00;
  border-color: #ccac00;
}
</style>