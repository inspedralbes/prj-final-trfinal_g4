import Phaser from 'phaser';
import useStore from '../src/store';
import socket from '../services/sockets';
import LoadingScene from './Loader';


export default class GameHome3 extends Phaser.Scene {
    done = false;
    c1Red = null;
    c1White = null;
    c1Gray = null;
    c1Purple = null;
    c2Orange = null;
    c1Yellow = null;
    c2Blue = null;
    c2Black = null;
    c2Gray = null;
    c2Purple = null;
    c1Green = null;
    c2Yellow = null;
    pressable = true;
    activePointer;
    cursors;
    character1;
    character2;
    whiteView = null;
    blackView = null;
    grayView = null;
    redView = null;
    blueView = null;
    purpleView = null;
    greenView = null;
    orangeView = null;
    yellowView = null;
    endGame;
    player = 1;
    buttons = [];
    spawns = [];
    death = [];
    animationPlaying = false;
    CharacterPosition;
    handleCollision;
    colors = [{ color: 'white', hex: 0xffffff }, { color: 'black', hex: 0x303030 }, { color: 'gray', hex: 0x969696 }, { color: 'red', hex: 0xb82727 }, { color: 'green', hex: 0x29b127 }, { color: 'blue', hex: 0x2b80ff }, { color: 'orange', hex: 0xe26b09 }, { color: 'yellow', hex: 0xdada00 }, { color: 'purple', hex: 0x91209e }];
    animationButtonPLaying;
    otherButtonPressing;
    constructor() {
        super('gamehome3');
    }
    platforms = [];
    doors = [];
    flags = [];
    player1OnFlag = false;
    player2OnFlag = false;
    priorX;
    priorY;
    audio;
    music;
    currentMap=useStore.getState().gameData.currentMap;
    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.activePointer = this.input.activePointer;
        this.buttons = [];
        this.spawns = [];
        this.death = [];
        this.wKey = this.input.keyboard.addKey('W');
        this.dKey = this.input.keyboard.addKey('D');
        this.aKey = this.input.keyboard.addKey('A');
        this.platforms = [];
        this.doors = [];
        this.flags = [];
        // this.greenView = null;
        // this.yellowView = null;
        // this.orangeView = null;
        // this.purpleView = null;
        // this.blueView = null;
        // this.redView = null;
        // this.grayView = null;
        // this.blackView = null;
        // this.whiteView = null;
        // this.character1 = null;
        // this.character2 = null;
        this.done = false;

    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        if (this.music == null) {
            this.music = this.sound.add('bgMusic');
            this.music.setLoop(true);
            this.music.play();
            console.log("mapa" + useStore.getState().gameData.currentMap);
            this.done = false;
            console.log(`mapa${useStore.getState().gameData.currentMap}`)
        }
        let map = this.add.tilemap(`mapa3`);
        let tileset = map.addTilesetImage('tilesetWhite', 'tileset');

        let gray = null;
        let white = null;
        let black = null;
        let red = null;
        let blue = null;
        let purple = null;
        let orange = null;
        let yellow = null;
        let green = null;

        gray = map.createLayer('gray', tileset);
        if (map.layers.find(layer => layer.name === 'gray')) {
            const rows = gray.height;

            for (let y = 0; y < rows; y++) {
                const tilesInRow = gray.width;
                for (let x = 0; x < tilesInRow; x++) {
                    const tileG = gray.getTileAt(x, y);

                    if (tileG && tileG.index > 0) { // White color check
                        this.tweens.add({
                            targets: tileG,
                            tint: 0xffffff,
                            duration: 1000,
                            ease: 'Custom',
                            delay: x * 50, // Optional delay per tile
                            onComplete: () => {
                                tileG.tint = this.colors.find(color => color.color == 'gray').hex; // Change tint to gray after animation completes
                            }
                        });
                    }
                }
            }
            gray.setCollisionByProperty({ collides: true });
            gray.setCollisionByProperty({ semicollides: true });
            gray.immovable = true;
        }
        this.grayView = gray;

        white = map.createLayer('white', tileset);
        if (map.layers.find(layer => layer.name === 'white')) {
            for (let y = 0; y < white.height; y++) {
                for (let x = 0; x < white.width; x++) {
                    const tileW = white.getTileAt(x, y);

                    if (tileW && tileW.index > 0) {
                        tileW.tint = this.colors.find(color => color.color == 'white').hex;
                    }
                }
            }
            white.setCollisionByProperty({ semicollides: true });
            white.setCollisionByProperty({ collides: true });
            white.immovable = true;
        }
        this.whiteView = white;

        black = map.createLayer('black', tileset);
        if (map.layers.find(layer => layer.name === 'black')) {
            for (let y = 0; y < black.height; y++) {
                for (let x = 0; x < black.width; x++) {
                    const tileB = black.getTileAt(x, y);

                    if (tileB && tileB.index > 0) {
                        tileB.tint = this.colors.find(color => color.color == 'black').hex;
                    }
                }
            }

            black.setCollisionByProperty({ semicollides: true });
            black.setCollisionByProperty({ collides: true });
            black.immovable = true;
        }
        this.blackView = black;

        red = map.createLayer('red', tileset);
        if (map.layers.find(layer => layer.name === 'red')) {
            for (let y = 0; y < red.height; y++) {
                for (let x = 0; x < red.width; x++) {
                    const tileR = red.getTileAt(x, y);

                    if (tileR && tileR.index > 0) {
                        tileR.tint = this.colors.find(color => color.color == 'red').hex;
                    }
                }
            }

            red.setCollisionByProperty({ semicollides: true });
            red.setCollisionByProperty({ collides: true });
            red.immovable = true;
        }
        this.redView = red;

        blue = map.createLayer('blue', tileset);
        if (map.layers.find(layer => layer.name === 'blue')) {
            for (let y = 0; y < blue.height; y++) {
                for (let x = 0; x < blue.width; x++) {
                    const tileB = blue.getTileAt(x, y);

                    if (tileB && tileB.index > 0) {
                        tileB.tint = this.colors.find(color => color.color == 'blue').hex;
                    }
                }
            }

            blue.setCollisionByProperty({ semicollides: true });
            blue.setCollisionByProperty({ collides: true });
            blue.immovable = true;
        }
        this.blueView = blue;

        purple = map.createLayer('purple', tileset);
        if (map.layers.find(layer => layer.name === 'purple')) {
            for (let y = 0; y < purple.height; y++) {
                for (let x = 0; x < purple.width; x++) {
                    const tileP = purple.getTileAt(x, y);
                    if (tileP && tileP.index > 0) {
                        tileP.tint = this.colors.find(color => color.color == 'purple').hex;
                    }
                }
            }

            purple.setCollisionByProperty({ semicollides: true });
            purple.setCollisionByProperty({ collides: true });
            purple.immovable = true;
        }
        this.purpleView = purple;

        green = map.createLayer('green', tileset);
        if (map.layers.find(layer => layer.name === 'green')) {
            for (let y = 0; y < green.height; y++) {
                for (let x = 0; x < green.width; x++) {
                    const tileG = green.getTileAt(x, y);
                    if (tileG && tileG.index > 0) {
                        tileG.tint = this.colors.find(color => color.color == 'green').hex;
                    }
                }
            }

            green.setCollisionByProperty({ semicollides: true });
            green.setCollisionByProperty({ collides: true });
            green.immovable = true;
        }
        this.greenView = green;

        console.log('orange');
        if (map.layers.find(layer => layer.name === 'orange')) {
            orange = map.createLayer('orange', tileset);
            for (let y = 0; y < orange.height; y++) {
                for (let x = 0; x < orange.width; x++) {
                    const tileO = orange.getTileAt(x, y);
                    if (tileO && tileO.index > 0) {
                        tileO.tint = this.colors.find(color => color.color == 'orange').hex;
                    }
                }
            }

            orange.setCollisionByProperty({ semicollides: true });
            orange.setCollisionByProperty({ collides: true });
            orange.immovable = true;
        }
        this.orangeView = orange;

        yellow = map.createLayer('yellow', tileset);
        if (map.layers.find(layer => layer.name === 'yellow')) {
            for (let y = 0; y < yellow.height; y++) {
                for (let x = 0; x < yellow.width; x++) {
                    const tileY = yellow.getTileAt(x, y);
                    if (tileY && tileY.index > 0) {
                        tileY.tint = this.colors.find(color => color.color == 'yellow').hex;
                    }
                }
            }

            yellow.setCollisionByProperty({ semicollides: true });
            yellow.setCollisionByProperty({ collides: true });
            yellow.immovable = true;
        }
        this.yellowView = yellow;

