class Scene2 extends Phaser.Scene {
    constructor(){
        super("menuScreen");
    }

    preload(){

    }

    create(){
        this.add.bitmapText(20,20, "defaultFont", "CHOOSE TEAM", 32);
        this.cross = this.add.image(config.scale.width/2, config.scale.height/2, 'cross');
        console.log(config.scale.height);
        console.log(config.scale.width);
    }

    update(){}
}
