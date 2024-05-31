
# Documentació per fer el desplegament a producció

En aquesta Documentació es proporciona la configuració per al desplegament de la aplicació de forma manual conectat per SSH.

## Continguts

- [Proxy Invers Nginx](#1-proxy-invers-nginx)
- [Desplegament Laravel](#deplegament-de-laravel)
- [Desplegament Next.js](#deplegament-de-nextjs)
- [Desplegament Node.js](#deplegament-de-nodejs)

## Configuració SSH

Asegura't de tenir una aplicació com Termius, Putty & PutyGen...
Si no tens Termius, pots descargar-ho aqui: (https://termius.com/download/windows)
Si no tens Putty, ports descargar-ho aqui: (https://www.putty.org/)

 - Hauras de posar la clau privada al Termius o Putty i la clau publica al servidor

### Nginx

Per fer el proxy invers a nginx, hem d'instalar-ho primerament 

```bash
sudo apt-get update
  
sudo apt-get instal nginx
```

### Configuració

Entrem a:

```bash
cd /etc/nginx/sites-available 

//Creem una carpeta dins del directori 

sudo mkdir /nom_projecte

```




Enganchem aquesta configuració de proxy i guardem.

```bash
server {
    listen 80;
    listen [::]:80;

    server_name domini;

    location / {
        proxy_pass http://domini:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /back/ {
        proxy_pass https://domini:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /node/ {
        proxy_pass https://domini:3727/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
A continuació hem de habilitar el proxy en `/etc/nginx/sites-enable`

```bash
sudo ln -s /etc/nginx/sites-available/nom_projecte /etc/nginx/sites-enabled/
```

### Verificar Configuració nginx

Una vegada hem habilitat el site, ham de comprovar que tot funciona correctament i no hi han erros en el nginx i recarguem el servei:

```bash
sudo nginx -t

sudo systemctl reload nginx
```

D'aquesta manera verifiquem que la sintaxis del arxius de configuració de nginx son   correctes i recarguem la configuració permetent que els canvis facin efecte.


## Desplegament Laravel

Els següents passos descriuen el desplegament del Back-End (Laravel) de l'aplicació.

### Requisits previs

- Tenir instal·lat PHP (7.3 o superior)
- Tenir instal·lat Composer
- Tenir instal·lat MySQL

### Passos per al desplegament

*Clonar el repositori*

```bash
git clone https://github.com/usuari/repositori.git
```

*Navegar al directori del projecte*

```bash
cd repositori
```

*Instal·lar dependencies de composer*

```bash
composer update o composer install
```

*Copiar el arxiu .env.example i fer els canvis necesaris*

```bash
cp .env.prod .env
```

#### Edita l'arxiu `.env` amb els detalls de la configuració de la base de dades.

*Genera la clau de l'aplicació*

```bash
php artisan key:generate
```

*Executa les migracions y els seeders (si hi han)*

```bash
php artisan migrate:fresh --seed
```

*Configura el servidor web*

    Configura el servidor web per a que apunti al directori `public` de l'aplicació de Laravel

*Reiniciar el servidor web*

```bash
sudo service nginx restart
```

## Desplegament Next.js

Els següents passos descriuen el desplegament del front (NextJS) de l'aplicació.

### Requisits previs

- Tenir instal·lat Node.js
- Tenir instal·lat npm

### Passos per al desplegament

*Navega al directori del plojecte*

```bash
cd repositori
```

*Instal·la les dependencies*

```bash
//Navega a la carpeta on tens el NextJS [ Exemple: cd /front/Next ] 

//Instal·lar dependencies
    
npm install
```

*Contruir l'aplicació*

```bash
npm run build
```
