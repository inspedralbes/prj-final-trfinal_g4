    import Phaser from 'phaser'

    import React, { useEffect, useState } from 'react';
    import {socket} from './socket.js';
    // import { World } from 'matter'
    localStorage.setItem('user', JSON.stringify({ id: 'socket' }))



    export default class Game extends Phaser.Scene {

        cursors
        penguinA
        penguinB
        cam
        pushableObj
        pushableLargeRock
        pushable
        BlueView
        RedView

        constructor() {
            super('game');
        }

        init() {
            this.cursors = this.input.keyboard.createCursorKeys()
        }

        preload() {
            this.load.atlas('penguin', 'assets/penguin.png', 'assets/penguin.json')
            this.load.image('tilesetB', 'assets/ForestTileBlue.png')
            this.load.image('roca', 'assets/roca-blue.png')
            this.load.image('rocaPushable', 'assets/roca-blue.png')
            this.load.image('tilesetP', 'assets/ForestTilePurple.png')
            this.load.image('tilesetC', 'assets/ForestTileRed.png')
            this.load.tilemapTiledJSON('map', 'assets/purple-blue-red-game.json')
        }



        create() {
            socket.emit('joinRoom');
            const map = this.make.tilemap({ key: 'map' })
            const tilesetB = map.addTilesetImage('ForestTileBlue', 'tilesetB')
            const tilesetP = map.addTilesetImage('ForestTilePurple', 'tilesetP')
            const tilesetC = map.addTilesetImage('ForestTileRed', 'tilesetC')

            const PurpleView = map.createLayer('PurpleView', tilesetP);
            const pinchos = map.createLayer('PurpleDangers', tilesetP);
            let userToCompare = JSON.parse(localStorage.getItem('room'));
            console.log('users', userToCompare.users[0].id);
            if (JSON.parse(localStorage.getItem('user')).id === JSON.parse(localStorage.getItem('room')).users[0].id) {
                this.BlueView = map.createLayer('BlueView', tilesetB)
                this.BlueView.setCollisionByProperty({ collides: true })
            }
            if (JSON.parse(localStorage.getItem('user')).id === JSON.parse(localStorage.getItem('room')).users[1].id) {
                this.RedView = map.createLayer('RedView', tilesetC);
                this.RedView.setCollisionByProperty({ collides: true })
            }
            // this.smoothedControls = new SmoothedHorizontalControl(0.0005);
            map.createLayer('pinchos', tilesetB);
            console.log(PurpleView);
            PurpleView.setCollisionByProperty({ collides: true })


            // this.matter.world.setBounds()

            const objectsLayer = map.getObjectLayer('objects')


            objectsLayer.objects.forEach(objData => {
                const { x = 0, y = 0, name, width = 0, height = 0 } = objData

                switch (name) {
                    case 'penguin-spawn-blue':
                        {

                            this.penguinA = {
                                matterSprite: this.matter.add.sprite(x + (width * 0.5), y, 'penguin').setTint(0x05C3FF),
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
                                    run: 7,
                                    jump: 8
                                }
                            }

                            const M = Phaser.Physics.Matter.Matter;
                            const w = this.penguinA.matterSprite.width;
                            const h = this.penguinA.matterSprite.height;

                            const sx = w / 2
                            const sy = h / 2

                            const playerBody = M.Bodies.rectangle(sx, sy, w * 0.75, h, { chamfer: { radius: 10 } });
                            this.penguinA.sensors.bottom = M.Bodies.rectangle(sx, h, sx, 5, { isSensor: true });
                            this.penguinA.sensors.left = M.Bodies.rectangle(sx - w * 0.40, sy, 5, h * 0.25, { isSensor: true });
                            this.penguinA.sensors.right = M.Bodies.rectangle(sx + w * 0.40, sy, 5, h * 0.25, { isSensor: true });
                            const compoundBody = M.Body.create({
                                parts: [
                                    playerBody, this.penguinA.sensors.bottom, this.penguinA.sensors.left, this.penguinA.sensors.right

                                ],
                                friction: 0.01,
                                restitution: 0.05
                            });

                            this.penguinA.matterSprite.setExistingBody(compoundBody).setFixedRotation().setBounce(0.2)
                            if (JSON.parse(localStorage.getItem('user')).id === JSON.parse(localStorage.getItem('room')).users[0].id) {
                                this.cameras.main.startFollow(this.penguinA.matterSprite)
                            }

                            // this.cam = this.cameras.main
                            // this.cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
                            this.anims.create({
                                key: 'walk',
                                frames: this.anims.generateFrameNames('penguin', { start: 1, end: 4, prefix: 'penguin_walk0', suffix: '.png', }),
                                frameRate: 10,
                                repeat: -1
                            });

                            this.anims.create({
                                key: 'jump',
                                frames: this.anims.generateFrameNames('penguin', { start: 1, end: 3, prefix: 'penguin_jump0', suffix: '.png', }),
                                frameRate: 10,
                                repeat: 0

                            });

                            this.anims.create({
                                key: 'idle',
                                frames: [{ key: 'penguin', frame: 'penguin_walk01.png' }]
                            });

                            this.matter.world.on('beforeupdate', (event) => {
                                this.penguinA.numTouching.left = 0
                                this.penguinA.numTouching.right = 0
                                this.penguinA.numTouching.bottom = 0

                            });

                            this.matter.world.on('collisionactive', (event) => {
                                const playerBody = this.penguinA.body;
                                const left = this.penguinA.sensors.left;
                                const right = this.penguinA.sensors.right;
                                const bottom = this.penguinA.sensors.bottom;

                                for (let i = 0; i < event.pairs.length; i++) {
                                    const bodyA = event.pairs[i].bodyA
                                    const bodyB = event.pairs[i].bodyB

                                    if (bodyA === playerBody || bodyB === playerBody) {
                                        continue
                                    }
                                    else if (bodyA === bottom || bodyB === bottom) {
                                        this.penguinA.numTouching.bottom += 1
                                    }
                                    else if ((bodyA === left && bodyB.isStatic) || (bodyB === left && bodyA.isStatic)) {
                                        this.penguinA.numTouching.left += 1
                                    }
                                    else if ((bodyA === right && bodyB.isStatic) || (bodyB === right && bodyA.isStatic)) {
                                        this.penguinA.numTouching.right += 1
                                    }
                                }
                            }, this);

                            this.matter.world.on('afterupdate', (event) => {
                                this.penguinA.blocked.right = this.penguinA.numTouching.right > 0 ? true : false;
                                this.penguinA.blocked.left = this.penguinA.numTouching.left > 0 ? true : false;
                                this.penguinA.blocked.bottom = this.penguinA.numTouching.bottom > 0 ? true : false;

                            }, this);


                            if (JSON.parse(localStorage.getItem('user')).id === JSON.parse(localStorage.getItem('room')).users[0].id) {
                                console.log('user', "EEEEEEEEEEE");

                                // this.playerController = new PlayerController(
                                //     this,
                                //     this.penguinA,
                                //     this.cursors,
                                //     this.obstacles,
                                //     this.pushableObj)
                                //     this.cameras.main.startFollow(this.penguinA)


                            }





                            // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
                            break
                        }
                    case 'penguin-spawn-red':
                        {
                            this.penguinB = {
                                matterSprite: this.matter.add.sprite(x + (width * 0.5), y, 'penguin').setTint(0xff0000),
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
                                    run: 7,
                                    jump: 8
                                }
                            }

                            const M = Phaser.Physics.Matter.Matter;
                            const w = this.penguinB.matterSprite.width;
                            const h = this.penguinB.matterSprite.height;

                            const sx = w / 2
                            const sy = h / 2

                            const playerBody = M.Bodies.rectangle(sx, sy, w * 0.75, h, { chamfer: { radius: 10 } });
                            this.penguinB.sensors.bottom = M.Bodies.rectangle(sx, h, sx, 5, { isSensor: true });
                            this.penguinB.sensors.left = M.Bodies.rectangle(sx - w * 0.40, sy, 5, h * 0.25, { isSensor: true });
                            this.penguinB.sensors.right = M.Bodies.rectangle(sx + w * 0.40, sy, 5, h * 0.25, { isSensor: true });
                            const compoundBody = M.Body.create({
                                parts: [
                                    playerBody, this.penguinB.sensors.bottom, this.penguinB.sensors.left, this.penguinB.sensors.right

                                ],
                                friction: 0.01,
                                restitution: 0.05
                            });

                            this.penguinB.matterSprite.setExistingBody(compoundBody).setFixedRotation().setPosition(100, 35).setBounce(0.2)
                            if (JSON.parse(localStorage.getItem('user')).id === JSON.parse(localStorage.getItem('room')).users[1].id) {
                                this.cameras.main.startFollow(this.penguinB.matterSprite)
                            }

                            // this.cam = this.cameras.main
                            // this.cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
                            this.anims.create({
                                key: 'walk',
                                frames: this.anims.generateFrameNames('penguin', { start: 1, end: 4, prefix: 'penguin_walk0', suffix: '.png', }),
                                frameRate: 10,
                                repeat: -1
                            });

                            this.anims.create({
                                key: 'jump',
                                frames: this.anims.generateFrameNames('penguin', { start: 1, end: 3, prefix: 'penguin_jump0', suffix: '.png', }),
                                frameRate: 10,
                                repeat: 0

                            });

                            this.anims.create({
                                key: 'idle',
                                frames: [{ key: 'penguin', frame: 'penguin_walk01.png' }]
                            });

                            this.matter.world.on('beforeupdate', (event) => {
                                this.penguinB.numTouching.left = 0
                                this.penguinB.numTouching.right = 0
                                this.penguinB.numTouching.bottom = 0

                            });

                            this.matter.world.on('collisionactive', (event) => {
                                const playerBody = this.penguinB.body;
                                const left = this.penguinB.sensors.left;
                                const right = this.penguinB.sensors.right;
                                const bottom = this.penguinB.sensors.bottom;

                                for (let i = 0; i < event.pairs.length; i++) {
                                    const bodyA = event.pairs[i].bodyA
                                    const bodyB = event.pairs[i].bodyB

                                    if (bodyA === playerBody || bodyB === playerBody) {
                                        continue
                                    }
                                    else if (bodyA === bottom || bodyB === bottom) {
                                        this.penguinB.numTouching.bottom += 1
                                    }
                                    else if ((bodyA === left && bodyB.isStatic) || (bodyB === left && bodyA.isStatic)) {
                                        this.penguinB.numTouching.left += 1
                                    }
                                    else if ((bodyA === right && bodyB.isStatic) || (bodyB === right && bodyA.isStatic)) {
                                        this.penguinB.numTouching.right += 1
                                    }
                                }
                            }, this);

                            this.matter.world.on('afterupdate', (event) => {
                                this.penguinB.blocked.right = this.penguinB.numTouching.right > 0 ? true : false;
                                this.penguinB.blocked.left = this.penguinB.numTouching.left > 0 ? true : false;
                                this.penguinB.blocked.bottom = this.penguinB.numTouching.bottom > 0 ? true : false;

                            }, this);


                            if (JSON.parse(localStorage.getItem('user')).id === JSON.parse(localStorage.getItem('room')).users[0].id) {
                                console.log('user', "EEEEEEEEEEE");

                                // this.playerController = new PlayerController(
                                //     this,
                                //     this.penguinB,
                                //     this.cursors,
                                //     this.obstacles,
                                //     this.pushableObj)
                                //     this.cameras.main.startFollow(this.penguinB)


                            }





                            // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels
                            break
                        }
                    case 'rocaPushable':
                        {
                            this.pushableObj = this.matter.add.sprite(x + (width * 0.5), y + (height * 0.5), 'roca')

                            // console.log('pushableObj', this.pushableObj);

                            //         this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
                            //             // console.log("bodyA", _bodyA);
                            //             // console.log("bodyB", _bodyB);

                            //             // console.log("Evento", event);

                            //                 bodyA as MatterJS.BodyType
                            //                 bodyB as MatterJS.BodyType

                            //                 event.pairs.forEach((pair) =>{
                            //                     // console.log(pair);

                            //                     var colisionAbove = normalPerpendicularSuelo(pair.collision.normal);
                            //                     // console.log("boolean", colisionAbove);


                            //                 })

                            //                 if ((bodyA === this.penguin.body && bodyB === this.penguin.body) || (bodyA === this.pushableObj.body && bodyB === this.pushableObj.body)) 
                            //                     {

                            //                         if (this.penguin.body.velocity.y > 0) {
                            //                             console.log("El jugador ha caído sobre la plataforma.");
                            //                         }
                            //                             console.log('pushableObj', this.pushableObj);   
                            //                     } 


                            //                 })

                            break
                        }
                    case 'rocaPushableLarge':
                        {
                            this.pushableLargeRock = this.matter.add.sprite(x + (width * 0.5), y, 'roca')
                            this.pushableLargeRock.scaleX = 6.8
                            this.pushableLargeRock.scaleY = 2
                            this.pushableLargeRock.rotation = 1.5708
                            //         // console.log('pushableObj', this.pushableObj);

                            //         this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
                            //             // console.log("bodyA", _bodyA);
                            //             // console.log("bodyB", _bodyB);

                            //             // console.log("Evento", event);

                            //                 bodyA as MatterJS.BodyType
                            //                 bodyB as MatterJS.BodyType

                            //                 event.pairs.forEach((pair) =>{
                            //                     // console.log(pair);

                            //                     var colisionAbove = normalPerpendicularSuelo(pair.collision.normal);
                            //                     // console.log("boolean", colisionAbove);


                            //                 })

                            //                 if ((bodyA === this.penguin.body && bodyB === this.penguin.body) || (bodyA === this.pushableObj.body && bodyB === this.pushableObj.body)) 
                            //                     {

                            //                         if (this.penguin.body.velocity.y > 0) {
                            //                             console.log("El jugador ha caído sobre la plataforma.");
                            //                         }
                            //                             console.log('pushableObj', this.pushableObj);   
                            //                     } 


                            //                 })

                            break
                        }

                    // case 'spikes':
                    //     {
                    //         const spikes = this.matter.add.rectangle(x + (width * 0.5), y + (height * 0.5), width, height, {
                    //             isStatic: true
                    //         })
                    //         this.obstacles.add('spikes', spikes)

                    //         break
                    //     }
                }
            })
            // 
            this.matter.world.convertTilemapLayer(PurpleView)
            if (this.BlueView !== undefined) {
                this.matter.world.convertTilemapLayer(this.BlueView)
            }
            if (this.RedView !== undefined) {
                this.matter.world.convertTilemapLayer(this.RedView)
            }
            // this.physics.add.collider(this.penguin, objectsLayer["rocaPusable"])
            this.matter.world.convertTilemapLayer(pinchos)

        }


        update(time) {
            
            setTimeout(() => {
                
                if (JSON.parse(localStorage.getItem('user')).id === JSON.parse(localStorage.getItem('room')).users[0].id) {

                    socket.emit('changeMove', { x: this.penguinA.matterSprite.x, y: this.penguinA.matterSprite.y, penguin:1 });
                }
                else {
                    
                    socket.emit('changeMove', { x: this.penguinB.matterSprite.x, y: this.penguinB.matterSprite.y, penguin:2 });
                }
                
            }, 1000)
            if(JSON.parse(localStorage.getItem('user')).id === JSON.parse(localStorage.getItem('room')).users[0].id){
                this.penguinA.matterSprite.x=JSON.parse(localStorage.getItem('room')).users[1].x;
                this.penguinA.matterSprite.y=JSON.parse(localStorage.getItem('room')).users[1].y;
            }
            else{
                this.penguinB.matterSprite.x=JSON.parse(localStorage.getItem('room')).users[0].x;
                this.penguinB.matterSprite.y=JSON.parse(localStorage.getItem('room')).users[0].y;
            }

            if (JSON.parse(localStorage.getItem('user')).id === JSON.parse(localStorage.getItem('room')).users[0].id) {

                let matterSprite = this.penguinA.matterSprite;

                if (this.cursors.left.isDown && !this.penguinA.blocked.left) {
                    console.log("penguinA", this.penguinA);
                    // this.smoothedControls.moveLeft(time);
                    this.penguinA.matterSprite.flipX = true;
                    // oldVelocityX = matterSprite.body.velocity.x;
                    // targetVelocityX = -this.penguinA.speed.run;
                    // newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, 0.05);

                    matterSprite.setVelocityX(-3);
                    matterSprite.anims.play('walk', true);
                    // console.log("velocity: ", newVelocityX);

                } else if (this.cursors.right.isDown && !this.penguinA.blocked.right) {
                    // this.smoothedControls.moveRight(time);
                    this.penguinA.matterSprite.flipX = false;
                    // oldVelocityX = matterSprite.body.velocity.x;
                    // targetVelocityX = this.penguinA.speed.run;
                    // newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, 0.05);
                    matterSprite.setVelocityX(3);
                    matterSprite.anims.play('walk', true);
                    // console.log("velocity: ", newVelocityX);


                } else {
                    this.penguinA.matterSprite.setVelocityX(0);
                    matterSprite.anims.play('idle', true);
                }

                const canJump = (time - this.penguinA.lastJumpedAt) > 250;

                if (this.cursors.up.isDown && canJump) {
                    matterSprite.anims.play('jump', true);

                    if (this.penguinA.blocked.bottom) {
                        this.penguinA.matterSprite.flipX = false;
                        matterSprite.setVelocityY(-7);

                    }
                    else if (this.penguinA.blocked.left) {
                        this.penguinA.matterSprite.flipX = true;
                        matterSprite.setVelocityY(-7);
                        matterSprite.setVelocityX(-3);
                    }
                    else if (this.penguinA.blocked.right) {
                        this.penguinA.matterSprite.flipX = false;
                        matterSprite.setVelocityY(-7);
                        matterSprite.setVelocityX(-3);
                    }
                    // matterSprite.anims.play('jump', true);
                    // this.penguinA.matterSprite.setVelocityY(-10);
                }
            }
            else {
                if (JSON.parse(localStorage.getItem('user')).id === JSON.parse(localStorage.getItem('room')).users[1].id) {
                    let matterSprite = this.penguinB.matterSprite;
                    if (this.cursors.left.isDown && !this.penguinB.blocked.left) {
                        // this.smoothedControls.moveLeft(time);
                        this.penguinB.matterSprite.flipX = true;
                        // oldVelocityX = matterSprite.body.velocity.x;
                        // targetVelocityX = -this.penguinA.speed.run;
                        // newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, 0.05);

                        matterSprite.setVelocityX(-3);
                        matterSprite.anims.play('walk', true);
                        // console.log("velocity: ", newVelocityX);

                    } else if (this.cursors.right.isDown && !this.penguinB.blocked.right) {
                        // this.smoothedControls.moveRight(time);
                        this.penguinB.matterSprite.flipX = false;
                        // oldVelocityX = matterSprite.body.velocity.x;
                        // targetVelocityX = this.penguinA.speed.run;
                        // newVelocityX = Phaser.Math.Linear(oldVelocityX, targetVelocityX, 0.05);
                        matterSprite.setVelocityX(3);
                        matterSprite.anims.play('walk', true);
                        // console.log("velocity: ", newVelocityX);


                    } else {
                        this.penguinB.matterSprite.setVelocityX(0);
                        matterSprite.anims.play('idle', true);
                    }

                    const canJump = (time - this.penguinB.lastJumpedAt) > 250;

                    if (this.cursors.up.isDown && canJump) {
                        matterSprite.anims.play('jump', true);

                        if (this.penguinB.blocked.bottom) {
                            this.penguinB.matterSprite.flipX = false;
                            matterSprite.setVelocityY(-7);

                        }
                        else if (this.penguinB.blocked.left) {
                            this.penguinB.matterSprite.flipX = true;
                            matterSprite.setVelocityY(-7);
                            matterSprite.setVelocityX(-3);
                        }
                        else if (this.penguinB.blocked.right) {
                            this.penguinB.matterSprite.flipX = false;
                            matterSprite.setVelocityY(-7);
                            matterSprite.setVelocityX(-3);
                        }
                        // matterSprite.anims.play('jump', true);
                        // this.penguinA.matterSprite.setVelocityY(-10);
                    }
                }
            }



        }



    }
