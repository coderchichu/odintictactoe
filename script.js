//welp attempting to write modular js. GLHF LMAO
// Author: SH, start: 1/10/2021

(function () {

    let gameBoard = {
        // gameboard layout

        // function that resets the game
        reset: function (xname = 'Noname1', oname = 'Noname2') {
            this.board = [
                /*[1, 0, 1],
                [1, undefined, 0],
                [undefined, 1, 0]*/
                [undefined, undefined, undefined],
                [undefined, undefined, undefined],
                [undefined, undefined, undefined]
            ],
                //initialise players here-->
            X = this.playerFactory(xname, 'X', 1);
            O = this.playerFactory(oname, 'O', 0);
            this.players = [X, O];
            this.turner(X);
        },

        // initialises the functions
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.render();
        },
        // caching the DOM
        cacheDom: function () {
            this.main = document.getElementById('grid-container');
            this.buttons = this.main.getElementsByClassName('tile');
            modal = document.getElementById('myModal');
            modalText = modal.querySelector('p');
            this.span = document.getElementsByClassName("close")[0];
            submit = document.getElementById("submit");
            xname = document.getElementById("xname");
            oname = document.getElementById("oname");
        },
        // binding the events
        bindEvents: function () {
            // click event for main tile buttons
            [...this.buttons].forEach((button) => {
                button.addEventListener('click', () => {
                    this.tileChoose(button);
                })
            });
            // hover event (entering) for the main tile buttons
            [...this.buttons].forEach((button) => {
                button.addEventListener('mouseenter', () => {
                    this.tileSelect(button);
                })
            });
            // hover event (leaving) for the main tile buttons
            [...this.buttons].forEach((button) => {
                button.addEventListener('mouseleave', () => {
                    this.tileDeselect(button);
                })
            });

            // When the user clicks on <span> (x), close the modal
            this.span.onclick = function () {
                modal.style.display = 'none';
            }

            // When the user clicks anywhere outside of the modal, close it and other things lol
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
                if (event.target == submit) {
                    gameBoard.reset(xname.value, oname.value);
                    gameBoard.render();
                }
            }

        },
        //rendering the gameboard
        render: function () {

            let board = this.board;

            // looping through the buttons individually and replacing 1's & 0's with X's & O's.
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {

                    // is it a 0, 1 or undefined?
                    let piece = board[i][j];
                    //which tile the loop is currently up to
                    let currentButton = this.buttons[i + '.' + j];

                    //revert colours
                    currentButton.style.backgroundColor = "beige";
                    currentButton.style.color = "black";

                    if (piece === undefined) {
                        currentButton.textContent = "";
                        continue;
                    }

                    piece = piece === 1 ? "X" : "O";
                    currentButton.textContent = piece;
                }
            }
        },
        // creating the players in the game
        playerFactory: (name, sign, num) => {
            return { name, sign, num };
        },

        // whose turn is it??
        turner: function (playerTurn) {
            this.turn = playerTurn;
        },

        // hover tile choice function
        tileSelect: function (button) {
            if (button.textContent === "") {
                button.textContent = this.turn.sign;
                button.style.backgroundColor = "white";
                button.style.color = "Gainsboro";
            }
        },

        // deselects the tile choice from leaving a hover
        tileDeselect: function (button) {
            this.render();
        },

        // clicked tiled choice selection function
        tileChoose: function (button) {
            // splits id into two numbers
            let idSplit = button.id.split('.');
            // converts from str to number
            let id = idSplit.map(x => Number(x));
            //locates item in the boardboard
            let position = this.board[id[0]][id[1]];

            if (position === undefined) {
                this.board[id[0]][id[1]] = this.turn.num;
                this.turn === this.players[0] ? this.turner(this.players[1]) : this.turner(this.players[0]);
            }

            this.render();

            // module here for checking game won
            if (this.winner()) {
                for (player in this.players) {
                    if (this.players[player].sign === this.winner()) {
                        winnerName = this.players[player].name
                    };
                };
                //insert winner module here
                this.winScreen(winnerName);
                console.log(`Wow! Good job!! ${winnerName} won!`);
                xname.value = "";
                oname.value = "";
                this.reset();
            }
        },

        winner: function () {

            let gameState = this.board;

            // check all rows
            for (let i = 0; i < gameState.length; i++) {
                let sum = gameState[i].reduce((a, b) => a += b, 0);
                if (sum === 0 || sum === 3) {
                    return sum === 3 ? "X" : "O";
                }
            }

            // check all cols
            let columnFunc = (arr, n) => arr.map(x => x[n]);

            for (let i = 0; i < gameState[0].length; i++) {
                let column = columnFunc(gameState, i);
                let sum = column.reduce((a, b) => a += b, 0);
                if (sum === 0 || sum === 3) {
                    return sum === 3 ? "X" : "O";
                }
            }

            // check diagonals
            let diag1 = gameState[0][0] + gameState[1][1] + gameState[2][2];
            let diag2 = gameState[0][2] + gameState[1][1] + gameState[2][0];

            switch (diag1) {
                case 0:
                    return "O";
                case 3:
                    return "X";
                default:
                    break;
            }

            switch (diag2) {
                case 0:
                    return "O";
                case 3:
                    return "X";
                default:
                    break;
            }
        },

        winScreen: function (winName) {
            modal.style.display = "block";
            modalText.textContent = `Wow! Good job!! ${winName} won!`
        },

    }

    gameBoard.reset();
    gameBoard.init();

})()