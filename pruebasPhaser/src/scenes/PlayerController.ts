import Phaser from 'phaser'
import StateMachine from '../statemachine/StateMachine'

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys
export default class PlayerController
{
    private sprite: Phaser.Physics.Matter.Sprite
    private cursors: CursorKeys 
    private stateMachine: StateMachine

    constructor(sprite: Phaser.Physics.Matter.Sprite, cursors: CursorKeys)
    {
        this.sprite = sprite
        this.cursors = cursors
        
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
        .setState('idle')

        this.sprite.setOnCollide((data: MatterJs.ICollisionPair) => {
            if (this.stateMachine.isCurrentState('jump')) 
            {
                this.stateMachine.setState('idle')
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
                suffix: '.png'
            }),
            repeat: -1
        })
    }

}