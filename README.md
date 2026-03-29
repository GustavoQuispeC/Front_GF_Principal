# Front GF Principal

Frontend principal construido con Next.js, TypeScript, Tailwind CSS y HeroUI.

El proyecto usa App Router y esta organizado para separar rutas, componentes reutilizables, hooks, configuracion, tipos y consumo de APIs.

## Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS 4
- HeroUI
- React Hook Form
- Zod
- Firebase

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Estructura

```text
app/          Rutas, layouts y paginas del sistema
components/   Componentes de UI y componentes por dominio
config/       Configuracion global del proyecto
helpers/      Funciones auxiliares y logica de apoyo
hooks/        Custom hooks
lib/          Clientes y funciones para consumo de APIs
public/       Archivos estaticos
styles/       Estilos globales
types/        Tipos, interfaces y esquemas
```

## Modulos visibles en la estructura actual

- Inicio
- About
- Blog
- Pricing
- Docs
- Login de usuario
- Registro de cliente
- Dashboard
- Gestion de empleados
- Gestion de usuarios

## Requisitos

- Node.js 20 o superior
- npm

## Variables de entorno

El proyecto usa un archivo `.env.local` para configuracion local. Antes de iniciar, define ahi las variables necesarias, por ejemplo credenciales de Firebase y endpoints del backend si aplican.

## Flujo de trabajo local

1. Instala dependencias con `npm install`.
2. Configura las variables en `.env.local`.
3. Inicia el entorno con `npm run dev`.
4. Abre `http://localhost:3000`.

## Notas

- El proyecto tiene una base modular por dominio dentro de `components/`.
- La aplicacion usa alias `@/*` definido en `tsconfig.json`.
- Si vas a trabajar en equipo, conviene versionar un solo lockfile del gestor que realmente uses.
