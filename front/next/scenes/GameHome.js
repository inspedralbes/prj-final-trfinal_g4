import Phaser from 'phaser';

export default class GameHome extends Phaser.Scene {

    cursors;
    character1;
    character2;
    whiteView;
    blackView;
    grayView;
    flag_endGame;
    platform;

    constructor() {
        super('gamehome');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 600);

        const map = this.make.tilemap({ key: 'mapa' });
        const tileset = map.addTilesetImage('tilesetWhite', 'tileset');

        const gray = map.createLayer('gray', tileset);
        const rows = gray.height;
        gray.setCollisionByProperty({ collides: true });
        for (let y = 0; y < rows; y++) {
            const tilesInRow = gray.width;
            for (let x = 0; x < tilesInRow; x++) {
                const tileG = gray.getTileAt(x, y);

                if (tileG && tileG.index > 0) { // White color check
                    this.tweens.add({
                        targets: tileG,
                        tint: 0xffffff,
                        duration: 1000,
                        ease: 'Custom',
                        delay: x * 50, // Optional delay per tile
                        onComplete: () => {
                            tileG.tint = 0x969696; // Change tint to gray after animation completes
                        }
                    });
                }
            }
        }

        const white = map.createLayer('white', tileset);

        for (let y = 0; y < white.height; y++) {
            for (let x = 0; x < white.width; x++) {
                const tileW = white.getTileAt(x, y);

                if (tileW && tileW.index > 0) {
                    // console.log(tileW);
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

        const objectsLayer = map.getObjectLayer('Objects')
        objectsLayer.objects.forEach(objData => {
            let { x = 0, y = 0, name, width = 0, height = 0, xFlag = 0, yFlag = 0 } = objData
            x = parseInt(x);
            y = parseInt(y);
            xFlag = parseInt(xFlag);
            yFlag = parseInt(yFlag);
            switch (name) {
                case 'spawn-1':
                    {

                        this.character1 = this.physics.add.sprite(x, y, 'character1-idle').setTint(0x303030);
                        console.log(this.character1);
                        const w = this.character1.width;
                        const h = this.character1.height;

                        this.physics.add.existing(this.character1);

                        this.character1.body.setSize(w * 0.75, h);

                        this.character1.setPosition(x, y);

                        this.anims.create({
                            key: 'idle',
                            frames: this.anims.generateFrameNames('character1', { start: 1, end: 11, prefix: 'character1-idle0', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })

                        this.anims.create({
                            key: 'walk',
                            frames: this.anims.generateFrameNames('character1', { start: 1, end: 11, prefix: 'character1-run0', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })

                        this.physics.add.collider(this.character1, gray);
                        this.physics.add.collider(this.character1, black);
                        // this.physics.add.collider(this.character1, this.character2);

                        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
                        break;
                    }
                case 'spawn-2':
                    {
                        this.character2 = this.physics.add.sprite(x, y, 'character1-idle')

                        const w = this.character2.width;
                        const h = this.character2.height;

                        this.physics.add.existing(this.character2);

                        this.character1.body.setSize(w * 0.75, h);

                        this.character2.setPosition(x, y);

                        this.anims.create({
                            key: 'idle',
                            frames: this.anims.generateFrameNames('character1', { start: 1, end: 10, prefix: 'character1-idle0', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })

                        this.anims.create({
                            key: 'walk',
                            frames: this.anims.generateFrameNames('character1', { start: 1, end: 11, prefix: 'character1-run0', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })

                        this.physics.add.collider(this.character2, gray);
                        this.physics.add.collider(this.character2, white);
                        this.physics.add.collider(this.character2, this.character1);

                        break;
                    };

                case 'endGame':
                    {

                        this.flag_endGame = this.physics.add.sprite(x, y, 'flag-movement');
                        const w = this.flag_endGame.width;
                        const h = this.flag_endGame.height;

                        this.physics.add.existing(this.flag_endGame);

                        this.flag_endGame.body.setSize(w * 0.45, h - 3);

                        this.flag_endGame.setPosition(x, y);

                        // this.flag_endGame.setFrame('flag', 'tile-out.png');

                        this.anims.create({
                            key: 'flagMove',
                            frames: this.anims.generateFrameNames('flag-movement', { start: 0, end: 9, prefix: 'flag', suffix: '.png' }),
                            frameRate: 10,
                            repeat: 5
                        })

                        this.physics.add.overlap(this.flag_endGame, this.character1, (flag, character1) => {
                            if (!flag.anims.isPlaying) {
                                flag.anims.play('flagMove', true).on('animationcomplete', () => {
                                    flag.anims.stop('flagMove');
                                });
                                setTimeout(() => {
                                    this.add.text(400, 300, '¡Fin del tutorial!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
                                }, 5000);
                            }
                        })

                        this.physics.add.collider(this.flag_endGame, gray);

                        break;
                    }
                case 'platform_move_up-1':
                    {
                        this.platform = this.physics.add.sprite(x, y, 'platform');
                        const w = this.platform.width * 1; // Double the width of the platform
                        const h = this.platform.height;

                        this.platform.scaleX = 1.5;

                        this.physics.add.existing(this.platform);

                        this.platform.body.setSize(w, h);

                        this.platform.setPosition(x * 1.047, y);

                        this.anims.create({
                            key: 'platformMoveUp',
                            frames: this.anims.generateFrameNames('platform', { start: 1, end: 25, prefix: 'tile00', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })

                        this.physics.add.collider(this.platform, gray);

                        break;
                    }
                case 'death':
                    {

                    }

            }
        });

    }

    update() {

        // if (this.physics.overlap(this.character1, this.platform)) {
        //     // Define the maximum height for the platform
        //     this.platform.setVelocityY(-60);
        //     this.character1.setVelocityY(-60);
        //     this.platform.anims.play('platformMoveUp', true);
        // } else {
        //     this.platform.setVelocityY(60);
        //     this.platform.anims.play('platformMoveUp', false);
        // }
        // this.flag_endGame.anims.play('flag-out', true);


        if (this.cursors.left.isDown) {
            this.character1.flipX = true;

            this.character1.setVelocityX(-200);

            this.character1.anims.play('walk', true);
        } else if (this.cursors.right.isDown) {
            this.character1.flipX = false;

            this.character1.setVelocityX(200);
            this.character1.anims.play('walk', true);

        } else {
            this.character1.body.setVelocityX(0);
            this.character1.anims.play('idle', true);
            this.character2.anims.play('idle', true);

        }
        if (this.cursors.up.isDown && this.character1.body.onFloor()) {
            console.log('jump');
            this.character1.setVelocityY(-280);
        }



    }
}
