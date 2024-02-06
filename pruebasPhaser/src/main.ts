import Phaser from 'phaser'

import Game from './scenes/Game'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
		default: 'matter',
		matter: {
			debug: false
		}
	},
	scene: [Game]
}

export default new Phaser.Game(config)
