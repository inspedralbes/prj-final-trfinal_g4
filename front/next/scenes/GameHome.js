import Phaser from 'phaser';
import { set } from 'zod';
import useStore from '../src/store';
import socket from '../services/sockets';
import { useEffect } from 'react';

export default class GameHome extends Phaser.Scene {
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
    colors = [{ color: 'white', hex: 0xffffff }, { color: 'black', hex: 0x303030 }, { color: 'gray', hex: 0x969696 }, { color: 'red', hex: 0xf1090d }, { color: 'green', hex: 0x29b127 }, { color: 'blue', hex: 0x2b80ff }, { color: 'orange', hex: 0xe26b09 }, { color: 'yellow', hex: 0xdada00 }, { color: 'purple', hex: 0x91209e }]
    disableBody;
    enableBody;

    constructor() {
        super('gamehome');
    }
    platforms = [];
    doors = [];

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.activePointer = this.input.activePointer;
    }

    create() {

        const map = this.make.tilemap({ key: 'mapa' });
        const tileset = map.addTilesetImage('tilesetWhite', 'tileset');
        let gray = null;
        let white = null;
        let black = null;
        let red = null;
        let blue = null;
        let purple = null;
        let orange = null;
        let yellow = null;
        let green = null;
        if (map.layers.find(layer => layer.name === 'gray')) {
            gray = map.createLayer('gray', tileset);

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
        console.log("chinga", map.layers);
        if (map.layers.find(layer => layer.name === 'white')) {
            console.log('white')
            white = map.createLayer('white', tileset);

            for (let y = 0; y < white.height; y++) {
                for (let x = 0; x < white.width; x++) {
                    const tileW = white.getTileAt(x, y);

                    if (tileW && tileW.index > 0) {
                        // console.log(tileW);
                        tileW.tint = this.colors.find(color => color.color == 'white').hex;
                    }
                }
            }
            white.setCollisionByProperty({ semicollides: true });
            white.setCollisionByProperty({ collides: true });
            white.immovable = true;
        }
        if (map.layers.find(layer => layer.name === 'black')) {
            black = map.createLayer('black', tileset);

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
        } if (map.layers.find(layer => layer.name === 'red')) {
            red = map.createLayer('red', tileset);
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
        } if (map.layers.find(layer => layer.name === 'blue')) {
            blue = map.createLayer('blue', tileset);
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
        } if (map.layers.find(layer => layer.name === 'purple')) {
            purple = map.createLayer('purple', tileset);
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
        } if (map.layers.find(layer => layer.name === 'green')) {
            green = map.createLayer('green', tileset);
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
        } if (map.layers.find(layer => layer.name === 'orange')) {
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
        } if (map.layers.find(layer => layer.name === 'yellow')) {
            yellow = map.createLayer('yellow', tileset);
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



        const objectsLayer = map.getObjectLayer('Objects')
        objectsLayer.objects.forEach(objData => {
            let { x = 0, y = 0, name, width = 0, height = 0, xFlag = 0, yFlag = 0 } = objData
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
            } else if (name.startsWith('spawn')) {

            }

            switch (name) {
                case 'spawn-1':
                    {
                        this.character1 = this.physics.add.sprite(x, y, 'character1-idle');
                        console.log(this.character1);
                        const w = this.character1.width;
                        const h = this.character1.height;

                        const spawn1X = x;
                        const spawn1Y = y;

                        this.character1.body.tint = 0x303030;
                        this.physics.add.existing(this.character1);

                        this.character1.setPosition(x, y);

                        this.anims.create({
                            key: 'death',
                            frames: this.anims.generateFrameNames('death', { start: 6, end: 0, prefix: 'tile00', suffix: '.png' }),
                            frameRate: 10,
                            repeat: 0,
                        });

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
                        if (white) {
                            this.physics.add.collider(this.character1, white);
                        }
                        if (red) {
                            this.physics.add.collider(this.character1, red);
                        }


                        // this.character1.body.setCollisionByProperty({ collides: true });


                        this.character1.setPushable(false);
                        this.cameras.main.startFollow(this.character1);
                        this.cameras.main.setZoom(2);
                        this.character1.setPushable(false);

                        this.spawns.push({ spawn1X, spawn1Y });
                        this.character1.body.setSize(w * 0.50, h * 0.90);
                        console.log("1", this.spawns);
                        break;

                    }
                case 'spawn-2':
                    {

                        this.character2 = this.physics.add.sprite(x, y, 'character1-idle').setTint(0x303030);
                        console.log(this.character2);
                        const w = this.character2.width;
                        const h = this.character2.height;
                        this.character2.body.tint = 0x303030;
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

                        this.physics.add.collider(this.character2, black);




                        // this.character1.body.setCollisionByProperty({ collides: true });

                        this.character2.setPushable(false);
                        this.cameras.main.setZoom(2);

                        this.spawns.push({ spawn2X, spawn2Y });
                        console.log("1, 2", this.spawns);
                        break;
                    };

                case 'endGame':
                    {

                        this.flag_endGame = this.physics.add.sprite(x, y, 'flag-movement');
                        const w = this.flag_endGame.width;
                        const h = this.flag_endGame.height;

                        this.physics.add.existing(this.flag_endGame);

                        this.flag_endGame.body.setSize(w * 0.45, h - 3);

                        this.flag_endGame.setPosition(x, y);

                        this.anims.create({
                            key: 'flagMove',
                            frames: this.anims.generateFrameNames('flag-movement', { start: 0, end: 9, prefix: 'flag', suffix: '.png' }),
                            frameRate: 10,
                            repeat: 5
                        })

                        this.physics.add.overlap(this.flag_endGame, this.character1, (flag, character1) => {
                            if (!flag.anims.isPlaying) {
                                flag.anims.play('flagMove', true).on('animationcomplete', () => {
                                    flag.anims.stop('flagMove');

                                    const message = this.add.text(300, 100, '¡Tutorial Completat!', { fontSize: '32px', fill: '#fff' }).setOrigin(0);
                                    const background = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x000000, 0.5).setOrigin(0);

                                    message.setDepth(1);
                                    background.setDepth(0);

                                });

                            }
                        })

                        this.physics.add.collider(this.flag_endGame, gray);

                        break;
                    }
                case 'button':
                    {
                        console.log('button');
                        let button = this.physics.add.sprite(x + (width * 0.5), y + (height * 0.5), 'character1').setTint(0x303030);
                        const w = button.width;
                        const h = button.height;
                        this.physics.add.existing(button);
                        button.body.setSize(w * 0.50, h * 0.90);
                        switch (true) {
                            case ogName.includes('Whi'):
                                button.setTint(this.colors.find(color => color.color == 'white').hex);
                                break;
                            case ogName.includes('Bla'):
                                button.setTint(this.colors.find(color => color.color == 'black').hex);
                                break;
                            case ogName.includes('Gra'):
                                button.setTint(this.colors.find(color => color.color == 'gray').hex);
                                break;
                            case ogName.includes('Red'):
                                button.setTint(this.colors.find(color => color.color == 'red').hex);
                                break;
                            case ogName.includes('Blu'):
                                button.setTint(this.colors.find(color => color.color == 'blue').hex);
                                break;
                            case ogName.includes('Pur'):
                                button.setTint(this.colors.find(color => color.color == 'purple').hex);
                                break;
                            case ogName.includes('Gre'):
                                button.setTint(this.colors.find(color => color.color == 'green').hex);
                                break;
                            case ogName.includes('Ora'):
                                button.setTint(this.colors.find(color => color.color == 'orange').hex);
                                break;
                            case ogName.includes('Yel'):
                                button.setTint(this.colors.find(color => color.color == 'yellow').hex);
                                break;
                        }
                        console.log(gray);
                        this.physics.add.collider(button, gray);
                        this.physics.add.collider(button, white);
                        this.physics.add.collider(button, black);
                        this.physics.add.collider(button, red);
                        this.physics.add.collider(button, blue);
                        this.physics.add.collider(button, purple);
                        this.physics.add.collider(button, green);
                        this.physics.add.collider(button, orange);
                        this.physics.add.collider(button, yellow);
                        button.setPosition(x, y);
                        button.setInteractive();
                        button.name = ogName;
                        this.buttons.push(button);
                        break;
                    }
                case 'platform': {
                    console.log('platform');
                    let platform = this.physics.add.sprite(x + (width / 2), y + (height / 2), 'platform');
                    platform.setOrigin(0.5, 0.5);
                    if (width < height) {

                        console.log(platform.scaleX, platform.scaleY);
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

                    switch (true) {
                        case ogName.includes('Whi'):
                            platform.setTint(this.colors.find(color => color.color == 'white').hex);
                            break;
                        case ogName.includes('Bla'):
                            platform.setTint(this.colors.find(color => color.color == 'black').hex);
                            break;
                        case ogName.includes('Gra'):
                            platform.setTint(this.colors.find(color => color.color == 'gray').hex);
                            break;
                        case ogName.includes('Red'):
                            platform.setTint(this.colors.find(color => color.color == 'red').hex);
                            break;
                        case ogName.includes('Blu'):
                            platform.setTint(this.colors.find(color => color.color == 'blue').hex);
                            break;
                        case ogName.includes('Pur'):
                            platform.setTint(this.colors.find(color => color.color == 'purple').hex);
                            break;
                        case ogName.includes('Gre'):
                            platform.setTint(this.colors.find(color => color.color == 'green').hex);
                            break;
                        case ogName.includes('Ora'):
                            platform.setTint(this.colors.find(color => color.color == 'orange').hex);
                            break;
                        case ogName.includes('Yel'):
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
        window.platforms = this.platforms;
        console.log(white);
        if (white) {
            this.whiteView = white;
        }
        if (black) {
            this.blackView = black;
        }
        if (gray) {
            this.grayView = gray;
        }
        if (red) {
            this.redView = red;
        }
        if (blue) {
            this.blueView = blue;
        }
        if (purple) {
            this.purpleView = purple;
        }
        if (orange) {
            this.orangeView = orange;
        }
        if (yellow) {
            this.yellowView = yellow;
        }
        if (green) {
            this.greenView = green;
        }
        this.buttons.forEach(button => {
            button.associated = [];
            this.platforms.forEach(platform => {
                if (platform.name.split('-')[1] == button.name.split('-')[1]) {
                    console.log(platform.name.split('-')[1]);
                    button.associated.push(platform);
                }
            });

        });
        this.platforms.forEach(platform => {
            if (platform.name.includes('W')) {
                platform.setTint(0xffffff);
                this.physics.add.collider(this.character1, platform);

            } else if (platform.name.includes('Bla')) {
                platform.setTint(0x303030);
                this.physics.add.collider(this.character2, platform);

            } else {
                platform.setTint(0x969696);

                this.physics.add.collider(this.character1, platform);
                this.physics.add.collider(this.character2, platform);
            }
        });
        this.player = selectPlayer();
        this.handleCollision = function (player1, player2, button) {
            let toReturn = false;
            if (player1) {
                console.log(this.character1.tintTopLeft);
                console.log(this.colors.find(color => color.color == 'white').hex);
                let characterColor = this.colors.find(color => color.hex == this.character1.tintTopLeft).color;
                switch (characterColor) {
                    case 'white':
                        if (button.name.includes('Whi') || button.name.includes('Gra')) {
                            toReturn = true;
                        }
                        break;
                    case 'red':
                        if (button.name.includes('Red') || button.name.includes('Pur')) {
                            toReturn = true;
                        }
                        break;
                    case 'green':
                        if (button.name.includes('Gre') || button.name.includes('Yel')) {
                            toReturn = true;
                        }
                        break;
                }
            } else if (player2) {
                console.log(this.colors.find(color => color.color == 'black').hex);
                console.log(this.character2.tintTopLeft);
                let characterColor = this.colors.find(color => color.hex == this.character2.tintTopLeft).color;
                switch (characterColor) {
                    case 'black':
                        if (button.name.includes('Bla') || button.name.includes('Gra')) {
                            toReturn = true;
                        }
                        break;
                    case 'blue':
                        if (button.name.includes('Blu') || button.name.includes('ur')) {
                            toReturn = true;
                        }
                        break;
                    case 'orange':
                        if (button.name.includes('Ora') || button.name.includes('Yel')) {
                            toReturn = true;
                        }
                        break;
                }
            }
            return toReturn;
        }
        this.disableBody = function (view) {

        }
        this.enableBody = function (view) {
            view.setCollisionByProperty({ collides: true });
            view.setCollisionByProperty({ semicollides: true });
            this.physics.add.collider(this.character1, view);
        }
        function selectPlayer() {
            console.log(useStore.getState().playerData.id, "=", useStore.getState().gameData.players[0].id);
            if (useStore.getState().playerData.id == useStore.getState().gameData.players[0].id) {
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
        this.physics.add.collider(this.character1, gray);
        this.physics.add.collider(gray, this.character1);
        this.physics.add.collider(this.character2, gray);
        this.physics.add.collider(gray, this.character2);
        this.physics.add.collider(this.character1, this.character2);
        this.physics.add.collider(this.character2, this.character1);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        window.character1 = this.character1;
        this.death.forEach(death => {
            this.physics.add.overlap(death, this.character1, (death, character1) => {
                this.animationPlaying = true;
                this.character1.anims.play('death', true);
                this.character2.anims.play('death', true);
                setTimeout(() => {
                    this.character1.setPosition(this.spawns[0].spawn1X, this.spawns[0].spawn1Y);
                    this.character2.setPosition(this.spawns[1].spawn2X, this.spawns[1].spawn2Y);
                    this.animationPlaying = false;
                }, 1000);
            })
            this.physics.add.overlap(death, this.character2, (death, character2) => {
                this.animationPlaying = true;
                this.character1.anims.play('death', true);
                this.character2.anims.play('death', true);
                setTimeout(() => {
                    this.character1.setPosition(this.spawns[0].spawn1X, this.spawns[0].spawn1Y);
                    this.character2.setPosition(this.spawns[1].spawn2X, this.spawns[1].spawn2Y);
                    this.animationPlaying = false;
                }, 1000);
            })
        });

        console.log(this.player);
        setTimeout(() => {
            console.log(useStore.getState().gameData.playersData);
            this.updateCharacterPosition();
        }, 1000);
        this.redView.setAlpha(0);

        if (this.player == 1) {
            this.whiteView.setAlpha(1);
            this.blackView.setAlpha(0);
            this.grayView.setAlpha(1);
            this.cameras.main.setBackgroundColor("#ffffff");
        } else {
            this.whiteView.setAlpha(0);
            this.blackView.setAlpha(1);
            this.grayView.setAlpha(1);
            this.cameras.main.setBackgroundColor("#303030");
        }
       
    }

    update() {
        if (this.cursors.space.keyup) {
            socket.emit('changeColor');
        }
        
        this.buttons.forEach(button => {
            const isPlayer1Colliding = this.physics.overlap(button, this.character1);
            const isPlayer2Colliding = this.physics.overlap(button, this.character2);

            if (button.associated.length > 0) {

                button.associated.forEach(platform => {
                    let platformVelocityY = 0;
                    if (this.handleCollision(isPlayer1Colliding, isPlayer2Colliding, button)) {
                        platformVelocityY = -32;
                        console.log('colliding');
                        if (platform.name.includes('Fast')) {
                            platformVelocityY -= 32;
                        }
                    }
                    const hasMovedEnough = Math.abs(platform.body.x) >= platform.body.x + platform.movement || Math.abs(platform.body.y) >= platform.body.y + platform.movement;
                    if (hasMovedEnough && platformVelocityY < 0) {
                        platformVelocityY = 0;
                    }
                    if (platform.name.includes('up')) {
                        if (platform.y < platform.posY && platformVelocityY == 0) {
                            platformVelocityY = 32;
                            if (platform.name.includes('Fast')) {
                                platformVelocityY += 32;
                            }
                        }
                        let hasMovedEnough = platform.posX >= platform.body.x + platform.movement || platform.posY >= platform.body.y + platform.movement;
                        if (hasMovedEnough && platformVelocityY < 0) {
                            console.log(platform.movement)
                            platformVelocityY = 0;
                        }
                        platform.body.setVelocityY(platformVelocityY);
                    } else {

                        if (platform.name.includes('left')) {
                            if (platform.x < platform.posX && platformVelocityY == 0) {
                                platformVelocityY = 32;
                                if (platform.name.includes('Fast')) {
                                    platformVelocityY += 32;
                                }
                            }

                            let hasMovedEnough = platform.posX >= platform.body.x + platform.movement || platform.posY >= platform.body.y + platform.movement;
                            if (hasMovedEnough && platformVelocityY < 0) {
                                platformVelocityY = 0;
                            }
                            platform.body.setVelocityX(platformVelocityY);
                        } else {
                            if (platform.name.includes('right')) {
                                if (platform.x > platform.posX && platformVelocityY == 0) {
                                    platformVelocityY = 32;
                                    if (platform.name.includes('Fast')) {
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
                                if (platform.name.includes('down')) {
                                    if (platform.y > platform.posY && platformVelocityY == 0) {
                                        platformVelocityY = 32;
                                        if (platform.name.includes('Fast')) {
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
        });


        if (this.player == 1) {

            this.cameras.main.startFollow(this.character1);
            if (this.cursors.left.isDown) {
                this.character1.flipX = true;

                this.character1.setVelocityX(-200);

                this.character1.anims.play('walk', true);
            } else if (this.cursors.right.isDown) {
                this.character1.flipX = false;

                this.character1.setVelocityX(200);

                this.character1.anims.play('walk', true);

            } else {
                this.character1.body.setVelocityX(0);
                this.character1.anims.play('idle', true);
                this.character2.anims.play('idle', true);
            }
            if (this.cursors.up.isDown && this.character1.body.onFloor()) {
                console.log('jump');
                this.character1.setVelocityY(-280);
            }
        } else {
            this.cameras.main.startFollow(this.character2);
            if (this.cursors.left.isDown) {
                this.character2.flipX = true;

                this.character2.setVelocityX(-200);

                this.character2.anims.play('walk', true);
            } else if (this.cursors.right.isDown) {
                this.character2.flipX = false;

                this.character2.setVelocityX(200);

                this.character2.anims.play('walk', true);

            } else {
                this.character2.body.setVelocityX(0);
                this.character2.anims.play('idle', true);
                this.character1.anims.play('idle', true);
            }
            if (this.cursors.up.isDown && this.character2.body.onFloor()) {
                console.log('jump');
                this.character2.setVelocityY(-280);

            }
        }
        socket.on('updatePositionFront', (data) => {
            if (this.player == 1) {
                this.character2.x = data[1].x;
                this.character2.y = data[1].y;
                this.character2.flipX = data[1].direction;
            }
            else {
                this.character1.x = data[0].x;
                this.character1.y = data[0].y;
                this.character1.flipX = data[0].direction;
            }
        });
        socket.on('changeColorFront', (data) => {
            console.log("Si");
            if (data.id == socket.id) {
                if (this.player == 1) {
                    this.character1.setTint(this.colors.find(color => color.color == data.color).hex);
                    if (data.color == 'white') {
                        this.whiteView.setAlpha(1);
                        if (this.whiteView.body) {
                            this.whiteView.body.setEnable(true);
                        }
                        this.blackView.setAlpha(0);
                        this.grayView.setAlpha(1);
                        if (this.grayView.body) {
                            this.grayView.body.setEnable(true);
                        }
                        if (this.redView != null) {
                            this.redView.setAlpha(0);
                            if (this.redView.body) {
                                this.redView.body.setEnable(false);
                            }
                            // this.blueView.setAlpha(0);
                            // this.purpleView.setAlpha(0);
                        }
                        if (this.greenView != null) {
                            this.greenView.setAlpha(0);
                            this.orangeView.setAlpha(0);
                            this.yellowView.setAlpha(0);
                        }
                    } else {
                        if (data.color == 'red') {
                            this.redView.setAlpha(1);
                            if (this.redView.body) {
                                this.redView.body.setEnable(true);
                            }
                            // this.blueView.setAlpha(0);
                            // this.purpleView.setAlpha(1);
                            if (this.whiteView) {
                                this.whiteView.setAlpha(0);
                                if (this.whiteView.body) {
                                    this.whiteView.body.setEnable(true);
                                }
                                this.blackView.setAlpha(0);
                                this.grayView.setAlpha(0);
                                if (this.grayView.body) {
                                    this.grayView.body.setEnable(true);
                                }
                            }
                            if (this.greenView) {
                                this.greenView.setAlpha(0);
                                this.orangeView.setAlpha(0);
                                this.yellowView.setAlpha(0);
                            }

                        } else if (data.color == "green") {
                            this.greenView.setAlpha(1);
                            this.orangeView.setAlpha(0);
                            this.yellowView.setAlpha(1);
                            if (this.whiteView != null) {
                                this.whiteView.setAlpha(0);
                                this.blackView.setAlpha(0);
                                this.grayView.setAlpha(0);
                            }
                            if (this.redView != null) {
                                this.redView.setAlpha(0);
                                this.blueView.setAlpha(0);
                                this.purpleView.setAlpha(0);
                            }
                        }
                    }
                } else {
                    if (this.colors.find(color => color.color == data.color).color == 'black') {
                        this.whiteView.setAlpha(0);
                        this.blackView.setAlpha(1);
                        this.grayView.setAlpha(1);
                        if (this.redView != null) {
                            this.redView.setAlpha(0);
                            this.redView.setActive(false);
                            // this.blueView.setAlpha(0);
                            // this.purpleView.setAlpha(0);
                        }
                        if (this.greenView != null) {
                            this.greenView.setAlpha(0);
                            this.orangeView.setAlpha(0);
                            this.yellowView.setAlpha(0);
                        }
                    } else if (this.data.color == 'blue') {
                        this.blueView.setAlpha(1);
                        this.redView.setAlpha(0);
                        this.purpleView.setAlpha(1);
                        if (this.whiteView != null) {
                            this.whiteView.setAlpha(0);
                            this.blackView.setAlpha(0);
                            this.grayView.setAlpha(0);
                        }
                        if (this.greenView != null) {
                            this.greenView.setAlpha(0);
                            this.orangeView.setAlpha(0);
                            this.yellowView.setAlpha(0);
                        }
                    } else if (this.data.color == 'orange') {
                        this.orangeView.setAlpha(1);
                        this.greenView.setAlpha(0);
                        this.yellowView.setAlpha(1);
                        if (this.whiteView != null) {
                            this.whiteView.setAlpha(0);
                            this.blackView.setAlpha(0);
                            this.grayView.setAlpha(0);
                        }
                        if (this.redView != null) {
                            this.redView.setAlpha(0);
                            this.blueView.setAlpha(0);
                            this.purpleView.setAlpha(0);
                        }
                    }
                }
                this.cameras.main.setBackgroundColor(this.colors.find(color => color.color == data.color).hex);
            } else {
                if (this.player == 1) {
                    this.character2.setTint(this.colors.find(color => color.color == data.color).hex);
                } else {
                    this.character1.setTint(this.colors.find(color => color.color == data.color).hex);
                }
            }
        });
        if (this.player == 1) {
            socket.emit('updatePosition', { x: this.character1.x, y: this.character1.y, direction: this.character1.flipX ? 'left' : 'right' });
        } else {
            socket.emit('updatePosition', { x: this.character2.x, y: this.character2.y, direction: this.character2.flipX ? 'left' : 'right' });
        }
    }

}
