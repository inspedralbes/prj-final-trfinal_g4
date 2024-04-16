import React, { Component } from 'react';
import Phaser from 'phaser';
import Game from '../scenes/Game.js';

class ConnectionPhaser extends Component {

    componentDidMount(){
        const config = {
            type: Phaser.AUTO,
            width: window.innerWidth - 15,
            height: window.innerHeight - 15,
            parent: 'phaser-game',
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
        return <div id="phaser-game" />
      }
  
}

export default ConnectionPhaser;


       

