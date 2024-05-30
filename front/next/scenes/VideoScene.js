import Phaser from 'phaser';
import Preloader from './Preloader';
export default class VideoScene extends Phaser.Scene {
    constructor() {
        super('VideoScene');
    }

    preload() {
        this.load.video('video', 'assets/OpenCinematic.mp4');
    }

    create() {
        const video = this.add.video(window.innerWidth / 2, window.innerHeight / 2, 'video', true);
        video.play(true)
        video.setScale(0.6);
        // video.on('complete', () => {


        //     this.input.once('pointerdown', () => {
        //         this.scene.add('preloader', Preloader, true);
        //         this.scene.start('preloader');

        //     });
        // });
        this.time.delayedCall(66000, () => {
            this.scene.add('preloader', Preloader, true);
            this.scene.start('preloader');
            


        });
    }
}