# Proyecto Electron con React y TypeScript

Este proyecto es una configuración básica para crear una aplicación de escritorio con Electron, React, Vite y TypeScript. A continuación, se detallan los pasos para configurar y construir la aplicación.

## Requisitos previos

- Node.js instalado.
- npm o yarn para la gestión de paquetes.

## Pasos de configuración

### 1. Instalar Electron y tipos de Electron

Para comenzar, debes instalar Electron y sus tipos:

```bash
npm install electron
npm install --save-dev @types/electron
```

## Crear el archivo main.ts (o main.js)
Crea un archivo llamado main.ts en la raíz de tu proyecto. Este archivo será el punto de entrada para Electron.

Ejemplo básico de main.ts:

```javascript
import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:3000'); // Cambia esto por la URL de tu servidor Vite
}

app.whenReady().then(createWindow);

```

## Agregar scripts a package.json
Añade los siguientes scripts en tu package.json para poder iniciar y construir la aplicación de Electron:

```json
"scripts": {
  "electron-start": "tsc ./main.ts --outDir ./dist && mv ./dist/main.js ./dist/main.cjs &&  electron ./dist/main.cjs",
  "build": "tsc -b && vite build && tsc ./main.ts --outDir ./dist && mv ./dist/main.js ./dist/main.cjs",
}
```

## Ajuste de los enlaces en index.html
Cuando Vite genere el archivo index.html en el directorio build, asegúrate de ajustar los enlaces de los archivos estáticos agregando ``.`` al inicio de los path.
```html
<link rel="stylesheet" href="./assets/index.css">
<script src="./assets/index.js"></script>
```

## Configuración del campo main en package.json
Agrega el campo main en tu package.json para que Electron sepa cuál es el archivo de entrada:
```json
"main": "./dist/main.cjs"
```
Si usas ESModules, cambia a:
```json
"main": "./dist/main.js"
```

## Configuración de TypeScript
Si estás usando TypeScript, necesitarás crear un archivo tsconfig.electron.json para compilar el archivo de entrada de Electron (main.ts):

Crea el archivo tsconfig.electron.json en la raíz de tu proyecto:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Node",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["main.ts"],
  "exclude": ["node_modules"]
}
```
Luego, agrega una referencia a este archivo en tu tsconfig.json principal:

```json
"references": [
  { "path": "./tsconfig.electron.json" }
]
```

## Instalar electron-builder para empaquetar la aplicación
Instala electron-builder para poder empaquetar la aplicación en un ejecutable:
```bash
npm install --save-dev electron-builder
```

## Configurar electron-builder
Agrega la siguiente configuración en tu package.json para empaquetar la aplicación con electron-builder:
```json
"build": {
  "appId": "com.example.myapp",
  "productName": "My Sample electron app",
  "files": [
    "dist/**/*",
    "assets/**/*",
    "node_modules/**/*",
    "package.json"
  ],
  "win": {
    "target": "nsis",
    "icon": "build/icon.ico"
  }
}
```

## Agregar scripts para generar el ejecutable
Finalmente, agrega los siguientes scripts a package.json para construir el instalador para Windows:
```json
"scripts": {
  "build-pre-exe": "electron-builder",
  "build-exe": "electron-builder --win --x64"
}
```

## Ejecutar la aplicación
Para iniciar la aplicación durante el desarrollo, puedes usar:
```bash
npm run electron-start
```

##  Construir el proyecto
Para compilar y generar un instalador, ejecuta:
```bash
npm run build-pre-exe
npm run build-exe
```