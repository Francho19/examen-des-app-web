<template>
  <!-- Tarjeta individual de producto - componente reutilizable -->
  <div class="product-card h-100 rounded-4 overflow-hidden d-flex flex-column">
    
    <!-- Imagen del producto -->
    <div class="product-img-wrapper position-relative">
      <img
        :src="product.imagen"
        :alt="product.nombre"
        class="product-img w-100"
        @error="handleImgError"
      />

      <!-- Badge de categoría -->
      <span class="badge ts-badge-cat position-absolute top-0 end-0 m-2">
        {{ product.categoria }}
      </span>
    </div>

    <!-- Cuerpo de la tarjeta -->
    <div class="card-body d-flex flex-column p-3" style="background: #1a1a1a;">

      <!-- Nombre -->
      <h6 class="product-name fw-bold mb-1 text-white">
        {{ product.nombre }}
      </h6>

      <!-- Descripción -->
      <p class="product-desc text-white small flex-grow-1 mb-2">
        {{ truncateDesc }}
      </p>

      <!-- Precio y stock -->
      <div class="d-flex align-items-center justify-content-between mb-3">

        <span
          class="product-price fw-bold"
          style="color: var(--ts-gold); font-size: 1.1rem;"
        >
          {{ formatPrice(product.precio) }}
        </span>

        <span class="small text-white">
          <i class="bi bi-archive me-1"></i>
          Stock: {{ product.stock }}
        </span>

      </div>

      <!-- Botón detalles -->
      <button
        class="btn btn-gold btn-sm w-100"
        @click="$emit('view-details', product)"
      >
        <i class="bi bi-eye me-1"></i>
        Ver detalles
      </button>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props: recibe el objeto producto completo
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Emite eventos al componente padre
defineEmits(['view-details'])

// Trunca la descripción a 80 caracteres
const truncateDesc = computed(() => {
  if (props.product.descripcion?.length > 80) {
    return props.product.descripcion.substring(0, 80) + '...'
  }
  return props.product.descripcion
})

// Formatea el precio en pesos colombianos
function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price)
}

// Imagen por defecto si falla
function handleImgError(e) {
  e.target.src =
    'https://placehold.co/300x200/111111/FFD700?text=Sin+imagen'
}
</script>

<style scoped>
.product-card {
  background: #1a1a1a;
  border: 1px solid rgba(255, 215, 0, 0.2);
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  cursor: default;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.5);
}

.product-img-wrapper {
  height: 160px;
  overflow: hidden;
  background: #111;
}

.product-img {
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.ts-badge-cat {
  background-color: rgba(0, 0, 0, 0.75);
  color: #ffd700;
  border: 1px solid rgba(255, 215, 0, 0.4);
  font-size: 0.68rem;
}

.btn-gold {
  background-color: #ffd700;
  border-color: #ffd700;
  color: #000;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-gold:hover {
  background-color: #ccac00;
  border-color: #ccac00;
  transform: translateY(-1px);
}
</style>