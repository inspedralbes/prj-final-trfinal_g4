import React, { Component } from 'react';
import Phaser from 'phaser';
import Game from './scenes/Game';

class configGame extends Component {

    componentDidMount(){
        const config = {
            type: Phaser.AUTO,
            width: window.innerWidth - 15,
            height: window.innerHeight - 15,
            parent: 'phaser-game',
            backgroundColor: '#ffffff',
            physics: {
                default: 'matter',
                matter: {
                    debug: {
                        showAxes: false,
                        showCollisions: true,
                        showVelocity: true,
                    }
                }
            },
            scene: [Game]
        };
        new Phaser.Game(config);
    }
    shouldComponentUpdate() {
        return false;
      }
      render() {
        return <div id="game" />
      }
  
}

export default configGame;


       

