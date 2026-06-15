<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
      <div>
        <h2 class="fw-bold mb-0 text-white">
          <i class="bi bi-people-fill me-2" style="color:#2563EB;"></i>
          Gestión de Usuarios
        </h2>
        <p class="text-white small mt-1">CRUD conectado a MockAPI</p>
      </div>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="bi bi-person-plus-fill me-1"></i> Nuevo Usuario
      </button>
    </div>

    <!-- Búsqueda -->
    <div class="input-group mb-3" style="max-width:400px;">
      <span class="input-group-text ts-input-addon"><i class="bi bi-search"></i></span>
      <input v-model="searchTerm" type="text" class="form-control ts-input" placeholder="Buscar usuario..." />
    </div>

    <!-- Alertas -->
    <div v-if="successMsg" class="alert alert-success d-flex align-items-center gap-2 py-2 mb-3" role="alert">
      <i class="bi bi-check-circle-fill"></i> {{ successMsg }}
    </div>
    <div v-if="errorMsg" class="alert alert-danger d-flex align-items-center gap-2 py-2 mb-3" role="alert">
      <i class="bi bi-exclamation-triangle-fill"></i> {{ errorMsg }}
    </div>

    <!-- Spinner -->
    <div v-if="loadingData" class="text-center py-5">
      <div class="spinner-border" style="color:#2563EB;"></div>
      <p class="text-muted mt-2 small">Cargando usuarios desde MockAPI...</p>
    </div>

    <!-- Tabla -->
    <div v-if="!loadingData" class="table-responsive rounded-4 overflow-hidden" style="border:1px solid rgba(37,99,235,0.25);">
      <table class="table ts-table mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th class="d-none d-md-table-cell">Usuario</th>
            <th class="d-none d-lg-table-cell">Correo</th>
            <th class="d-none d-sm-table-cell">Rol</th>
            <th class="d-none d-lg-table-cell">Ciudad</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filtered.length === 0">
            <td colspan="7" class="text-center py-5 text-muted">
              <i class="bi bi-person-x fs-1 d-block mb-2"></i>No hay usuarios.
            </td>
          </tr>
          <tr v-for="u in filtered" :key="u.id" class="ts-table-row">
            <td class="text-muted small">{{ u.id }}</td>
            <td>
              <div class="d-flex align-items-center gap-2">
                <div class="user-avatar">{{ u.nombre?.charAt(0) }}</div>
                <div class="user-name">{{ u.nombre }}</div>
              </div>
            </td>
            <td class="d-none d-md-table-cell user-secondary">
              <i class="bi bi-at me-1"></i>{{ u.usuario }}
            </td>
            <td class="d-none d-lg-table-cell user-secondary">
              <i class="bi bi-envelope-fill me-1"></i>{{ u.correo || '—' }}
            </td>
            <td class="d-none d-sm-table-cell">
              <span :class="u.rol === 'Administrador' ? 'badge-admin' : 'badge-user'">
                {{ u.rol }}
              </span>
            </td>
            <td class="d-none d-lg-table-cell user-secondary">
              <i class="bi bi-geo-alt-fill me-1" style="color:#2563EB;"></i>{{ u.ciudad || '—' }}
            </td>
            <td class="text-center">
              <div class="d-flex justify-content-center gap-1">
                <button class="btn btn-sm ts-btn-edit" @click="openEditModal(u)" title="Editar">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-sm ts-btn-del" @click="confirmDelete(u)" title="Eliminar">
                  <i class="bi bi-trash3"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ===================== MODAL CREAR / EDITAR ===================== -->
    <div class="modal fade" id="userModal" tabindex="-1" ref="userModalEl">
      <div class="modal-dialog">
        <div class="modal-content ts-modal">
          <div class="modal-header border-bottom" style="border-color:rgba(37,99,235,0.3)!important;">
            <h5 class="modal-title" style="color:#2563EB;">
              <i :class="isEditing ? 'bi-pencil-square' : 'bi-person-plus-fill'" class="bi me-2"></i>
              {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
            </h5>
            <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div v-if="formError" class="alert alert-danger py-2 small">
              <i class="bi bi-exclamation-triangle me-1"></i> {{ formError }}
            </div>
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label text-light">Nombre completo *</label>
                <input v-model="form.nombre" type="text" class="form-control ts-input" placeholder="Nombre y apellido" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label text-light">Usuario *</label>
                <input v-model="form.usuario" type="text" class="form-control ts-input" placeholder="Ej: frank" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label text-light">Correo *</label>
                <input v-model="form.correo" type="email" class="form-control ts-input" placeholder="correo@ejemplo.com" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label text-light">Contraseña *</label>
                <input v-model="form.password" type="password" class="form-control ts-input" placeholder="Contraseña" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label text-light">Rol *</label>
                <select v-model="form.rol" class="form-select ts-input">
                  <option value="">Selecciona un rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Vendedor">Vendedor</option>
                  <option value="Bodeguero">Bodeguero</option>
                </select>
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label text-light">Ciudad</label>
                <input v-model="form.ciudad" type="text" class="form-control ts-input" placeholder="Ej: Bucaramanga" />
              </div>
            </div>
          </div>
          <div class="modal-footer border-top" style="border-color:rgba(37,99,235,0.3)!important;">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal" :disabled="saving">Cancelar</button>
            <button class="btn btn-primary" @click="saveUser" :disabled="saving">
              <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
              <i v-else :class="isEditing ? 'bi-save' : 'bi-plus-lg'" class="bi me-1"></i>
              {{ saving ? 'Guardando...' : (isEditing ? 'Guardar' : 'Crear') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== MODAL ELIMINAR ===================== -->
    <div class="modal fade" id="deleteUserModal" tabindex="-1" ref="deleteModalEl">
      <div class="modal-dialog">
        <div class="modal-content ts-modal" v-if="userToDelete">
          <div class="modal-header border-bottom" style="border-color:rgba(239,68,68,0.3)!important;">
            <h5 class="modal-title text-danger">
              <i class="bi bi-trash3-fill me-2"></i>Eliminar Usuario
            </h5>
            <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center py-4">
            <i class="bi bi-exclamation-triangle-fill text-warning fs-1 mb-3 d-block"></i>
            <p class="text-white mb-1">¿Estás seguro de eliminar al usuario?</p>
            <p class="fw-bold text-info">{{ userToDelete.nombre }}</p>
            <p class="text-white small">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer border-top" style="border-color:rgba(239,68,68,0.3)!important;">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal" :disabled="saving">Cancelar</button>
            <button class="btn btn-danger" @click="doDelete" :disabled="saving">
              <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
              <i v-else class="bi bi-trash3 me-1"></i>
              {{ saving ? 'Eliminando...' : 'Eliminar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import { getUsers, createUser, updateUser, deleteUser } from '../services/UserService'

// ─── Estado ────────────────────────────────────────────────────────
const users = ref([])
const searchTerm = ref('')
const isEditing = ref(false)
const form = ref(emptyForm())
const formError = ref('')
const successMsg = ref('')
const errorMsg = ref('')
const loadingData = ref(false)
const saving = ref(false)
const userToDelete = ref(null)

const userModalEl = ref(null)
const deleteModalEl = ref(null)
let userModalInstance = null
let deleteModalInstance = null

function emptyForm() {
  return { nombre: '', usuario: '', password: '', correo: '', rol: '', ciudad: '' }
}

// ─── Inicialización ────────────────────────────────────────────────
onMounted(async () => {
  userModalInstance   = new Modal(userModalEl.value)
  deleteModalInstance = new Modal(deleteModalEl.value)
  await loadUsers()
})

// ─── Computed ──────────────────────────────────────────────────────
const filtered = computed(() => {
  if (!searchTerm.value) return users.value
  const q = searchTerm.value.toLowerCase()
  return users.value.filter(u =>
    u.nombre?.toLowerCase().includes(q) ||
    u.usuario?.toLowerCase().includes(q) ||
    u.correo?.toLowerCase().includes(q) ||
    u.rol?.toLowerCase().includes(q) ||
    u.ciudad?.toLowerCase().includes(q)
  )
})

// ─── Helpers ───────────────────────────────────────────────────────
async function loadUsers() {
  loadingData.value = true
  try {
    users.value = await getUsers()
  } catch (e) {
    showError('No se pudo cargar los usuarios desde MockAPI.')
  } finally {
    loadingData.value = false
  }
}

function showSuccess(msg) {
  successMsg.value = msg; errorMsg.value = ''
  setTimeout(() => successMsg.value = '', 3500)
}
function showError(msg) {
  errorMsg.value = msg; successMsg.value = ''
  setTimeout(() => errorMsg.value = '', 4000)
}

// ─── CRUD ──────────────────────────────────────────────────────────
function openCreateModal() {
  isEditing.value = false
  form.value = emptyForm()
  formError.value = ''
  userModalInstance.show()
}

function openEditModal(u) {
  isEditing.value = true
  form.value = { ...u }
  formError.value = ''
  userModalInstance.show()
}

function confirmDelete(u) {
  userToDelete.value = u
  deleteModalInstance.show()
}

async function saveUser() {
  formError.value = ''
  if (
    !form.value.nombre ||
    !form.value.usuario ||
    !form.value.password ||
    !form.value.correo ||
    !form.value.rol
  ) {
    formError.value = 'Los campos nombre, usuario, correo, contraseña y rol son obligatorios.'
    return
  }
  saving.value = true
  try {
    if (isEditing.value) {
      await updateUser(form.value.id, form.value)
      showSuccess(`✅ Usuario "${form.value.nombre}" actualizado correctamente.`)
    } else {
      await createUser(form.value)
      showSuccess(`✅ Usuario "${form.value.nombre}" creado correctamente.`)
    }
    await loadUsers()
    userModalInstance.hide()
  } catch (e) {
    showError('Error al guardar el usuario. Intenta de nuevo.')
  } finally {
    saving.value = false
  }
}

async function doDelete() {
  saving.value = true
  try {
    await deleteUser(userToDelete.value.id)
    showSuccess(`🗑️ Usuario "${userToDelete.value.nombre}" eliminado.`)
    await loadUsers()
    deleteModalInstance.hide()
  } catch (e) {
    showError('Error al eliminar el usuario.')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.ts-table {background:#1E1E1F!important;color:#FFFFFF;border-radius:16px;overflow:hidden;border-color:transparent;}
.ts-table thead,
.ts-table thead tr,
.ts-table thead th {
  background:#1E1E1F!important;
  color:#E0E0E0!important;
  font-size:0.8rem;
  text-transform:uppercase;
  letter-spacing:0.05em;
  font-weight:600;
}
.ts-table tbody,
.ts-table tbody tr,
.ts-table tbody td {
  background:#1E1E1F!important;
  color:#FFFFFF;
}
.ts-table th,
.ts-table td {
  padding:0.85rem 1rem;
  vertical-align:middle;
  border-bottom:1px solid rgba(255,255,255,0.06)!important;
}
.ts-table-row:hover td {
  background:#2A2A2D!important;
}
.user-avatar {
  width:34px;
  height:34px;
  border-radius:50%;
  background:rgba(37,99,235,0.15);
  border:1px solid rgba(37,99,235,0.35);
  display:flex;
  align-items:center;
  justify-content:center;
  color:#2563EB;
  font-weight:700;
  font-size:0.9rem;
}
.user-name {
  color:#2563EB;
  font-weight:600;
}
.user-secondary {
  color:#E0E0E0;
  font-size:0.82rem;
}
.badge-admin {
  background:#0052FF;
  color:#FFFFFF;
  border-radius:999px;
  padding:0.4rem 0.8rem;
  font-size:0.72rem;
}
.badge-user {
  background:rgba(255,255,255,0.12);
  color:#FFFFFF;
  border-radius:999px;
  padding:0.4rem 0.8rem;
  font-size:0.72rem;
}
.ts-btn-edit {
  background:rgba(37,99,235,0.10);
  border:1px solid rgba(37,99,235,0.35);
  color:#2563EB;
}
.ts-btn-edit:hover {
  background:rgba(37,99,235,0.18);
}
.ts-btn-del {
  background:rgba(239,68,68,0.08);
  border:1px solid rgba(239,68,68,0.25);
  color:#EF4444;
}
.ts-btn-del:hover {
  background:rgba(239,68,68,0.15);
}
.ts-modal {
  background:#1A1A1A;
  color:#FFFFFF;
  border:1px solid rgba(37,99,235,0.25);
}
.ts-input {
  background:#111!important;
  border-color:rgba(37,99,235,0.25)!important;
  color:#FFFFFF!important;
}
.ts-input:focus {
  border-color:#2563EB!important;
  box-shadow:0 0 0 0.2rem rgba(37,99,235,0.15)!important;
}
.ts-input::placeholder {
  color:#666!important;
}
.ts-input-addon {
  background:#111!important;
  border-color:rgba(37,99,235,0.25)!important;
  color:#2563EB!important;
}
</style>