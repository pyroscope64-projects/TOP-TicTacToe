function Player(name, symbol) {
    var obj = {
        name: name,
        symbol: symbol
    }
    return obj;
}

const board = (function () {
    let board = [9];
    function checkWin() {

    }
    function _onButtonClick() {
        if (game.turn & 2 === 0) {
            game.render(`Current Turn: ${game.playerOne.name}, ${game.playerOne.symbol}`);
        } else {
            game.render(`Current Turn: ${game.playerTwo.name}, ${game.playerTwo.symbol}`);
        }
        game.changeTurn();
    }
    function createBoard() {
        // removes the input div:
        let inputs = document.getElementById("inputs");
        inputs.remove();
        // makes the game div
        let game = document.createElement("div");
        game.className = "game"
        // adds the game div and the boxes inside to the container
        let container = document.querySelector(".container");
        container.appendChild(game);
        for (let i = 0; i < 9; i++) {
            let box = document.createElement("box");
            box.className = "box";
            game.appendChild(box);
            box.addEventListener('click', _onButtonClick);
        }
    }
    return {
        createBoard,
        checkWin
    }
})();

const game = (() => {
    const play = document.querySelector(".play");
    let turn = 0;
    let symbol = "X";
    play.addEventListener('click', _createPlayers)
    function _createPlayers() {
        let p1name = document.getElementById("playerone");
        let p2name = document.getElementById("playertwo");
        this.playerOne = Player(p1name.value, "X");
        this.playerTwo = Player(p2name.value, "O");
        play.removeEventListener('click', _createPlayers);
        board.createBoard();
        render(`Current Turn: ${this.playerOne.name}, '${this.playerOne.symbol}' `);
    }
    
    function changeTurn() {
        turn++;
        if (turn % 2 === 0) {
            this.symbol = "X";
        } else {
            this.symbol = "O";
        }
    }
    function render(text) {
        let displayText = document.querySelector(".display");
        displayText.textContent = text;
    }
    return {
        playerOne: this.playerOne,
        playerTwo: this.playerTwo,
        turn,
        symbol,
        changeTurn,
        render
    }
})()