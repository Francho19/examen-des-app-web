<template>
  <!-- Punto de entrada principal: carga las vistas mediante vue-router -->
  <router-view />
</template>

<script setup>
// App.vue actúa como contenedor raíz.
// Toda la navegación se gestiona mediante <router-view />.
</script>

<style>
/* =============================================
   Variables globales - Paleta TechStore
   Negro (#000) y Dorado (#FFD700)
   ============================================= */
:root {
  --ts-black: #000000;
  --ts-surface: #111111;
  --ts-surface-2: #1a1a1a;
  --ts-gold: #ffd700;
  --ts-gold-dark: #ccac00;
  --ts-gold-light: rgba(255, 215, 0, 0.15);
  --ts-border: rgba(255, 215, 0, 0.25);
  --ts-text: #ffffff;
  --ts-muted: #aaaaaa;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background-color: var(--ts-black);
  color: var(--ts-text);
  margin: 0;
}
</style>
