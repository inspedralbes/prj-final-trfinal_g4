import Phaser from 'phaser'
import StateMachine from '../statemachine/StateMachine'
import ObstaclesController from './ObstaclesController'

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys
export default class PlayerController
{
    private scene: Phaser.Scene
    private sprite: Phaser.Physics.Matter.Sprite
    private cursors: CursorKeys
    private obstacles: ObstaclesController

    private stateMachine: StateMachine

    constructor(scene: Phaser.Scene, sprite: Phaser.Physics.Matter.Sprite, cursors: CursorKeys, obstacles: ObstaclesController)
    {
        this.scene = scene
        this.sprite = sprite
        this.cursors = cursors
        this.obstacles = obstacles
        
        this.createAnimation()
        
        this.stateMachine = new StateMachine(this, 'player')

        this.stateMachine.addState('idle', {
            onEnter: this.idleOnEnter,
            onUpdate: this.idleOnUpdate
        })
        .addState('walk', {
            onEnter: this.walkOnEnter,
            onUpdate: this.walkOnUpdate,
            onExit: this.walkOnExit
        })
        .addState('jump', {
            onEnter: this.jumpOnEnter,
            onUpdate: this.jumpOnUpdate
        })
        .addState('dead', {
            onEnter: () => {
                this.sprite.play('player-dead')
            }
        })
        .addState('spikes-dead', {
            onEnter: this.spikesDeadOnEnter
        
        })
        .setState('idle')

        this.sprite.setOnCollide((data: MatterJs.ICollisionPair) => {
            const body = data.bodyB as MatterJS.BodyType
            console.log(body);
            
            if (this.obstacles.is('spikes', body))
            {
                this.stateMachine.setState('spikes-dead')
                return
                
            }
            
            const gameObject = body.gameObject

            if(!gameObject)
            {
                return
            }
            if (gameObject instanceof Phaser.Physics.Matter.TileBody)
            {
                if (this.stateMachine.isCurrentState('jump')) 
                {
                    this.stateMachine.setState('idle')
                }
                return
            }
            
        })
    }

    update(dt: number)
    {
        this.stateMachine.update(dt)
    }

    private idleOnEnter()
    {
        this.sprite.play('player-idle')
    }

    private idleOnUpdate()
    {
        if (this.cursors.left.isDown || this.cursors.right.isDown)
        {
            this.stateMachine.setState('walk')
        }

        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
        if(spaceJustPressed)
        {
            this.stateMachine.setState('jump')   
        }
    }

    private walkOnEnter()
    {
        this.sprite.play('player-walk')
    }

    private walkOnUpdate()
    {

        const speed = 5;
        if(this.cursors.left.isDown)
        {
            this.sprite.flipX = true
            // this.sprite.play('player-walk', true)
            this.sprite.setVelocityX(-speed)
        }
        else if(this.cursors.right.isDown)
        {
            this.sprite.flipX = false
            // this.sprite.play('player-walk', true)
            this.sprite.setVelocityX(speed)
        }
        else
        {
            // this.sprite.play('player-idle')
            this.sprite.setVelocityX(0)
            this.stateMachine.setState('idle')
        }

        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
        if(spaceJustPressed)
        {
            this.stateMachine.setState('jump')   
        }
    }

    private walkOnExit()
    {
        this.sprite.stop()
    }

    private jumpOnEnter() 
    {
        this.sprite.setVelocityY(-12)
        this.sprite.play('player-jump')
    }

    private jumpOnUpdate()
    {
        const speed = 5;
        if(this.cursors.left.isDown)
        {
            this.sprite.flipX = true
            // this.sprite.play('player-walk', true)
            this.sprite.setVelocityX(-speed)
        }
        else if(this.cursors.right.isDown)
        {
            this.sprite.flipX = false
            // this.sprite.play('player-walk', true)
            this.sprite.setVelocityX(speed)
        }
    }

    private spikesDeadOnEnter()
    {
        this.sprite.setVelocityY(0)
        this.stateMachine.setState('dead')

        const startColor = Phaser.Display.Color.ValueToColor(0xffffff)
        const endColor = Phaser.Display.Color.ValueToColor(0xff0300)

        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 100,
            repeat: 2,
            yoyo: true,
            onUpdate: tween => {
                const value = tween.getValue()
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(  
                    startColor,
                    endColor,
                    100,
                    value
                )
                
                const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b)

                this.sprite.setTint(color)
            },
            onComplete: () => {
                
                this.scene.scene.restart()
            }
        })
        
    }

    // destroy()
    // {
    //     this.sprite.anims.stop();

    //     // Restaurar la posición del jugador al punto de spawn
    //     const spawnPoint = this.scene.physics.world.bounds;
    //     this.sprite.setPosition(spawnPoint.centerX, spawnPoint.centerY);

    //     // Restaurar la velocidad del jugador a cero
    //     this.sprite.setVelocity(0, 0);

    //     // Restaurar cualquier otra configuración necesaria

    //     // Reiniciar el estado del jugador al estado inicial
    //     this.stateMachine.setState('idle');
    // }

    

    private createAnimation(){

        this.sprite.anims.create({
            key: 'player-idle',
            frames: [{ key: 'penguin', frame: 'penguin_walk01.png'}]
        })

        this.sprite.anims.create({
            key: 'player-walk',
            frameRate: 10,
            frames: this.sprite.anims.generateFrameNames('penguin', {
                start: 1,
                end: 4,
                prefix: 'penguin_walk0',
                suffix: '.png',
                
            }),
            repeat: -1,
            
            
        })

        this.sprite.anims.create({
            key: 'player-jump',
            frameRate: 10,
            frames: this.sprite.anims.generateFrameNames('penguin', {
                start: 1,
                end: 3,
                prefix: 'penguin_jump0',
                suffix: '.png',
                
            }),
            repeat: 0,
        
        })

        this.sprite.anims.create({
            key: 'player-dead',
            frameRate: 10,
            frames: this.sprite.anims.generateFrameNames('penguin', {
                start: 1,
                end: 4,
                prefix: 'penguin_die0',
                suffix: '.png',
                
            }),
            repeat: 0,
            
        })
    }

}