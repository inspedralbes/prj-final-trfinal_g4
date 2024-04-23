
import Phaser from 'phaser';

export default class GameHome extends Phaser.Scene {

    cursors;
    character1;
    character2;
    whiteView;
    blackView;
    grayView;
    endGame;

    constructor() {
        super('gamehome');
    }

    preload() {

    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.matter.world.setBounds(0, 0, 800, 600);
        this.matter.world.update60Hz();

        // this.add.image(0, 0, 'tileset');
        const map = this.make.tilemap({ key: 'mapa' });
        const tileset = map.addTilesetImage('tilesetWhite', 'tileset');

        const gray = map.createLayer('gray', tileset);
        const rows = gray.height;

        for (let y = 0; y < rows; y++) {
            const tilesInRow = gray.width;
            for (let x = 0; x < tilesInRow; x++) {
                const tileG = gray.getTileAt(x, y);

                // Check if tile exists, has an index greater than 0 (not empty), and is currently white
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

        gray.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(gray);

        const white = map.createLayer('white', tileset);

        for (let y = 0; y < white.height; y++) {
            for (let x = 0; x < white.width; x++) {
                const tileW = white.getTileAt(x, y);

                if (tileW && tileW.index > 0) {
                    // console.log(tileW);
                    // tileW.tint = 0xffffff;
                }
            }
        }

        white.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(white);

        const black = map.createLayer('black', tileset);

        for (let y = 0; y < black.height; y++) {
            for (let x = 0; x < black.width; x++) {
                const tileB = black.getTileAt(x, y);

                if (tileB && tileB.index > 0) {
                    tileB.tint = 0x303030;
                }
            }
        }
        black.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(black);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        //this.cameras.main.setZoom(3.5);
        const objectsLayer = map.getObjectLayer('Objects')
        // this.cameras.main.startFollow(this.character1)
        objectsLayer.objects.forEach(objData => {
            let { x = 0, y = 0, name, width = 0, height = 0 } = objData
            x = parseInt(x);
            y=parseInt(y);
           // console.log(objData);
            switch (name) {
                case 'spawn-1':
                    {
                        console.log('character1',x, y, width, height);
                        let mSprite = this.matter.add.sprite('character1-idle');
                        mSprite.setTint(0x303030);
                        this.character1 = {
                            matterSprite: mSprite,
                            sensors: {
                                bottom: null,
                                left: null,
                                right: null
                            },
                            numTouching: {
                                left: 0,
                                right: 0,
                                bottom: 0
                            },
                            time: {
                                leftDown: 0,
                                rightDown: 0
                            },
                            blocked: {
                                left: false,
                                right: false,
                                bottom: false
                            },
                            lastJumpedAt: 0,
                            speed: {
                                run: 2,
                                jump: 7
                            }
                        }
                        
                        const M = Phaser.Physics.Matter.Matter;
                        const w = this.character1.matterSprite.width;
                        const h = this.character1.matterSprite.height;

                        const sx = w / 2;
                        const sy = h / 2;

                        const playerBody = M.Bodies.rectangle(sx, sy, w * 0.75, h);
                        this.character1.sensors.bottom = M.Bodies.rectangle(sx, h, sx, 5, { isSensor: true });
                        this.character1.sensors.left = M.Bodies.rectangle(sx - w * 0.40, sy, 5, h * 0.25, { isSensor: true });
                        this.character1.sensors.right = M.Bodies.rectangle(sx + w * 0.40, sy, 5, h * 0.25, { isSensor: true });

                        const compoundBody = M.Body.create({
                            parts: [
                                playerBody, this.character1.sensors.bottom, this.character1.sensors.left, this.character1.sensors.right
                            ],
                            friction:  1,
                            restitution: 0
                        });
                        this.character1.matterSprite.setExistingBody(compoundBody).setFixedRotation().setBounce(0).setPosition(x, y);
                        this.anims.create({
                            key: 'idle',
                            frames: this.anims.generateFrameNames('character1', { start: 1, end: 11, prefix: 'character1-idle0', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })

                        this.anims.create({
                            key: 'walk',
                            frames: this.anims.generateFrameNames('character1', { start: 1, end: 12, prefix: 'character1-run0', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })



                        // this.anims.create({
                        //     key: 'walk',
                        //     frames: this.anims.generateFrameNames('character1', { // Use the newly loaded image key
                        //         // Adjust ending index based on the number of walk frames
                        //         prefix: 'character1_run',  // No prefix needed if filenames start at the beginning
                        //         suffix: '.png' // Adjust suffix if frames use a different extension
                        //     }),
                        //     frameRate: 10,  // Adjust frame rate for desired walk animation speed
                        //     repeat: -1     // Loop the animation indefinitely
                        // });

                        this.matter.world.on('beforeupdate', (event) => {
                            this.character1.numTouching.left = 0;
                            this.character1.numTouching.right = 0;
                            this.character1.numTouching.bottom = 0;
                        })

                        this.matter.world.on('collisionactive', (event) => {
                            const playerBody = this.character1.body;
                            const left = this.character1.sensors.left;
                            const right = this.character1.sensors.right;
                            const bottom = this.character1.sensors.bottom;

                            for (let i = 0; i < event.pairs.length; i++) {
                                const bodyA = event.pairs[i].bodyA
                                const bodyB = event.pairs[i].bodyB

                                if (bodyA === playerBody || bodyB === playerBody) {
                                    continue
                                }
                                else if (bodyA === bottom || bodyB === bottom) {
                                    this.character1.numTouching.bottom += 1
                                }
                                else if ((bodyA === left && bodyB.isStatic) || (bodyB === left && bodyA.isStatic)) {
                                    this.character1.numTouching.left += 1
                                }
                                else if ((bodyA === right && bodyB.isStatic) || (bodyB === right && bodyA.isStatic)) {
                                    this.character1.numTouching.right += 1
                                }
                            }
                        }, this);

                        this.matter.world.on('afterupdate', (event) => {
                            this.character1.blocked.right = this.character1.numTouching.right > 0 ? true : false;
                            this.character1.blocked.left = this.character1.numTouching.left > 0 ? true : false;
                            this.character1.blocked.bottom = this.character1.numTouching.bottom > 0 ? true : false;

                        }, this);
                        this.cameras.main.startFollow(this.character1.matterSprite);
                        break;
                    }
                case 'spawn-2':
                    {
                        console.log('character2',x, y, width, height);
                        this.character2 = {
                            matterSprite: this.matter.add.sprite('character1-idle').setPosition(x, y).setTint(0x303030),
                            sensors: {
                                bottom: null,
                                left: null,
                                right: null
                            },
                            numTouching: {
                                left: 0,
                                right: 0,
                                bottom: 0
                            },
                            time: {
                                leftDown: 0,
                                rightDown: 0
                            },
                            blocked: {
                                left: false,
                                right: false,
                                bottom: false
                            },
                            lastJumpedAt: 0,
                            speed: {
                                run: 2,
                                jump: 7
                            }
                        }
                        //this.cameras.main.startFollow(this.character2.matterSprite);
                        this.cameras.main.setZoom(2);
                        const M = Phaser.Physics.Matter.Matter;
                        const w = this.character2.matterSprite.width;
                        const h = this.character2.matterSprite.height;

                        const sx = w / 2;
                        const sy = h / 2;

                        const playerBody = M.Bodies.rectangle(sx, sy, w * 0.75, h);
                        this.character2.sensors.bottom = M.Bodies.rectangle(sx, h, sx, 5, { isSensor: true });
                        this.character2.sensors.left = M.Bodies.rectangle(sx - w * 0.40, sy, 5, h * 0.25, { isSensor: true });
                        this.character2.sensors.right = M.Bodies.rectangle(sx + w * 0.40, sy, 5, h * 0.25, { isSensor: true });

                        const compoundBody = M.Body.create({
                            parts: [
                                playerBody, this.character2.sensors.bottom, this.character2.sensors.left, this.character2.sensors.right
                            ],
                            friction: 1,
                            restitution: 0
                        });
                        this.character2.matterSprite.setExistingBody(compoundBody).setFixedRotation().setBounce(0).setPosition(x, y);
                           
                        this.anims.create({
                            key: 'idle',
                            frames: this.anims.generateFrameNames('character1', { start: 1, end: 11, prefix: 'character1-idle0', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })

                        this.anims.create({
                            key: 'walk',
                            frames: this.anims.generateFrameNames('character1', { start: 1, end: 12, prefix: 'character1-run0', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })

                        // this.anims.create({
                        //     key: 'walk',
                        //     frames: this.anims.generateFrameNames('character2', { // Use the newly loaded image key
                        //         // Adjust ending index based on the number of walk frames
                        //         prefix: 'character2_run',  // No prefix needed if filenames start at the beginning
                        //         suffix: '.png' // Adjust suffix if frames use a different extension
                        //     }),
                        //     frameRate: 10,  // Adjust frame rate for desired walk animation speed
                        //     repeat: -1     // Loop the animation indefinitely
                        // });

                        this.matter.world.on('beforeupdate', (event) => {
                            this.character2.numTouching.left = 0;
                            this.character2.numTouching.right = 0;
                            this.character2.numTouching.bottom = 0;
                        })

                        this.matter.world.on('collisionactive', (event) => {
                            const playerBody = this.character2.body;
                            const left = this.character2.sensors.left;
                            const right = this.character2.sensors.right;
                            const bottom = this.character2.sensors.bottom;

                            for (let i = 0; i < event.pairs.length; i++) {
                                const bodyA = event.pairs[i].bodyA
                                const bodyB = event.pairs[i].bodyB

                                if (bodyA === playerBody || bodyB === playerBody) {
                                    continue
                                }
                                else if (bodyA === bottom || bodyB === bottom) {
                                    this.character2.numTouching.bottom += 1
                                }
                                else if ((bodyA === left && bodyB.isStatic) || (bodyB === left && bodyA.isStatic)) {
                                    this.character2.numTouching.left += 1
                                }
                                else if ((bodyA === right && bodyB.isStatic) || (bodyB === right && bodyA.isStatic)) {
                                    this.character2.numTouching.right += 1
                                }
                            }
                        }, this);

                        this.matter.world.on('afterupdate', (event) => {
                            this.character2.blocked.right = this.character2.numTouching.right > 0 ? true : false;
                            this.character2.blocked.left = this.character2.numTouching.left > 0 ? true : false;
                            this.character2.blocked.bottom = this.character2.numTouching.bottom > 0 ? true : false;

                        }, this);

                        break;
                    };
                    
                case 'endGame':
                    {
                        this.endGame = {
                            matterSpriteEnd: this.matter.add.sprite(x + (width * 0.5), y + (height * 0.5), 'frag-out').setTint(0x303030),
                        }
                        this.anims.create({
                            key: 'flag-move',
                            frames: this.anims.generateFrameNames('flag-movement', { start: 1, end: 26, prefix: 'frag-out00', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })
                        break;
                    }

            }
        });

        // this.add.text(20, 20, 'Welcome to the game home');
    }

    update() {

        let matterSprite = this.character1.matterSprite;
        if (this.cursors.left.isDown && !this.character1.blocked.left) {
            this.character1.matterSprite.flipX = true;
            if(this.character1.blocked.left){
                matterSprite.setVelocityX(0);
            }else{
               matterSprite.setVelocityX(-this.character1.speed.run);
            }
            matterSprite.anims.play('walk', true);
        } else if (this.cursors.right.isDown && !this.character1.blocked.right) {
            this.character1.matterSprite.flipX = false;
            if(this.character1.blocked.right){
                matterSprite.setVelocityX(0);
            }
            else{matterSprite.setVelocityX(this.character1.speed.run);}
            
            matterSprite.anims.play('walk', true);

        } else {
            matterSprite.setVelocityX(0);
            matterSprite.anims.play('idle', true);
        }
        if (this.cursors.up.isDown) {
            matterSprite.anims.play('jump', true);

            if (this.character1.blocked.bottom) {
                this.character1.matterSprite.flipX = false;
                matterSprite.setVelocityY(this.character1.speed.jump * -1);
                this.character1.speed.run = 2.5;

            }
            if (!this.character1.blocked.bottom) {
                this.character1.speed.run = 2;
            }
            // matterSprite.anims.play('jump', true);
            // this.character1.matterSprite.setVelocityY(-10);
        }

        // Assuming character1.matterSprite is created in create

    }
}
