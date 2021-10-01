//welp attempting to write modular js. GLHF LMAO
// Author: SH, start: 1/10/2021

(function () {

    let gameBoard = {
        // gameboard layout

        // function that resets the game
        reset: function() {
            this.board = [
                [1, 0, 1],
                [1, undefined, 0],
                [undefined, 1, 0]
            ],
            X = this.playerFactory('steve','X');
            O = this.playerFactory('yoloswaggins','O');
            this.turn(X);
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
        playerFactory: (name, sign) => {
            return {name, sign};
        },

        // whose turn is it??
        turn: function (playerTurn) {
            this.turn = playerTurn;
            console.log(this.turn);
        },

        // hover tile choice function
        tileSelect: function (button) {
            if (button.textContent === "") {
                button.textContent = this.turn.sign;
                



                //ADD MORE EFFECTS HERE





            }
        },

        // deselects the tile choice from leaving a hover
        tileDeselect: function (button) {
            this.render();
        },

        // clicked tiled choice selection function
        /*tileChoose: function (button) {
            //console.log(button.textContent === "");
            //console.log(this.turn);
        },*/

    }

    gameBoard.reset();
    gameBoard.init();

})()