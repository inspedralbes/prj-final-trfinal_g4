import Phaser from 'phaser';

export default class VideoScene extends Phaser.Scene {
    constructor() {
        super('VideoScene');
    }

    preload() {
        this.load.video('video', 'assets/OpenCinematic.mp4');
    }

    create() {
        const video = this.add.video(window.innerWidth / 2, window.innerHeight / 2, 'video');
        video.play(true)
        video.setScale(0.6);

        this.time.delayedCall(66000, () => {
            this.scene.start('preloader');



        });
    }
}