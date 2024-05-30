import Phaser from 'phaser';
import useStore from '../src/store';
import GameHome from './GameHome';
import socket from '../services/sockets';


export default class Credits extends Phaser.Scene {
    cursors;
    music;
    constructor() {
        super('credits');
    }
    preload() {
        this.BASE_URL = 'http://localhost:8000';
        // this.load.webfont('PixelFont', 'https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');
        this.load.audio('creditMusic', 'assets/Rainbow_run.mp3');
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    create() {
        this.music = this.sound.add('creditMusic');

        this.music.play();
        // Create a gradient color
    // const gradientFillStyle = this.add.gradientFillStyle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xff0000, 0xff0000);

        // Draw a rectangle with the gradient fill style
        // Add a title
        this.add.text(this.cameras.main.width / 2, 50, 'Chromatic Bond', { fontSize: '36px', fill: '#ffffff', fontFamily: 'PixelFont' }).setOrigin(0.5, 0);
        // Fet per
        this.add.text(100, 100, 'Fet per:', { fontSize: '24px', fill: '#ffffff', fontFamily: 'PixelFont'});
        this.add.text(100, 150, 'Fabián Roldán', { fontSize: '18px', fill: '#ffffff', fontFamily: 'PixelFont' });
        this.add.text(100, 200, 'Sara Martínez', { fontSize: '18px', fill: '#ffffff', fontFamily: 'PixelFont' });
        this.add.text(100, 300, 'Rubén Lora', { fontSize: '18px', fill: '#ffffff', fontFamily: 'PixelFont' });
        this.add.text(100, 350, 'Betsy Julie Villegas', { fontSize: '18px', fill: '#ffffff', fontFamily: 'PixelFont' });
        this.add.text(100, 400, 'Eric Gómez Vilà', { fontSize: '18px', fill: '#ffffff', fontFamily: 'PixelFont' });
        // Recursos
        this.add.text(400, 100, 'Recursos:', { fontSize: '24px', fill: '#ffffff', fontFamily: 'PixelFont' });
        this.add.text(400, 150, 'Tota la música feta per Suno AI (https://suno.com/)', { fontSize: '18px', fill: '#ffffff', fontFamily: 'PixelFont'});
        this.add.text(400, 200, 'Tots els Sprites fets per Pixel Frog (https://pixelfrog-assets.itch.io/)', { fontSize: '18px', fill: '#ffffff', fontFamily: 'PixelFont' });

        // Special thanks
        this.add.text(700, 100, 'Agraiments:', { fontSize: '24px', fill: '#ffffff', fontFamily: 'PixelFont' });
        this.add.text(700, 150, 'Danna Rodríguez', { fontSize: '18px', fill: '#ffffff', fontFamily: 'PixelFont' });
        this.add.text(700, 200, 'Judith Pascal', { fontSize: '18px', fill: '#ffffff', fontFamily: 'PixelFont' });

        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 3 * 2, 'Gràcies per jugar, prem espai per tornar al menú', { fontSize: '24px', fill: '#ffffff', fontFamily: 'PixelFont' }).setOrigin(0.5);
    }
    update() {
        if (this.cursors.space.isDown) {
            socket.emit('endGame');
            
            useStore.setState({ room: null });
            this.music.stop();
        }
    }
}
