import Phaser from 'phaser';
import useStore from '../src/store';

export default class Preloader extends Phaser.Scene {

    constructor() {
        super('preloader');
    }



    preload() {
        this.load.setBaseURL('http://localhost:8000/');
        this.load.crossOrigin = 'anonymous';
        this.load.setCORS('anonymous');
        this.load.atlas('character1', 'assets/character1.png', 'assets/character1.json');
        this.load.atlas('flag-movement', 'assets/flag-movement.png', 'assets/flag-movement.json');
        this.load.atlas('death', 'assets/appearing-character.png', 'assets/appearing-character.json');
        this.load.atlas('platform', 'assets/platform.png', 'assets/platform.json');
        this.load.image('tileset', 'assets/White-terrain.png');
        // this.load.tilemapTiledJSON('mapa', mapRem);
        this.load.image('logo', 'assets/Logo.png');
        this.load.image('confetti', 'assets/confetti.png');
        this.load.atlas('button', 'assets/pressButton.png', 'assets/pressButton.json')
        // this.load.image('flag', 'assets/flag.png');


        
        this.load.tilemapTiledJSON('mapatuto', 'maps/mapatuto.json');
    }

    create() {

        setTimeout(() => {
            this.scene.start('gamehome');
        }, 3000);
    }
}