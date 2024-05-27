# Documentació del Servidor de Jocs Multijugador

## Introducció

Aquesta és una aplicació de servidor Node.js que utilitza Express i Socket.IO per gestionar un entorn de joc multijugador. El servidor permet als clients crear, unir-se i gestionar sales de joc, així com manejar els estats del joc i les interaccions dels jugadors.

## Dependències

- express: Marc web per a Node.js
- socket.io: Biblioteca per a aplicacions web en temps real
- fs: Mòdul del sistema de fitxers
- http: Mòdul de servidor i client HTTP
- process: Proporciona informació sobre el procés actual de Node.js

## Configuració del Servidor

### Configuració Inicial

1. Importar els mòduls necessaris:
    ```javascript
    const express = require('express');
    const { createServer } = require('http');
    const { Server } = require('socket.io');
    const fetch = require('node-fetch');
    ```

2. Inicialitzar l'aplicació Express i el servidor HTTP:
    ```javascript
    const app = express();
    const port = 3727;
    const server = createServer(app);
    ```

3. Inicialitzar el servidor Socket.IO amb la configuració de CORS:
    ```javascript
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
            allowedHeaders: ["Access-Control-Allow-Origin"],
        }
    });
    ```

## Gestió del Joc

### Variables

- `rooms`: Array per emmagatzemar totes les sales de joc actives.
- `lastRoom`: Compte per generar identificadors únics per a les sales.

### Funcions d'Utilitat

1. **findRoomByUser(userId)**
    - Troba la sala on es troba un usuari específic.
    - Retorna l'objecte de la sala.

2. **nextColor(player)**
    - Canvia al següent color disponible per a un jugador.
    - Retorna el nou color.

3. **getRandomMaps(), getOriginalMaps(), getMapData(data), getCommunityMaps(maps)**
    - Obtenen mapes d'una API externa basats en diferents criteris (aleatoris, originals, comunitat).

### Gestors d'Esdeveniments de Socket.IO

1. **connection**
    - Gestiona les noves connexions de socket.
    - Emets l'estat actual de totes les sales a la nova connexió.

2. **createRoom**
    - Crea una nova sala de joc amb les dades proporcionades.
    - Obten dades del mapa i inicialitza les propietats de la sala.
    - Emets la llista de sales actualitzada a tots els clients connectats.

3. **quickGame**
    - Intenta unir-se a una sala pública existent.
    - Si no es troba cap sala adequada, crea una nova sala de joc ràpid.

4. **joinRoom**
    - Afegeix un usuari a una sala existent.
    - Actualitza l'estat de la sala i emets la informació de la sala actualitzada.

5. **chatMessage**
    - Gestiona els missatges de xat entrants dins d'una sala.
    - Difon el nou missatge a tots els usuaris de la sala.

6. **changeState**
    - Canvia l'estat d'un usuari dins d'una sala.
    - Actualitza i emets la nova informació de la sala.

7. **exitRoom**
    - Gestiona la sortida d'un usuari d'una sala.
    - Actualitza l'estat de la sala, assigna un nou administrador si és necessari i elimina la sala si està buida.

8. **startGame**
    - Comença el joc per a una sala.
    - Inicialitza les dades dels jugadors i emets l'esdeveniment d'inici del joc.

9. **updatePosition**
    - Actualitza la posició d'un jugador dins del joc.
    - Difon les posicions actualitzades a tots els usuaris de la sala.

10. **changeColor**
    - Canvia el color d'un jugador.
    - Difon el nou color a tots els usuaris de la sala.

11. **death**
    - Gestiona els esdeveniments de mort del jugador.
    - Difon l'esdeveniment de mort a tots els usuaris de la sala.

12. **win**
    - Gestiona els esdeveniments de victòria del jugador.
    - Avança al següent mapa o finalitza el joc si tots els mapes s'han completat.

13. **disconnect**
    - Gestiona les desconnexions dels usuaris.
    - Actualitza l'estat de la sala i elimina la sala si està buida.

### Iniciar el Servidor

- Inicia el servidor i escolta al port especificat:
    ```javascript
    server.listen(port, () => {
        console.log(`Server running on port ${port}`)
    });
    ```

## Conclusió

Aquest servidor proporciona un marc robust per gestionar sales de joc multijugador, manejar interaccions de jugadors i gestionar estats de joc. L'ús de Socket.IO garanteix la comunicació en temps real entre el servidor i els clients, fent-lo adequat per a jocs multijugador en temps real.
