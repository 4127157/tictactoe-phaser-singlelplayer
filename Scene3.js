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

        let boardBounds = this.board.getBounds();
        graphics.lineStyle(1, 0x000000);
        // graphics.strokeRectShape(boardBounds);
        let boardX = this.board.getTopLeft().x,
            boardY = this.board.getTopLeft().y,
            boardW = this.board.displayWidth,
            boardH = this.board.displayHeight;

        graphics.strokeRect(boardX, boardY, boardW, boardH);

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
        let _this = this;
        graphics.lineStyle(1, 0xff0000);
        for(let k = 1; k<10; k++){
            graphics.strokeRect(boxObj[k][0], boxObj[k][1], boxObj[k][2], boxObj[k][3]);
            let inpZone = new InpZone(this, boxObj[k][0], boxObj[k][1], boxObj[k][2], boxObj[k][3]);
            inpZone.setInteractive();
            inpZone.setDataEnabled();
            inpZone.setData({index: k});
            inpZone.setName(k+'');
            inpZone.on('pointerdown', handleBoxClick);
            zonesArr.push(inpZone);
            inpZone = null;
        }
        console.log(zonesArr);
        graphics.lineStyle(1, 0x00ff00);
        for(let x = 0; x<zonesArr.length; x++){
            graphics.strokeRectShape(zonesArr[x].getBounds());
        }

        function handleBoxClick(){

            console.log(this.getData('index'));
            console.log(this.name);
        }


    }
    update(){}

    /*TODO:
        * - Add input zones
        * - on click for each zone it will be assigned a value based on current
        * team
        * - on click on zone spawn an image in that zone of that team sign
        *   (cross or circle)
        * - calculate win
        * - add quit/restart button
        */
}
