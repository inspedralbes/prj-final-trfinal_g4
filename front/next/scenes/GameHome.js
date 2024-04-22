import Phaser from 'phaser';

export default class GameHome extends Phaser.Scene {

    cursors;
    character1;
    character2;
    whiteView;
    blackView;
    grayView;

    constructor() {
        super('gamehome');
    }

    preload() {

    }

    create() {
        // this.add.image(0, 0, 'tileset');
        const map = this.make.tilemap({ key: 'mapa' });
        const tileset = map.addTilesetImage('tilesetWhite', 'tileset');

        const gray = map.createLayer('gray', tileset);

        for (let y = 0; y < gray.height; y++) {
            for (let x = 0; x < gray.width; x++) {
                const tileG = gray.getTileAt(x, y);

                if (tileG && tileG.index > 0) {
                    tileG.tint = 0x969696;
                }
            }
        }



        const white = map.createLayer('white', tileset);

        for (let y = 0; y < white.height; y++) {
            for (let x = 0; x < white.width; x++) {
                const tileW = white.getTileAt(x, y);

                if (tileW && tileW.index > 0) {
                    tileW.tint = 0xffffff;
                }
            }
        }



        const black = map.createLayer('black', tileset);

        for (let y = 0; y < black.height; y++) {
            for (let x = 0; x < black.width; x++) {
                const tileB = black.getTileAt(x, y);

                if (tileB && tileB.index > 0) {
                    tileB.tint = 0x303030;
                }
            }
        }

        this.grayView = gray.setCollisionByProperty({ collides: true });
        this.whiteView = white.setCollisionByProperty({ collides: true });
        this.blackView = black.setCollisionByProperty({ collides: true });
        const objectsLayer = map.getObjectLayer('Objects')

        objectsLayer.objects.forEach(objData => {
            const { x = 0, y = 0, name, width = 0, height = 0 } = objData

            switch (name) {
                case 'spawn-1':
                    {
                        this.character1 = {
                            matterSprite: this.matter.add.sprite(x + (width * 0.5), y, 'character-1')
                        }
                    }
            }

        })

        // this.add.text(20, 20, 'Welcome to the game home');
    }
}
