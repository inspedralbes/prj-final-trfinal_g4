import Phaser from 'phaser';
import useStore from '../src/store';
import GameHome from './GameHome';
import socket from '../services/sockets';


const BASE_URL = 'http://localhost:8000';
let control = useStore.getState().gameData.currentMap

export default class Preloader extends Phaser.Scene {

    constructor() {

        super('preloader');
    }

    preload() {
        console.log('Preloader');
        this.load.setBaseURL(BASE_URL);
        this.load.crossOrigin = 'anonymous';
        this.load.setCORS('anonymous');

        console.log('Loading assets...');
        this.loadAssets();
    }

    loadAssets() {
        this.add.text(400, 100, 'Carregant', { fontSize: '20px', fill: '#fff' });
        let { gameData } = useStore.getState();
        let currentMap = gameData.maps[gameData.currentMap];

        console.log('Loading assets for map:', currentMap);
        console.log('Loading assets for map:', currentMap.mapRoute);
        console.log('Loading assets for map:', gameData.maps);
        this.load.atlas('character1', `assets/character1.png`, `assets/character1.json`);
        this.load.atlas('flag-movement', `assets/flag-movement.png`, `assets/flag-movement.json`);
        this.load.atlas('death', `assets/appearing-character.png`, `assets/appearing-character.json`);
        this.load.atlas('platform', `assets/platform.png`, `assets/platform.json`);
        this.load.image('tileset', `assets/White-terrain.png`);
        this.load.image('logo', `assets/Logo.png`);
        this.load.image('confetti', `assets/confetti.png`);
        this.load.atlas({
            key: 'button',
            textureURL: `assets/pressButton.png`,
            atlasURL: `assets/pressButton.json`,
        });
        let mapRoute = useStore.getState().gameData.maps[useStore.getState().gameData.currentMap].mapRoute;
        // if (mapRoute.charAt(0) === '/') {
        //     mapRoute = mapRoute.substring(1);
        // }
        this.load.tilemapTiledJSON({
            key: 'mapa',
            url: mapRoute,
        });
        console.log('bababoi');
    }

    create() {
        const scene = this.scene.get('gamehome');
        console.log(scene);
        if (scene) {

            this.scene.remove("gamehome");
            console.log(this.scene.get('gamehome'));

            if(this.scene.get('gamehome')==null){
                this.scene.add('gamehome', GameHome, true);

                if (control != useStore.getState().gameData.currentMap) {
                    console.log({ key: 'mapa' })
                    console.log(useStore.getState().gameData.currentMap)

                    this.scene.start('preloader');
                    control = useStore.getState().gameData.currentMap;
                } else {
                    this.add.text(400, 100, 'Carregant', { fontSize: '20px', fill: '#fff' });
                    let yPos = 150;
                    do {
                        this.add.text(400, yPos, Math.random().toFixed(50).toString(), { fontSize: '20px', fill: '#fff' });
                        yPos += 30;
                    } while (!{ key: 'mapa' });
                    this.time.delayedCall(3000, () => {
                        if ({ key: 'mapa' }) {
                            console.log("AIUUUUUUUUUUUUDA");
                            // this.scene.start('gamehome');
                        }



                    });
                }
            }
            scene.events.once('destroy', function () {
                console.log("Sexo");
                this.scene.add('gamehome', GameHome, true);

                if (control != useStore.getState().gameData.currentMap) {
                    console.log({ key: 'mapa' })
                    console.log(useStore.getState().gameData.currentMap)

                    this.scene.start('preloader');
                    control = useStore.getState().gameData.currentMap;
                } else {
                    this.add.text(400, 100, 'Carregant', { fontSize: '20px', fill: '#fff' });
                    let yPos = 150;
                    do {
                        this.add.text(400, yPos, Math.random().toFixed(50).toString(), { fontSize: '20px', fill: '#fff' });
                        yPos += 30;
                    } while (!{ key: 'mapa' });
                    this.time.delayedCall(3000, () => {
                        if ({ key: 'mapa' }) {
                            console.log("AIUUUUUUUUUUUUDA");
                            // this.scene.start('gamehome');
                        }



                    });
                }
            }, this);
            
            this.events.on('destroy', function () {
                console.log("Pene, pene pene pene");
                this.scene.add('gamehome', GameHome, true);

                if (control != useStore.getState().gameData.currentMap) {
                    console.log({ key: 'mapa' })
                    console.log(useStore.getState().gameData.currentMap)

                    this.scene.start('preloader');
                    control = useStore.getState().gameData.currentMap;
                } else {
                    this.add.text(400, 100, 'Carregant', { fontSize: '20px', fill: '#fff' });
                    let yPos = 150;
                    do {
                        this.add.text(400, yPos, Math.random().toFixed(50).toString(), { fontSize: '20px', fill: '#fff' });
                        yPos += 30;
                    } while (!{ key: 'mapa' });
                }
            }, this);
        } else {

            this.scene.add('gamehome', GameHome, true);

            if (control != useStore.getState().gameData.currentMap) {
                console.log({ key: 'mapa' })
                console.log(useStore.getState().gameData.currentMap)

                this.scene.start('preloader');
                control = useStore.getState().gameData.currentMap;
            } else {
                this.add.text(400, 100, 'Carregant', { fontSize: '20px', fill: '#fff' });
                let yPos = 150;
                do {
                    this.add.text(400, yPos, Math.random().toFixed(50).toString(), { fontSize: '20px', fill: '#fff' });
                    yPos += 30;
                } while (!{ key: 'mapa' });
                this.time.delayedCall(3000, () => {
                    if ({ key: 'mapa' }) {
                        console.log("ME ESTAN MATANDO");
                        // this.scene.start('gamehome');
                    }



                });
            }
        }
        socket.emit('gameStarted', { room: useStore.getState().room, game: useStore.getState().gameData });
    }
}
