var config = {
    type:Phaser.AUTO,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width:495,
        height: 880
    },
    scene: [Scene1],
    pixelArt: true
};

var game = new Phaser.Game(config);
