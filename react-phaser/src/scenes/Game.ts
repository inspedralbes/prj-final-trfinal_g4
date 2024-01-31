import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        
    }
    
    create() {
        const map = this.make.tilemap({key: 'mapa_lvl1'});
        const tileset = map.addTilesetImage('mapa_lvl1', 'ground')

        const layer = map.createLayer('plataforma', tileset);
    }
}