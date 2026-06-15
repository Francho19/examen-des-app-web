/**
 * Servicio de Productos — CRUD sobre MockAPI con Axios.
 */
import axios from 'axios'

const BASE_URL = 'https://6a2edfb8c9776ca6c0c508a4.mockapi.io/api/v1'

/** Obtiene todos los productos. */
export async function getProducts() {
  const { data } = await axios.get(`${BASE_URL}/productos`)
  return data
}

/** Crea un nuevo producto. */
export async function createProduct(product) {
  const { data } = await axios.post(`${BASE_URL}/productos`, product)
  return data
}

/** Actualiza un producto existente. */
export async function updateProduct(id, updatedData) {
  const { data } = await axios.put(`${BASE_URL}/productos/${id}`, updatedData)
  return data
}

/** Elimina un producto por ID. */
export async function deleteProduct(id) {
  await axios.delete(`${BASE_URL}/productos/${id}`)
}
