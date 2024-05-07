import Phaser from 'phaser';
// const { Body, Bodies } = require('phaser');
// const { GameObjects } = require('phaser');

export default class GameHome extends Phaser.Scene {
    activePointer;
    cursors;
    character1;
    character2;
    whiteView;
    blackView;
    grayView;
    endGame;
    player = 1;
    buttons = [];
    constructor() {
        super('gamehome');
    }
    platforms = [];
    doors = [];

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.activePointer = this.input.activePointer;
    }

    create() {
        // this.physics.world.setBounds(0, 0, 800, 600);

        const map = this.make.tilemap({ key: 'mapa' });
        const tileset = map.addTilesetImage('tilesetWhite', 'tileset');

        const gray = map.createLayer('gray', tileset);

        const rows = gray.height;

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
        gray.setCollisionByProperty({ semicollides: true });
        white.setCollisionByProperty({ semicollides: true });
        black.setCollisionByProperty({ semicollides: true });
        gray.setCollisionByProperty({ collides: true });
        white.setCollisionByProperty({ collides: true });
        black.setCollisionByProperty({ collides: true });
        gray.immovable = true;
        white.immovable = true;
        black.immovable = true;

        const objectsLayer = map.getObjectLayer('Objects')
        objectsLayer.objects.forEach(objData => {
            let { x = 0, y = 0, name, width = 0, height = 0, xFlag = 0, yFlag = 0 } = objData
            x = parseInt(x);
            y = parseInt(y);
            let ogName = "nope";
            if (name.startsWith('button')) {
                ogName = name;
                name = 'button';
            } else if (name.startsWith('platform')) {
                ogName = name;
                name = 'platform';
            } else if (name.startsWith('door')) {
                ogName = name;
                name = 'door';
            } else if (name.startsWith('box')) {
                ogName = name;
                name = 'box';
            }
            switch (name) {
                case 'spawn-1':
                    {

                        this.character1 = this.physics.add.sprite(x, y, 'character1-idle');
                        console.log(this.character1);
                        const w = this.character1.width;
                        const h = this.character1.height;
                        this.character1.body.tint = 0x303030;
                        this.physics.add.existing(this.character1);

                        this.character1.body.setSize(w * 0.50, h * 0.90);

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
                        this.physics.add.collider(this.character1, white);


                        // this.character1.body.setCollisionByProperty({ collides: true });


                        this.character1.setPushable(false);
                        this.cameras.main.startFollow(this.character1);
                        this.cameras.main.setZoom(2);
                        break;
                    }
                case 'spawn-2':
                    {

                        this.character2 = this.physics.add.sprite(x, y, 'character1-idle').setTint(0x303030);
                        console.log(this.character2);
                        const w = this.character2.width;
                        const h = this.character2.height;
                        this.character2.body.tint = 0x303030;
                        this.physics.add.existing(this.character2);

                        this.character2.body.setSize(w * 0.50, h * 0.90);

                        this.character2.setPosition(x, y);

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
                        this.physics.add.collider(this.character2, black);




                        // this.character1.body.setCollisionByProperty({ collides: true });

                        this.character2.setPushable(false);
                        this.cameras.main.setZoom(2);
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

                                    const message = this.add.text(300, 100, '¡Tutorial Completat!', { fontSize: '32px', fill: '#fff' }).setOrigin(0);
                                    const background = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x000000, 0.5).setOrigin(0);

                                    message.setDepth(1);
                                    background.setDepth(0);


                                });

                            }
                        })

                        this.physics.add.collider(this.flag_endGame, gray);

                        break;
                    }
                case 'button':
                    {
                        console.log('button');
                        let button = this.physics.add.sprite(x + (width * 0.5), y + (height * 0.5), 'character1').setTint(0x303030);
                        const w = button.width;
                        const h = button.height;
                        this.physics.add.existing(button);
                        button.body.setSize(w * 0.50, h * 0.90);
                        if (ogName.includes('W')) {
                            button.setTint(0xffffff);
                        } else if (ogName.includes('B')) {
                            button.setTint(0x303030);
                        } else {
                            button.setTint(0x969696);
                        }

                        this.physics.add.collider(button, gray);
                        this.physics.add.collider(button, white);
                        this.physics.add.collider(button, black);
                        button.setPosition(x, y);
                        button.setInteractive();
                        button.name = ogName;
                        this.buttons.push(button);
                        break;
                    }
                case 'platform': {
                    console.log('platform');
                    let platform = this.physics.add.sprite(x+(width/2), y+(height/2), 'platform');
                    platform.setOrigin(0.5, 0.5);
                    if (width < height) {
                       
                        console.log(platform.scaleX, platform.scaleY);
                        platform.setSizeToFrame();
                        
                        platform.displayHeight = width;
                        platform.displayWidth = height;
                        // platform.body.setSize(platform.height*platform.scaleY, platform.width*platform.scaleX);
                        // platform.body.height = platform.displayWidth;
                        // platform.body.width = platform.displayHeight;
                        platform.scaleY = platform.scaleX;
                        platform.setSize(platform.body.height,platform.body.width);
                        platform.angle = 90;
                        
                    } else {
                        platform.displayWidth = width;
                        platform.scaleY = platform.scaleX;
                        platform.setPosition(x + (platform.body.width / 2), y + (platform.body.height / 2));
                    }
                    
                    if (platform.name.includes('W')) {
                        platform.setTintFill(0xffffff);
                    } else if (platform.name.includes('B')) {
                        platform.setTintFill(0x303030);
                    } else {
                        platform.setTintFill(0x969696);
                    }

                    this.physics.add.existing(platform);
                    // Add missing imports for required packages

                    // Add missing imports for required packages
                    
                   
                    // platform.body.setCollisionMask(this.character1.body.collisionMask | this.character2.body.collisionMask);
                    // platform.body.setSize(width, height);

                    
                    // platform.body.setCollisionMask(this.character1.body.setCollisionMask | this.character2.body.setCollisionMask)                    // platform.body.setSize(width, height);
                    platform.setBounce(0.2);

                    
                    platform.posX = platform.x;
                    platform.posY = platform.y;
                    platform.movement = findMovementParam(objData.properties);
                    platform.body.allowGravity = false;


                    platform.body.immovable = true;
                    platform.setInteractive();
                    platform.name = ogName;

                    // this.physics.add.collider(platform, playerPlatformCollision);

                    // this.physics.add.collider(this.character2, platform, playerPlatformCollision);

                    this.platforms.push(platform);

                    break;
                }
                case 'box': {
                    console.log('box');
                    let box = this.physics.add.sprite(x, y, 'box');
                    const w = box.width;
                    const h = box.height;
                    this.physics.add.existing(box);
                    box.body.setSize(w * 0.50, h * 0.90);
                    box.setPosition(x, y);
                    box.setInteractive();
                    box.name = ogName;
                    break;
                }


            }
        });
        window.platforms = this.platforms;
        this.whiteView = white;
        this.blackView = black;
        this.grayView = gray;
        this.buttons.forEach(button => {
            button.associated = [];
            this.platforms.forEach(platform => {
                if (platform.name.split('-')[1] == button.name.split('-')[1]) {
                    console.log(platform.name.split('-')[1]);
                    button.associated.push(platform);
                }
            });

        });
        this.platforms.forEach(platform => {
            if (platform.name.includes('W')) {
                platform.setTint(0xffffff);
                this.physics.add.collider(this.character1, platform);

            } else if (platform.name.includes('B')) {
                platform.setTint(0x303030);
                this.physics.add.collider(this.character2, platform);

            } else {
                platform.setTint(0x969696);

                this.physics.add.collider(this.character1, platform);
                this.physics.add.collider(this.character2, platform);
            }
        });

        function findMovementParam(data) {
            let returndata;
            data.forEach(element => {
                if (element.name == 'movement') {
                    returndata = element.value;
                }
            });
            return returndata;
        }

        this.physics.add.collider(this.character1, gray);
        this.physics.add.collider(gray, this.character1);
        this.physics.add.collider(this.character2, gray);
        this.physics.add.collider(gray, this.character2);
        this.physics.add.collider(this.character1, this.character2);
        this.physics.add.collider(this.character2, this.character1);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    update() {

        this.buttons.forEach(button => {
            const isPlayer1Colliding = this.physics.overlap(button, this.character1);
            const isPlayer2Colliding = this.physics.overlap(button, this.character2);

            // Update platform velocity based on colliding player and button content
            if (button.associated.length > 0) {

                button.associated.forEach(platform => {
                    let platformVelocityY = 0;
                    if ((isPlayer1Colliding && button.name.includes('W')) || (isPlayer2Colliding && button.name.includes('B')) || ((isPlayer1Colliding || isPlayer2Colliding) && button.name.includes('G'))) {
                        platformVelocityY = -32;
                        console.log('colliding');
                        if (platform.name.includes('Fast')) {
                            platformVelocityY -= 32;
                        }
                    }



                    if (platform.name.includes('up')) {
                        if (platform.y < platform.posY && platformVelocityY == 0) {
                            platformVelocityY = 32;
                            if (platform.name.includes('Fast')) {
                                platformVelocityY += 32;
                            }
                        }
                        let hasMovedEnough = Math.abs(platform.body.x) >= platform.body.x + platform.movement || Math.abs(platform.body.y) >= platform.body.y + platform.movement;
                        if (hasMovedEnough && platformVelocityY < 0) {
                            platformVelocityY = 0;
                        }
                        platform.body.setVelocityY(platformVelocityY);
                    } else {

                        if (platform.name.includes('left')) {
                            if (platform.x < platform.posX && platformVelocityY == 0) {
                                platformVelocityY = 32;
                                if (platform.name.includes('Fast')) {
                                    platformVelocityY += 32;
                                }
                            }

                            let hasMovedEnough = Math.abs(platform.body.x) >= platform.body.x + platform.movement || Math.abs(platform.body.y) >= platform.body.y + platform.movement;
                            if (hasMovedEnough && platformVelocityY < 0) {
                                platformVelocityY = 0;
                            }
                            platform.body.setVelocityX(platformVelocityY);
                        } else {
                            if (platform.name.includes('right')) {
                                if (platform.x > platform.posX && platformVelocityY == 0) {
                                    platformVelocityY = 32;
                                    if (platform.name.includes('Fast')) {
                                        platformVelocityY += 32;
                                    }
                                }
                                let hasMovedEnough = Math.abs(platform.body.x) >= platform.body.x + platform.movement || Math.abs(platform.body.y) >= platform.body.y + platform.movement;
                                if (hasMovedEnough && platformVelocityY < 0) {
                                    platformVelocityY = 0;
                                }
                                platform.body.setVelocityX(platformVelocityY * -1);
                            }
                            else {
                                if (platform.name.includes('down')) {
                                    if (platform.y > platform.posY && platformVelocityY == 0) {
                                        platformVelocityY = 32;
                                        if (platform.name.includes('Fast')) {
                                            platformVelocityY += 32;
                                        }
                                    }
                                    let hasMovedEnough = Math.abs(platform.body.x) >= platform.body.x + platform.movement || Math.abs(platform.body.y) >= platform.body.y + platform.movement;
                                    if (hasMovedEnough && platformVelocityY < 0) {
                                        platformVelocityY = 0;
                                    }
                                    platform.body.setVelocityY(platformVelocityY * -1);
                                }
                            }
                        }
                    }




                });


            }
        });

        let changed = false;
        if (this.activePointer.isDown) {
            changed = true;
        }
        if (this.activePointer.up && changed) {
            this.player % 2 == 0 ? this.player = 1 : this.player = 2;
            changed = false;
        }
        
        if (this.player == 1) {
            this.whiteView.setAlpha(1);
            this.blackView.setAlpha(0);
            this.grayView.setAlpha(1);
            this.cameras.main.startFollow(this.character1);
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
        } else {
            this.cameras.main.startFollow(this.character2);
            this.whiteView.setAlpha(0);
            this.blackView.setAlpha(1);
            this.grayView.setAlpha(1);
            if (this.cursors.left.isDown) {
                this.character2.flipX = true;

                this.character2.setVelocityX(-200);

                this.character2.anims.play('walk', true);
            } else if (this.cursors.right.isDown) {
                this.character2.flipX = false;

                this.character2.setVelocityX(200);


                this.character2.anims.play('walk', true);

            } else {
                this.character2.body.setVelocityX(0);
                this.character2.anims.play('idle', true);
                this.character1.anims.play('idle', true);
            }
            if (this.cursors.up.isDown && this.character2.body.onFloor()) {
                console.log('jump');
                this.character2.setVelocityY(-280);



            }
        }
        changed = false;



    }

}
