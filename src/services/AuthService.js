/**
 * Servicio de autenticación.
 * Valida credenciales consultando MockAPI y guarda sesión en sessionStorage.
 */
import axios from 'axios'

const SESSION_KEY = 'techstore_session'
const BASE_URL = 'https://6a2edfb8c9776ca6c0c508a4.mockapi.io/api/v1'

/**
 * Inicia sesión consultando el recurso de usuarios en MockAPI.
 * @param {string} usuario
 * @param {string} password
 * @returns {Object} { success: boolean, user?: Object, error?: string }
 */
export async function login(usuario, password) {
  try {
    const { data } = await axios.get(`${BASE_URL}/usuarios`)
    const found = data.find(
      u => u.usuario === usuario.trim() && u.password === password
    )
    if (found) {
      const session = {
        id: found.id,
        nombre: found.nombre,
        rol: found.rol,
        usuario: found.usuario
      }
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
      return { success: true, user: session }
    }
    return { success: false, error: 'Usuario o contraseña incorrectos.' }
  } catch (e) {
    return { success: false, error: 'Error al conectar con el servidor. Intenta de nuevo.' }
  }
}

/** Cierra la sesión del usuario actual. */
export function logout() {
  sessionStorage.removeItem(SESSION_KEY)
}

/** Obtiene el usuario de sesión actual. */
export function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY)
  return raw ? JSON.parse(raw) : null
}

/** Verifica si hay una sesión activa. */
export function isAuthenticated() {
  return !!getSession()
}
