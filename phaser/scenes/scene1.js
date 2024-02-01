class scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        this.load.image("background", "assets/background.jpg");
        this.load.image("ginomo1", "assets/ginomo1.png");
        this.load.image("ginomo2", "assets/ginomo2.png");
        this.load.image("ginomo3", "assets/ginomo3.png");
        this.load.spritesheet("explosion", "assets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        
        })
        this.load.spritesheet("power-up", "assets/power-up.png",{
            frameWidth: 16,
            frameHeight: 16
        })  
    }
    create(){
        this.add.text(20, 20, "Loading game...");
        this.add.image(0, 0, "background").setOrigin(0, 0);
        this.scene.start("playGame");
    }
}