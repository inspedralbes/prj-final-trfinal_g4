import Phaser from 'phaser'

// import  Game  from './scenes/Game'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'phaser-game',
	width: window.innerWidth - 15,
	height: window.innerHeight - 15,
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
	scene: [Game],
}

export default new Phaser.Game(config)
