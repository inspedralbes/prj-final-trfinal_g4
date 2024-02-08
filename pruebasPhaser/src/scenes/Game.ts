import Phaser from 'phaser'
import PlayerController from './PlayerController'
import ObstaclesController from './ObstaclesController'
import { World } from 'matter'

export default class Game extends Phaser.Scene{
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private penguin?: Phaser.Physics.Matter.Sprite
    private playerController?: PlayerController
    private obstacles!: ObstaclesController
    private pushableObj!: Phaser.Physics.Matter.Sprite
    private pushable: Phaser.Physics.Matter.Sprite
    
    
    constructor(){
        super('game')
    }

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.obstacles = new ObstaclesController()
    }

    preload(){
        this.load.atlas('penguin' , 'assets/penguin.png', 'assets/penguin.json')
        this.load.image('tileset', 'assets/game-platform/ForestTileBlue.png')
        // this.load.image('candy', 'assets/caneRedSmall.png')
        this.load.image('roca', 'assets/game-platform/roca-blue.png')

        this.load.tilemapTiledJSON('tilemap', 'assets/game-platform/game-platform.json')
    }

    create()
    {
        
        const map = this.make.tilemap({ key: 'tilemap'})
        const tileset = map.addTilesetImage('ForestTileBlue', 'tileset')
        
        const ground = map.createLayer('ground', tileset)
        const platform = map.createLayer('platform', tileset);
        const pinchos = map.createLayer('pinchos', tileset);
        // map.createLayer('pinchos', tileset);

        ground.setCollisionByProperty({ collides: true })
        platform.setCollisionByProperty({ collides: true })
        
        // this.matter.world.setBounds()
        
        const objectsLayer = map.getObjectLayer('objects')
        
        
        objectsLayer.objects.forEach(objData => {
            const { x = 0, y = 0, name, width = 0, height = 0 } = objData
            
            switch(name)
            {
                    case 'penguin-spawn':
                        {
                            this.penguin = this.matter.add.sprite(x + (width * 0.5), y, 'penguin')
                            .setFixedRotation().setInteractive()

                            this.playerController = new PlayerController(
                                this,
                                this.penguin,
                                this.cursors, 
                                this.obstacles,
                                this.pushable)
                            
                            this.cameras.main.startFollow(this.penguin)
                            
                            // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
                            break
                        }

                    case 'rocaPushable': 
                        {
                            this.pushableObj = this.matter.add.sprite(x + (width * 0.5), y + (height * 0.5), 'roca').setInteractive()                     

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
                this.matter.world.convertTilemapLayer(ground)
                this.matter.world.convertTilemapLayer(platform)
                this.matter.world.convertTilemapLayer(pinchos)

                this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
                    if (bodyA.gameObject === this.penguin && bodyB.gameObject === this.pushableObj || bodyA.gameObject === this.pushableObj && bodyB.gameObject === this.penguin)

                    {
                        
                        
                        
                    }
                })

    }

    update(t: number, dt: number)
    {
        if(!this.playerController)
        {
            return 
        }

        this.playerController.update(dt)


        
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