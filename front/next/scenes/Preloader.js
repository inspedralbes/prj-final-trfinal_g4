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
        this.load.setBaseURL(BASE_URL);
        this.load.crossOrigin = 'anonymous';
        this.load.setCORS('anonymous');
        this.loadAssets();
    }

    loadAssets() {
        this.add.text(400, 100, 'Carregant', { fontSize: '20px', fill: '#fff' });
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
        let mapRouteTuto = useStore.getState().gameData.maps[useStore.getState().gameData.currentMap].mapRoute;
        if (mapRouteTuto.charAt(0) === '/') {
            mapRouteTuto = mapRouteTuto.substring(1);
        }
        let map1=useStore.getState().gameData.maps[1].mapRoute;
        if (map1.charAt(0) === '/') {
            map1 = map1.substring(1);
        }
        let map2=useStore.getState().gameData.maps[2].mapRoute;
        if (map2.charAt(0) === '/') {
            map2 = map2.substring(1);
        }
        let map3=useStore.getState().gameData.maps[3].mapRoute;
        if (map3.charAt(0) === '/') {
            map3 = map3.substring(1);
        }
        this.load.tilemapTiledJSON({
            key: 'mapa0',
            url: mapRouteTuto,
        });
        this.load.tilemapTiledJSON({
            key: 'mapa1',
            url: map1,
        });
        this.load.tilemapTiledJSON({
            key: 'mapa2',
            url: map2,
        });
        this.load.tilemapTiledJSON({
            key: 'mapa3',
            url: map3,
        });        
    }

    create() {
        this.add.text(400, 100, 'Estoy aqui', { fontSize: '20px', fill: '#fff' });
        let scene = this.scene.get('gamehome');
        if (scene) {
            this.scene.remove("gamehome");
            if(this.scene.get('gamehome')==null){
                this.scene.add('gamehome', GameHome, true);
                if (control != useStore.getState().gameData.currentMap) {
                    this.scene.switch('preloader');
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
                            // this.scene.start('gamehome');
                        }
                    });
                }
            }
        } else {
            this.scene.add('gamehome', GameHome, true);

            if (control != useStore.getState().gameData.currentMap) {
                this.scene.switch('preloader');
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
                        // this.scene.start('gamehome');
                    }
                });
            }
        }
        window.scene=this.scene;
        // socket.emit('gameStarted', { room: useStore.getState().room, game: useStore.getState().gameData });
    }
}
