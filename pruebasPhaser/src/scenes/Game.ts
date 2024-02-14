import Phaser from 'phaser'
import PlayerController from './PlayerController'
import ObstaclesController from './ObstaclesController'
import { World } from 'matter'
import { socket } from '../socket.js'
localStorage.setItem('user', JSON.stringify({ id: '1' }))
localStorage.setItem('room', JSON.stringify({ id: '1', users: [{ id: '1' }, { id: '2' }] }))
export default class Game extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private penguin!: Phaser.Physics.Matter.Sprite
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


       
        
        const PurpleView = map.createLayer('PurpleView', tilesetP);
        const pinchos = map.createLayer('PurpleDangers', tilesetP);
        let userToCompare=JSON.parse(localStorage.getItem('room'));
                console.log('users', userToCompare.users[0].id);
        if (JSON.parse(localStorage.getItem('user')).id == JSON.parse(localStorage.getItem('room')).users[0].id) {
            const BlueView = map.createLayer('BlueView', tilesetB);
            BlueView.setCollisionByProperty({ collides: true })
            this.matter.world.convertTilemapLayer(BlueView)
        }
        if (JSON.parse(localStorage.getItem('user')).id == JSON.parse(localStorage.getItem('room')).users[1].id) {
            const RedView = map.createLayer('RedView', tilesetC);
            RedView.setCollisionByProperty({ collides: true })
            this.matter.world.convertTilemapLayer(RedView)
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
                        this.penguin = this.matter.add.sprite(x + (width * 0.5), y, 'penguin')
                            .setFixedRotation()
                        this.penguin.setRectangle(48, 55, {
                            
                        }).setFixedRotation()

                        if (JSON.parse(localStorage.getItem('user')).id == JSON.parse(localStorage.getItem('room')).users[0].id) {
                            console.log('user', "EEEEEEEEEEE");

                            this.playerController = new PlayerController(
                                this,
                                this.penguin,
                                this.cursors,
                                this.obstacles,
                                this.pushableObj)
                                this.cameras.main.startFollow(this.penguin)
                        }

                        

                        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
                        break
                    }
                case 'penguin-spawn-blue':
                    {
                        this.penguin = this.matter.add.sprite(x + (width * 0.5), y, 'penguin')
                            .setFixedRotation()
                        this.penguin.setRectangle(48, 55).setFixedRotation()
                        if (JSON.parse(localStorage.getItem('user')).id == JSON.parse(localStorage.getItem('room')).users[1].id) {
                            this.playerController = new PlayerController(
                                this,
                                this.penguin,
                                this.cursors,
                                this.obstacles,
                                this.pushableObj)
                                this.cameras.main.startFollow(this.penguin)
                        }

           

                        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
                        break
                    }
                case 'rocaPushable':
                    {
                        this.pushableObj = this.matter.add.sprite(x + (width * 0.5), y + (height * 0.5), 'roca')
                        // console.log('pushableObj', this.pushableObj);



                        this.matter.world.on('collisionstart', (event) => {
                            event.pairs.forEach(pair => {
                                const bodyA = pair.bodyA as MatterJS.BodyType
                                const bodyB = pair.bodyB as MatterJS.BodyType
                                if (bodyA.gameObject === this.penguin && bodyB.gameObject === this.pushableObj ||
                                    bodyA.gameObject === this.pushableObj && bodyB.gameObject === this.penguin) {
                                    if (!this.playerController) {
                                        this.playerController = new PlayerController(
                                            this,
                                            this.penguin,
                                            this.cursors,
                                            this.obstacles,
                                            this.pushableObj
                                        )
                                    }
                                    console.log('pushableObj', this.pushableObj);


                                }


                            })
                        })

                        break
                    }
                case 'rocaPushableLarge':
                    {
                        this.pushableLargeRock = this.matter.add.sprite(x + (width * 0.5), y, 'roca').setInteractive()
                        this.pushableLargeRock.scaleX = 6.8
                        this.pushableLargeRock.scaleY = 2

                        this.pushableLargeRock.rotation = 1.5708
                        // console.log('pushableObj', this.pushableObj);
                        this.matter.world.on('collisionstart', (event) => {
                            event.pairs.forEach(pair => {
                                const bodyA = pair.bodyA as MatterJS.BodyType
                                const bodyB = pair.bodyB as MatterJS.BodyType
                                if (bodyA.gameObject === this.penguin && bodyB.gameObject === this.pushableObj ||
                                    bodyA.gameObject === this.pushableObj && bodyB.gameObject === this.penguin) {
                                    if (!this.playerController) {
                                        this.playerController = new PlayerController(
                                            this,
                                            this.penguin,
                                            this.cursors,
                                            this.obstacles,
                                            this.pushableObj
                                        )
                                    }
                                    console.log('pushableObj', this.pushableObj);


                                }


                            })
                        })
                        break
                    }

                case 'spikes':
                    {
                        const spikes = this.matter.add.rectangle(x + (width * 0.5), y + (height * 0.5), width, height, {
                            isStatic: true
                        })
                        this.obstacles.add('spikes', spikes)

                        break
                    }
            }
        })
        // 
        this.matter.world.convertTilemapLayer(PurpleView)
        
        this.matter.world.convertTilemapLayer(pinchos)


    }


    update(t: number, dt: number) {
        if (!this.playerController) {
            return
        }

        this.playerController.update(dt)

        setTimeout(() => {
            socket.emit('updatePosition', { x: this.penguin.x, y: this.penguin.y, id: 1, room: 1 })
        }, 1000)



    }

    // resetGame() 
    // {
    //     this.tweens.killAll();

    //     if (this.playerController)
    //     {
    //         this.playerController.destroy();
    //         this.playerController = undefined;
    //     }

    //     this.obstacles.clear();
    //     this.scene.restart();
    // }

}