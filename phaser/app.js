

window.onload = function () {
    
    var config = {
        backgroundColor: '0xff0000',
        width: window.innerWidth,
        height: window.innerHeight,
        scene: [scene1, scene2],
        physics:{
            default: "arcade",
            arcade:{
                debug: false
            }
        }
    }

    var game = new Phaser.Game(config);
}