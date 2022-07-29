class Scene3 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    preload(){}
    create(){

        this.add.bitmapText(20,20, "defaultFont", "In Scene 3", 32);
        this.board = this.add.image(dWidth/2, dHeight/2, "board").setScale(0.5);
    }
    update(){}
}
