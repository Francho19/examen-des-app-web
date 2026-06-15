/**
 * Servicio de Usuarios — CRUD sobre MockAPI con Axios.
 */
import axios from 'axios'

const BASE_URL = 'https://6a2edfb8c9776ca6c0c508a4.mockapi.io/api/v1'

/** Obtiene todos los usuarios. */
export async function getUsers() {
  const { data } = await axios.get(`${BASE_URL}/usuarios`)
  return data
}

/** Crea un nuevo usuario. */
export async function createUser(user) {
  const { data } = await axios.post(`${BASE_URL}/usuarios`, user)
  return data
}

/** Actualiza un usuario existente. */
export async function updateUser(id, updatedData) {
  const { data } = await axios.put(`${BASE_URL}/usuarios/${id}`, updatedData)
  return data
}

/** Elimina un usuario por ID. */
export async function deleteUser(id) {
  await axios.delete(`${BASE_URL}/usuarios/${id}`)
}
