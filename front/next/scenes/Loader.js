import Phaser from 'phaser';
import useStore from '../src/store';
import GameHome from './GameHome';


export default class LoadingScene extends Phaser.Scene {





    create() {

        if (this.scene.get('gamehome') != null) {
            this.time.delayedCall(1000, this.scene.remove, ['gamehome'], this.scene);
        }

        this.time.delayedCall(2000, this.scene.add, ['gamehome', GameHome], this.scene);
        this.time.delayedCall(3000, this.scene.start, ['gamehome'], this.scene);
        this.time.delayedCall(4000, () => {
            this.scene.remove();
        });



    }
}
