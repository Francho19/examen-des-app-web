<template>
  <!-- Pie de página reutilizable -->
  <footer class="ts-footer text-center py-3 px-4">
    <div class="d-flex align-items-center justify-content-center gap-2 flex-wrap">
      <i class="bi bi-cpu-fill" style="color: var(--ts-gold);"></i>
      <span class="small text-muted">
        &copy; {{ currentYear }} <strong style="color: white !important;">TechStore</strong>
        &mdash; Todos los derechos reservados.
      </span>
      <span class="d-none d-sm-inline text-muted small">|</span>
      <span class="small text-muted d-none d-sm-inline">
        Desarrollado por Frank Miranda &amp; Javier Martínez
      </span>
    </div>
  </footer>
</template>

<script setup>
// Año dinámico para el copyright
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.ts-footer {
  background-color: #111111;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
}

.text-muted {
  color: white !important;
}
</style>