        const objectsLayer = map.getObjectLayer('Objects')
        objectsLayer.objects.forEach(objData => {
            let { x = 0, y = 0, name, width = 0, height = 0, xFlag = 0, yFlag = 0 } = objData;
            x = parseInt(x);
            y = parseInt(y);

            switch (name) {
                case 'spawn-1':
                    {
                        this.character1 = this.physics.add.sprite(x, y, 'character1-idle');
                        this.character1.setTint(this.colors.find(color => color.color == "white").hex);
                        const w = this.character1.width;
                        const h = this.character1.height;
                        const spawn1X = x;
                        const spawn1Y = y;
                        if (this.player == 2) {
                            this.priorX = x;
                            this.priorY = y;
                        }
                        this.character1.body.tint = this.colors.find(color => color.color == "white").hex;
                        this.physics.add.existing(this.character1);

                        this.character1.setPosition(x, y);



                        this.anims.create({
                            key: 'idle',
                            frames: this.anims.generateFrameNames('character1', { start: 1, end: 11, prefix: 'character1-idle0', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })


                        if (white) {
                            this.c1White = this.physics.add.collider(this.character1, white);
                        }
                        if (red) {
                            this.c1Red = this.physics.add.collider(this.character1, red);
                        }
                        if (gray) {
                            this.c1Gray = this.physics.add.collider(this.character1, gray);
                        }
                        if (purple) {
                            this.c1Purple = this.physics.add.collider(this.character1, purple);
                        }
                        if (green) {
                            this.c1Green = this.physics.add.collider(this.character1, green);
                        }
                        if (yellow) {
                            this.c1Yellow = this.physics.add.collider(this.character1, yellow);
                        }

                        // this.character1.body.setCollisionByProperty({ collides: true });

                        this.character1.setPushable(false);
                        this.cameras.main.startFollow(this.character1);
                        this.cameras.main.setZoom(2);
                        this.character1.setPushable(false);
                        if (this.cameras.main) {

                            this.cameras.main.setBackgroundColor(this.character1.tintTopLeft);
                        }
                        this.spawns.push({ spawn1X, spawn1Y });
                        this.character1.body.setSize(w * 0.50, h * 0.90);
                        break;

                    }
                case 'spawn-2':
                    {

                        this.character2 = this.physics.add.sprite(x, y, 'character1-idle');
                        this.character2.setTint(this.colors.find(color => color.color == "black").hex);
                        const w = this.character2.width;
                        const h = this.character2.height;
                        this.physics.add.existing(this.character2);
                        const spawn2X = x;
                        const spawn2Y = y;
                        this.character2.body.setSize(w * 0.50, h * 0.90);

                        this.character2.setPosition(x, y);

                        this.anims.create({
                            key: 'idle',
                            frames: this.anims.generateFrameNames('character1', { start: 1, end: 11, prefix: 'character1-idle0', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })

                        this.anims.create({
                            key: 'walk',
                            frames: this.anims.generateFrameNames('character1', { start: 1, end: 11, prefix: 'character1-run0', suffix: '.png' }),
                            frameRate: 10,
                            repeat: -1
                        })
                        if (black) {
                            this.c2Black = this.physics.add.collider(this.character2, black);
                        }
                        if (gray) {
                            this.c2Gray = this.physics.add.collider(this.character2, gray);
                        }
                        if (purple) {
                            this.c2Purple = this.physics.add.collider(this.character2, purple);
                        }
                        if (orange) {
                            this.c2Orange = this.physics.add.collider(this.character2, orange);
                        }
                        if (blue) {
                            this.c2Blue = this.physics.add.collider(this.character2, blue);
                        }
                        if (orange) {
                            this.c2Yellow = this.physics.add.collider(this.character2, yellow);
                        }




                        // this.character1.body.setCollisionByProperty({ collides: true });

                        this.character2.setPushable(false);
                        this.cameras.main.setZoom(2);
                        if (this.cameras.main) {
                            this.cameras.main.setBackgroundColor(this.character2.tintTopLeft);

                        }
                        this.spawns.push({ spawn2X, spawn2Y });

                        break;
                    };
            }
        });
        this.physics.add.collider(this.character1, this.character2);
        this.physics.add.collider(this.character1, this.character2);
        objectsLayer.objects.forEach(objData => {
            let { x = 0, y = 0, name, width = 0, height = 0, xFlag = 0, yFlag = 0 } = objData;
            x = parseInt(x);
            y = parseInt(y);
            let ogName = "nope";
            if (name.startsWith('button')) {
                ogName = name;
                name = 'button';
            } else if (name.startsWith('platform')) {
                ogName = name;
                name = 'platform';
            } else if (name.startsWith('door')) {
                ogName = name;
                name = 'door';
            } else if (name.startsWith('box')) {
                ogName = name;
                name = 'box';
            } else if (name.startsWith('endGame')) {
                ogName = name;
                name = 'endGame';

            }

            switch (name) {
                case 'endGame':
                    {

                        let flag_endGame = this.physics.add.sprite(x, y, 'flag-movement');
                        const w = flag_endGame.width;
                        const h = flag_endGame.height;

                        this.physics.add.existing(flag_endGame);

                        flag_endGame.body.setSize(w * 0.45, h - 3);

                        flag_endGame.setPosition(x, y);

                        this.anims.create({
                            key: 'flagMove',
                            frames: this.anims.generateFrameNames('flag-movement', { start: 0, end: 9, prefix: 'flag', suffix: '.png' }),
                            frameRate: 10,
                            repeat: 5
                        })
                        if (getPlayerProperty(objData.properties) == 1) {
                            flag_endGame.player = 1;
                        } else {
                            flag_endGame.player = 2;
                        }
                        if (gray) { this.physics.add.collider(flag_endGame, gray); }
                        if (white) { this.physics.add.collider(flag_endGame, white); }
                        if (black) { this.physics.add.collider(flag_endGame, black); }
                        if (red) { this.physics.add.collider(flag_endGame, red); }
                        if (blue) { this.physics.add.collider(flag_endGame, blue); }
                        if (purple) { this.physics.add.collider(flag_endGame, purple); }
                        if (green) { this.physics.add.collider(flag_endGame, green); }
                        if (orange) { this.physics.add.collider(flag_endGame, orange); }
                        if (yellow) { this.physics.add.collider(flag_endGame, yellow); }
                        this.flags.push(flag_endGame);

                        break;
                    }
                case 'button':
                    {
                        let button = this.physics.add.sprite(x + (width / 2), y + (height / 2), 'button').setTint(0x303030);
                        const w = button.width;
                        const h = button.height;
                        this.physics.add.existing(button);
                        button.body.setSize(w * 0.5, h * 0.5);
                        button.color = findColorParam(objData.properties);
                        switch (button.color) {
                            case 'Whi':
                                button.setTint(this.colors.find(color => color.color == 'white').hex);
                                break;
                            case 'Bla':
                                button.setTint(this.colors.find(color => color.color == 'black').hex);
                                break;
                            case 'Gra':
                                button.setTint(this.colors.find(color => color.color == 'gray').hex);
                                break;
                            case 'Red':
                                button.setTint(this.colors.find(color => color.color == 'red').hex);
                                break;
                            case 'Blu':
                                button.setTint(this.colors.find(color => color.color == 'blue').hex);
                                break;
                            case 'Pur':
                                button.setTint(this.colors.find(color => color.color == 'purple').hex);
                                break;
                            case 'Gre':
                                button.setTint(this.colors.find(color => color.color == 'green').hex);
                                break;
                            case 'Ora':
                                button.setTint(this.colors.find(color => color.color == 'orange').hex);
                                break;
                            case 'Yel':
                                button.setTint(this.colors.find(color => color.color == 'yellow').hex);
                                break;
                        }
                        button.color = findColorParam(objData.properties);
                        button.affected = findAffectedParam(objData.properties);
                        if (gray) { this.physics.add.collider(button, gray); }
                        if (white) { this.physics.add.collider(button, white); }
                        if (black) { this.physics.add.collider(button, black); }
                        if (red) { this.physics.add.collider(button, red); }
                        if (blue) { this.physics.add.collider(button, blue); }
                        if (purple) { this.physics.add.collider(button, purple); }
                        if (green) { this.physics.add.collider(button, green); }
                        if (orange) { this.physics.add.collider(button, orange); }
                        if (yellow) { this.physics.add.collider(button, yellow); }
                        button.setPosition(x, y);
                        button.scale = 0.20;
                        button.body.allowGravity = false;
                        button.setInteractive();
                        button.name = ogName;
                        this.buttons.push(button);
                        break;
                    }
                case 'platform': {
                    let platform = this.physics.add.sprite(x + (width / 2), y + (height / 2), 'platform');
                    platform.setOrigin(0.5, 0.5);
                    if (width < height) {

                        platform.setSizeToFrame();

                        platform.displayHeight = width;
                        platform.displayWidth = height;
                        // platform.body.setSize(platform.height*platform.scaleY, platform.width*platform.scaleX);
                        // platform.body.height = platform.displayWidth;
                        // platform.body.width = platform.displayHeight;
                        platform.scaleY = platform.scaleX;
                        platform.setSize(platform.body.height, platform.body.width);
                        platform.angle = 90;

                    } else {
                        platform.displayWidth = width;
                        platform.scaleY = platform.scaleX;
                        platform.setPosition(x + (platform.body.width / 2), y + (platform.body.height / 2));
                    }
                    platform.color = findColorParam(objData.properties);
                    switch (platform.color) {
                        case 'Whi':
                            platform.setTint(this.colors.find(color => color.color == 'white').hex);
                            break;
                        case 'Bla':
                            platform.setTint(this.colors.find(color => color.color == 'black').hex);
                            break;
                        case 'Gra':
                            platform.setTint(this.colors.find(color => color.color == 'gray').hex);
                            break;
                        case 'Red':
                            platform.setTint(this.colors.find(color => color.color == 'red').hex);
                            break;
                        case 'Blu':
                            platform.setTint(this.colors.find(color => color.color == 'blue').hex);
                            break;
                        case 'Pur':
                            platform.setTint(this.colors.find(color => color.color == 'purple').hex);
                            break;
                        case 'Gre':
                            platform.setTint(this.colors.find(color => color.color == 'green').hex);
                            break;
                        case 'Ora':
                            platform.setTint(this.colors.find(color => color.color == 'orange').hex);
                            break;
                        case 'Yel':
                            platform.setTint(this.colors.find(color => color.color == 'yellow').hex);
                            break;
                    }

                    this.physics.add.existing(platform);
                    // Add missing imports for required packages

                    // Add missing imports for required packages


                    // platform.body.setCollisionMask(this.character1.body.collisionMask | this.character2.body.collisionMask);
                    // platform.body.setSize(width, height);


                    // platform.body.setCollisionMask(this.character1.body.setCollisionMask | this.character2.body.setCollisionMask)                    // platform.body.setSize(width, height);
                    platform.setBounce(0.2);


                    platform.posX = platform.x;
                    platform.posY = platform.y;
                    platform.movement = findMovementParam(objData.properties);
                    platform.velocity = findVelocityParam(objData.properties);
                    platform.direction = findDirectionParam(objData.properties);
                    platform.affected = findAffectedParam(objData.properties);
                    platform.onUse = false;
                    console.log("move up", platform.movement);
                    platform.body.allowGravity = false;


                    platform.body.immovable = true;
                    platform.setInteractive();
                    platform.name = ogName;

                    this.platforms.push(platform);

                    break;
                }

                case 'death':
                    {
                        const deathZone = this.add.zone(x, y, width, height);
                        deathZone.setOrigin(0).setAlpha(0);

                        this.physics.add.existing(deathZone);
                        this.physics.world.enable(deathZone);

                        deathZone.body.setAllowGravity(false);

                        this.death.push(deathZone);
                    }
            }
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('character1', { start: 1, end: 11, prefix: 'character1-run0', suffix: '.png' }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'pressButon',
            frames: this.anims.generateFrameNames('button', { start: 0, end: 2, prefix: 'tile00', suffix: '.png' }),
            frameRate: 10,
            repeat: -1
        }),
            this.anims.create({
                key: 'pressedButon',
                frames: this.anims.generateFrameNames('button', { start: 2, end: 2, prefix: 'tile00', suffix: '.png' }),
                frameRate: 10,
                repeat: -1
            })
        this.anims.create({
            key: 'releaseButon',
            frames: this.anims.generateFrameNames('button', { start: 2, end: 0, prefix: 'tile00', suffix: '.png' }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'buttonIdle',
            frames: this.anims.generateFrameNames('button', { start: 0, end: 0, prefix: 'tile00', suffix: '.png' }),
            frameRate: 10,
            repeat: -1
        })
        window.platforms = this.platforms;
        console.log(white);

        this.player = selectPlayer();
        this.handleCollision = function (player1, player2, button) {
            let toReturn = false;
            if (player1) {
                console.log(this.character1.tintTopLeft);
                console.log(this.colors.find(color => color.color == 'white').hex);
                let characterColor = this.colors.find(color => color.hex == this.character1.tintTopLeft).color;
                console.log(characterColor);
                switch (characterColor) {
                    case 'white':
                        if (button.color == 'Whi' || button.color == 'Gra') {
                            toReturn = true;
                        }
                        break;
                    case 'red':
                        if (button.color == 'Red' || button.color == 'Pur') {
                            toReturn = true;
                        }
                        break;
                    case 'green':
                        if (button.color == 'Gre' || button.color == 'Yel') {
                            toReturn = true;
                        }
                        break;
                }
            } else if (player2 && toReturn == false) {

                let characterColor = this.colors.find(color => color.hex == this.character2.tintTopLeft).color;
                switch (characterColor) {
                    case 'black':
                        if (button.color == 'Bla' || button.color == 'Gra') {
                            toReturn = true;
                        }
                        break;
                    case 'blue':
                        if (button.color == 'Blu' || button.color == 'Pur') {
                            toReturn = true;
                        }
                        break;
                    case 'orange':
                        if (button.color == 'Ora' || button.color == 'Yel') {
                            toReturn = true;
                        }
                        break;
                }
            }
            if (toReturn && !this.animationButtonPLaying) {
                button.anims.play('pressButon', true);
                this.animationButtonPLaying = true;
                // button.anims.stop('pressButon');
                button.anims.play('pressedButon', true);
            } else {
                if (!toReturn) {
                    // button.anims.stop('pressedButon')
                    if (button.anims) {
                        button.anims.play('releaseButon', true);
                        this.animationButtonPLaying = false;
                        button.anims.play('buttonIdle', true);
                    }

                }
            }

            return toReturn;
        }
        this.otherButtonPressing = function (platform, compareButton) {
            let isOtherPressed = false;
            this.buttons.forEach(button => {
                if (platform.affected == button.affected && compareButton != button) {
                    const isPlayer1Colliding = this.physics.overlap(button, this.character1);
                    const isPlayer2Colliding = this.physics.overlap(button, this.character2);
                    if (this.handleCollision(isPlayer1Colliding, isPlayer2Colliding, button)) {
                        isOtherPressed = true;
                    }
                }

            });
            return isOtherPressed
        }
        function selectPlayer() {
            if (socket.id == useStore.getState().gameData.players[0].id) {
                return 1;
            } else {
                return 2;
            }
        }
        function findMovementParam(data) {
            let returndata;
            data.forEach(element => {
                if (element.name == 'movement') {
                    returndata = element.value;
                }
            });
            return returndata;
        }

        function getPlayerProperty(data) {
            let returndata;
            data.forEach(element => {
                if (element.name == 'player') {
                    returndata = element.value;
                }
            });
            return returndata;
        }

        function findColorParam(data) {
            let returndata;
            data.forEach(element => {
                if (element.name == 'color') {
                    returndata = element.value;
                }
            });
            return returndata;

        }
        function findAffectedParam(data) {
            let returndata;
            data.forEach(element => {
                if (element.name == 'affected') {
                    returndata = element.value;
                }
            });
            return returndata;
        }
        function findDirectionParam(data) {
            let returndata;
            data.forEach(element => {
                if (element.name == 'direction') {
                    returndata = element.value;
                }
            });
            return returndata;
        }
        function findVelocityParam(data) {
            let returndata;
            data.forEach(element => {
                if (element.name == 'velocity') {
                    returndata = element.value;
                }
            });
            return returndata;
        }
        this.updateCharacterPosition = function () {
            if (this.player == 1) {
                socket.emit('updatePosition', { x: this.character1.x, y: this.character1.y, direction: this.character1.flipX ? 'left' : 'right' });
            } else {
                socket.emit('updatePosition', { x: this.character2.x, y: this.character2.y, direction: this.character2.flipX ? 'left' : 'right' });
            }
            let playerData = useStore.getState().gameData.playersData;
            if (this.player == 1) {
                this.character2.x = playerData[1].x;
                this.character2.y = playerData[1].y;
                this.character2.flipX = playerData[1].direction == 'left';
            } else {
                this.character1.x = playerData[0].x;
                this.character1.y = playerData[0].y;
                this.character1.flipX = playerData[0].direction == 'left';
            }
        }
        this.buttons.forEach(button => {
            button.associated = [];
            this.platforms.forEach(platform => {
                if (platform.affected == button.affected) {
                    button.associated.push(platform);
                    console.log("associated", button, platform);
                }
            });

        });
        this.platforms.forEach(platform => {
            platform.collisionC1 = null;
            platform.collisionC2 = null;
            switch (platform.color) {
                case 'Whi':
                    platform.setTint(this.colors.find(color => color.color == 'white').hex);

                    platform.collisionC1 = this.physics.add.collider(platform, this.character1);
                    break;
                case 'Bla':
                    platform.setTint(this.colors.find(color => color.color == 'black').hex);
                    platform.collisionC2 = this.physics.add.collider(platform, this.character2);
                    break;
                case 'Gra':
                    platform.setTint(this.colors.find(color => color.color == 'gray').hex);
                    platform.collisionC1 = this.physics.add.collider(platform, this.character1);
                    platform.collisionC2 = this.physics.add.collider(platform, this.character2);
                    break;
                case 'Red':
                    platform.setTint(this.colors.find(color => color.color == 'red').hex);
                    platform.collisionC1 = this.physics.add.collider(platform, this.character1);
                    break;
                case 'Blu':
                    platform.setTint(this.colors.find(color => color.color == 'blue').hex);
                    platform.collisionC2 = this.physics.add.collider(platform, this.character2);
                    break;
                case 'Pur':
                    platform.setTint(this.colors.find(color => color.color == 'purple').hex);
                    platform.collisionC1 = this.physics.add.collider(platform, this.character1);
                    platform.collisionC2 = this.physics.add.collider(platform, this.character2);
                    break;
                case 'Gre':
                    platform.setTint(this.colors.find(color => color.color == 'green').hex);
                    platform.collisionC1 = this.physics.add.collider(platform, this.character1);
                    break;
                case 'Ora':
                    platform.setTint(this.colors.find(color => color.color == 'orange').hex);
                    platform.collisionC2 = this.physics.add.collider(platform, this.character2);
                    break;
                case 'Yel':
                    platform.setTint(this.colors.find(color => color.color == 'yellow').hex);
                    platform.collisionC1 = this.physics.add.collider(platform, this.character1);
                    platform.collisionC2 = this.physics.add.collider(platform, this.character2);
                    break;
            }
        });
        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        window.character1 = this.character1;
        this.death.forEach(death => {
            this.physics.add.overlap(death, this.character1, (death, character1) => {
                this.animationPlaying = true;


                socket.emit('death', { player: this.player });
                setTimeout(() => {
                    this.character1.setPosition(this.spawns[0].spawn1X, this.spawns[0].spawn1Y);
                    this.character2.setPosition(this.spawns[1].spawn2X, this.spawns[1].spawn2Y);
                    this.animationPlaying = false;
                }, 1000);
            })
            this.physics.add.overlap(death, this.character2, (death, character2) => {
                this.animationPlaying = true;


                socket.emit('death', { player: this.player });
                setTimeout(() => {
                    this.character1.setPosition(this.spawns[0].spawn1X, this.spawns[0].spawn1Y);
                    this.character2.setPosition(this.spawns[1].spawn2X, this.spawns[1].spawn2Y);
                    this.animationPlaying = false;
                }, 1000);
            })
        });
        if (this.player == 1) {
            switch (useStore.getState().playerData.color) {
                case 'white':
                    if (this.whiteView) {
                        this.whiteView.setAlpha(1);
                        this.c1White.active = true;
                        this.grayView.setAlpha(1);
                        this.c1Gray.active = true;
                        this.blackView.setAlpha(0);

                    }
                    if (this.redView) {
                        this.redView.setAlpha(0.5);
                        this.c1Red.active = false;
                        this.blueView.setAlpha(0);
                        this.purpleView.setAlpha(0.5);
                        this.c1Purple.active = false;
                    }
                    if (this.greenView) {
                        this.greenView.setAlpha(0.5);
                        this.c1Green.active = false;
                        this.orangeView.setAlpha(0);
                        this.yellowView.setAlpha(0.5);
                        this.c1Yellow.active = false;
                    }
                    this.platforms.forEach(platform => {
                        if (platform.color == 'Whi' || platform.color == 'Gra') {
                            platform.setAlpha(1);
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = true;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = true;
                            }
                        } else {
                            if (platform.color == 'Gre' || platform.color == 'Yel' || platform.color == 'Pur' || platform.color == 'Red') {
                                platform.setAlpha(0.5);
                            } else {
                                platform.setAlpha(0);
                            }
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = false;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = false;
                            }

                        }
                    });
                    this.buttons.forEach(button => {
                        if (button.color == 'Whi' || button.color == 'Gra') {
                            button.setAlpha(1);

                        } else {
                            if (button.color == 'Gre' || button.color == 'Yel' || button.color == 'Pur' || button.color == 'Red') {
                                button.setAlpha(0.5);
                            } else {
                                button.setAlpha(0);
                            }

                        }
                    });
                    break;
                case 'red':
                    if (this.whiteView) {
                        this.whiteView.setAlpha(0.5);
                        this.c1White.active = false;
                        this.grayView.setAlpha(0.5);
                        this.c1Gray.active = false;
                        this.blackView.setAlpha(0);

                    }
                    if (this.redView) {
                        this.redView.setAlpha(1);
                        this.c1Red.active = true;
                        this.blueView.setAlpha(0);
                        this.purpleView.setAlpha(1);
                        this.c1Purple.active = true;
                    }
                    if (this.greenView) {
                        this.greenView.setAlpha(0.5);
                        this.c1Green.active = false;
                        this.orangeView.setAlpha(0);
                        this.yellowView.setAlpha(0.5);
                        this.c1Yellow.active = false;
                    }
                    this.platforms.forEach(platform => {
                        if (platform.color == 'Red' || platform.color == 'Pur') {
                            platform.setAlpha(1);
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = true;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = true;
                            }
                        } else {
                            if (platform.color == 'Gre' || platform.color == 'Yel' || platform.color == 'Whi' || platform.color == 'Gra') {
                                platform.setAlpha(0.5);
                            } else {
                                platform.setAlpha(0);
                            }
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = false;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = false;
                            }

                        }
                    });
                    this.buttons.forEach(button => {
                        if (button.color == 'Gre' || button.color == 'Yel' || button.color == 'Whi' || button.color == 'Gra') {
                            button.setAlpha(0.5);
                        } else {
                            platform.setAlpha(0);
                        }
                    });
                    break;
                case 'green':
                    if (this.whiteView) {
                        this.whiteView.setAlpha(0.5);
                        this.c1White.active = false;
                        this.grayView.setAlpha(0.5);
                        this.c1Gray.active = false;
                        this.blackView.setAlpha(0);

                    }
                    if (this.redView) {
                        this.redView.setAlpha(0.5);
                        this.c1Red.active = false;
                        this.blueView.setAlpha(0);
                        this.purpleView.setAlpha(0.5);
                        this.c1Purple.active = false;
                    }
                    if (this.greenView) {
                        this.greenView.setAlpha(1);
                        this.c1Green.active = true;
                        this.orangeView.setAlpha(0);
                        this.yellowView.setAlpha(1);
                        this.c1Yellow.active = true;
                    }

                    this.platforms.forEach(platform => {
                        if (platform.color == 'Gre' || platform.color == 'Yel') {
                            platform.setAlpha(1);
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = true;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = true;
                            }
                        } else {
                            if (platform.color == 'Whi' || platform.color == 'Gra' || platform.color == 'Pur' || platform.color == 'Red') {
                                platform.setAlpha(0.5);

                            } else {
                                platform.setAlpha(0);
                            }
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = false;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = false;
                            }

                        }
                    });
                    this.buttons.forEach(button => {
                        if (button.color == 'Gre' || button.color == 'Yel') {
                            button.setAlpha(1);

                        } else {
                            if (button.color == 'Whi' || button.color == 'Gra' || button.color == 'Pur' || button.color == 'Red') {
                                button.setAlpha(0.5);
                            } else {
                                button.setAlpha(0);
                            }
                        }
                    });
                    break;

            }

        }
        else {
            switch (useStore.getState().playerData.color) {
                case 'black':
                    if (this.whiteView) {
                        this.whiteView.setAlpha(0);
                        this.grayView.setAlpha(1);
                        this.c2Gray.active = true;
                        this.blackView.setAlpha(1);
                        this.c2Black.active = true;

                    }
                    if (this.blueView) {
                        this.redView.setAlpha(0);
                        this.blueView.setAlpha(0.5);

                        this.c2Blue.active = false;
                        this.purpleView.setAlpha(0.5);
                        this.c2Purple.active = false;
                    }
                    if (this.yellowView) {
                        this.greenView.setAlpha(0);
                        this.orangeView.setAlpha(0.5);
                        this.c2Orange.active = false;
                        this.yellowView.setAlpha(0.5);
                        this.c2Yellow.active = false;
                    }
                    this.platforms.forEach(platform => {
                        if (platform.color == 'Bla' || platform.color == 'Gra') {
                            platform.setAlpha(1);
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = true;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = true;
                            }
                        } else {
                            if (platform.color == 'Ora' || platform.color == 'Yel' || platform.color == 'Blu' || platform.color == 'Pur') {
                                platform.setAlpha(0.5);
                            } else {

                                platform.setAlpha(0);
                            }
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = false;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = false;
                            }

                        }
                    });
                    this.buttons.forEach(button => {
                        if (button.color == 'Bla' || button.color == 'Gra') {
                            button.setAlpha(1);

                        } else {
                            if (button.color == 'Ora' || button.color == 'Yel' || button.color == 'Blu' || button.color == 'Pur') {
                                button.setAlpha(0.5);
                            } else {
                                button.setAlpha(0);
                            }

                        }
                    });
                    break;
                case 'blue':

