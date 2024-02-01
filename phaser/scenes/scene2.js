class scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        this.add.text(20, 20, "Playing game", { font: "25px Arial", fill: "yellow" });
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.planta = this.add.sprite(window.innerWidth / 2 + 500, window.innerHeight / 2, "ginomo1");
        this.planta.setScale(0.4);
        this.planta.flipY = true;
        this.Mario = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, "ginomo2");
        this.Mario.setScale(0.4);
        this.Toad = this.add.sprite(window.innerWidth / 2 - 500, window.innerHeight / 2, "ginomo3");
        this.Toad.setScale(0.4);
        this.Toad.angle += 70;

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {
                start: 0,
                end: 4
            }),
            frameRate: 20,
            repeat: 1,
        });

        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 0,
                end: 1
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "grey",
            frames: this.anims.generateFrameNumbers("power-up", {
                start: 2,
                end: 3
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.powerUps = this.physics.add.group();
        this.Mario.setInteractive();
        this.Toad.setInteractive();
        this.planta.setInteractive();
        this.input.on('gameobjectdown', this.destroySprite, this);
        var maxObjects = 4;
        for (var i = 0; i <= maxObjects; i++) {
            var powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, window.innerWidth, window.innerHeight);
        }
    }
    destroySprite(pointer, gameObject) {
        let ogSprite = gameObject.texture.key;
        gameObject.setTexture("explosion");
        gameObject.setScale(10);
        gameObject.play("explode");
        gameObject.on('animationcomplete', () => {
            gameObject.setTexture(ogSprite);
            gameObject.setScale(0.4);
            gameObject.x = Phaser.Math.Between(0, window.innerHeight);
            gameObject.y = Phaser.Math.Between(0, window.innerWidth);
        })
    }
    update() {
        this.moverPlanta(this.planta, 2);
        if (this.planta.y > window.innerHeight) {
            this.resetPlanta(this.planta);
        }
        this.Toad.angle += 99;
        this.Mario.angle -= 99;
        this.moverMario(this.Mario, 2);
        if (this.Mario.x > window.innerWidth) {
            this.resetMario(this.Mario);
        }
    }
    moverPlanta(planta, speed) {
        planta.y += speed;
    }
    moverMario(Mario, speed) {
        Mario.x += speed;
    }
    resetMario(Mario) {
        var randomY = Phaser.Math.Between(0, window.innerHeight);
        Mario.x = 0;
        Mario.y = randomY;
    }
    resetPlanta(planta) {
        var randomX = Phaser.Math.Between(0, window.innerWidth);
        planta.x = randomX;
        planta.y = 0;
    }

    
}
https://www.youtube.com/watch?v=cuSQnbZloFc&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=6