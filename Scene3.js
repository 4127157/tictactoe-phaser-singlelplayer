class Scene3 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    init(data){
        console.log(data.team);
        this.team = data.team;
    }
    preload(){}
    create(){

        const GAME_TIE = 0;
        const X_WON = 1;
        const O_WON = 2;

        this.add.bitmapText(
            20,
            30,
            "defaultFont",
            "You can only tap once, be careful :P",
            21   
        );

        this.board = this.add.image(dWidth/2, dHeight/2, "board")
                        .setScale(0.9)
                        .setOrigin(0.5);

        let turnTxt = this.add.bitmapText(
            dWidth/4,
            80,
            "defaultFont"
        );
        function setTurnText(team){
            if(team === 'circle'){
                turnTxt.setText("TURN : O");
            }

            if(team === 'cross') {
                turnTxt.setText("TURN : X");
            }
        }

        let runTeam = this.team;
        setTurnText(runTeam);

            
        turnTxt.setOrigin(0.5, 0);
        turnTxt.setX(dWidth/2);
        turnTxt.setFontSize(64);
    

        let graphics = this.add.graphics();

        let boardX = this.board.getTopLeft().x,
            boardY = this.board.getTopLeft().y;

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
            inpZone.setData({
                index: k,
                team: 0
            });
            inpZone.setOrigin(0);
            inpZone.on('pointerdown', handleBoxClick);
            zonesArr.push(inpZone);
            inpZone = null;
        }
        graphics.lineStyle(1, 0x00ff00);
        for(let x = 0; x<zonesArr.length; x++){
            graphics.strokeRectShape(zonesArr[x].getBounds());
        }

        let _this = this;
        let drawn = 0;
        let team = runTeam;
        function handleBoxClick() {
            this.setData('team', team);
            if(!this.getData('drawing')){
                //Checks if there's nothing drawn : false
                drawn++;
                //How many items have been drawn
                this.setData('drawing', true);
                //Set that it's drawn so it doesn't get overwritten
                let tImg = _this.add.image(this.x, this.y, team)
                            .setDisplayOrigin(this.displayOriginX - 40, 
                                              this.displayOriginY - 40)
                            .setDisplaySize(this.width - (this.width*0.145), 
                                            this.height - (this.height*0.145));
                //Image to display depending on team currently
                if(team === 'cross'){
                    team = 'circle';
                    turnTxt.setText("TURN : O");
                    //Flip team
                } else {
                    tImg.setDisplayOrigin(this.displayOriginX - 50, 
                                          this.displayOriginY - 50)
                    tImg.setDisplaySize(this.width - (this.width*0.165), 
                                        this.height - (this.height*0.165));
                    //Special display rules for cross because of improper
                    //sizing
                    team = 'cross';
                    turnTxt.setText("TURN : X");
                    //Flip
                }
            }
                
            if(checkWin(zonesArr) === GAME_TIE && drawn === 9){
                gameOver(GAME_TIE);
            }
            if(checkWin(zonesArr) !== GAME_TIE){
                gameOver(checkWin(zonesArr));
            }
        }
        
        function gameOver(RESULT){
            disableMoves(zonesArr);

            if(RESULT === GAME_TIE){
                turnTxt.setText("GAME TIED!");
            }
            if(RESULT === X_WON){
                turnTxt.setText("X WON!");
            }
            if(RESULT === O_WON){
                turnTxt.setText("O WON!");
            }

        }

        let quitTxt = this.add.bitmapText(
            dWidth/2,
            dHeight*0.9,
            "defaultFont",
            "QUIT",
            64
        ).setOrigin(0.5,0)
        .setInteractive();
        
        quitTxt.on('pointerdown', quitGame);
        graphics.lineStyle(1, 0x0000ff);
        graphics.strokeRectShape(quitTxt.getTextBounds().global);
        // console.log(quitTxt.getTextBounds());
        _this = this;
        
        function quitGame(){
            resetVals();
            _this.scene.start("menuScreen");
        }

        function resetVals(){
            runTeam = '';
            drawn = 0;
            zonesArr = [];
            boxObj = {};
        }


        function disableMoves(arr){
            for(let i = 0; i<arr.length; i++){
                arr[i].disableInteractive();
            }
        }

        function checkWin(arr){
            let checkPats = [
               [1,2,3],
               [4,5,6],
               [7,8,9],
               [1,4,7],
               [2,5,8],
               [3,6,9],
               [1,5,9],
               [3,5,7]
           ];
           
            let count = 0;
            let tempTeam = '';
            for(let i=0;i<checkPats.length;i++){
                for(let j=0; j<checkPats[i].length; j++){
                    let v = arr[(checkPats[i][j])-1]
                    .data
                    .values
                    .team;
                    if(v != 0 && j == 0) {
                        tempTeam = v;
                        count++;
                    } else {
                        if(v === tempTeam){
                            count++;
                        }
                    }
                }
                if(count === 3){
                    if(tempTeam === 'cross'){
                        tempTeam = X_WON;
                    }
                    if(tempTeam === 'circle'){
                        tempTeam = O_WON;
                    }
                    return tempTeam;
                } 
                tempTeam = '';
                count = 0;
            }
            return GAME_TIE;
        }


    }
    update(){}

    /*TODO:
        * - make buttons look like buttons (action on press or feedback)
        * - add sound feedback for each button type
        * - add AI to fight against (minmaxxer)
        */
}
