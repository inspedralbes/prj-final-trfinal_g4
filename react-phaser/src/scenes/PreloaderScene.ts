import Phaser from 'phaser';

export class PreloaderScene extends Phaser.Scene {

    constructor() {
        super('preloader');
    }

    init(){}

    preload() {
        // Load assets here
        // this.load.image('ground', 'tiles/spritesheet_ground.png');
        // this.load.tilemapTiledJSON('mapa_lvl1', 'tiles/mapa_lvl1.json');
    }

    create() {
        // Start game here
        // this.scene.start('game');
    }

    update(){}

    private createNewGame (){
        // this.scene.launch('game');
    }
}