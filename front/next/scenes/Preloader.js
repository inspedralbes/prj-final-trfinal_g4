import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {

    constructor() {
        super('preloader');
    }



    preload() {
        this.loadingText = this.add.text(20, 20, 'Loading game...');
        // this.load.atlas('character1', 'assets/character1.png', 'assets/character1.json');
        this.load.atlas('character1', 'assets/character1.png', 'assets/character1.json');
        this.load.atlas('flag-movement', 'assets/checkpoint.png', 'assets/checkpoint.json');
        this.load.image('tileset', 'assets/White-terrain.png');
        this.load.tilemapTiledJSON('mapa', 'assets/mapatuto.json');
        this.load.image('logo', 'assets/Logo.png');
        // this.load.image('flag', 'assets/flag.png');
    }

    create() {

        setTimeout(() => {
            this.scene.start('gamehome');
        }, 3000);
    }
}