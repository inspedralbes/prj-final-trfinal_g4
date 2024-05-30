
# Documentacio de Front

Aquesta documentació proporciona una descripció breu del projecte i dels diferents components de l'aplicació React/Next.js, adreçada a desenvolupadors que vulguin entendre el funcionament i les funcionalitats de cada part del sistema.


## Index

# Paginas

- [IndexPage](#indexpage)
- [Login](#login)
- [Registre](#registre)
- [Comunitat](#comunitat)
- [Rooms](#rooms)
- [Create](#create)
- [Perfil](#perfil)
- [Mapas](#mapas)
- [HowToPlay](#howtoplay)
- [CrearMapes](#crearmapes)
- [Lobby](#lobby)

# Components

- [ErrorPopup](#errorpopup)
- [Fases](#fases)
- [Header](#header)
- [Loading](#loading)
- [MapCard](#mapcard)

# Services
- [CommunicationManager](#communicationmanager)
- [Sockets](#sockets)




##  IndexPage

IndexPage és la pàgina principal de l'aplicació React/Next.js. Inclou un fons animat, un botó per iniciar el joc, i un widget de Discord que es pot mostrar i ocultar.

## Funcionalitats Principals

    -Fons Animat: Utilitza una imatge GIF (ChromaticBondGif.gif) com a fons de pantalla.

    -Botó de Joc: Un botó estilitzat que redirigeix a la pàgina /rooms per començar el joc.

    -Widget de Discord: Un iframe de Discord que es pot mostrar i ocultar fent clic en una icona SVG.

## Components i Hooks Utilitzats

    -useState de React per gestionar la visibilitat del widget de Discord.

    -Link de next/link per la navegació entre pàgines.
    
    -Component Header per l'encapçalament de la pàgina.

## Estructura del Codi

    1- Estat: isIframeVisible controla la visibilitat del widget de Discord.

    2-Funció toggleIframeVisibility: Alterna la visibilitat del widget.
    
    3- JSX:
        · Un div principal amb el fons animat.
        · El component Header.
        · Un contenidor que inclou el botó "JUGAR" i el widget de Discord.

## Instruccions per a la Implementació

    -Dependències: Assegura't que les dependències (react, next, tailwindcss) estan instal·lades.

    -Component Header: Ha d'estar implementat o importat.

    -Imatge fondoGif: La imatge ha d'estar disponible al directori public/images/.

    -Integració: Col·loca el codi del component a pages/index.js o pages/index.tsx.

    -Estils: Configura Tailwind CSS correctament al projecte.


-----------------------------------------------------------------------------------------

##  Login
En la pagina de Login gestiona el formulari d'inici de sessió per als usuaris de l'aplicació. Inclou funcionalitats per a la validació del correu electrònic, l'enviament de dades de sessió i la gestió d'errors.

## Funcionalitats Principals

    -Inici de Sessió: Formulari per introduir el correu electrònic i la contrasenya.
    
    -Validació del Correu Electrònic: Comprova que el correu electrònic tingui un format vàlid.
    -Gestió d'Errors: Mostra missatges d'error si el formulari està incomplet o si les credencials són incorrectes.
    -Redirecció: Redirigeix els usuaris a la pàgina d'administració o a la pàgina de sales segons si són administradors o usuaris normals.
    -Inici de Sessió amb Google: Inclou una funció comentada per permetre l'inici de sessió amb Google.

## Components i Hooks Utilitzats
    
    -useState per gestionar l'estat dels camps del formulari i els missatges d'error.
    
    -useEffect per gestionar les redireccions després de l'inici de sessió.
    
    -useSession i signIn de next-auth/react per gestionar la sessió dels usuaris.
    
    -useRouter de next/router per gestionar les redireccions.
    
    -Header per mostrar l'encapçalament de la pàgina.
    
    -ErrorPopup per mostrar els missatges d'error.
## Estructura del Codi
    
    1- Estat: email, password, sessionIncomplete, sessionError per gestionar els valors del formulari i els missatges d'error.
    
    2- Funció validateEmail: Valida el format del correu electrònic.
    
    3- Funció handleSubmit: Envia les dades de sessió i gestiona les redireccions.
    
    4- Funció loginGoogle: (Comentada) Permet l'inici de sessió amb Google.
    
    5- JSX:
        ·Formulari d'inici de sessió amb camps per al correu electrònic i la contrasenya.
        
        ·Botó per enviar el formulari.
        
        ·Enllaç per a la pàgina de registre.
        
        ·Missatges d'error mostrats mitjançant ErrorPopup.

-----------------------------------------------------------------------------------------

## Registre

En la pagina de Register gestiona el formulari de registre d'usuaris per a l'aplicació. Permet als usuaris introduir les seves dades per crear un nou compte, incloent-hi nom, correu electrònic, nom d'usuari, contrasenya i confirmació de contrasenya. A més, gestiona la validació de formularis i mostra missatges d'error en cas que hi hagi problemes durant el procés de registre.


## Funcionalitats Principals
    · Formulari de Registre: Proporciona camps per a nom, correu electrònic, nom d'usuari, contrasenya i confirmació de contrasenya.

    · Validació del Formulari:
        · Verifica que tots els camps estiguin completats.

        · Comprova que les contrasenyes coincideixin.

        · Assegura que la contrasenya tingui com a mínim 8 caràcters.

    · Gestió d'Errors: Mostra missatges d'error en cas de formulari incomplet, contrasenyes no coincidents o altres errors durant el registre.

    · Redirecció: Redirigeix a la pàgina d'inici de sessió després d'un registre exitós.

## Components i Hooks Utilitzats
    · useState per gestionar l'estat dels camps del formulari i els missatges d'error.
    
    · useRouter de next/router per gestionar les redireccions.
    
    · register de services/communicationManager per enviar les dades de registre al servidor.

    · ErrorPopup per mostrar els missatges d'error.

    · Header per mostrar l'encapçalament de la pàgina.

## Estructura del Codi

    1-Estat:
        · name, email, username, password, confirmPassword per gestionar els valors del formulari.
        · registrationError, formIncomplete per gestionar els missatges d'error.

    2- Funció handleSubmit:
    
        · Valida els camps del formulari.
        
        · Comprova que les contrasenyes coincideixin i que tinguin una longitud mínima.
        
        · Envia les dades de registre al servidor.

        · Redirigeix a la pàgina d'inici de sessió després d'un registre exitós.
    3- JSX:
        
        · Formulari de registre amb camps per a nom, correu electrònic, nom d'usuari, contrasenya i confirmació de contrasenya.
        
        · Botó per enviar el formulari.
        
        · Enllaç per a la pàgina d'inici de sessió.

        · Missatges d'error mostrats mitjançant ErrorPopup.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Comunitat

    Aquest codi és un component React anomenat Comunitat que permet als usuaris descobrir i visualitzar mapes creats per la comunitat. El component utilitza diversos hooks de React (useState, useEffect) i funcions importades per gestionar l'obtenció i el filtratge de dades de mapes. A continuació, es proporciona un resum de la seva funcionalitat:

    Estat i Efectes:
        maps: Un estat que emmagatzema la llista de mapes.
        fraseCerca: Un estat que emmagatzema la frase de cerca introduïda per l'usuari.
        useEffect: S'executa en muntar el component i carrega tots els mapes si no hi ha mapes carregats.
    
    Funcions:
        getMaps: Carrega tots els mapes des del servei getMapsForCommunity.
        getMapsByLevel: Carrega mapes filtrats per nivell utilitzant el servei getMapsForCommunityByLevel.
        handleSearchMaps: Busca mapes per frase utilitzant el servei searchMaps.
    
    Renderitzat:
        El component renderitza una pàgina amb un encapçalament (Header), botons per filtrar mapes per nivell i un camp de cerca.
        Els botons permeten carregar tots els mapes o filtrar-los per nivell (Nivell 1, Nivell 2, Nivell 3).
        El camp de cerca permet a l'usuari introduir una frase per buscar mapes per nom o descripció.
        Els mapes es mostren en una quadrícula de targetes (MapCard). Si no hi ha mapes per mostrar, es mostra un missatge indicant-ho.
  
    Estils:
        Utilitza classes de Tailwind CSS per aplicar estils als elements.
        En resum, aquest component Comunitat proporciona una interfície d'usuari per explorar i cercar mapes creats per la comunitat, permetent filtrar per diferents nivells i cercar per frases específiques.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

##  Rooms

En la pagina de Rooms permet als usuaris veure i unir-se a sales públiques disponibles o a sales privades mitjançant un codi d'accés. També ofereix l'opció de crear una sala nova o unir-se a una partida ràpida.

## Funcionalitats Principals
    · Mostrar Sales Públiques: Mostra les sales públiques disponibles en temps real.

    · Unir-se a Sales:

        · Públiques: Els usuaris poden unir-se a sales públiques amb un simple clic.

        · Privades: Els usuaris poden unir-se a sales privades introduint un codi d'accés.

    · Creació de Sales: Proporciona un botó per crear una nova sala.

    · Partida Ràpida: Permet als usuaris unir-se ràpidament a una partida aleatòria.

    · Gestió d'Errors: Mostra missatges d'error si el codi de la sala és incorrecte o incomplet.

## Components i Hooks Utilitzats

    · State Hooks (useState):

        · showRooms: Per emmagatzemar i mostrar les sales públiques disponibles.

        · roomCode: Per emmagatzemar el codi d'accés de la sala privada.

        · codeErrorMessage, incorrectCodeErrorMessage: Per gestionar els missatges d'error.

    · Effect Hooks (useEffect)

        · Actualitza la llista de sales públiques disponibles en temps real.
        
        · Redirigeix l'usuari a la pàgina del lobby si ja està unit a una sala.

    · Refs (useRef): Per gestionar els camps del codi d'accés de la sala privada.

## Funcionalitats Detallades

    1- Actualització de Sales Públiques:

        · Un useEffect configura un interval que actualitza constantment les sales públiques des de l'estat global (utilitzant useStore).
    
    2- Unir-se a una Sala:
        
        · Públiques: En fer clic en una sala pública, l'usuari s'uneix i s'actualitza l'estat global amb la informació de la sala i l'usuari.

        · Privades: Els usuaris poden introduir un codi de sala i, si és correcte, s'uneixen a la sala.

    3- Creació de Sales:
        
        · Un botó enllaça a la pàgina de creació de sales.

    4- Partida Ràpida:
        
        · Un botó permet als usuaris unir-se ràpidament a una partida aleatòria.

    5- Gestió d'Errors:

        · Missatges d'error es mostren si el codi d'accés és incorrecte o incomplet.

## Estructura del Codi

    1- Estat: Gestió dels valors dels camps del formulari i dels missatges d'error.

    2- Funcions:
        
        · handleSubmit: Valida i processa el formulari d'entrada del codi de la sala.

        · addPublicRoom: Unir-se a una sala pública.
        
        · addPrivateRoom: Unir-se a una sala privada mitjançant un codi.

        · handleInputChange, handleKeyDown: Gestió dels camps del codi d'accés.

        · handleCreateRoom: Unir-se a una partida ràpida.
    
    3- JSX:
        · Interfície d'usuari per mostrar les sales públiques, crear una nova sala, unir-se a una sala privada i unir-se a una partida ràpida.

        · Missatges d'error mostrats mitjançant ErrorPopup.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------

## Create 

En la pagina de Create permet als usuaris crear una nova sala de joc amb diverses opcions de configuració, com ara el nom de la sala, si és pública o privada, i el mode de joc. També permet seleccionar mapes personalitzats si s'escull el mode de joc "Mapes de la comunitat".

## Funcionalitats Principals

    · Crear Sala: Permet als usuaris crear una nova sala amb un nom i opcions de configuració.
    
    · Sala Pública o Privada: Els usuaris poden optar per crear una sala pública o privada.

    · Modes de Joc: Els usuaris poden seleccionar entre "Mapes originals", "Mapes de la comunitat" o "Aleatori".

    · Selecció de Mapes: En el mode "Mapes de la comunitat", els usuaris poden seleccionar fins a tres mapes personalitzats.

    · Gestió d'Errors: Mostra missatges d'error si falten dades obligatòries per omplir.

## Components i Hooks Utilitzats

    · State Hooks (useState):
        
        ·roomName: Emmagatzema el nom de la sala.
        
        · isPublic: Indica si la sala és pública o privada.
        
        · gameMode: Emmagatzema el mode de joc seleccionat.

        · selectedImages: Emmagatzema els mapes seleccionats en el mode "Mapes de la comunitat".

        · rooms: Emmagatzema la llista de sales existents des de l'estat global (useStore).

        · popupMessage: Emmagatzema els missatges d'error per mostrar.
    
    ·Effect Hooks (useEffect):
    
        · Actualitza la llista de sales existents des de l'estat global en temps real.
        
        · Redirigeix l'usuari a la pàgina del lobby si ja està unit a una sala.

## Funcionalitats Detallades
    
    1- Generar Codi d'Accés:
        
        · La funció generateAccessCode genera un codi d'accés únic de 6 caràcters per a sales privades.

    2- Crear Sala:

        · La funció handleCreateRoom crea una nova sala amb la configuració proporcionada per l'usuari. Si falten dades, mostra un missatge d'error.

    3- Actualització de Sales Existents:

        · Un useEffect configura un interval que actualitza constantment les sales existents des de l'estat global (useStore).

    4- Redirecció a la Pàgina del Lobby:

        · Un useEffect redirigeix l'usuari a la pàgina del lobby si ja està unit a una sala.

    5- Gestió d'Errors:
        
        · Mostra missatges d'error si falten dades obligatòries o si hi ha altres problemes.

## Estructura del Codi

    1- Estat: Gestió dels valors dels camps del formulari i dels missatges d'error.

    2- Funcions:
        
        · generateAccessCode: Genera un codi d'accés únic.
        
        · handleCreateRoom: Valida i processa el formulari per crear una nova sala.
    3- JSX:
        
        · Interfície d'usuari per introduir el nom de la sala, seleccionar si és pública o privada, escollir el mode de joc, i seleccionar mapes personalitzats si s'escau.

        · Missatges d'error mostrats mitjançant ErrorPopup.

-------------------------------------------------------------------------------------------------------------------------------------------------------

## Perfil 

En la pagina de Perfil permet als usuaris editar les seves dades de perfil, incloent el nom, nom d'usuari, correu electrònic, contrasenya i imatge de perfil. Aquest component està dissenyat per facilitar la modificació de la informació personal emmagatzemada en l'aplicació.

## Funcionalitats Principals

    · Visualització de la Informació Actual del Perfil: Mostra la imatge de perfil, nom d'usuari i correu electrònic de l'usuari.
    
    · Editar Informació del Perfil: Permet als usuaris canviar el seu nom, nom d'usuari, correu electrònic, contrasenya i imatge de perfil.
    
    · Gestió d'Errors: Mostra missatges d'error si les contrasenyes no coincideixen, si la contrasenya no compleix els requisits mínims o si no es realitzen modificacions.

## Components i Hooks Utilitzats

    · State Hooks (useState):
        
        · name: Emmagatzema el nou nom de l'usuari.

        · username: Emmagatzema el nou nom d'usuari.

        · email: Emmagatzema el nou correu electrònic.

        · password: Emmagatzema la nova contrasenya.

        · password_confirmation: Emmagatzema la confirmació de la nova contrasenya.

        · image: Emmagatzema la nova imatge de perfil.

        · popupMessage: Emmagatzema els missatges d'error per mostrar.

        · userFromLocalStorage: Emmagatzema la informació de l'usuari desada en localStorage.
    
    · Effect Hooks (useEffect)

        · Recupera la informació de l'usuari desada en localStorage quan el component es carrega.

## Funcionalitats Detallades

    1- Recuperar Informació de l'Usuari:
        
        · Utilitza un useEffect per recuperar la informació de l'usuari emmagatzemada en localStorage i establir-la en l'estat userFromLocalStorage.

    2- Validació i Enviament del Formulari:

        · La funció handleSubmit valida els camps del formulari, assegurant-se que les contrasenyes coincideixen i que la contrasenya compleix els requisits de longitud mínima.

        · Si la validació és correcta, crea un objecte FormData amb els nous valors i crida la funció updateUser per actualitzar la informació del perfil a través d'una API.
    
    3- Actualització de l'Usuari en el localStorage i l'Estat Global:

        · Si l'actualització és exitosa, la informació de l'usuari es guarda novament en localStorage i s'actualitza l'estat global amb la nova informació.

    4- Gestió d'Errors:
        · Mostra missatges d'error si les contrasenyes no coincideixen, si la contrasenya no compleix els requisits de longitud mínima o si hi ha algun error en l'actualització del perfil.  
    
## Estructura del Codi
    
    1- Estat: Gestió dels valors dels camps del formulari i dels missatges d'error.
    
    2- Funcions:

        · handleSubmit: Valida i processa el formulari per actualitzar la informació del perfil.
    
    3- JSX:
        
        · Interfície d'usuari per mostrar la informació actual del perfil i un formulari per editar aquesta informació.

        · Missatges d'error mostrats mitjançant ErrorPopup.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Mapas

En la pagina de Mapas permet als usuaris enviar informació sobre nous mapes, incloent-hi el nom, descripció, fase, miniatura del mapa i l'arxiu del mapa. Aquest component està dissenyat per facilitar la creació i enviament de mapes per part dels usuaris autenticats.

## Funcionalitats Principals

    · Autenticació d'Usuaris: Comprova si l'usuari està autenticat. Si no ho està, redirigeix a la pàgina de login.

    · Formulari d'Enviament de Mapes: Proporciona un formulari on els usuaris poden introduir el nom, descripció, fase, miniatura del mapa i l'arxiu del mapa en format JSON.
    
    · Gestió d'Errors i Missatges d'Éxit: Mostra missatges d'error si hi ha camps incomplets o si hi ha algun problema en l'enviament. Mostra un missatge d'èxit quan el mapa es crea correctament.

## Components i Hooks Utilitzats

    · State Hooks (useState):

        · name: Emmagatzema el nom del mapa.

        · description: Emmagatzema la descripció del mapa.

        · difficulty: Emmagatzema la fase del mapa.

        · img: Emmagatzema la miniatura del mapa.

        · map: Emmagatzema l'arxiu del mapa en format JSON.

        · loading: Indica si la pàgina està carregant.

        · popupMessage: Emmagatzema els missatges d'error per mostrar.

        · successMessage: Emmagatzema els missatges d'èxit per mostrar.
    
    · Effect Hooks (useEffect):
        
        · Comprova si l'usuari està autenticat i, en cas contrari, redirigeix a la pàgina de login.

## Funcionalitats Detallades

    1- Autenticació de l'Usuari:
        
        · Utilitza un useEffect per comprovar si hi ha informació de l'usuari emmagatzemada en localStorage. Si no hi ha informació, redirigeix a la pàgina de login.

    2- Validació i Enviament del Formulari:

        · La funció handleSubmit valida que tots els camps estiguin complets abans d'enviar el formulari. Si falten camps, mostra un missatge d'error.

        · Si l'usuari no està autenticat, mostra un missatge d'alerta.

        · Crea un objecte FormData amb els valors del formulari i crida la funció createMap per enviar les dades a l'API.

    3- Gestió de Missatges d'Éxit i Error:

        · Mostra un missatge d'èxit si el mapa es crea correctament.

        · Mostra missatges d'error si hi ha problemes en l'enviament.

## Estructura del Codi
    1- Estat: Gestió dels valors dels camps del formulari, dels missatges d'error i d'èxit, i de l'estat de càrrega.

    2- Funcions:
        
        · handleSubmit: Valida i processa el formulari per enviar les dades del nou mapa.
    
    3- JSX:

        · Interfície d'usuari per mostrar el formulari d'enviament de mapes.

        · Missatges d'error i d'èxit mostrats mitjançant ErrorPopup.

---------------------------------------------------------------------------------------------------------------------------------------------------------------


## HowToPlay 

És una pàgina que explica com jugar al joc i mostra una imatge del teclat.


---------------------------------------------------------------------------------------------------------------------------------------------------------------------


## CrearMapes

Aquesta pàgina conté enllaços i instruccions sobre com l'usuari ha de crear els mapes i com ha d'escriure les capes del mapa.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Lobby 

Aquesta pàgina de lobby és part d'una aplicació de jocs en línia, desenvolupada en React amb integració de WebSockets per a la comunicació en temps real. Proporciona una interfície on els usuaris poden unir-se a una sala de joc, comunicar-se amb altres jugadors i veure informació detallada de la partida abans de començar el joc. A continuació es detallen les funcionalitats principals:

    1- Capçalera i Benvinguda: Inclou una capçalera amb la informació de l'usuari i un missatge de benvinguda amb el títol "ESPERANT ACOMPANYANT".

    2- Xat de la Sala:

        · Mostra missatges de xat en temps real dels usuaris a la sala.
        
        · Diferencia els missatges enviats pel servidor i pels altres jugadors.

        · Permet enviar missatges escrits pel jugador.

    3- Usuari i Estat de Preparació:

        · Mostra els usuaris presents a la sala, incloent l'administrador i els altres jugadors.

        · Permet als usuaris canviar el seu estat a "Preparat" per indicar que estan llestos per començar el joc.

        · L'administrador pot veure l'estat de preparació dels altres jugadors i iniciar el joc quan tots estan llestos.


    4- Informació de la Partida:

        · Mostra detalls de la sala com el codi d'accés (si la sala és privada), el nom de la sala, el mode de joc, i els mapes seleccionats per la partida.

    5- Inici del Joc:

        · L'administrador pot iniciar el joc un cop tots els jugadors estan preparats, emetent un esdeveniment a través del WebSocket.

# Ús i Navegació

    · Quan un usuari es connecta a una sala, es subscriu a actualitzacions de l'estat de la sala i missatges de xat en temps real.

    · Els usuaris poden sortir de la sala en qualsevol moment, tornant a la pàgina de selecció de sales.
    
    · L'administrador té controls addicionals per gestionar l'estat de preparació i iniciar la partida.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

## ErrorPopup

Aquest component ErrorPopup és un element emergent dissenyat per mostrar missatges d'error, èxit, informació o advertència a l'usuari. Utilitza React i el hook useState per gestionar l'estat del missatge i useEffect per controlar el temporitzador d'aparició. A continuació es descriuen les funcionalitats principals:

    1- Tipus de Missatges:

        · error: Mostra un missatge d'error amb fons vermell i text blanc.
        
        · incomplete: Mostra un missatge d'advertència amb fons taronja i text blanc.
        
        · success: Mostra un missatge d'èxit amb fons verd i text blanc.
        
        · info: Mostra un missatge d'informació amb fons groc i text negre.
        
        · default: Si no s'especifica cap tipus, es mostra un missatge amb fons gris.

    2- Gestió del Missatge:

        · Mostra el missatge passat com a propietat (message) durant 3 segons.
        
        · Després de 3 segons, el missatge desapareix automàticament.

        · Opcionalment, es pot passar una funció (clearMessage) per netejar el missatge després de desaparèixer.

    3- Estil i Posicionament:

        · El popup està posicionat de manera fixa a la part superior de la pantalla, centrat horitzontalment.

        · Té una classe CSS per a les diferents combinacions de color de fons i text segons el tipus de missatge.

        · Utilitza pointer-events per assegurar que el popup no interfereixi amb altres elements de la interfície mentre és visible.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Fases

Aquest component Fases és una part de l'aplicació que permet als usuaris seleccionar imatges de diferents fases de joc segons la seva dificultat. Aquí es descriuen les seves funcionalitats principals:

    1- Gestió d'imatges per dificultat:

        · Les imatges es carreguen des d'un servidor extern basant-se en la seva dificultat (nivell 1, 2 o 3).

        · Les imatges es poden navegar mitjançant botons de navegació per anar a l'anterior o següent imatge de la fase.

    2- Selecció d'imatges:

        · L'usuari pot seleccionar una imatge per a cada fase fent clic sobre ella.

        · Les imatges seleccionades es mostren amb una vora de color blau per destacar-les.

    3- Restabliment d'imatges:

        · Cada imatge seleccionada té un botó de restabliment (una "X") que permet tornar a l'estat inicial (una imatge per defecte).

    4- Interfície d'usuari:

        · Utilitza components de React per a la seva construcció, incloent-hi useState i useEffect per gestionar l'estat i les dades.

        · Fa ús de les icones react-icons per representar visualment el número de fase i el botó de restabliment.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Header

El component Header és una part important de l'aplicació, que proporciona una barra de navegació superior i opcions per gestionar la sessió de l'usuari. A continuació, es detallen les seves funcionalitats principals:

    1- Autenticació d'usuari:

        · Gestiona l'estat de l'usuari i el token d'autenticació utilitzant useState.

        · Utilitza useEffect per inicialitzar les dades de l'usuari des del magatzem local o l'estat global de l'aplicació.

    2- Navegació i opcions de menú:

        · Ofereix enllaços de navegació a diferents seccions de l'aplicació, com ara crear mapes, instruccions de joc, comunitat, etc.

        · Mostra opcions addicionals com ara administració si l'usuari és un administrador.

    3- Gestió de la sessió de l'usuari:

        · Proporciona un botó per tancar la sessió de l'usuari quan estigui autenticat.
    
        · Guarda les dades de l'usuari al magatzem local i a l'estat global de l'aplicació.
    
    4- Interfície d'usuari i estil:

        · Utilitza estils CSS per a la disposició i aparença del capçal.

        · Mostra un missatge d'error si hi ha problemes durant el tancament de sessió.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Loading

És un component que el que fa és tancar la sessió de l'usuari quan es prem.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


## MapCard

El component MapCard és una targeta que mostra informació detallada d'un mapa i permet als usuaris interaccionar amb aquest mitjançant diferents funcionalitats com ara:

    ·Donar "M'agrada" o "No m'agrada" al mapa.

    · Reportar el mapa si troben contingut inapropiat.

    · Veure informació rellevant com el nom del mapa, descripció, autor i imatge associada.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


## AdminPanel

El component AdminPanel és una interfície de gestió que permet a l'administrador de l'aplicació realitzar diverses accions, incloent-hi:

    · Gestió d'usuaris: Permet veure, filtrar i modificar els usuaris del sistema, incloent-hi la possibilitat de concedir o retirar permisos d'administrador.
    
    · Gestió de mapes: Permet veure, filtrar, descarregar i eliminar mapes, així com aprovar o rebutjar mapes pendents.

    · Gestió de mapes reportats: Permet veure, filtrar i gestionar els mapes que han estat reportats pels usuaris, incloent-hi la cancel·lació de reports.
    
    · Aquesta interfície proporciona una manera eficaç per a l'administració i el manteniment de l'aplicació

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Store 

Aquest codi crea un estat global utilitzant la llibreria zustand de React. L'estat global conté les següents variables i funcions per gestionar-les:

    · user: Conté la informació de l'usuari actual.

    · setUser: Funció per actualitzar la informació de l'usuari.

    · rooms: Llista de sales disponibles.

    · setRooms: Funció per actualitzar la llista de sales.

    · room: Informació de la sala actualment seleccionada.

    · setRoom: Funció per actualitzar la informació de la sala.

    · messages: Llista de missatges en la sala.
    
    · setMessages: Funció per actualitzar la llista de missatges.

    · playerData: Informació dels jugadors en el joc.

    · setPlayerData: Funció per actualitzar la informació dels jugadors.

    · gameData: Informació del joc.

    · setGameData: Funció per actualitzar la informació del joc.
    
    · localUserSocketId: Identificador del socket de l'usuari local.

    · setLocalUserSocketId: Funció per actualitzar l'identificador del socket de l'usuari local.
    
    · admin: Indica si l'usuari té permisos d'administrador.

    · setAdmin: Funció per actualitzar els permisos d'administrador de l'usuari.

Aquest estat global es pot utilitzar per gestionar i compartir dades entre diversos components de l'aplicació React.


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## CommunicationManager 

Aquest és el conjunt de funcions que facilita la connexió entre el backend i el frontend per a l'intercanvi d'informació amb una API RESTful. Les dades que passem inclouen les dades de l'usuari i del mapa quan es creen, i rebem informació dels mapes i dels usuaris.

Les funcions proporcionades permeten gestionar completament els usuaris i els mapes dins del sistema.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Sockets 

Aquest fitxer estableix la connexió del client amb el servidor a través de Socket.IO i gestiona diverses funcionalitats relacionades amb les comunicacions en temps real. Aquestes funcionalitats inclouen rebre i actualitzar informació sobre les sales de xat, missatges, dades dels jugadors i estats del joc. Les dades rebudes s'utilitzen per actualitzar l'estat global de l'aplicació mitjançant l'ús de l'emmagatzematge d'estat proporcionat per la biblioteca Zustand.