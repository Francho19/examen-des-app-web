# examen-des-app-web

SPA desarrollada con **Vue.js 3** y **MockAPI** como backend REST simulado. Incluye autenticación, rutas protegidas y CRUD completo de usuarios y productos.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Vue.js 3 (Composition API) |
| Enrutamiento | Vue Router 4 |
| UI | Bootstrap 5 + Bootstrap Icons |
| HTTP | Axios |
| Backend | MockAPI (REST simulado) |
| Bundler | Vite |

---

## Funcionalidades

### Autenticación
- Login con validación de credenciales contra MockAPI
- Sesión persistida en `sessionStorage`
- Navigation guards (`beforeEach`) que bloquean rutas protegidas si no hay sesión activa

### CRUD — Usuarios
- Listado con tabla responsiva
- Crear, editar y eliminar con modales Bootstrap
- Alertas de confirmación y retroalimentación visual por operación

### CRUD — Productos
- Misma arquitectura que el módulo de usuarios
- Gestión independiente con su propio endpoint en MockAPI

---

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/Francho19/examen-des-app-web.git
cd examen-des-app-web

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

> La app corre en `http://localhost:5173` por defecto (Vite).

---

## API — Endpoints MockAPI

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/usuarios` | Listar todos los usuarios |
| `POST` | `/usuarios` | Crear usuario |
| `PUT` | `/usuarios/:id` | Actualizar usuario |
| `DELETE` | `/usuarios/:id` | Eliminar usuario |
| `GET` | `/productos` | Listar todos los productos |
| `POST` | `/productos` | Crear producto |
| `PUT` | `/productos/:id` | Actualizar producto |
| `DELETE` | `/productos/:id` | Eliminar producto |

---

## Estructura del proyecto

```
examen-des-app-web/
├── src/
│   ├── components/       # Componentes reutilizables (modales, alertas)
│   ├── views/            # Vistas por ruta (Login, Usuarios, Productos)
│   ├── router/           # Configuración de Vue Router + guards
│   ├── services/         # Lógica de llamadas Axios a MockAPI
│   └── main.js           # Punto de entrada
├── index.html
├── vite.config.js
└── package.json
```

---

## Consideraciones

- **Sesión**: al cerrar el navegador o llamar `sessionStorage.clear()`, la sesión expira y el usuario es redirigido al login.
- **MockAPI**: el proyecto depende de un proyecto activo en [mockapi.io](https://mockapi.io). Si los endpoints cambian, actualizar la URL base en `src/services/`.
- **Bootstrap**: los modales requieren el JS de Bootstrap importado globalmente en `main.js`.

---

## Autores

Proyecto de examen — Desarrollo de Aplicaciones Web  
Universidad Francisco de Paula Santander Seccional Ocaña  
🔗 [github.com/Francho19/examen-des-app-web](https://github.com/Francho19/examen-des-app-web)

| Nombre | Código |
|---|---|
| Frank José Miranda Beleño | 0192526 |
| Javier Andres Martinez Martinez | 0192528 |
