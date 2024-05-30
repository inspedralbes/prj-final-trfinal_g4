# Documentació del Projecte

Aquesta documentació proporciona una visió general de la configuració de Docker per a una aplicació multi-servei que inclou un backend Laravel, un frontend Next.js, un servidor WebSocket Node.js, una base de dades MySQL i phpMyAdmin per a la gestió de la base de dades.

## Continguts

- [Prerequisits](#prerequisits)
- [Visió General dels Serveis](#visió-general-dels-serveis)
  - [1. Backend Laravel (`chromatic-laravel`)](#1-backend-laravel-chromatic-laravel)
  - [2. Frontend Next.js (`chromatic-nextjs`)](#2-frontend-nextjs-chromatic-nextjs)
  - [3. Servidor Node.js WebSocket (`chromatic-nodesocket`)](#3-servidor-nodejs-websocket-chromatic-nodesocket)
  - [4. Base de Dades MySQL (`chromatic-db`)](#4-base-de-dades-mysql-chromatic-db)
  - [5. phpMyAdmin (`chromatic-phpmyadmin`)](#5-phpmyadmin-chromatic-phpmyadmin)
- [Volums](#volums)
  - [db-data](#db-data)

## Prerequisits

Assegura't de tenir Docker i Docker Compose instal·lats al teu sistema. Opcional el Docker Desktop.
Si no tens Docker instal·lat, pots seguir aquesta guia per instal·lar Docker al teu sistema: [Instal·lació de Docker](https://docs.docker.com/get-docker/).
Si no tens Docker Compose instal·lat, pots seguir aquesta guia per instal·lar Docker Compose al teu sistema: [Instal·lació de Docker Compose](https://docs.docker.com/compose/install/).
Si vols el Docker Desktop, pots seguir aquesta guia per instal·lar Docker Desktop al teu sistema: [Instal·lació de Docker Desktop](https://www.docker.com/products/docker-desktop).


## Visió General dels Serveis

### 1. Backend Laravel (`chromatic-laravel`)

Aquest servei configura l'aplicació Laravel.

- **Context de construcció**: `./back/laravel`
- **Dockerfile**: `./back/laravel/DockerFile`
- **Directori de Treball**: `/var/www`
- **Volums**: Munta `./back/laravel` a `/var/www` dins del contenidor.
- **Comandes**:
  - Actualitza les dependències amb `composer update`.
  - Copia l'arxiu `.env.dev` a `.env`.
  - Genera una clau d'aplicació amb `php artisan key:generate`.
  - Executa les migracions amb `php artisan migrate`.
  - Inicia el servidor Laravel amb `php artisan serve --host=0.0.0.0 --port=8000`.
- **Ports**: `8000:8000`
- **Dependències**: Depèn del servei `chromatic-db`.

### 2. Frontend Next.js (`chromatic-nextjs`)

Aquest servei configura l'aplicació Next.js.

- **Imatge**: `node:18-bullseye`
- **Nom del contenidor**: `chromatic-nextjs`
- **Directori de Treball**: `/app`
- **Volums**: Munta `./front/next` a `/app` dins del contenidor.
- **Ports**: `3000:3000`
- **Variables d'entorn**: 
  - `NODE_ENV=development`
- **Comandes**: 
  - Instal·la les dependències amb `npm install`.
  - Inicia el servidor de desenvolupament amb `npm run dev`.
- **Enllaços**: Enllaçat al servei `chromatic-nodesocket`.

### 3. Servidor Node.js WebSocket (`chromatic-nodesocket`)

Aquest servei configura el servidor WebSocket amb Node.js.

- **Context de construcció**: `./node`
- **Dockerfile**: `./node/DockerFile`
- **Nom del contenidor**: `chromatic-nodesocket`
- **Directori de Treball**: `/app`
- **Volums**: Munta `./node` a `/app` dins del contenidor.
- **Comandes**: 
  - Instal·la les dependències amb `npm install`.
  - Inicia el servidor amb `nodemon index.js -L`.
- **Ports**: `3727:3727`

### 4. Base de Dades MySQL (`chromatic-db`)

Aquest servei configura la base de dades MySQL.

- **Imatge**: `mysql:latest`
- **Nom del contenidor**: `chromatic-mysql_db`
- **Volums**: Munta `db-data` a `/var/lib/mysql` dins del contenidor.
- **Variables d'entorn**:
  - `MYSQL_ROOT_PASSWORD=root`
  - `MYSQL_DATABASE=laravel`
- **Ports**: `3306:3306`

### 5. phpMyAdmin (`chromatic-phpmyadmin`)

Aquest servei configura phpMyAdmin per a la gestió de la base de dades MySQL.

- **Imatge**: `phpmyadmin/phpmyadmin`
- **Nom del contenidor**: `chromatic-phpmyadmin`
- **Variables d'entorn**:
  - `PMA_HOST=chromatic-db`
  - `PMA_PORT=3306`
  - `PMA_USER=root`
  - `PMA_PASSWORD=root`
- **Ports**: `8080:80`
- **Dependències**: Depèn del servei `chromatic-db`.

## Volums

### `db-data`

Aquest volum s'utilitza per emmagatzemar les dades de la base de dades MySQL.

---

Afegeix aquesta documentació al teu `README.md` per proporcionar una guia clara sobre com utilitzar i configurar els serveis Docker per a aquest projecte.