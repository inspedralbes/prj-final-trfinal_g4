import Phaser from 'phaser'

// import {  } from './scenes/Level1'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'phaser-container',
	backgroundColor: '#282c34',
	scale: {
		mode: Phaser.Scale.ScaleModes.RESIZE,
		width: window.innerWidth,
		height: window.innerHeight,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true,
		},
	},
	// scene: [Bootstrap, Game],
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Phaser.Game(config)