import Phaser from 'phaser';
// import { Scene, Tilemap, Tileset } from 'phaser';

export class Level1 extends Phaser.Scene {
  constructor() {
    super('Level1');
  }

  init(){}

  preload() {
    this.load.image('ground', 'assets/map/tiles/spritesheet_ground.png');
    this.load.image('items', 'assets/map/tiles/spritesheet_items.png');
    this.load.image('players', 'assets/map/tiles/spritesheet_players.png');
    this.load.image('tiles', 'assets/map/tiles/spritesheet_tiles.png');
    
    this.load.tilemapTiledJSON('tilemap', 'assets/map/json/mapa_lvl1.json');
  }

  create() {
    this.scene.start('Game');
  }
}