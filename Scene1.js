class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootScreen");
    }


    preload(){
        this.load.image('cross', './assets/Sprite-0001_512.png');
        this.load.image('circle', './assets/Sprite-0002_512.png');
        this.load.image('board', './assets/board_512.png');

        this.load.bitmapFont("defaultFont", './fonts/upheaval.png', './fonts/upheaval.xml');
    }

    create(){
        this.add.text(20,20, "Loading game...");
        console.log("game loaded successfully");
        this.scene.start("menuScreen");
    }

    update(){
    }

}
