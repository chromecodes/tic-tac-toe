
const GameBoard = (() => {
    const board = ["","","","","","","","",""];

    const boardRset = (tiles) => {
        for( i=0; i<9; i++){
            board[i] = "";
            tiles[i].textContent = "";
        };
    };

    const assignValue = (index, value)=> {
        if(  value == "X" && board[index] !== "X" && board[index] !== "O"){
            board[index] = value;
            player.turns.turnIncr();
            player.turns.ttlTurn();
            displayCtrl.displayVlue(index, value);
            displayCtrl.displaySts();
            checkStat();
        };
        if( value == "O" && board[index] !== "X" && board[index] !== "O"){
            board[index] = value;
            player.turns.turnDecr();
            player.turns.ttlTurn();
            displayCtrl.displayVlue(index, value);
            displayCtrl.displaySts();
            checkStat();
        };
    };

    const displayCtrl = (()=>{
        const displayVlue = (index, value) => {
            const display1 = document.querySelector(`[data-index="${index}"]`);
            display1.textContent = value;
        };

        const display2 = document.getElementById ("status");

        const displaySts = () =>{
            if( player.turns.getTurn() == 1) {
                display2.textContent = `It's Player ${player.creatPlayers.playerX.name}'s Turn`;
            };
            if( player.turns.getTurn() == 2) {
                display2.textContent = `It's Player ${player.creatPlayers.playerO.name}'s Turn`;
            };
        };

        const displayWiner = () => {
            if( player.turns.getTurn() == 2) {
                display2.textContent = ` Congrat's Player ${player.creatPlayers.playerX.name} you won!!!`;
                return;
            } 
            if( player.turns.getTurn() == 1) {
                display2.textContent = ` Congrat's Player ${player.creatPlayers.playerO.name} you won!!!`;
                return;
            } 
        }
        const displayTie = ()=> {
            display2.textContent = ` WOW it's a tie!!!`;
        }
        return {displayVlue, displaySts, displayWiner, displayTie};
    })();
   
    const checkStat = () => {

        if ( (board[0] === board[1] && board[0] === board[2] && board[0] !== "") ||
             (board[3] === board[4] && board[3] === board[5] && board[3] !== "") ||
             (board[6] === board[7] && board[6] === board[8] && board[6] !== "") ||
             (board[0] === board[3] && board[0] === board[6] && board[0] !== "") ||
             (board[1] === board[4] && board[1] === board[7] && board[1] !== "") ||
             (board[2] === board[5] && board[2] === board[8] && board[2] !== "") ||
             (board[0] === board[4] && board[0] === board[8] && board[0] !== "") ||
             (board[2] === board[4] && board[2] === board[6] && board[2] !== "") )  
            {
               game.isOver.itIsOver();
               game.rstBtn.playAgn();
               displayCtrl.displayWiner();
               return;
        };
        if( player.turns.geTtl() > 9) {
            displayCtrl.displayTie();
        };
    }
    return {boardRset, assignValue, displayCtrl};
})();

const player = (() => {

    const players = (name, sign)=> {
        return {name, sign};
    };

    const creatPlayers = (()=> {
        const playerX = players ( "one", "X");
        const playerO = players ( "two", "O");

        const renameply = (input1="one", input2="two") => {
            if (input1 !== ""){
                playerX.name = input1;
            }
            if (input2 !== ""){
                playerO.name = input2;
            }
        }
        return {playerX,playerO,renameply};
    })();


    const turns = (() => {
        let turn = 1 ;
        let tlTurn = 1;
        const ttlTurn = ()=> {
            tlTurn++;
        };
        const ttlTurnRst = () => {
            tlTurn = 1;
        };
        const geTtl=()=>{
            return tlTurn;
        };
        const getTurn = () => {
        return turn;
        };
        const turnRset = () => {
            turn = 1;
        };
        const turnIncr = () => {
            turn++;
        };
        const turnDecr = () => {
            turn--;
        };
        return{ttlTurn, ttlTurnRst, geTtl, getTurn, turnRset, turnIncr, turnDecr };
    })();

    const getValue = (index) => {

        if (turns.getTurn() == 1){
            if(creatPlayers.playerX.sign == "X") {
             value = creatPlayers.playerX.sign;
            } else if (creatPlayers.playerO.sign == "X") {
             value = creatPlayers.playerO.sign;
            };
        };
        if (turns.getTurn() == 2){
            if(creatPlayers.playerX.sign == "O") {
             value = creatPlayers.playerX.sign;
            } else if (creatPlayers.playerO.sign == "O") {
             value = creatPlayers.playerO.sign;
            };
        };

        GameBoard.assignValue(index, value);
    }
    return {turns, creatPlayers, getValue, creatPlayers};
})();



const game = (() => {  

    const tiles = document.querySelectorAll(".tile");

    const isOver = (() => {
        over = false;
        const isTheOver = () => {
            return over;
        };
        const itIsOver = () => {
            over = true;
        };
        const rstOver = () => {
            over = false;
        };
        return { itIsOver, isTheOver,rstOver }
    })();

    const addTileLis = (() => {
        tiles.forEach(tile => {tile.addEventListener("click",  (e) => {
                if(isOver.isTheOver() === false){
                    index = e.target.dataset.index;
                    player.getValue(index);
                };
            });
        });
    })();
     
    const rstBtn = (()=> {
        
        const restartBtn = document.getElementById("restart")
        restartBtn.addEventListener("click", () =>  {
            restartBtn.textContent = "Restart"
            GameBoard.boardRset(tiles);
            player.turns.turnRset();
            player.turns.ttlTurnRst();
            isOver.rstOver();
            GameBoard.displayCtrl.displaySts();
        });
        const playAgn = ()=> {
            restartBtn.textContent = "Play Again.."
        };
        return {playAgn}
    })();

    const start = (()=>{

        const startbtn = document.getElementById("start")
        startbtn.addEventListener("click", () => {
            const inputs = document.getElementById("inputs");
            const gameboard = document.getElementById("gameboard");
            const inputBx1 = document.getElementById("player1");
            const inputBx2 = document.getElementById("player2");
            player.creatPlayers.renameply(inputBx1.value, inputBx2.value);
            GameBoard.displayCtrl.displaySts();
            console.log('s');
            inputs.classList.toggle("display");
            gameboard.classList.toggle("display");
        });
    })();
    return { isOver, rstBtn};
})();
