import Phaser from 'phaser';

export default class GameHome extends Phaser.Scene {

    constructor() {
        super('gamehome');
    }

    preload() {

    }

    create() {
        // this.add.image(0, 0, 'tileset');
        const map = this.make.tilemap({ key: 'mapa' });
        const tileset = map.addTilesetImage('tilesetWhite', 'tileset');
        map.createLayer('gray', tileset);
        // this.add.text(20, 20, 'Welcome to the game home');
    }
}
