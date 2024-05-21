import Phaser from 'phaser';
import useStore from '../src/store';

const BASE_URL = 'http://localhost:8000';
const ASSETS_PATH = '/assets/';

export default class Preloader extends Phaser.Scene {

    constructor() {
        super('preloader');
    }

    preload() {
        this.load.setBaseURL(BASE_URL);
        this.load.crossOrigin = 'anonymous';
        this.load.setCORS('anonymous');

        console.log('Loading assets...');   
        this.loadAssets();
    }

    loadAssets() {
        try {
            const { gameData } = useStore.getState();
            const currentMap = gameData.maps[gameData.currentMap];

            console.log('Loading assets for map:', currentMap);
            console.log('Loading assets for map:', currentMap.mapRoute);
            console.log('Loading assets for map:', gameData.maps);

            this.load.atlas('character1', `${ASSETS_PATH}character1.png`, `${ASSETS_PATH}character1.json`);
            this.load.atlas('flag-movement', `${ASSETS_PATH}flag-movement.png`, `${ASSETS_PATH}flag-movement.json`);
            this.load.atlas('death', `${ASSETS_PATH}appearing-character.png`, `${ASSETS_PATH}appearing-character.json`);
            this.load.atlas('platform', `${ASSETS_PATH}platform.png`, `${ASSETS_PATH}platform.json`);
            this.load.image('tileset', `${ASSETS_PATH}White-terrain.png`);
            this.load.image('logo', `${ASSETS_PATH}Logo.png`);
            this.load.image('confetti', `${ASSETS_PATH}confetti.png`);
            this.load.atlas('button', `${ASSETS_PATH}pressButton.png`, `${ASSETS_PATH}pressButton.json`);
            this.load.tilemapTiledJSON('mapatuto', useStore.getState().gameData.maps[useStore.getState().gameData.currentMap].mapRoute);
        } catch (error) {
            console.error('Error loading assets:', error);
        }
    }

    create() {
        this.time.delayedCall(3000, () => {
            this.scene.start('gamehome');
        });
    }
}
