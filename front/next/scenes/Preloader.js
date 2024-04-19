import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {

    constructor() {
        super('preloader');
    }

    preload() {
        this.loadingText = this.add.text(20, 20, 'Loading game...');

        this.load.image('tileset', 'assets/White-terrain.png');
        this.load.tilemapTiledJSON('mapa', 'assets/mapatuto.json');
        this.load.image('logo', 'assets/Logo.png');

        this.load.on('progress', this.updateProgress, this);
    }

    updateProgress(progress) {
        let adjustedProgress = progress * 100;
        this.loadingText.setText('Loading game... ' + Math.round(adjustedProgress) + '%');
        
    }

    create() {

        setTimeout(() => {
            this.scene.start('gamehome');
        }, 3000);
    }
}