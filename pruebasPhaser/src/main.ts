import Phaser from 'phaser'

import Game from './scenes/Game'
// import Game2 from './scenes/Game2'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: window.innerWidth - 15,
	height: window.innerHeight - 15,
	physics: {
		default: 'matter',
		matter: {
			debug: true
		}
	},
	scene: [Game]
}

export default new Phaser.Game(config)
