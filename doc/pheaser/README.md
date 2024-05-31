# Documentació del Projecte per a entendre Phaser

Aquesta documentació proporciona una visió general de com funciona tota la estructura de Phaser com a conjunt.

## Continguts
- [Escena de Video](#escena-de-video)
- [Preloader](#preloader)
- [Escenes de gameHome](#escenes-de-gamehome)
    - [1. Create](#1-Create)
    - [2. Update](#2-Update)
- [Escena de credits](#2-frontend-nextjs-chromatic-nextjs)
  

## Dades necessaries per poder començar una partida
Quan una partida ha de començar, s'ha d'assegurar que hi hagi conexió a la base de dades, donat que es on es guarden els mapes i assets del joc i amb el servidor de node, que es on trobarem les conexions entre els usuaris.

## Escena de Video

L'escena de video (front\next\scenes\VideoScene.js) es la escena que dona introducció al joc, consta d'un preload()
preload() {
        this.load.video('video', 'assets/OpenCinematic.mp4');
    }
Aixó carrega a la cache el video que es troba al directori assets de next i un create() que comença el video i quan acaba el video t'envia al arxiu preloader, on es carregarán totes les dades del joc
create() {
        const video = this.add.video(window.innerWidth / 2, window.innerHeight / 2, 'video', true);
        video.play(true)
        video.setScale(0.6);
        this.time.delayedCall(66000, () => {
            this.scene.start('preloader');
        });
    }

### Preloader (`Preloader.js`)

Aquesta escena es la que carregara totes les dades del joc, una vegada executat completament es carrega la primera escena del joc, carrega els 4 mapes que s'utilitzarán durant el joc així com els assets de els personatges, jugadors, la imatge que donarà textura a tot, plataformes i les animacions utilitzades durant el lloc.


### Escenes de gameHome (`GameHome.js`)

Hi ha 4 escenes de GameHome, practicament iguals, diferenciant-se en a quina escena criden i quan donat que phaser te problemes amb la utilització de sockets i escenes, del GameHome2 al GameHome3 no es carrega el següent nivell una vegada s'ha guanyat el nivell en comptes de quan s'han actualitzat les dades. Les escenes de GameHome tenen codi amb dos objectius, una part construeix tot el que es el joc i el nivell i defineix el moviment i altre part gestiona la conexió entre el servidor de sockets i el joc de phaser

### 1 Create (`GameHome.js`)

L'apartat de create té com a objectiu carregar les capes i objectes del nivell, primer carrega les capes estatiques de colors, assignant els colors a cada casella i afegint les collisions quan es necessari, una vegada acabar carrega els personatges, cada personatge te un cos inmovil per a l'altre, color, grandaria i posició. També es creen el cursors que més endevant utilitzaràn els jugadors per moure els personatges.

Una vegada s'han carregat els personatges es carreguen la resta d'objectes, als finals de partida se'ls assigna jugador a cada final de nivell, a les plataformes se'ls assigna quin botó afectará al seu moviment,e quant s'ha de moure, en quina direcció ho farà i a quina velocitat i quin es el seu color. als botons se'ls hi assigna el seu color i a quina plataforma afectará, se'ls posa la posició als events de mort.

Després s'oculten totes les plataformes, botons i capes que no s'utilitzaràn i es crean tots els events de socket, que són el canvi de color, que canvia el color del jugador a ambes pantalles i oculta i mostra les capes i objectes que es requereixin així com s'activen i deactiven les hitboxes necessaries, el moviment de l'altre jugador, que actualitza la seva posició i cap a on mira, l'event de mort, que reseteja les posicions dels dos jugadors a l'inici del nivell i l'event de victoria que canvia la escena a la següent i atura la actual.

### 2 Update (`GameHome.js`)

L'apartat d'update fa control dels inputs del jugador i de quan succeixen els events, aquí es controla quan els jugadors es mouen per enviar la informació a l'objecte del personatge per moure'l en la direcció adient i envia la posició a l'altre jugador. També aquíe es controla quan l'usuari vol canviar de color i quan está colisionant amb un botó per començar el moviment de les plataformes, també assignen la velocitat a les plataformes i les mou a la direcció corresponent.

Aquí també es troba el disparador de l'event de mort i de victoria que començarán els emits a socket que després rebrà el fitxer gràcies als listeners que es van fer al event create.


## Escena de credits (`CreditScene.js`)

La escena de credits es una escena senzilla on només s'afegeix text per donar credits a la get que ha participat i en premer el espai borra les dades i et retorna al menú 

---