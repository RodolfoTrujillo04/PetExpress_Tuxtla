# 🚀 Proyecto Node.js con Express

Guía paso a paso para configurar un proyecto **Node.js** usando **Express**, **dotenv**, **Zod**, **Nodemon** y conexión a **MySQL**.

---

## 📦 Requisitos

- Node.js ≥ 18  
- npm ≥ 9  
- MySQL (opcional para bases de datos)  

---

## 1️⃣ Inicializar proyecto

```bash
npm init -y


## 2️⃣ Instalar dependencias principales
npm i express dotenv

## 3️⃣ Instalar Zod (validación de datos)
npm i zod

## 4️⃣ Instalar Nodemon (desarrollo)
npm i -D nodemon

## 5️⃣ Configurar package.json
Reemplaza el contenido con:
{
  "name": "expres",
  "version": "1.0.0",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  },
  "dependencies": {
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  },
  "nodemonConfig": {
    "watch": ["src"],
    "ext": "js,json",
    "ignore": ["node_modules", ".git", ".env"]
  }
}

## 6️⃣ Crear estructura de carpetas
src/
├─ controllers/
├─ middlewares/
├─ repositories/
├─ routes/
├─ services/
├─ utils/
node_modules/
.env
.gitignore

## 7️⃣ Crear archivos principales
touch src/{app.js,server.js} .env .gitignore

## 8️⃣ Configurar app.js
import express from "express";
import "dotenv/config";
import routes from "./routes/index.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Middlewares base
app.use(express.json());

// Rutas
app.use("/api", routes);

// Health check
app.get("/", (_req, res) => res.json({ ok: true }));

// 404 y manejo de errores
app.use(notFound);
app.use(errorHandler);

export default app;

##9️⃣ Configurar server.js
import app from "./app.js";

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}`);
});


## 🔧 Crear middlewares y rutas
touch src/middlewares/{notFound.js,errorHandler.js}
touch src/routes/index.js


    src/routes/index.js

import { Router } from "express";

const router = Router();

// Ruta de health
router.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

export default router;


## 1️⃣0️⃣ Instalar MySQL2 (opcional)
npm i mysql2




# 🚀 Cómo subir tu proyecto a GitHub

Sigue estos pasos para subir tu proyecto Node.js a GitHub desde cero.

---

## 1️⃣ Crear un repositorio en GitHub

1. Ve a [GitHub](https://github.com/) y haz login.  
2. Haz clic en **New repository**.  
3. Pon un **nombre** (por ejemplo: `ecomarket_online`).  
4. Opcional: agrega **descripción**.  
5. Selecciona **Public** o **Private** según tu preferencia.  
6. No marques “Initialize with README” si ya tienes archivos locales.  
7. Haz clic en **Create repository**.

---

## 2️⃣ Inicializar Git localmente

En tu proyecto local (terminal):

git init

## 3️⃣ Configurar .gitignore
node_modules
.env

## 4️⃣ Agregar archivos al staging
git add .

## 5️⃣ Hacer un commit inicial
git commit -m "Primer commit: configuración inicial del proyecto"


##6️⃣ Conectar tu repositorio local con GitHub
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPOSITORIO.git

## 7️⃣ Subir tu proyecto a GitHub
git branch -M main  # Cambia el nombre de la rama principal a main
git push -u origin main

##8️⃣ Verificar en GitHub
Ve a tu repositorio en GitHub.

Deberías ver todos tus archivos subidos.

Tu proyecto ahora está sincronizado y listo para colaborar.

## 9️⃣ Pasos futuros para actualizar tu proyecto
Cada vez que hagas cambios:

git add .
git commit -m "Descripción del cambio"
git push
