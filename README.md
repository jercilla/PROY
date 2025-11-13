# Trending Content App

Aplicación móvil desarrollada con Ionic y Angular para visualizar y gestionar contenido trending.

## Descripción

Esta aplicación permite a los usuarios:
- Visualizar noticias y contenido trending del día
- Navegar entre diferentes secciones (Dashboard, Historial, Detalles)
- Crear nuevo contenido
- Gestionar la configuración de la aplicación
- Sistema de autenticación básico

## Tecnologías

- **Ionic 7.2.1** - Framework para aplicaciones móviles
- **Angular 20** - Framework frontend con componentes standalone
- **TypeScript** - Lenguaje de programación
- **Swiper** - Componente de carrusel para las tarjetas trending
- **Supabase** - Backend como servicio (opcional para autenticación y base de datos)


## Requisitos Previos

- Node.js v24.11.0 o superior
- npm v11.6.1 o superior
- Ionic CLI

## Instalación

1. Clonar el repositorio

2. Instalar las dependencias:
```bash
npm install
```
3. Instalar Supabase:
```bash
npm install @supabase/supabase-js
```

4. Instalar Ionic CLI globalmente (si no lo tienes instalado):
```bash
npm install -g @ionic/cli
```

## Arrancar en Local

Para iniciar el servidor de desarrollo:

```bash
ionic serve
```

La aplicación estará disponible en `http://localhost:8100`

### Credenciales de Login

Para acceder a la aplicación, utiliza cualquiera de estas credenciales:

- **Usuario**: `admin` / **Contraseña**: `admin`
- **Usuario**: `user` / **Contraseña**: `password`

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # Guards de navegación (auth-guard)
│   │   └── services/        # Servicios (AuthService)
│   ├── pages/
│   │   ├── dashboard/       # Página principal con trending cards
│   │   ├── login/           # Página de autenticación
│   │   ├── settings/        # Configuración y logout
│   │   ├── history/         # Historial
│   │   ├── detail/          # Detalle de contenido
│   │   └── new/             # Crear nuevo contenido
│   ├── shared/
│   │   └── components/      # Componentes compartidos (TrendCard)
│   └── home/                # Página de bienvenida
└── theme/                   # Estilos globales
```

## Funcionalidades Principales

### Dashboard
- Muestra la fecha y hora actual
- Saludo personalizado al usuario
- Carrusel con 3 tarjetas de noticias trending
- Botones de navegación a diferentes secciones
- Funcionalidad de refresh para actualizar el contenido

### Autenticación
- Login con validación de credenciales
- Almacenamiento de sesión en localStorage
- Guard para proteger rutas autenticadas
- Funcionalidad de logout desde settings

### Navegación
- Sistema de routing con lazy loading
- Botones de retroceso en todas las páginas
- Iconos de Ionicons para la interfaz

## Scripts Disponibles

- `ionic serve` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm test` - Ejecuta las pruebas unitarias

## Navegadores Soportados

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

## Licencia

Este proyecto es de uso interno.
