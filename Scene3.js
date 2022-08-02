class Scene3 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    init(data){
        console.log(data);
    }
    preload(){}
    create(){

        this.add.bitmapText(20,20, "defaultFont", "In Scene 3", 32);
        this.add.bitmapText(20,60, "defaultFont", "You can only tap once, be careful :P", 14);
        this.board = this.add.image(dWidth/2, dHeight/2, "board").setScale(0.9).setOrigin(0.5);

        let graphics = this.add.graphics();

        let boardX = this.board.getTopLeft().x,
            boardY = this.board.getTopLeft().y,
            boardW = this.board.displayWidth,
            boardH = this.board.displayHeight;

        let boxObj = {};
        let boxX = boardX, 
            boxY = boardY, 
            boxW = (this.board.getTopRight().x - this.board.getTopLeft().x)/3, 
            boxH = (this.board.getBottomLeft().y - this.board.getTopLeft().y)/3, 
            boxI=1;

        for(let i=0;i<3;i++){
            boxX = boardX;
                boxObj[boxI] = [boxX, boxY,boxW, boxH];
            for(let j=0;j<3;j++){
                if(Object.keys(boxObj).length < 9){
                    boxI++;
                    boxX = boxW*(j+1)+boardX;
                    
                    boxObj[boxI] = [boxX, boxY, boxW, boxH];
                }
            }
            boxY = boxH*(i+1)+boardY; 
        }

        let zonesArr = [];
        for(let k = 1; k<10; k++){
            let inpZone = new InpZone(this, ...boxObj[k]);
            inpZone.setInteractive();
            inpZone.setDataEnabled();
            inpZone.setData({index: k});
            inpZone.setOrigin(0);
            inpZone.on('pointerdown', handleBoxClick);
            zonesArr.push(inpZone);
            inpZone = null;
        }
        graphics.lineStyle(1, 0x00ff00);
        for(let x = 0; x<zonesArr.length; x++){
            graphics.strokeRectShape(zonesArr[x].getBounds());
        }

        function handleBoxClick() {
            console.log(this.getData('index'));
        }


    }
    update(){}

    /*TODO:
        * 
        * - on click for each zone it will be assigned a value based on current
        * team
        * - on click on zone spawn an image in that zone of that team sign
        *   (cross or circle)
        * - calculate win
        * - add quit/restart button
        */
}
