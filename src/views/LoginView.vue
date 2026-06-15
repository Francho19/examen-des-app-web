<template>
  <div class="login-page d-flex align-items-center justify-content-center min-vh-100">
    <div class="login-card p-4 p-md-5 rounded-4 shadow-lg" style="width:100%;max-width:440px;">

      <!-- Logo / Marca -->
      <div class="text-center mb-4">
        <div class="brand-icon mb-3">
          <i class="bi bi-cpu-fill" style="font-size:3rem;color:var(--ts-gold);"></i>
        </div>
        <h1 class="brand-title mb-1">Tech<span style="color:var(--ts-gold);">Store</span></h1>
        <p class="small" style="color:white;">Panel de Administración</p>
      </div>

      <!-- Alerta de error Bootstrap -->
      <div v-if="errorMsg" class="alert alert-danger d-flex align-items-center gap-2" role="alert">
        <i class="bi bi-exclamation-triangle-fill"></i>
        <span>{{ errorMsg }}</span>
      </div>

      <!-- Formulario de login -->
      <div>
        <div class="mb-3">
          <label for="usuario" class="form-label text-light">
            <i class="bi bi-person me-1"></i> Usuario
          </label>
          <div class="input-group">
            <span class="input-group-text ts-input-addon"><i class="bi bi-person-fill"></i></span>
            <input
              id="usuario"
              v-model="form.usuario"
              type="text"
              class="form-control ts-input"
              placeholder="Ingresa tu usuario"
              @keyup.enter="handleLogin"
              autocomplete="username"
            />
          </div>
        </div>

        <div class="mb-4">
          <label for="password" class="form-label text-light">
            <i class="bi bi-lock me-1"></i> Contraseña
          </label>
          <div class="input-group">
            <span class="input-group-text ts-input-addon"><i class="bi bi-lock-fill"></i></span>
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-control ts-input"
              placeholder="Ingresa tu contraseña"
              @keyup.enter="handleLogin"
              autocomplete="current-password"
            />
            <button
              class="input-group-text ts-input-addon"
              type="button"
              @click="showPassword = !showPassword"
              :title="showPassword ? 'Ocultar' : 'Mostrar'"
            >
              <i :class="showPassword ? 'bi-eye-slash' : 'bi-eye'" class="bi"></i>
            </button>
          </div>
        </div>

        <button
          class="btn btn-gold w-100 py-2 fw-semibold"
          @click="handleLogin"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          <i v-else class="bi bi-box-arrow-in-right me-2"></i>
          {{ loading ? 'Verificando en MockAPI...' : 'Ingresar' }}
        </button>
      </div>

      <!-- Nota -->
      <p class="text-center mt-3" style="font-size:0.72rem;color:white;">
        ⚠️ Las credenciales se validan contra MockAPI en tiempo real.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/AuthService'

const router = useRouter()
const form = reactive({ usuario: '', password: '' })
const errorMsg = ref('')
const loading = ref(false)
const showPassword = ref(false)

/**
 * Maneja el intento de login.
 * Valida campos y llama al AuthService (que consulta MockAPI).
 */
async function handleLogin() {
  errorMsg.value = ''
  if (!form.usuario || !form.password) {
    errorMsg.value = 'Por favor completa todos los campos.'
    return
  }
  loading.value = true
  const result = await login(form.usuario, form.password)
  if (result.success) {
    router.push('/dashboard')
  } else {
    errorMsg.value = result.error
  }
  loading.value = false
}
</script>

<style scoped>
.login-page { background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%); }
.login-card { background-color: #111111; border: 1px solid rgba(255,215,0,0.2); }
.brand-title { font-size: 2rem; font-weight: 700; color: #ffffff; letter-spacing: 0.05em; }
.ts-input { background-color: #1a1a1a !important; border-color: rgba(255,215,0,0.25) !important; color: #ffffff !important; }
.ts-input:focus { border-color: #ffd700 !important; box-shadow: 0 0 0 0.2rem rgba(255,215,0,0.2) !important; }
.ts-input::placeholder { color: #666 !important; }
.ts-input-addon { background-color: #1a1a1a !important; border-color: rgba(255,215,0,0.25) !important; color: #ffd700 !important; cursor: pointer; }
.btn-gold { background-color: #ffd700; border-color: #ffd700; color: #000000; font-weight: 600; transition: all 0.2s; }
.btn-gold:hover:not(:disabled) { background-color: #ccac00; border-color: #ccac00; color: #000; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255,215,0,0.3); }
.btn-gold:disabled { opacity: 0.7; }
</style>
