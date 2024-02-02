import Phaser from 'phaser';

class Scene1 extends Phaser.Scene {
    constructor() {
        super('Scene1');
    }

    preload() {
        console.log('ey');
        // this.load.image('sky', 'sky.png');

    }

    create() {
        console.log('ey');
        // const text = this.add.text(250, 250, 'Hello Phaser!', { font: '16px Courier', fill: '#212021' });
        // this.add.image(0, 0, 'tiles');
        // this.add.image(400, 300, 'sky');
        

        const map = this.make.tilemap({ key: 'mundoLvl1' });
        console.log('entraaaaaaaaaaa');
        const tileset = map.addTilesetImage('suelos', 'suelo');

        map.createLayer('suelo', tileset);
    }

    update() {

    }
}

export default Scene1;