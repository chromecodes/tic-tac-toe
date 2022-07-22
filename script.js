
const GameBoard = (() => {
    const board = ["","","","","","","","",""] 

    const boardRset = (tiles) => {

        console.log(tiles);
        for( i=0; i<9; i++){
            board[i] = "";
            tiles[i].textContent = "";
        }
    }

    const assignValue = (index, value)=> {
        if(  value == "X" && board[index] !== "X" && board[index] !== "O"){
            board[index] = value;
            player.turns.turnIncr();
            console.log(board);
            displayVlue(index, value)
            checkStat();
        }
        if( value == "O" && board[index] !== "X" && board[index] !== "O"){
            board[index] = value;
            player.turns.turnDecr();
            console.log(board);
            displayVlue(index, value);
            checkStat();
        }

    }
    const displayVlue = (index, value) => {
        const display = document.querySelector(`[data-index="${index}"]`)
        display.textContent = value;
    }
    const checkStat = () => {

        if ( (board[0] === board[1] && board[0] === board[2] && board[0] !== "") ||
             (board[3] === board[4] && board[3] === board[5] && board[3] !== "") ||
             (board[6] === board[7] && board[6] === board[8] && board[6] !== "") ||
             (board[0] === board[3] && board[0] === board[6] && board[0] !== "") ||
             (board[1] === board[4] && board[1] === board[7] && board[1] !== "") ||
             (board[2] === board[5] && board[2] === board[8] && board[2] !== "") ||
             (board[0] === board[4] && board[0] === board[8] && board[0] !== "") ||
             (board[2] === board[4] && board[2] === board[6] && board[2] !== "") ){
            console.log("win")
        }
    }
    return {boardRset, assignValue, }
})();

const player = (() => {

    const playerX = {
        name : "one",
        sign : "X",
    }
    const playerO = {
        name : "two",
        sign : "O",
    }
    const turns = (() => {
        let turn = 1 
        const getTurn = () => {
        return turn;
        }
        const turnRset = () => {
            turn = 1;
        }
        const turnIncr = () => {
            turn++;
            console.log(turn);
        }
        const turnDecr = () => {
            turn--;
            console.log(turn);
        }
        return{getTurn, turnRset, turnIncr, turnDecr }
    })();

    const getValue = (index) => {

        console.log(turns.getTurn());
        if (turns.getTurn() == 1){
            if(playerX.sign == "X") {
             value = playerX.sign;
            } else if (playerO.sign == "X") {
             value = playerO.sign;
            }
        }
        if (turns.getTurn() == 2){
            if(playerX.sign == "O") {
             value = playerX.sign;
            } else if (playerO.sign == "O") {
             value = playerO.sign;
            }
        }

        GameBoard.assignValue(index, value )
    }
    return {turns, getValue}
})();



const game = (() => {  

    const tiles = document.querySelectorAll(".tile")
    tiles.forEach(tile => {tile.addEventListener("click",  function(e) {
        index = e.target.dataset.index;
        player.getValue(index);
        console.log(tiles[0].textContent);
    }, )  });

    const restartBtn = document.getElementById("restart")
    restartBtn.addEventListener("click", () =>  {
        GameBoard.boardRset(tiles);
        player.turns.turnRset();

    });

})();