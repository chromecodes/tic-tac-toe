
const GameBoard = (() => {
    const board = ["","","","","","","","",""] 

    const boardRset = () => {
        board = ["","","","","","","","",""] 
    }

    const assignValue = (index, value)=> {
        if(  value == "X" && board[index] !== "X" && board[index] !== "O"){
            board[index] = value;
            player.rounds.roundIncr()
            console.log(board);
        }
        if( value == "O" && board[index] !== "X" && board[index] !== "O"){
            board[index] = value;
            player.rounds.roundDecr()
            console.log(board);
        }
    }
    const displayVlue = () => {
        const display = document.querySelector()
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
    const rounds = (() => {
        let round = 1 
        console.log(round);
        const getRound = () => {
        return round;
        }
        const roundRset = () => {
            round = 1;
            console.log(round);
        }
        const roundIncr = () => {
            round++;
            console.log(round);
        }
        const roundDecr = () => {
            round--;
            console.log(round);
        }
        return{getRound, roundRset, roundIncr, roundDecr }
    })();

    const getValue = (index) => {

        console.log(rounds.getRound());
        if (rounds.getRound() == 1){
            if(playerX.sign == "X") {
             value = playerX.sign;
            } else if (playerO.sign == "X") {
             value = playerO.sign;
            }
        }
        if (rounds.getRound() == 2){
            if(playerX.sign == "O") {
             value = playerX.sign;
            } else if (playerO.sign == "O") {
             value = playerO.sign;
            }
        }

        GameBoard.assignValue(index, value )
    }
    return {rounds, getValue}

})();



const game = (() => {  
    const tiles = document.querySelectorAll(".tile")
    tiles.forEach(tile => {tile.addEventListener("click",  function(e) {
        index = e.target.dataset.index;
        player.getValue(index);



    },)  });
    console.log(tiles);
})();

console.log(tiles);