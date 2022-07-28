class Scene2 extends Phaser.Scene {
    constructor(){
        super("menuScreen");
    }

    preload(){

    }

    create(){
        this.add.bitmapText(20,20, "defaultFont", "MENU", 32);
    }

    update(){}
}
