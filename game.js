var gameConfig = {
    type:Phaser.AUTO,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width:495,
        height: 880
    },
    backgroundColor: 'rgba(255,255,255,0)',
    transparent:false,
    scene: [Scene1, Scene2, Scene3],
    pixelArt: true
};

var game = new Phaser.Game(gameConfig);
