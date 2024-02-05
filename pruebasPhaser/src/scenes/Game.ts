import Phaser from 'phaser'
import PlayerController from './PlayerController'

export default class Game extends Phaser.Scene{
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private penguin!: Phaser.Physics.Matter.Sprite
    private playerController?: PlayerController
    
        

    constructor(){
        super('game')
    }

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    preload(){
        this.load.atlas('penguin' , 'assets/penguin.png', 'assets/penguin.json')
        this.load.image('tiles', 'assets/sheet.png')
        
        this.load.tilemapTiledJSON('tilemap', 'assets/game.json')
    }

    create()
    {
        // this.createCharacterAnimation()
        const map = this.make.tilemap({ key: 'tilemap'})
        const tileset = map.addTilesetImage('iceworld', 'tiles')

        const ground = map.createLayer('ground', tileset)
        const arboles = map.createLayer('arboles', tileset)
        const decoracion = map.createLayer('decoracion', tileset);
        
        const platform = map.createLayer('plataforma', tileset);
        map.createLayer('pinchos', tileset);

        ground.setCollisionByProperty({ collides: true })
        platform.setCollisionByProperty({ collides: true })

        const objectsLayer = map.getObjectLayer('objects')
        
        objectsLayer.objects.forEach(objData => {
            const { x = 0, y = 0, name, width = 0, height = 0 } = objData
            
            switch(name)
            {
                case 'penguin-spawn':
                    {
                        this.penguin = this.matter.add.sprite(x + (width * 0.5), y, 'penguin')
                        .setFixedRotation()

                        this.playerController = new PlayerController(this.penguin, this.cursors)
                        
                        
                        this.cameras.main.startFollow(this.penguin)
                        break
                    }

                case 'spikes': 
                {
                    this.matter.add.rectangle(x + (width * 0.5), y + (height * 0.5), width, height, {
                        isStatic: true
                    })
                    break
                }
            }
        })
            
            this.matter.world.convertTilemapLayer(ground)
            this.matter.world.convertTilemapLayer(platform)
            // this.matter.world.convertTilemapLayer(decoracion)
            // this.matter.world.convertTilemapLayer(arboles)
            // this.matter.world.convertTilemapLayer(pinchos)

    }

    update(t: number, dt: number)
    {
        if(!this.playerController)
        {
            return 
        }

        this.playerController.update(dt)


        
    }

}