                    if (this.whiteView != null) {
                        this.whiteView.setAlpha(0);
                        this.c2Black.active = false;
                        this.grayView.setAlpha(0.5);
                        this.c2Gray.active = false;
                        this.blackView.setAlpha(0.5);

                    }
                    if (this.redView) {
                        this.redView.setAlpha(0);
                        this.blueView.setAlpha(1);

                        this.c2Blue.active = true;
                        this.purpleView.setAlpha(1);
                        this.c2Purple.active = true;
                    }
                    if (this.yellowView) {
                        this.greenView.setAlpha(0);
                        this.orangeView.setAlpha(0.5);
                        this.c2Orange.active = false;
                        this.yellowView.setAlpha(0.5);
                        this.c2Yellow.active = false;
                    }
                    this.platforms.forEach(platform => {
                        if (platform.color == 'Blu' || platform.color == 'Pur') {
                            platform.setAlpha(1);
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = true;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = true;
                            }
                        } else {
                            if (platform.color == 'Ora' || platform.color == 'Yel' || platform.color == 'Whi' || platform.color == 'Gra') {
                                platform.setAlpha(0.5);
                            } else {
                                platform.setAlpha(0);
                            }
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = false;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = false;
                            }

                        }
                    });
                    this.buttons.forEach(button => {
                        if (button.color == 'Blu' || button.color == 'Pur') {
                            button.setAlpha(1);

                        } else {
                            if (button.color == 'Ora' || button.color == 'Yel' || button.color == 'Bla' || button.color == 'Gra') {
                                button.setAlpha(0.5);
                            } else {
                                button.setAlpha(0);
                            }

                        }
                    });
                    break;
                case 'orange':
                    if (this.whiteView) {
                        this.whiteView.setAlpha(0);
                        this.grayView.setAlpha(0.5);
                        this.c2Gray.active = false;
                        this.blackView.setAlpha(0.5);
                        this.c2Black.active = false;

                    }
                    if (this.redView) {
                        this.redView.setAlpha(0);
                        this.blueView.setAlpha(0.5);
                        this.c2Blue.active = false;
                        this.purpleView.setAlpha(0.5);
                        this.c2Purple.active = false;
                    }
                    if (this.yellowView) {
                        this.greenView.setAlpha(0);
                        this.orangeView.setAlpha(1);
                        this.c2Orange.active = true;
                        this.yellowView.setAlpha(1);
                        this.c2Yellow.active = true;
                    }
                    this.platforms.forEach(platform => {
                        if (platform.color == 'Ora' || platform.color == 'Yel') {
                            platform.setAlpha(1);
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = true;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = true;
                            }
                        } else {
                            if (platform.color == 'Pur' || platform.color == 'Red' || platform.color == 'Bla' || platform.color == 'Gra') {
                                platform.setAlpha(0.5);
                            } else {
                                platform.setAlpha(0);
                            }
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = false;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = false;
                            }

                        }
                    });
                    this.buttons.forEach(button => {
                        if (button.color == 'Ora' || button.color == 'Yel') {
                            button.setAlpha(1);

                        } else {
                            if (button.color == 'Pur' || button.color == 'Red' || button.color == 'Bla' || button.color == 'Gra') {
                                button.setAlpha(0.5);
                            } else {
                                button.setAlpha(0);
                            }

                        }
                    });
                    break;
            }

        }
        setTimeout(() => {
            this.updateCharacterPosition();
        }, 1000);

        socket.on('updatePositionFront', (data) => {
            if (this.player == 1) {
                this.character2.x = data[1].x;
                this.character2.y = data[1].y;
                if (data[1].direction == "left") {
                    this.character2.flipX = true;
                } else {
                    this.character2.flipX = false;
                }

                this.priorX = data[1].x;
                this.priorY = data[1].y;
            }
            else {
                this.character1.x = data[0].x;
                this.character1.y = data[0].y;
                if (data[0].direction == "left") {
                    this.character1.flipX = true;
                } else {
                    this.character1.flipX = false;
                }

                this.priorX = data[0].x;
                this.priorY = data[0].y;
            }
        });

        socket.on('deathFront', () => {
            this.animationPlaying = true;



            this.character1.setPosition(this.spawns[0].spawn1X, this.spawns[0].spawn1Y);
            this.character2.setPosition(this.spawns[1].spawn2X, this.spawns[1].spawn2Y);
            this.animationPlaying = false;
        });

        socket.on('winFront', () => {


            // this.time.delayedCall(500, this.scene.remove, ['preloader'], this.scene);
            // this.time.delayedCall(700, () => {
            //     this.scene.add('preloader', Preloader, true);
            // });

            
           
        });
        if (this.player == 1) {
            switch (useStore.getState().gameData.playersData[0].color) {
                case 'white':
                    if (this.c1White != null) {
                        this.c1White.active = true;
                        this.c1Gray.active = true;
                    }
                    if (this.c1Red != null) {
                        this.c1Red.active = false;
                        this.c1Purple.active = false;
                    }
                    if (this.c1Green != null) {
                        this.c1Green.active = false;
                        this.c1Yellow.active = false;
                    }
                    this.platforms.forEach(platform => {
                        if (platform.color == 'Whi' || platform.color == 'Gra') {
                            platform.setAlpha(1);
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = true;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = true;
                            }
                        } else {
                            if (platform.color == 'Red' || platform.color == 'Pur' || platform.color == 'Gre' || platform.color == 'Yel') {
                                platform.setAlpha(0.5);
                            } else {

                                platform.setAlpha(0);
                            }
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = false;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = false;
                            }
                        }
                    });
                    this.buttons.forEach(button => {
                        if (button.color == 'Whi' || button.color == 'Gra') {
                            button.setAlpha(1);
                        }
                        else {
                            if (button.color == 'Red' || button.color == 'Pur' || button.color == 'Gre' || button.color == 'Yel') {
                                button.setAlpha(0.5);
                            } else {
                                button.setAlpha(0);
                            }
                        }
                    }
                    );
                    break;
                case 'red':
                    if (this.c1Red != null) {
                        this.c1Red.active = true;
                        this.c1Purple.active = true;
                    }
                    if (this.c1White != null) {
                        this.c1White.active = false;
                        this.c1Gray.active = false;
                    }
                    if (this.c1Green != null) {
                        this.c1Green.active = false;
                        this.c1Yellow.active = false;
                    }
                    this.platforms.forEach(platform => {
                        if (platform.color == 'Red' || platform.color == 'Pur') {
                            platform.setAlpha(1);
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = true;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = true;
                            }
                        } else {
                            if (platform.color == 'Whi' || platform.color == 'Gra' || platform.color == 'Gre' || platform.color == 'Yel') {
                                platform.setAlpha(0.5);
                            } else {
                                platform.setAlpha(0);
                            }
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = false;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = false;
                            }
                        }
                    });
                    this.buttons.forEach(button => {
                        if (button.color == 'Red' || button.color == 'Pur') {
                            button.setAlpha(1);
                        }
                        else {
                            if (button.color == 'Whi' || button.color == 'Gra' || button.color == 'Gre' || button.color == 'Yel') {
                                button.setAlpha(0.5);
                            } else {
                                button.setAlpha(0);
                            }
                        }
                    }
                    );
                    break;
                case 'green':
                    if (this.c1Green != null) {
                        this.c1Green.active = true;
                        this.c1Yellow.active = true;
                    }
                    if (this.c1White != null) {
                        this.c1White.active = false;
                        this.c1Gray.active = false;
                    }
                    if (this.c1Red != null) {
                        this.c1Red.active = false;

                        this.c1Purple.active = false;
                    }
                    this.platforms.forEach(platform => {
                        if (platform.color == 'Gre' || platform.color == 'Yel') {
                            platform.setAlpha(1);
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = true;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = true;
                            }
                        } else {
                            if (platform.color == 'Whi' || platform.color == 'Gra' || platform.color == 'Pur' || platform.color == 'Red') {
                                platform.setAlpha(0.5);
                            } else {
                                platform.setAlpha(0);
                            }
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = false;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = false;
                            }
                        }
                    }
                    );
                    this.buttons.forEach(button => {
                        if (button.color == 'Gre' || button.color == 'Yel') {
                            button.setAlpha(1);
                        }
                        else {
                            if (button.color == 'Whi' || button.color == 'Gra' || button.color == 'Pur' || button.color == 'Red') {
                                button.setAlpha(0.5);
                            } else {
                                button.setAlpha(0);
                            }
                        }
                    }
                    );
                    break;
            }
        } else {
            switch (useStore.getState().gameData.playersData[1].color) {
                case 'black':
                    if (this.c2Black != null) {
                        this.c2Black.active = true;
                        this.c2Gray.active = true;
                    }
                    if (this.c2Blue != null) {

                        this.c2Blue.active = false;
                        this.c2Purple.active = false;

                    }
                    if (this.c2Orange != null) {
                        this.c2Yellow.active = false;
                        this.c2Orange.active = false;
                    }
                    this.platforms.forEach(platform => {
                        if (platform.color == 'Bla' || platform.color == 'Gra') {
                            platform.setAlpha(1);
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = true;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = true;
                            }
                        } else {
                            if (platform.color == 'Blu' || platform.color == 'Pur' || platform.color == 'Ora' || platform.color == 'Yel') {
                                platform.setAlpha(0.5);
                            } else {

                                platform.setAlpha(0);
                            }
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = false;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = false;
                            }
                        }
                    });
                    this.buttons.forEach(button => {
                        if (button.color == 'Bla' || button.color == 'Gra') {
                            button.setAlpha(1);
                        }
                        else {
                            if (button.color == 'Blu' || button.color == 'Pur' || button.color == 'Ora' || button.color == 'Yel') {
                                button.setAlpha(0.5);
                            } else {
                                button.setAlpha(0);
                            }
                        }
                    }
                    );

                    break;

                case 'blue':
                    if (this.c2Blue != null) {
                        this.c2Blue.active = true;
                        this.c2Purple.active = true;
                    }
                    if (this.c2Black != null) {
                        this.c2Black.active = false;
                        this.c2Gray.active = false;
                    }
                    if (this.c2Orange != null) {
                        this.c2Orange.active = false;

                        this.c2Yellow.active = false;
                    }



                    this.platforms.forEach(platform => {
                        if (platform.color == 'Blu' || platform.color == 'Pur') {
                            platform.setAlpha(1);
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = true;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = true;
                            }
                        }
                        else {
                            if (platform.color == 'Bla' || platform.color == 'Gra' || platform.color == 'Ora' || platform.color == 'Yel') {
                                platform.setAlpha(0.5);
                            } else {
                                platform.setAlpha(0);
                            }
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = false;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = false;
                            }
                        }
                    });
                    this.buttons.forEach(button => {
                        if (button.color == 'Blu' || button.color == 'Pur') {
                            button.setAlpha(1);
                        }
                        else {
                            if (button.color == 'Bla' || button.color == 'Gra' || button.color == 'Ora' || button.color == 'Yel') {
                                button.setAlpha(0.5);
                            } else {
                                button.setAlpha(0);
                            }
                        }
                    }
                    );

                    break;
                case 'orange':
                    if (this.c2Orange != null) {
                        this.c2Orange.active = true;
                        this.c2Yellow.active = true;
                    }
                    if (this.c2Black != null) {
                        this.c2Black.active = false;
                        this.c2Gray.active = false;
                    }
                    if (this.c2Blue != null) {
                        this.c2Blue.active = false;
                        this.c2Purple.active = false;
                    }
                    this.platforms.forEach(platform => {
                        if (platform.color == 'Ora' || platform.color == 'Yel') {
                            platform.setAlpha(1);
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = true;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = true;
                            }
                        } else {
                            if (platform.color == 'Blu' || platform.color == 'Pur' || platform.color == 'Bla' || platform.color == 'Gra') {
                                platform.setAlpha(0.5);
                            } else {
                                platform.setAlpha(0);
                            }
                            if (platform.collisionC1 != null) {
                                platform.collisionC1.active = false;
                            }
                            if (platform.collisionC2 != null) {
                                platform.collisionC2.active = false;
                            }
                        }
                    });
                    break;
            }
        }
        if (this.player == 2) {
            this.character1.body.allowGravity = false;
            switch (useStore.getState().gameData.playersData[1].color) {
                case 'black':
                    this.blackView.setAlpha(1);
                    this.grayView.setAlpha(1);
                    this.whiteView.setAlpha(0);
                    if (this.blueView) {
                        this.blueView.setAlpha(0.5);
                        this.purpleView.setAlpha(0.5);
                        this.redView.setAlpha(0);
                    }
                    if (this.orangeView) {
                        this.orangeView.setAlpha(0.5);
                        this.yellowView.setAlpha(0.5);
                        this.greenView.setAlpha(0);
                    }
                    break;
                case 'blue':

                    this.blueView.setAlpha(1);
                    this.purpleView.setAlpha(1);
                    this.redView.setAlpha(0);
                    if (this.blackView) {
                        this.blackView.setAlpha(0.5);
                        this.grayView.setAlpha(0.5);
                        this.whiteView.setAlpha(0);
                    }
                    if (this.orangeView) {
                        this.orangeView.setAlpha(0.5);
                        this.yellowView.setAlpha(0.5);
                        this.greenView.setAlpha(0);
                    }
                    break;
                case 'orange':
                    this.orangeView.setAlpha(1);
                    this.yellowView.setAlpha(1);
                    this.greenView.setAlpha(0);
                    if (this.blackView) {
                        this.blackView.setAlpha(0.5);
                        this.grayView.setAlpha(0.5);
                        this.whiteView.setAlpha(0);
                    }
                    if (this.blueView) {
                        this.blueView.setAlpha(0.5);
                        this.purpleView.setAlpha(0.5);
                        this.redView.setAlpha(0);
                    }
                    break;
            }
        } else {
            this.character2.body.allowGravity = false;
            switch (useStore.getState().gameData.playersData[0].color) {
                case 'white':
                    this.whiteView.setAlpha(1);
                    this.grayView.setAlpha(1);
                    this.blackView.setAlpha(0);
                    if (this.redView) {
                        this.redView.setAlpha(0.5);
                        this.purpleView.setAlpha(0.5);
                        this.blueView.setAlpha(0);
                    }
                    if (this.greenView) {
                        this.greenView.setAlpha(0.5);
                        this.yellowView.setAlpha(0.5);
                        this.orangeView.setAlpha(0);
                    }
                    break;
                case 'red':
                    this.redView.setAlpha(1);
                    this.purpleView.setAlpha(1);
                    this.blueView.setAlpha(0);
                    if (this.whiteView) {
                        this.whiteView.setAlpha(0.5);
                        this.grayView.setAlpha(0.5);
                        this.blackView.setAlpha(0);
                    }
                    if (this.greenView) {
                        this.greenView.setAlpha(0.5);
                        this.yellowView.setAlpha(0.5);
                        this.orangeView.setAlpha(0);
                    }
                    break;
                case 'green':
                    this.greenView.setAlpha(1);
                    this.yellowView.setAlpha(1);
                    this.orangeView.setAlpha(0);
                    if (this.whiteView) {
                        this.whiteView.setAlpha(0.5);
                        this.grayView.setAlpha(0.5);
                        this.blackView.setAlpha(0);
                    }
                    if (this.redView) {
                        this.redView.setAlpha(0.5);
                        this.purpleView.setAlpha(0.5);
                        this.blueView.setAlpha(0);
                    }
                    break;
            }
        }


        console.log("greenView:", this.greenView);
        console.log("yellowView:", this.yellowView);
        console.log("orangeView:", this.orangeView);
        console.log("purpleView:", this.purpleView);
        console.log("blueView:", this.blueView);
        console.log("redView:", this.redView);
        console.log("whiteView:", this.whiteView);
        console.log("blackView:", this.blackView);
        console.log("grayView:", this.grayView);

        socket.on('changeColorFront', (data) => {

            console.log("greenView:", this.greenView);
            console.log("yellowView:", this.yellowView);
            console.log("orangeView:", this.orangeView);
            console.log("purpleView:", this.purpleView);
            console.log("blueView:", this.blueView);
            console.log("redView:", this.redView);
            console.log("whiteView:", this.whiteView);
            console.log("blackView:", this.blackView);
            console.log("grayView:", this.grayView);
            if (this.greenView == null) {
                console.log("greenView:", this.greenView);
            }
            if (data.id == socket.id) {
                if (this.player == 1) {
                    this.character1.setTint(this.colors.find(color => color.color == data.color).hex);
                    if (data.color == 'white') {
                        this.whiteView.setAlpha(1);
                        this.c1White.active = true;
                        this.blackView.setAlpha(0);
                        this.grayView.setAlpha(1);
                        this.c1Gray.active = true;

                        this.platforms.forEach(platform => {
                            if (platform.color != 'Whi' && platform.color != 'Gra') {
                                if (platform.color == 'Gre' || platform.color == 'Yel' || platform.color == 'Pur' || platform.color == 'Red') {
                                    platform.setAlpha(0.5);
                                } else {
                                    platform.setAlpha(0);
                                }
                                if (platform.collisionC1 != null) {
                                    platform.collisionC1.active = false;
                                }
                                if (platform.collisionC2 != null) {
                                    platform.collisionC2.active = false;
                                }
                            } else {
                                platform.setAlpha(1);
                                if (platform.collisionC1 != null) {
                                    platform.collisionC1.active = true;
                                }
                                if (platform.collisionC2 != null) {
                                    platform.collisionC2.active = true;
                                }

                            }
                        });
                        this.buttons.forEach(button => {
                            if (button.color != 'Whi' && button.color != 'Gra') {
                                if (button.color == 'Gre' || button.color == 'Yel' || button.color == 'Pur' || button.color == 'Red') {
                                    button.setAlpha(0.5);
                                } else {
                                    button.setAlpha(0);
                                }
                            }
                            else {
                                button.setAlpha(1);

                            }
                        });
                        if (this.redView != null) {
                            this.redView.setAlpha(0.5);
                            this.c1Red.active = false;
                            this.blueView.setAlpha(0);
                            this.c1Purple.active = false;
                            this.purpleView.setAlpha(0.5);
                        }
                        if (this.yellowView != null) {
                            this.greenView.setAlpha(0);
                            this.c1Green.active = false;
                            this.orangeView.setAlpha(0.5);
                            this.yellowView.setAlpha(0.5);
                            this.c1Yellow.active = false;
                        }
                    } else {
                        if (data.color == 'red') {

                            this.redView.setAlpha(1);
                            this.c1Red.active = true;
                            this.blueView.setAlpha(0);
                            this.purpleView.setAlpha(1);
                            this.c1Purple.active = true;
                            this.platforms.forEach(platform => {
                                if (platform.color != 'Red' && platform.color != 'Pur') {
                                    if (platform.color == 'Gre' || platform.color == 'Yel' || platform.color == 'Whi' || platform.color == 'Gra') {
                                        platform.setAlpha(0.5);
                                    } else {
                                        platform.setAlpha(0);
                                    }
                                    if (platform.collisionC1 != null) {
                                        platform.collisionC1.active = false;
                                    }
                                    if (platform.collisionC2 != null) {
                                        platform.collisionC2.active = false;
                                    }
                                } else {
                                    platform.setAlpha(1);
                                    if (platform.collisionC1 != null) {
                                        platform.collisionC1.active = true;
                                    }
                                    if (platform.collisionC2 != null) {
                                        platform.collisionC2.active = true;
                                    }

                                }
                            });
                            this.buttons.forEach(button => {
                                if (button.color != 'Red' && button.color != 'Pur') {
                                    if (button.color == 'Gre' || button.color == 'Yel' || button.color == 'Whi' || button.color == 'Gra') {
                                        button.setAlpha(0.5);
                                    } else {
                                        button.setAlpha(0);
                                    }
                                }
                                else {
                                    button.setAlpha(1);

                                }
                            });
                            if (this.whiteView != null) {
                                this.whiteView.setAlpha(0.5);
                                this.c1White.active = false;
                                this.blackView.setAlpha(0);
                                this.grayView.setAlpha(0.5);
                                this.c1Gray.active = false;
                            }
                            if (this.yellowView != null) {
                                this.greenView.setAlpha(0.5);
                                this.c1Green.active = false;
                                this.orangeView.setAlpha(0);
                                this.yellowView.setAlpha(0.5);
                                this.c1Yellow.active = false;
                            }

                        } else if (data.color == "green") {
                            console.log("green", this.greenView);

                            this.greenView.setAlpha(1);
                            this.c1Green.active = true;

                            this.orangeView.setAlpha(0);
                            this.yellowView.setAlpha(1);
                            this.c1Yellow.active = true;
                            this.platforms.forEach(platform => {
                                if (platform.color != 'Gre' && platform.color != 'Yel') {
                                    if (platform.color == 'Whi' || platform.color == 'Gra' || platform.color == 'Pur' || platform.color == 'Red') {
                                        platform.setAlpha(0.5);
                                    } else {
                                        platform.setAlpha(0);
                                    }
                                    if (platform.collisionC1 != null) {
                                        platform.collisionC1.active = false;
                                    }
                                    if (platform.collisionC2 != null) {
                                        platform.collisionC2.active = false;
                                    }
                                } else {
                                    platform.setAlpha(1);
                                    if (platform.collisionC1 != null) {
                                        platform.collisionC1.active = true
                                    }
                                    if (platform.collisionC2 != null) {
                                        platform.collisionC2.active = true;
                                    }

                                }
                            }
                            );
                            this.buttons.forEach(button => {
                                console.log(button.color);
                                if (button.color != 'Gre' && button.color != 'Yel') {
                                    if (button.color == 'Whi' || button.color == 'Gra' || button.color == 'Pur' || button.color == 'Red') {
                                        button.setAlpha(0.5);
                                    } else {
                                        button.setAlpha(0);
                                    }
                                } else {
                                    button.setAlpha(1);

                                }
                            }
                            );
                            if (this.whiteView != null) {
                                this.whiteView.setAlpha(0.5);
                                this.c1White.active = false;
                                this.blackView.setAlpha(0);
                                this.grayView.setAlpha(0.5);
                                this.c1Gray.active = false;
                            }
                            if (this.redView != null) {
                                this.redView.setAlpha(0.5);
                                this.c1Red.active = false;
                                this.blueView.setAlpha(0);
                                this.purpleView.setAlpha(0.5);
                                this.c1Purple.active = false;
                            }
                        }
                    }
                } else {
                    this.character2.setTint(this.colors.find(color => color.color == data.color).hex);
                    if (data.color == 'black') {
                        this.whiteView.setAlpha(0);
                        this.blackView.setAlpha(1);
                        this.c2Black.active = true;
                        this.grayView.setAlpha(1);
                        this.c2Gray.active = true;
                        this.platforms.forEach(platform => {
                            console.log(platform.color);
                            if (platform.color != 'Bla' && platform.color != 'Gra') {
                                if (platform.color == 'Ora' || platform.color == 'Yel' || platform.color == 'Blu' || platform.color == 'Pur') {
                                    platform.setAlpha(0.5);
                                }
                                else {
                                    platform.setAlpha(0);
                                }
                                if (platform.collisionC1 != null) {
                                    platform.collisionC1.active = false;
                                }
                                if (platform.collisionC2 != null) {
                                    platform.collisionC2.active = false;
                                }
                            } else {
                                platform.setAlpha(1);
                                if (platform.collisionC1 != null) {
                                    platform.collisionC1.active = true;
                                }
                                if (platform.collisionC2 != null) {
                                    platform.collisionC2.active = true;
                                }

                            }
                        }
                        );
                        this.buttons.forEach(button => {
                            if (button.color != 'Bla' && button.color != 'Gra') {
                                if (button.color == 'Ora' || button.color == 'Yel' || button.color == 'Blu' || button.color == 'Pur') {
                                    button.setAlpha(0.5);
                                } else {
                                    button.setAlpha(0);
                                }
                            } else {
                                button.setAlpha(1);

                            }
                        }
                        );
                        if (this.redView != null) {
                            this.redView.setAlpha(0);
                            this.blueView.setAlpha(0.5);
                            this.c2Blue.active = false;
                            this.purpleView.setAlpha(0.5);
                            this.c2Purple.active = false;
                        }
                        if (this.orangeView != null) {
                            this.greenView.setAlpha(0);
                            this.orangeView.setAlpha(0.5);
                            this.c2Orange.active = false;
                            this.yellowView.setAlpha(0.5);
                            this.c2Yellow.active = false;
                        }
                    } else if (data.color == 'blue') {
                        this.blueView.setAlpha(1);
                        console.log("blueBeetle18deagostoencines")
                        this.c2Blue.active = true;
                        this.redView.setAlpha(0);
                        this.purpleView.setAlpha(1);
                        this.c2Purple.active = true;

                        if (this.whiteView != null) {
                            this.whiteView.setAlpha(0);
                            this.blackView.setAlpha(0.5);
                            this.c2Black.active = false;
                            this.grayView.setAlpha(0.5);
                            this.c2Gray.active = false;
                        }
                        if (this.orangeView != null) {
                            this.greenView.setAlpha(0);
                            this.orangeView.setAlpha(0.5);
                            this.c2Orange.active = false;
                            this.yellowView.setAlpha(0.5);
                            this.c2Yellow.active = false;
                        }
                        this.platforms.forEach(platform => {
                            if (platform.color != 'Blu' && platform.color != 'Pur') {
                                if(platform.color == 'Ora' || platform.color == 'Yel' || platform.color == 'Bla' || platform.color == 'Gra') {
                                    platform.setAlpha(0.5);
                                } else {
                                    platform.setAlpha(0);
                                }
                                if (platform.collisionC1 != null) {
                                    platform.collisionC1.active = false;
                                }
                                if (platform.collisionC2 != null) {
                                    platform.collisionC2.active = false;
                                }
                            } else {
                                platform.setAlpha(1);
                                if (platform.collisionC1 != null) {
                                    platform.collisionC1.active = true
                                }
                                if (platform.collisionC2 != null) {
                                    platform.collisionC2.active = true;
                                }

                            }
                        }
                        );
                        this.buttons.forEach(button => {
                            if (button.color != 'Blu' && button.color != 'Pur') {
                                if (button.color == 'Ora' || button.color == 'Yel' || button.color == 'Bla' || button.color == 'Gra') {
                                    button.setAlpha(0.5);
                                }
                                else {
                                    button.setAlpha(0);
                                }
                            } else {
                                button.setAlpha(1);

                            }
                        }
                        );
                    } else if (data.color == 'orange') {
                        console.log(this.orangeView);
                        this.orangeView.setAlpha(1);
                        this.c2Orange.active = true;
                        this.greenView.setAlpha(0);
                        this.yellowView.setAlpha(1);
                        this.c2Yellow.active = true;

                        this.platforms.forEach(platform => {
                            if (platform.color != 'Ora' && platform.color != 'Yel') {
                                if(platform.color == 'Bla' || platform.color == 'Gra' || platform.color == 'Blu' || platform.color == 'Pur') {
                                    platform.setAlpha(0.5);
                                } else {
                                    platform.setAlpha(0);
                                }
                                if (platform.collisionC1 != null) {
                                    platform.collisionC1.active = false;
                                }
                                if (platform.collisionC2 != null) {
                                    platform.collisionC2.active = false;
                                }
                            } else {
                                platform.setAlpha(1);
                                if (platform.collisionC1 != null) {
                                    platform.collisionC1.active = true
                                }
                                if (platform.collisionC2 != null) {
                                    platform.collisionC2.active = true;
                                }

                            }
                        }
                        );
                        this.buttons.forEach(button => {
                            if (button.color != 'Ora' && button.color != 'Yel') {
                                if (button.color == 'Bla' || button.color == 'Gra' || button.color == 'Blu' || button.color == 'Pur') {
                                    button.setAlpha(0.5);
                                } else {
                                    button.setAlpha(0);
                                }
                            } else {
                                button.setAlpha(1);

                            }
                        }
                        );
                        if (this.whiteView != null) {
                            this.whiteView.setAlpha(0);
                            this.blackView.setAlpha(0.5);
                            this.c2Black.active = false;
                            this.grayView.setAlpha(0.5);
                            this.c2Gray.active = false;
                        }
                        if (this.redView != null) {
                            this.redView.setAlpha(0);
                            this.blueView.setAlpha(0.5);
                            this.c2Blue.active = false;
                            this.purpleView.setAlpha(0.5);
                            this.c2Purple.active = false;
                        }
                    }
                }
                if (this.cameras.main) {

                    this.cameras.main.setBackgroundColor(this.colors.find(color => color.color == data.color).hex);
                }
            } else {
                if (this.player == 1) {
                    this.character2.setTint(this.colors.find(color => color.color == data.color).hex);
                } else {
                    this.character1.setTint(this.colors.find(color => color.color == data.color).hex);
                }
            }
        });
        this.yellowView.setAlpha(0.5);
        if(this.player == 2){
            this.platforms.forEach(platform => {
                if(platform.color == 'Yel' || platform.color == 'Ora' || platform.color == 'Pur' || platform.color == 'Red'){
                    platform.setAlpha(0.5);
                    if(platform.collisionC1 != null){
                    platform.collisionC1.active = false;
                    } 
                    if(platform.collisionC2 != null){
                    platform.collisionC2.active = false;
                    }
                }else{
                    if(platform.color == 'Bla' || platform.color == 'Gra'){
                        platform.setAlpha(1);
                        if(platform.collisionC1 != null){
                            platform.collisionC1.active = true;
                        }
                        if(platform.collisionC2 != null){
                            platform.collisionC2.active = true;
                        }
                    }
                }
            });
            this.buttons.forEach(button => {
                if(button.color == 'Yel' || button.color == 'Ora' || button.color == 'Pur' || button.color == 'Red'){
                    button.setAlpha(0.5);
                }else{
                    if(button.color == 'Bla' || button.color == 'Gra'){
                        button.setAlpha(1);
                    }
                }
            }
            );
        }
        else{
            forEach(platform => {
                if(platform.color == 'Yel' || platform.color == 'Gre' || platform.color == 'Pur' || platform.color == 'Red'){
                    platform.setAlpha(0.5);
                    if(platform.collisionC1 != null){
                    platform.collisionC1.active = false;
                    } 
                    if(platform.collisionC2 != null){
                    platform.collisionC2.active = false;
                    }
                }else{
                    if(platform.color == 'Whi' || platform.color == 'Gra'){
                        platform.setAlpha(1);
                        if(platform.collisionC1 != null){
                            platform.collisionC1.active = true;
                        }
                        if(platform.collisionC2 != null){
                            platform.collisionC2.active = true;
                        }
                    }
                }
            }
            );
            this.buttons.forEach(button => {
                if(button.color == 'Yel' || button.color == 'Gre' || button.color == 'Pur' || button.color == 'Red'){
                    button.setAlpha(0.5);
                }else{
                    if(button.color == 'Whi' || button.color == 'Gra'){
                        button.setAlpha(1);
                    }
                }
            }
            );
        }
        
        this.done = true;
    }

    update() {
        if (useStore.getState().room==null){
            this.scene.stop()
            this.music.stop()
        }
        if (this.done == true) {
            if (this.cursors.space.isDown && this.pressable) {

                socket.emit('changeColor', 3);
                this.pressable = false;
            }
            if (this.cursors.space.isUp) {
                this.pressable = true;
            }

            this.buttons.forEach(button => {

                if (button.name == 'button-1') {
                    console.log(button.associated)
                }

                let isPlayer1Colliding = this.physics.overlap(button, this.character1);
                let isPlayer2Colliding = this.physics.overlap(button, this.character2);
                if (button.associated.length > 0) {
                    let collidingGood = this.handleCollision(isPlayer1Colliding, isPlayer2Colliding, button);

                    if (collidingGood == true) {
                        console.log("entrando con", collidingGood)
                        button.associated.forEach(platform => {
                            if (this.otherButtonPressing(platform, button) == false) {
                                let platformVelocityY = 0;

                                platformVelocityY = -32;
                                console.log(button.associated);
                                if (platform.velocity == "Fast") {
                                    platformVelocityY -= 32;
                                }
                                console.log(platform);
                                console.log(button.associated);

                                console.log(platformVelocityY)
                                if (platform.direction == 'up') {
                                    if (platform.y < platform.posY && platformVelocityY == 0) {
                                        platformVelocityY = 32;
                                        if (platform.velocity == 'Fast') {
                                            platformVelocityY += 32;
                                        }
                                    }
                                    let hasMovedEnough = platform.posX >= platform.body.x + platform.movement || platform.posY >= platform.body.y + platform.movement;
                                    if (hasMovedEnough && platformVelocityY < 0) {
                                        // console.log(platform.movement)
                                        platformVelocityY = 0;
                                    }
                                    platform.body.setVelocityY(platformVelocityY);
                                } else {

                                    if (platform.direction == 'left') {
                                        if (button.name == 'button-1') {
                                            console.log(platformVelocityY)
                                        }
                                        if (platform.x < platform.posX && platformVelocityY == 0) {
                                            platformVelocityY = 32;
                                            if (platform.velocity == 'Fast') {
                                                platformVelocityY += 32;
                                            }
                                        }

                                        let hasMovedEnough = platform.posX >= platform.body.x + platform.movement || platform.posY >= platform.body.y + platform.movement;
                                        if (hasMovedEnough && platformVelocityY < 0) {
                                            platformVelocityY = 0;
                                        }
                                        platform.body.setVelocityX(platformVelocityY);
                                    } else {
                                        if (platform.direction == 'right') {
                                            if (platform.x > platform.posX && platformVelocityY == 0) {
                                                platformVelocityY = 32;
                                                if (platform.velocity == 'Fast') {
                                                    platformVelocityY += 32;
                                                }
                                            }
                                            let hasMovedEnough = platform.posX >= platform.body.x + platform.movement || platform.posY >= platform.body.y + platform.movement;
                                            if (hasMovedEnough && platformVelocityY < 0) {
                                                platformVelocityY = 0;
                                            }
                                            platform.body.setVelocityX(platformVelocityY * -1);
                                        }
                                        else {
                                            if (platform.direction == 'down') {
                                                if (platform.y > platform.posY && platformVelocityY == 0) {
                                                    platformVelocityY = 32;
                                                    if (platform.velocity == 'Fast') {
                                                        platformVelocityY += 32;
                                                    }
                                                }
                                                let hasMovedEnough = platform.posX >= platform.body.x + platform.movement || platform.posY >= platform.body.y + platform.movement;
                                                if (hasMovedEnough && platformVelocityY < 0) {
                                                    platformVelocityY = 0;
                                                }
                                                platform.body.setVelocityY(platformVelocityY * -1);
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    } else {
                        if (button.associated.length > 0 && this.otherButtonPressing(button.associated[0], button) == false) {
                            button.associated.forEach(platform => {
                                let platformVelocityY = 0;
                                if (platform.direction == 'up') {
                                    if (platform.y < platform.posY && platformVelocityY == 0) {
                                        platformVelocityY = 32;
                                        if (platform.velocity == 'Fast') {
                                            platformVelocityY += 32;
                                        }
                                    }
                                    let hasMovedEnough = platform.posX >= platform.body.x + platform.movement || platform.posY >= platform.body.y + platform.movement;
                                    if (hasMovedEnough && platformVelocityY < 0) {
                                        // console.log(platform.movement)
                                        platformVelocityY = 0;
                                    }
                                    platform.body.setVelocityY(platformVelocityY);
                                } else {

                                    if (platform.direction == 'left') {
                                        if (button.name == 'button-1') {
                                            console.log(platformVelocityY)
                                        }
                                        if (platform.x < platform.posX && platformVelocityY == 0) {
                                            platformVelocityY = 32;
                                            if (platform.velocity == 'Fast') {
                                                platformVelocityY += 32;
                                            }
                                        }

                                        let hasMovedEnough = platform.posX >= platform.body.x + platform.movement || platform.posY >= platform.body.y + platform.movement;
                                        if (hasMovedEnough && platformVelocityY < 0) {
                                            platformVelocityY = 0;
                                        }
                                        platform.body.setVelocityX(platformVelocityY);
                                    } else {
                                        if (platform.direction == 'right') {
                                            if (platform.x > platform.posX && platformVelocityY == 0) {
                                                platformVelocityY = 32;
                                                if (platform.velocity == 'Fast') {
                                                    platformVelocityY += 32;
                                                }
                                            }
                                            let hasMovedEnough = platform.posX >= platform.body.x + platform.movement || platform.posY >= platform.body.y + platform.movement;
                                            if (hasMovedEnough && platformVelocityY < 0) {
                                                platformVelocityY = 0;
                                            }
                                            platform.body.setVelocityX(platformVelocityY * -1);
                                        }
                                        else {
                                            if (platform.direction == 'down') {
                                                if (platform.y > platform.posY && platformVelocityY == 0) {
                                                    platformVelocityY = 32;
                                                    if (platform.velocity == 'Fast') {
                                                        platformVelocityY += 32;
                                                    }
                                                }
                                                let hasMovedEnough = platform.posX >= platform.body.x + platform.movement || platform.posY >= platform.body.y + platform.movement;
                                                if (hasMovedEnough && platformVelocityY < 0) {
                                                    platformVelocityY = 0;
                                                }
                                                platform.body.setVelocityY(platformVelocityY * -1);
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                }

            });

            this.flags.forEach(flag => {
                if (flag.player == 1) {
                    flag.setTint(this.character1.tintTopLeft)

                    if (this.physics.overlap(flag, this.character1)) {
                        this.player1OnFlag = true;
                        // flag.anims.play('flag', true);
                    } else {
                        this.player1OnFlag = false;
                        // flag.anims.play('flag', true);
                    }
                } else {
                    flag.setTint(this.character2.tintTopLeft)
                    if (this.physics.overlap(flag, this.character2)) {
                        this.player2OnFlag = true;
                    }
                    else {
                        this.player2OnFlag = false;
                    }
                }
            }
            );
            if (this.player1OnFlag && this.player2OnFlag) {

                this.time.delayedCall(1000, () => {
                    this.music.stop();
                    this.scene.switch('credits')
                });

            };
            if (this.player == 1) {

                this.cameras.main.startFollow(this.character1);
                if (this.cameras.main) {
                    this.cameras.main.setBackgroundColor(this.character1.tintTopLeft);
                }

                if (this.aKey.isDown) {
                    this.character1.flipX = true;

                    this.character1.setVelocityX(-200);

                    this.character1.anims.play('walk', true);
                } else if (this.dKey.isDown) {
                    this.character1.flipX = false;

                    this.character1.setVelocityX(200);

                    this.character1.anims.play('walk', true);

                } else {
                    this.character1.body.setVelocityX(0);
                    this.character1.anims.play('idle', true);
                    this.character2.anims.play('idle', true);
                }
                if (this.wKey.isDown && this.character1.body.onFloor()) {
                    this.character1.setVelocityY(-280);
                }
            } else {
                this.cameras.main.startFollow(this.character2);
                if (this.cameras.main) {

                    this.cameras.main.setBackgroundColor(this.character2.tintTopLeft);
                }
                if (this.aKey.isDown) {
                    this.character2.flipX = true;

                    this.character2.setVelocityX(-200);

                    this.character2.anims.play('walk', true);
                } else if (this.dKey.isDown) {
                    this.character2.flipX = false;

                    this.character2.setVelocityX(200);

                    this.character2.anims.play('walk', true);

                } else {
                    this.character2.body.setVelocityX(0);
                    this.character2.anims.play('idle', true);
                    this.character1.anims.play('idle', true);
                }
                if (this.wKey.isDown && this.character2.body.onFloor()) {
                    this.character2.setVelocityY(-280);

                }
            }

            if (this.player == 1) {
                socket.emit('updatePosition', { x: this.character1.x, y: this.character1.y, direction: this.character1.flipX ? 'left' : 'right' });
            } else {
                socket.emit('updatePosition', { x: this.character2.x, y: this.character2.y, direction: this.character2.flipX ? 'left' : 'right' });
            }
        }
    }
}
