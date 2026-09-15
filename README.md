# 💰 Finance Tracker

Aplicación full stack para el seguimiento de finanzas personales: permite
registrarse, iniciar sesión, y llevar un control de ingresos y gastos con
resumen de balance y gráfico de gastos por categoría.

Full stack personal finance tracker app: register, log in, and keep track
of income and expenses with a balance summary and an expense-by-category
chart.

## Stack

**Frontend:** React + Vite, React Router, Tailwind CSS, Axios, Recharts
**Backend:** Node.js + Express, PostgreSQL, Prisma (ORM), JWT, bcrypt

## Funcionalidades / Features

- 🇦🇷 Registro e inicio de sesión con JWT · Rutas protegidas (cada usuario ve solo sus datos) · CRUD completo de transacciones · Resumen de ingresos/gastos/balance · Gráfico de gastos por categoría
- 🇺🇸 Register and login with JWT · Protected routes (each user sees only their own data) · Full transaction CRUD · Income/expense/balance summary · Expense-by-category chart

## Cómo correrlo localmente / Running locally

### 1. Base de datos / Database

```bash
docker compose up -d
```

Levanta PostgreSQL en `localhost:5434` (usuario/contraseña `postgres`, base `finance_tracker`).
Starts PostgreSQL on `localhost:5434` (user/password `postgres`, database `finance_tracker`).

### 2. Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
```

Creá un archivo `.env` en `backend/` con:
Create a `.env` file in `backend/` with:

DATABASE_URL="postgresql://postgres:postgres@localhost:5434/finance_tracker?schema=public"
JWT_SECRET="tu-secreto-aqui"
PORT=4000



API disponible en `http://localhost:4000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Creá un archivo `.env` en `frontend/` con:
Create a `.env` file in `frontend/` with:

VITE_API_URL=http://localhost:4000/api


App disponible en `http://localhost:5173`.

## Endpoints principales / Main endpoints

| Método | Ruta | Descripción / Description | Auth |
|--------|------|------|------|
| POST | `/api/auth/register` | Crear cuenta / Sign up | No |
| POST | `/api/auth/login` | Iniciar sesión / Log in | No |
| GET | `/api/transactions` | Listar transacciones / List transactions | Sí |
| POST | `/api/transactions` | Crear transacción / Create transaction | Sí |
| PUT | `/api/transactions/:id` | Editar transacción / Update transaction | Sí |
| DELETE | `/api/transactions/:id` | Eliminar transacción / Delete transaction | Sí |

