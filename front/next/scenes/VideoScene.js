import Phaser from 'phaser';
import Preloader from './Preloader';
/**
 * Represents a video scene in the game.
 * @class
 * @extends Phaser.Scene
 */
export default class VideoScene extends Phaser.Scene {
    constructor() {
        super('VideoScene');
    }

    /**
     * Preloads the video asset.
     */
    preload() {
        this.load.video('video', 'assets/OpenCinematic.mp4');
    }

    /**
     * Creates the video scene.
     */
    create() {
        const video = this.add.video(window.innerWidth / 2, window.innerHeight / 2, 'video', true);
        video.play(true)
        video.setScale(0.6);
        this.time.delayedCall(66000, () => {
            this.scene.start('preloader');
        });
    }
}