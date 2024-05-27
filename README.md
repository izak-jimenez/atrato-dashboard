# Atrato Dashboard

Bienvenido a Atrato Dashboard por Isaac Jimenez.

Este proyecto consiste de 3 partes:

- Backend
- Frontend
- Base de Datos

## Scripts

Para descargar todas las dependencias utiliza el comando:

### `npm install`

## Antes de iniciar tangto el frontend como el backend, es necesario que se definan las variables de entorno necesarias para establecer la conexión con PostgreSQL y con el graphQL 
## API de Atrato Dashboard.

### Para generar los queries de GraphQL ejecuta el siguiente comando:
### `npx prisma generate`

Para poder iniciar el backend puedes utilizar el comando de:

### `npm run backend`

Esto iniciará un servidor Node.js con GraphQL en donde reside el API de Atrato Dashboard en `http://localhost:5000`.

El API puede ser accedido a través de la siguiente ruta: `/atrato/graphql/api`

Para iniciar el frontend, utiliza el comando:

### `npm start`

Esto iniciará la app de Atrato Dashboard en `http://localhost:3000`

Tecnologías utilizadas para este proyecto:

- React
- Node.js
- Express
- GraphQL
- Apollo Server y Client
- Prisma
- PostgreSQL
- Pothos
- Typescript


