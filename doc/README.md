# Documentació bàsica del projecte

## Continguts

- [Objectius](#objectius)
- [Arquitectura bàsica](#arquitectura-bàsica)
  - [Tecnologies utilitzades](#tecnologies-utilitzades)
  - [Interrelació entre els diversos components](#interrelació-entre-els-diversos-components)
- [Desenvolupament](./docker-Develop/README.md)
- [Desplegament](./produccio/README.md)
- [Frontend](../front/next/README.md)
  - [Phaser](./phaser/README.md)
- [Backend](./laravel/README.md)
- [Node.js](../node/README.md)

## Objectius

El projecte té com a objectiu desenvolupar una plataforma interactiva que permeti als usuaris jugar a jocs en línia. Els objectius principals són:

- Proporcionar una experiència d'usuari fluïda i atractiva.
- Permetre la integració fàcil de nous mapes.
- Donar accés als usuaris a formar part del Joc.
- Proporcionar una plataforma de joc en parella en línia.

## Arquitectura bàsica

### Tecnologies utilitzades

- **Node.js**: Utilitzat per al backend del sistema gràcies a la seva capacitat de manejar múltiples connexions simultànies de manera eficient.
- **React**: Utilitzat per al desenvolupament del frontend, permetent la creació d'interfícies d'usuari reactives i dinàmiques.
- **Next.js**: Framework de React utilitzat per a la creació de l'aplicació web, permetent la creació de pàgines web de manera senzilla i eficient.
- **Phaser**: Framework de JavaScript per al desenvolupament de jocs, utilitzat per crear els jocs de la plataforma.
- **Laravel**: Framework de PHP utilitzat per al backend del sistema, permetent la creació de l'API RESTful.
- **Docker**: Utilitzat per a la creació de contenidors, permetent una implementació fàcil i coherent en diferents entorns.

- **TailwindCSS**: Utilitzat per a la creació de l'aparença de l'aplicació web, permetent la creació de dissenys atractius i responsius de manera senzilla.
- **Zustand**: Utilitzat per a la gestió de l'estat de l'aplicació, permetent la creació de components reactius i dinàmics.
- **Socket.io**: Utilitzat per a la comunicació en temps real entre el frontend i el backend, permetent la creació de jocs multijugador en línia.

### Interrelació entre els diversos components

El sistema està compost per diversos components que interactuen entre si per proporcionar una experiència d'usuari completa i atractiva. Els components principals són:
  - **Frontend**: Desenvolupat amb React i Next.js, proporciona una interfície d'usuari atractiva i dinàmica per als usuaris.
  - **Backend**: Desenvolupat amb Laravel, proporciona una API RESTful per a la comunicació entre el frontend i la base de dades.
  - **Base de dades**: Utilitzada per emmagatzemar la informació dels usuaris, els jocs i altres dades rellevants per al funcionament del sistema.
  - **Jocs**: Desenvolupats amb Phaser, proporcionen una experiència de joc interactiva i atractiva per als usuaris.
  - **Comunicació en temps real**: Implementada amb Socket.io, permet la comunicació en temps real entre el frontend i el backend per a la creació de jocs multijugador en línia.
