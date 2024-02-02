import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload(){
        this.load.image('suelos', 'assets/suelos.png');
        this.load.tilemapTiledJSON('mundoLvl1', 'assets/mundoLvl1.json');
    }

    create(){
        this.scene.start('Scene1');
    }
}