class Scene1 extends Phaser.Scene {
    constructor(){
        super("menuScreen");
    }


    preload(){
        this.load.image('cross', './assets/Sprite-0001_512.png');
        this.load.image('circle', './assets/Sprite-0002_512.png');
        this.load.image('board', './assets/board_512.png');
    }

    create(){
    }

    update(){
    }

}
