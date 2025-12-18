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

- Node.js v20.0.0 o superior (recomendado: v24.11.0 LTS). Puedes usar **nvm** para ello.
- npm v8.0.0 o superior
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

## Desarrollo para Android

### Requisitos Previos para Android

Para desarrollar y probar la aplicación en dispositivos Android, necesitas:

#### Software Necesario
- **Android Studio** (Recomendado) - [Descargar aquí](https://developer.android.com/studio)
  - Incluye Android SDK, herramientas de línea de comandos y emulador
  - Versión mínima recomendada: Arctic Fox o superior
- **Java JDK 17 o superior**
- **Node.js y npm**

#### Configuración de Variables de Entorno

- `ANDROID_HOME=$HOME/Android/Sdk`

Si no estuviera configurado, añade a tu `.bashrc` o `.zshrc`:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

#### Configurar tu Móvil Android

Para probar la app en tu dispositivo físico:

1. **Habilitar las Opciones de Desarrollador:**
   - Ve a `Ajustes > Acerca del teléfono`
   - Pulsa 7 veces sobre `Número de compilación`
   - Verás el mensaje "Opciones de desarrollador activadas"

2. **Habilitar Depuración USB:**
   - Ve a `Ajustes > Sistema > Opciones de desarrollador`
   - Activa `Depuración USB`
   - Activa también `Instalación vía USB` (si está disponible)
   - **Opcional:** Activa `Depuración inalámbrica` (disponible en Android 11+)

3. **Conectar el Móvil:**

   **Opción A - Por Cable USB:**
   - Conecta tu móvil al ordenador mediante cable USB
   - Autoriza la conexión cuando aparezca el diálogo en el móvil

   **Opción B - Inalámbrico (Android 11+):**

   **Requisito previo:** Asegúrate de que móvil y ordenador están en la **misma red WiFi**

   **Paso 1: Activar depuración inalámbrica en el móvil**
   - Ve a `Ajustes > Sistema > Opciones de desarrollador > Depuración inalámbrica`
   - Activa el interruptor de `Depuración inalámbrica`
   - Anota la **IP y puerto** que aparece (ejemplo: `192.168.1.100:45678`)

   **Paso 2: Emparejar el dispositivo (solo la primera vez)**
   - En tu móvil, pulsa en `Vincular dispositivo con código de vinculación`
   - Aparecerá un diálogo con:
     - IP y puerto de emparejamiento (ejemplo: `192.168.1.100:37891`)
     - Código de 6 dígitos (ejemplo: `123456`)

   - En tu ordenador, ejecuta:
     ```bash
     # Reemplaza IP:PUERTO con los valores del diálogo de emparejamiento
     adb pair 192.168.1.100:37891

     # Te pedirá el código de 6 dígitos, introdúcelo
     Enter pairing code: 123456
     ```

   - Si es exitoso, verás: `Successfully paired to 192.168.1.100:37891`

   **Paso 3: Conectar el dispositivo**
   ```bash
   # Usa la IP:PUERTO principal (NO el de emparejamiento)
   # Este aparece en la parte superior de "Depuración inalámbrica"
   adb connect 192.168.1.100:45678
   ```

   - Deberías ver: `connected to 192.168.1.100:45678`

   **Paso 4: Verificar la conexión**
   ```bash
   adb devices
   ```

   - Deberías ver algo como:
     ```
     List of devices attached
     192.168.1.100:45678    device
     ```

   **Notas importantes:**
   - El **emparejamiento** (paso 2) solo se hace **una vez**
   - Para futuras conexiones, solo necesitas el **paso 3** (`adb connect`)
   - Si cambias de red WiFi, deberás repetir todos los pasos
   - El puerto principal (45678) suele ser fijo, pero el de emparejamiento (37891) cambia cada vez

### Configuración Inicial de Android

Ejecuta estos comandos en orden:

```bash
# 1. Construir la aplicación web
npm run build

# 2. Añadir la plataforma Android (solo la primera vez)
npx cap add android

# 3. Sincronizar el código web con Android
npx cap sync android
```

### Probar la App en tu Móvil Android

**Verificar que tu dispositivo está conectado:**
```bash
adb devices
# Deberías ver tu dispositivo listado (por cable o WiFi)
```

#### Opción 1: Ejecutar directamente (Recomendada)

```bash
# Conecta tu móvil (por cable USB o WiFi) y ejecuta:
npx cap run android

# O usa el script npm:
npm run android:run

# Con live reload (para ver cambios en tiempo real):
npm run android:live
```

La aplicación se instalará y abrirá automáticamente en tu móvil. Funciona tanto con conexión por cable como inalámbrica.

#### Opción 2: Generar APK para instalación manual

**Por línea de comandos (recomendado):**
```bash
# 1. Compilar y sincronizar
npm run build && npx cap sync android

# 2. Generar APK debug
cd android && ./gradlew assembleDebug

# El APK estará en: android/app/build/outputs/apk/debug/app-debug.apk
```

**Desde Android Studio:**
```bash
# 1. Abrir el proyecto en Android Studio
npx cap open android

# 2. En Android Studio:
#    - Ve a Build > Build Bundle(s) / APK(s) > Build APK(s)
#    - Espera a que termine la compilación
#    - El APK estará en: android/app/build/outputs/apk/debug/app-debug.apk
```

**Transferir el APK al móvil:**
- Por cable USB
- Por email o Google Drive

### Scripts Útiles para Android

Después de la configuración inicial, puedes usar estos comandos:

```bash
# Sincronizar cambios con Android
npm run android:sync

# Abrir el proyecto en Android Studio
npm run android:open

# Ejecutar en dispositivo conectado
npm run android:run
```

### Credenciales de Login

Para acceder a la aplicación, deberás utilizar credenciales registradas en el sistema.


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

### Desarrollo Web
- `ionic serve` o `npm start` - Inicia el servidor de desarrollo web
- `npm run build` - Compila la aplicación para producción
- `npm test` - Ejecuta las pruebas unitarias
- `npm run lint` - Ejecuta el linter de código

### Desarrollo Android
- `npm run android:build` - Compila la app web y sincroniza con Android
- `npm run android:sync` - Sincroniza cambios con Android (después de hacer build)
- `npm run android:run` - Ejecuta la app en dispositivo/emulador conectado
- `npm run android:open` - Abre el proyecto en Android Studio
- `npm run android:live` - Ejecuta con live reload por WiFi

## Navegadores Soportados

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

## Licencia

Este proyecto es de uso interno.
