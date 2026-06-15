<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
      <div>
        <h2 class="fw-bold mb-0 text-white">
          <i class="bi bi-box-seam-fill me-2" style="color:var(--ts-gold);"></i>
          Gestión de Productos
        </h2>
        <p class="text-white small mt-1">CRUD conectado a MockAPI</p>
      </div>
      <button class="btn btn-gold" @click="openCreateModal">
        <i class="bi bi-plus-lg me-1"></i> Nuevo Producto
      </button>
    </div>

    <!-- Búsqueda -->
    <div class="row g-2 mb-3">
      <div class="col-12 col-md-5">
        <div class="input-group">
          <span class="input-group-text ts-input-addon"><i class="bi bi-search"></i></span>
          <input v-model="searchTerm" type="text" class="form-control ts-input" placeholder="Buscar por nombre o categoría..." />
        </div>
      </div>
      <div class="col-12 col-md-3">
        <select v-model="filterCategory" class="form-select ts-input">
          <option value="">Todas las categorías</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      <div class="col-12 col-md-4 text-md-end">
        <span class="text-white small">
          Mostrando <strong style="color:var(--ts-gold);">{{ filteredProducts.length }}</strong> de {{ products.length }} productos
        </span>
      </div>
    </div>

    <!-- Alerta de éxito -->
    <div v-if="successMsg" class="alert alert-success d-flex align-items-center gap-2 py-2" role="alert">
      <i class="bi bi-check-circle-fill"></i> {{ successMsg }}
    </div>
    <!-- Alerta de error -->
    <div v-if="errorMsg" class="alert alert-danger d-flex align-items-center gap-2 py-2" role="alert">
      <i class="bi bi-exclamation-triangle-fill"></i> {{ errorMsg }}
    </div>
    <!-- Spinner de carga -->
    <div v-if="loadingData" class="text-center py-5">
      <div class="spinner-border" style="color:var(--ts-gold);"></div>
      <p class="text-muted mt-2 small">Cargando productos desde MockAPI...</p>
    </div>

    <!-- Tabla de productos -->
    <div v-if="!loadingData" class="table-responsive rounded-4 overflow-hidden" style="border:1px solid rgba(255,215,0,0.2);">
      <table class="table ts-table mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th class="d-none d-md-table-cell">Categoría</th>
            <th>Precio</th>
            <th class="d-none d-sm-table-cell">Stock</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredProducts.length === 0">
            <td colspan="6" class="text-center py-5 text-muted">
              <i class="bi bi-inbox fs-1 d-block mb-2"></i>
              No se encontraron productos.
            </td>
          </tr>
          <tr v-for="product in filteredProducts" :key="product.id" class="ts-table-row">
            <td class="text-muted small">{{ product.id }}</td>
            <td>
              <div class="d-flex align-items-center gap-2">
                <img
                  :src="product.imagen || 'https://placehold.co/40x40/111/FFD700?text=TS'"
                  :alt="product.nombre"
                  class="product-thumb rounded-2"
                  @error="e => e.target.src='https://placehold.co/40x40/111/FFD700?text=TS'"
                />
                <div>
                  <div class="fw-semibold small text-white">{{ product.nombre }}</div>
                 <div class="text-white-50" style="font-size:0.72rem;">{{ truncate(product.descripcion, 50) }}</div>
                </div>
              </div>
            </td>
            <td class="d-none d-md-table-cell">
              <span class="badge ts-badge-cat">{{ product.categoria }}</span>
            </td>
            <td style="color:var(--ts-gold);" class="fw-semibold">{{ formatPrice(product.precio) }}</td>
            <td class="d-none d-sm-table-cell">
              <span class="badge" :class="product.stock < 5 ? 'bg-danger' : product.stock < 10 ? 'bg-warning text-dark' : 'bg-success'">
                {{ product.stock }}
              </span>
            </td>
            <td class="text-center">
              <div class="d-flex justify-content-center gap-1">
                <!-- Ver detalles -->
                <button class="btn btn-sm btn-outline-warning" @click="openDetailModal(product)" title="Ver detalles">
                  <i class="bi bi-eye"></i>
                </button>
                <!-- Editar -->
                <button class="btn btn-sm ts-btn-edit" @click="openEditModal(product)" title="Editar">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <!-- Eliminar -->
                <button class="btn btn-sm ts-btn-del" @click="confirmDelete(product)" title="Eliminar">
                  <i class="bi bi-trash3"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vista en Tarjetas -->
    <div v-if="!loadingData" class="mt-4">
      <h5 class="fw-bold mb-3 text-white">
        <i class="bi bi-grid-3x3-gap me-2" style="color:var(--ts-gold);"></i>
        Vista en Tarjetas
      </h5>
      <div class="row g-3">
        <div
          v-for="product in filteredProducts"
          :key="'card-' + product.id"
          class="col-12 col-sm-6 col-lg-3"
        >
          <ProductCardComponent
            :product="product"
            @view-details="openDetailModal"
          />
        </div>
      </div>
    </div>

    <!-- ===================== MODAL CREAR / EDITAR ===================== -->
    <div class="modal fade" id="productModal" tabindex="-1" ref="productModalEl">
      <div class="modal-dialog modal-lg">
        <div class="modal-content ts-modal">
          <div class="modal-header border-bottom" style="border-color:rgba(255,215,0,0.2)!important;">
            <h5 class="modal-title">
              <i :class="isEditing ? 'bi-pencil-square' : 'bi-plus-circle'" class="bi me-2" style="color:var(--ts-gold);"></i>
              {{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div v-if="formError" class="alert alert-danger py-2 small">
              <i class="bi bi-exclamation-triangle me-1"></i> {{ formError }}
            </div>
            <div class="row g-3">
              <div class="col-12 col-md-6">
                <label class="form-label text-light">Nombre *</label>
                <input v-model="form.nombre" type="text" class="form-control ts-input" placeholder="Nombre del producto" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label text-light">Categoría *</label>
                <input v-model="form.categoria" type="text" class="form-control ts-input" placeholder="Ej: Computadores" list="cat-list" />
                <datalist id="cat-list">
                  <option v-for="cat in categories" :key="cat" :value="cat" />
                </datalist>
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label text-light">Precio (COP) *</label>
                <input v-model.number="form.precio" type="number" min="0" class="form-control ts-input" placeholder="Ej: 1500000" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label text-light">Stock *</label>
                <input v-model.number="form.stock" type="number" min="0" class="form-control ts-input" placeholder="Unidades disponibles" />
              </div>
              <div class="col-12">
                <label class="form-label text-light">Descripción *</label>
                <textarea v-model="form.descripcion" class="form-control ts-input" rows="2" placeholder="Descripción del producto"></textarea>
              </div>
              <div class="col-12">
                <label class="form-label text-light">URL de imagen</label>
                <input v-model="form.imagen" type="url" class="form-control ts-input" placeholder="https://..." />
              </div>
            </div>
          </div>
          <div class="modal-footer border-top" style="border-color:rgba(255,215,0,0.2)!important;">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" :disabled="saving">Cancelar</button>
            <button type="button" class="btn btn-gold" @click="saveProduct" :disabled="saving">
              <span v-if="saving" class="spinner-border spinner-border-sm me-1"></span>
              <i v-else :class="isEditing ? 'bi-save' : 'bi-plus-lg'" class="bi me-1"></i>
              {{ saving ? 'Guardando...' : (isEditing ? 'Guardar cambios' : 'Crear producto') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== MODAL DETALLE ===================== -->
    <div class="modal fade" tabindex="-1" ref="detailModalEl">
      <div class="modal-dialog">
        <div class="modal-content ts-modal" v-if="selectedProduct">
          <div class="modal-header border-bottom" style="border-color:rgba(255,215,0,0.2)!important;">
            <h5 class="modal-title" style="color:var(--ts-gold);">
              <i class="bi bi-info-circle-fill me-2"></i>Detalle del Producto
            </h5>
            <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center">
            <img
              :src="selectedProduct.imagen || 'https://placehold.co/300x200/111/FFD700?text=TechStore'"
              :alt="selectedProduct.nombre"
              class="img-fluid rounded-3 mb-3"
              style="max-height:200px;object-fit:cover;border:1px solid rgba(255,215,0,0.3);"
              @error="e => e.target.src='https://placehold.co/300x200/111/FFD700?text=TechStore'"
            />
            <h5 class="text-white fw-bold">{{ selectedProduct.nombre }}</h5>
            <span class="badge ts-badge-cat mb-3">{{ selectedProduct.categoria }}</span>
            <p class="text-light">{{ selectedProduct.descripcion }}</p>
            <div class="row mt-3 text-center">
              <div class="col">
                <div class="fw-bold" style="color:var(--ts-gold);">{{ formatPrice(selectedProduct.precio) }}</div>
                <small class="text-light">Precio</small>
              </div>
              <div class="col">
                <div class="fw-bold text-white">{{ selectedProduct.stock }}</div>
                <small class="text-light">Stock</small>
              </div>
            </div>
          </div>
          <div class="modal-footer border-top" style="border-color:rgba(255,215,0,0.2)!important;">
            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button class="btn btn-gold" @click="editFromDetail">
              <i class="bi bi-pencil-square me-1"></i> Editar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== MODAL ELIMINAR ===================== -->
    <div class="modal fade" id="deleteModal" tabindex="-1" ref="deleteModalEl">
      <div class="modal-dialog">
        <div class="modal-content ts-modal" v-if="productToDelete">
          <div class="modal-header border-bottom" style="border-color:rgba(255,215,0,0.2)!important;">
            <h5 class="modal-title text-danger">
              <i class="bi bi-trash3-fill me-2"></i>Eliminar Producto
            </h5>
            <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center py-4">
            <i class="bi bi-exclamation-triangle-fill text-warning fs-1 mb-3 d-block"></i>
            <p class="text-white mb-1">¿Estás seguro de eliminar el producto?</p>
            <p class="fw-bold" style="color:var(--ts-gold);">{{ productToDelete.nombre }}</p>
            <p class="text-white small">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer border-top" style="border-color:rgba(255,215,0,0.2)!important;">
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
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/ProductService'
import ProductCardComponent from '../components/ProductCardComponent.vue'

// ─── Estado ────────────────────────────────────────────────────────
const products = ref([])
const searchTerm = ref('')
const filterCategory = ref('')
const successMsg = ref('')
const errorMsg = ref('')
const formError = ref('')
const loadingData = ref(false)
const saving = ref(false)
const isEditing = ref(false)
const productToDelete = ref(null)
const selectedProduct = ref(null)

const productModalEl = ref(null)
const deleteModalEl = ref(null)
const detailModalEl = ref(null)
let productModalInstance = null
let deleteModalInstance = null
let detailModalInstance = null

const form = ref(emptyForm())
function emptyForm() {
  return { nombre: '', categoria: '', precio: 0, stock: 0, descripcion: '', imagen: '' }
}

// ─── Inicialización ────────────────────────────────────────────────
onMounted(async () => {
  productModalInstance = new Modal(productModalEl.value)
  deleteModalInstance  = new Modal(deleteModalEl.value)
  detailModalInstance  = new Modal(detailModalEl.value)
  await loadProducts()
})

// ─── Computed ──────────────────────────────────────────────────────
const categories = computed(() =>
  [...new Set(products.value.map(p => p.categoria).filter(Boolean))].sort()
)

const filteredProducts = computed(() => {
  let result = products.value
  if (searchTerm.value) {
    const q = searchTerm.value.toLowerCase()
    result = result.filter(p =>
      p.nombre?.toLowerCase().includes(q) || p.categoria?.toLowerCase().includes(q)
    )
  }
  if (filterCategory.value) {
    result = result.filter(p => p.categoria === filterCategory.value)
  }
  return result
})

// ─── Helpers ───────────────────────────────────────────────────────
async function loadProducts() {
  loadingData.value = true
  try {
    products.value = await getProducts()

    console.log('PRODUCTOS:', products.value)

  } catch (e) {
    showError('No se pudo cargar los productos desde MockAPI.')
    console.error(e)
  } finally {
    loadingData.value = false
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price)
}

function truncate(str, n) {
  return str?.length > n ? str.substring(0, n) + '...' : str
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
  productModalInstance.show()
}

function openEditModal(product) {
  isEditing.value = true
  form.value = { ...product }
  formError.value = ''
  productModalInstance.show()
}

function openDetailModal(product) {
  selectedProduct.value = product
  detailModalInstance.show()
}

function editFromDetail() {
  detailModalInstance.hide()
  setTimeout(() => openEditModal(selectedProduct.value), 300)
}

function confirmDelete(product) {
  productToDelete.value = product
  deleteModalInstance.show()
}

async function saveProduct() {
  formError.value = ''
  if (!form.value.nombre || !form.value.categoria || !form.value.descripcion) {
    formError.value = 'Por favor completa todos los campos obligatorios (*).'
    return
  }
  if (form.value.precio <= 0) { formError.value = 'El precio debe ser mayor a 0.'; return }
  if (form.value.stock < 0)   { formError.value = 'El stock no puede ser negativo.'; return }

  saving.value = true
  try {
    if (isEditing.value) {
      await updateProduct(form.value.id, form.value)
      showSuccess(`✅ Producto "${form.value.nombre}" actualizado correctamente.`)
    } else {
      await createProduct(form.value)
      showSuccess(`✅ Producto "${form.value.nombre}" creado correctamente.`)
    }
    await loadProducts()
    productModalInstance.hide()
  } catch (e) {
    showError('Error al guardar el producto. Intenta de nuevo.')
  } finally {
    saving.value = false
  }
}

async function doDelete() {
  saving.value = true
  try {
    await deleteProduct(productToDelete.value.id)
    showSuccess(`🗑️ Producto "${productToDelete.value.nombre}" eliminado.`)
    await loadProducts()
    deleteModalInstance.hide()
  } catch (e) {
    showError('Error al eliminar el producto.')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.ts-table {
  background: #1E1E1F !important;
  color: #FFFFFF !important;
  border-color: transparent;
}

.ts-table thead,
.ts-table thead tr,
.ts-table thead th {
  background: #1E1E1F !important;
  color: #FFD700 !important;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ts-table tbody,
.ts-table tbody tr,
.ts-table tbody td {
  background: #1E1E1F !important;
  color: #FFFFFF !important;
}

.ts-table th,
.ts-table td {
  border-color: rgba(255,215,0,0.1) !important;
  vertical-align: middle;
  padding: 0.75rem 1rem;
}

.ts-table-row:hover td {
  background: #2A2A2D !important;
}

.product-thumb {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border: 1px solid rgba(255,215,0,0.2);
}

.ts-badge-cat {
  background: rgba(255,215,0,0.15);
  color: #FFD700;
  border: 1px solid rgba(255,215,0,0.3);
  font-size: 0.72rem;
}

.ts-btn-edit {
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.3);
  color: #3b82f6;
}

.ts-btn-edit:hover {
  background: rgba(59,130,246,0.2);
}

.ts-btn-del {
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.3);
  color: #ef4444;
}

.ts-btn-del:hover {
  background: rgba(239,68,68,0.2);
}

.ts-modal {
  background: #1a1a1a;
  color: #fff;
  border: 1px solid rgba(255,215,0,0.2);
}

.ts-input {
  background-color: #111 !important;
  border-color: rgba(255,215,0,0.2) !important;
  color: #fff !important;
}

.ts-input:focus {
  border-color: #FFD700 !important;
  box-shadow: 0 0 0 0.2rem rgba(255,215,0,0.15) !important;
}

.ts-input::placeholder {
  color: #555 !important;
}

.ts-input-addon {
  background: #111 !important;
  border-color: rgba(255,215,0,0.2) !important;
  color: #FFD700 !important;
}

.btn-gold {
  background-color: #FFD700;
  border-color: #FFD700;
  color: #000;
  font-weight: 600;
}

.btn-gold:hover {
  background-color: #ccac00;
  border-color: #ccac00;
}
</style>