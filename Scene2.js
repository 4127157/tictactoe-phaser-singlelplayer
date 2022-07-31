class Scene2 extends Phaser.Scene {
    constructor(){
        super("menuScreen");
    
    }


    preload(){

    }

    create(){
        this.add.bitmapText(20,20, "defaultFont", "Who goes first?", 24);
        
        let scaleF = 0.125;
        let btnCross = this.add.rectangle(
            dWidth/4.5, 
            dHeight/2, 
            512*scaleF,
            512*scaleF,
            0xdddddd
        ); //512 for the size of the cross, need better way to source size

        let btnCircle = this.add.rectangle(
            dWidth/1.25, 
            dHeight/2, 
            512*scaleF,
            512*scaleF,
            0xdddddd
        );

        this.cross = this.add.image(btnCross.x, btnCross.y, 'cross').setScale(scaleF);
        this.circle = this.add.image(btnCircle.x, btnCircle.y, 'circle').setScale(scaleF);
        
        this.graphics = this.add.graphics();
        this.boundsCross = this.cross.getBounds();
        this.boundsCircle = this.circle.getBounds();  
        this.graphics.lineStyle(1, 0x000000);
        this.graphics.strokeRectShape(this.boundsCross);
        this.graphics.strokeRectShape(this.boundsCircle);
        this.circle.setInteractive();
        this.cross.setInteractive();
        let _this = this;
        this.cross.name = 'cross';
        this.circle.name = 'circle';
        this.cross.on('pointerdown', clickTeamBtn);
        this.circle.on('pointerdown', clickTeamBtn);

        function clickTeamBtn(){
            console.log(this.name);
            this.setTintFill(0xff0000);
            _this.scene.start("playGame", { team: this.name });
            _this = null;
        }

    }

    update(){}
}
