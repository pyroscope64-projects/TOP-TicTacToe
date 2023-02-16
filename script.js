function Player(name, symbol) {
    var obj = {
        name: name,
        symbol: symbol
    }
    return obj;
}

const board = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
    let container = document.querySelector(".container");
    function checkWin() {
        let gameOver = false;
        for (let i = 0; i < 9; i += 3) {
            if (board[i] != "" && board[i] === board[i + 1] &&
                board[i + 1] === board[i + 2]) {
                game.getWinner();
                gameOver = true;
            }
        }
        // columns
        for (let i = 0; i < 3; i++) {
            if (board[i] != "" && board[i] === board[i + 3] &&
                board[i + 3] === board[i + 6]) {
                game.getWinner();
                gameOver = true;
            }
        }
        // diagonals
        if (board[0] != "" && board[0] === board[4] 
            && board[4] === board[8]) {
                game.getWinner();
                gameOver = true;
        } else if (board[2] != "" && board[2] === board[4]
            && board[4] === board[6]) {
                game.getWinner();
                gameOver = true;
        }
        // end game
        if (!board.includes("") && gameOver === false) {
            game.render("TIE!!!");
        }
        if (gameOver || !board.includes("")) {
            let gamediv = document.querySelector(".game");
            gamediv.remove();
            container.style.display = "flex";
            container.style.width = "200px";
            container.style.height = "75px";
        }
    }
    function createBoard() {
        // removes the input div:
        let inputs = document.getElementById("inputs");
        inputs.remove();
        // makes the game div
        let gamediv = document.createElement("div");
        gamediv.className = "game"
        // adds the game div and the boxes inside to the container
        container.appendChild(gamediv);
        for (let i = 0; i < 9; i++) {
            let box = document.createElement("div");
            box.className = "box";
            gamediv.appendChild(box);
            box.addEventListener('click', () => {
                if (box.innerText === "") {
                    game.onButtonClick(box, i)
                }
            });
        }
    }
    return {
        board,
        createBoard,
        checkWin
    }
})();

const game = (() => {
    const play = document.querySelector(".play");
    let turn = 0;
    let symbol = "X";
    let keepPlaying = true;
    play.addEventListener('click', () => {
        board.createBoard();
        play.removeEventListener('click', board.createBoard);
        playerOne = Player(p1name.value, "X");
        playerTwo = Player(p2name.value, "O");  
        render(`Current Turn: ${playerOne.name}, '${playerOne.symbol}' `);
        let container = document.querySelector(".container");
        container.style.width = "320px";
        container.style.height = "420px";
    });
    let p1name = document.getElementById("playerone");
    let p2name = document.getElementById("playertwo");
    let playerOne = Player(p1name.value, "X");
    let playerTwo = Player(p2name.value, "O");
    function onButtonClick(box, i) {
        if (keepPlaying) {
            if (turn % 2 === 0) {
                render(`Current Turn: ${playerTwo.name}, ${playerTwo.symbol}`);
            } else {
                render(`Current Turn: ${playerOne.name}, ${playerOne.symbol}`);
            }
            box.innerText = symbol;
            board.board[i] = symbol;
            console.log(board.board);
            changeTurn();
            board.checkWin();
        }
    }
    function changeTurn() {
        turn++;
        if (turn % 2 === 0) {
            symbol = "X";
        } else {
            symbol = "O";
        }
    }
    function render(text) {
        let displayText = document.querySelector(".display");
        displayText.textContent = text;
    }
    function getWinner() {
        if (turn % 2 === 0) {
            render(`Winner: ${playerTwo.name}, ${playerTwo.symbol}`);
        } else {
            render(`Winner: ${playerOne.name}, ${playerOne.symbol}`);
        }
    }

    return {
        turn,
        symbol,
        keepPlaying,
        changeTurn,
        render,
        onButtonClick,
        getWinner
    }
})()