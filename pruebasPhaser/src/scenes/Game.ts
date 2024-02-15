import Phaser from 'phaser'
import PlayerController from './PlayerController'
import ObstaclesController from './ObstaclesController'
import { World } from 'matter'
import { socket } from '../socket.js'
localStorage.setItem('user', JSON.stringify({ id: '1' }))
localStorage.setItem('room', JSON.stringify({ id: '1', users: [{ id: '1' }, { id: '2' }] }))
export default class Game extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    // private penguinA!: Phaser.Physics.Matter.Sprite
    private penguinA
    private penguinB

    private playerController?: PlayerController
    private obstacles!: ObstaclesController
    private pushableObj!: Phaser.Physics.Matter.Sprite
    private pushableLargeRock!: Phaser.Physics.Matter.Sprite
    private pushable!: Phaser.Physics.Matter.Sprite


    constructor() {
        super('game')
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.obstacles = new ObstaclesController()
    }

    preload() {
        this.load.atlas('penguin', 'assets/penguin.png', 'assets/penguin.json')
        this.load.image('tilesetB', 'assets/game-platform/ForestTileBlue.png')
        this.load.image('candy', 'assets/caneRedSmall.png')
        this.load.image('roca', 'assets/game-platform/roca-blue.png')
        this.load.image('rocaPushable', 'assets/game-platform/roca-blue.png')
        this.load.image('tilesetP', 'assets/game-platform/ForestTilePurple.png')
        this.load.image('tilesetC', 'assets/game-platform/ForestTileRed.png')
        this.load.tilemapTiledJSON('map', 'assets/game-platform/purple-blue-red-game.json')
    }

    

    create() {

        const map = this.make.tilemap({ key: 'map' })
        const tilesetB = map.addTilesetImage('ForestTileBlue', 'tilesetB')
        const tilesetP = map.addTilesetImage('ForestTilePurple', 'tilesetP')
        const tilesetC = map.addTilesetImage('ForestTileRed', 'tilesetC')
        var BlueView
        var RedView

        function normalPerpendicularSuelo(normal) {
            var vectorVertical = {x: 0, y:1};

            var productoPunto = normal.x * vectorVertical.x + normal.y * vectorVertical.y;

            var umbral = 0.5;

            return Math.abs(productoPunto) < umbral;
        }

        const PurpleView = map.createLayer('PurpleView', tilesetP);
        const pinchos = map.createLayer('PurpleDangers', tilesetP);
        let userToCompare=JSON.parse(localStorage.getItem('room'));
                console.log('users', userToCompare.users[0].id);
        if (JSON.parse(localStorage.getItem('user')).id == JSON.parse(localStorage.getItem('room')).users[0].id) {
            BlueView = map.createLayer('BlueView', tilesetB)
            BlueView.setCollisionByProperty({ collides: true })
        }
        if (JSON.parse(localStorage.getItem('user')).id == JSON.parse(localStorage.getItem('room')).users[1].id) {
            RedView = map.createLayer('RedView', tilesetC);
            RedView.setCollisionByProperty({ collides: true })
        }
        
        map.createLayer('pinchos', tilesetB);
        console.log(PurpleView);
        PurpleView.setCollisionByProperty({ collides: true })
        
        
        // this.matter.world.setBounds()
        
        const objectsLayer = map.getObjectLayer('objects')
        
        
        objectsLayer.objects.forEach(objData => {
            const { x = 0, y = 0, name, width = 0, height = 0 } = objData
            
            switch (name) {
                case 'penguin-spawn-red':
                    {
                        
                        this.penguinA = {
                            matterSprite: this.matter.add.sprite(x + (width * 0.5), y, 'penguin'),
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
                            blocked: {
                                left: false,
                                right: false,
                                bottom: false
                            }
                        }

                        const M = Phaser.Physics.Matter.Matter;
                        const w = this.penguinA.matterSprite.width;
                        const h = this.penguinA.matterSprite.height;
                        
                        const sx = w / 2
                        const sy = h / 2
                        
                        const playerBody = M.Bodies.rectangle(sx, sy, w * 0.75, h, { chamfer: { radius: 10 }});
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
                        
                        this.penguinA.matterSprite.setExistingBody(compoundBody).setFixedRotation()

                        this.anims.create({
                            key: 'walk',
                            frames: this.anims.generateFrameNames('penguin', { start: 0, end: 4, prefix: 'penguin_walk0', suffix: '.png', }),
                            frameRate: 10,
                            repeat: 0
                        });

                        this.anims.create({
                            key: 'jump',
                            frames: this.anims.generateFrameNames('penguin', { start: 1, end: 3, prefix: 'penguin_jump0', suffix: '.png', }),
                            frameRate: 10, 
                            repeat: 0

                        });

                        this.anims.create({
                            key: 'idle',
                            frames: [{ key: 'penguin', frame: 'penguin_walk01.png'}]
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

                            for(let i = 0; i < event.pairs.length; i++){
                                const bodyA = event.pairs[i].bodyA
                                const bodyB = event.pairs[i].bodyB

                                if(bodyA === playerBody || bodyB === playerBody)
                                {
                                    continue
                                }
                                else if (bodyA === bottom || bodyB === bottom)
                                {
                                    this.penguinA.numTouching.bottom += 1
                                }
                                else if ((bodyA === left && bodyB.isStatic) || (bodyB === left && bodyA.isStatic))
                                {
                                    this.penguinA.numTouching.left += 1
                                }
                                else if ((bodyA === right && bodyB.isStatic) ||(bodyB === right && bodyA.isStatic))
                                {
                                    this.penguinA.numTouching.right += 1
                                }
                            }
                        }, this);

                        this.matter.world.on('afterupdate', (event) => {
                            this.penguinA.blocked.right = this.penguinA.numTouching.right > 0 ? true: false;
                            this.penguinA.blocked.left = this.penguinA.numTouching.left > 0 ? true: false;
                            this.penguinA.blocked.bottom = this.penguinA.numTouching.bottom > 0 ? true: false;

                        }, this);
                        
                        
                        if (JSON.parse(localStorage.getItem('user')).id == JSON.parse(localStorage.getItem('room')).users[0].id) {
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
                    // case 'penguin-spawn-blue':
                    //     {
                    //     this.penguin = this.matter.add.sprite(x + (width * 0.5), y, 'penguin')
                    //     .setFixedRotation()
                    //     this.penguin.setRectangle(48, 55).setFixedRotation()
                    //     if (JSON.parse(localStorage.getItem('user')).id == JSON.parse(localStorage.getItem('room')).users[1].id) {
                    //         this.playerController = new PlayerController(
                    //             this,
                    //             this.penguin,
                    //             this.cursors,
                    //             this.obstacles,
                    //             this.pushableObj)
                    //             this.cameras.main.startFollow(this.penguin)
                    //         }
                            
                            
                            
                    //         // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
                    //         break
                    //     }
                        case 'rocaPushable':
                    {
                        this.pushableObj = this.matter.add.sprite(x + (width * 0.5), y + (height * 0.5),'roca')

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
                        // case 'rocaPushableLarge':
                        //     {
                        //         this.pushableLargeRock = this.matter.add.sprite(x + (width * 0.5), y, 'roca')
                        //         this.pushableLargeRock.scaleX = 6.8
                        //         this.pushableLargeRock.scaleY = 2
                        //         this.pushableLargeRock.rotation = 1.5708
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
                                        
                        //         break
                        //     }
                            
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
                        if(BlueView!= undefined) {
                            this.matter.world.convertTilemapLayer(BlueView)
                        }
                        if(RedView!= undefined){
                            this.matter.world.convertTilemapLayer(RedView)
                        }
                        // this.physics.add.collider(this.penguin, objectsLayer["rocaPusable"])
                        this.matter.world.convertTilemapLayer(pinchos)
                          
                    }
                    
                    
                    update(t: number, dt: number) {
                        // if (!this.playerController) {
                        //     return
                        // }
                        
                        // this.playerController.update(dt)
                        
                        // setTimeout(() => {
                        //     socket.emit('updatePosition', { x: this.penguin.x, y: this.penguin.y, id: 1, room: 1 })
                        // }, 1000)
                        
                        const matterSprite = this.penguinA.matterSprite;

                        if(this.cursors.left.isDown && !this.penguinA.blocked.left)
                        {
                            this.penguinA.matterSprite.flipX = true;
                            this.penguinA.matterSprite.setVelocityX(-3);
                            matterSprite.anims.play('walk', true);
                            
                        }else if(this.cursors.right.isDown && !this.penguinA.blocked.right)
                        {
                            this.penguinA.matterSprite.flipX = false;
                            this.penguinA.matterSprite.setVelocityX(3);
                            matterSprite.anims.play('walk', true);
                        }else if(this.cursors.up.isDown)
                        {
                            if(this.penguinA.blocked.bottom)
                            {
                                this.penguinA.matterSprite.setVelocityY(-8)
                                matterSprite.anims.play('jump', true)
                            }
                        }else {
                            matterSprite.anims.play('idle', true);
                        }
                        

                    }
                    
                    

}