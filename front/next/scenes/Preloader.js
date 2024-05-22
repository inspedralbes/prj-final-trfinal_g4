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

    async loadAssets() {
        try {
            const { gameData } = useStore.getState();
            const currentMap = gameData.maps[gameData.currentMap];

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
            this.load.atlas('button', `assets/pressButton.png`, `assets/pressButton.json`);
            this.load.tilemapTiledJSON({
                key: 'mapa',
                url: useStore.getState().gameData.maps[useStore.getState().gameData.currentMap].mapRoute,
            });
        } catch (error) {
            console.error('Error loading assets:', error);
        }
    }

    create() {
        this.time.delayedCall(3000, () => {
            if ({ key: 'mapa' }) {
                this.scene.start('gamehome');
            }

        });
    }
}
