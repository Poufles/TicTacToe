function Player(playername, marker) {
    let score = 0;

    const getUsername = () => playername;
    const getMarker = () => marker;
    const getScore = () => score;
    const addScore = () => ++score;

    return {
        getUsername,
        getMarker,
        getScore,
        addScore
    };
};


const gameboard = function () {
    const row = 3, col = 3;
    const board = [];
    const visualBoard = gameInterface.getTile();

    const createBoard = () => {
        let k = 0;
        for (let i = 0; i < row; ++i) {
            board.push(new Array(3))
            for (let j = 0; j < col; ++j) {
                board[i].splice(j, 1, visualBoard[k]);
                ++k;
            }
        };
    };

    const getBoard = () => board;
    const resetBoard = () => board = [];

    const addMarkOnBoard = (marker, tile) => {
        tile.textContent = marker;
    };

    return {
        createBoard,
        getBoard,
        resetBoard,
        addMarkOnBoard
    }
}();


function Game() {
    function getWinner(player) {
        return player.getUsername();
    };

    function validateTile(tile) {
        return tile.textContent !== '';
    };

    function isDraw(board) {
        const length = board.length;
        let tiles = 0;
        for (let i = 0; i < length; ++i) {
            for (let j = 0; j < length; ++j) {
                if (board[i][j].textContent !== '') {
                    if (++tiles === 9) return true;
                };
            };
        };

        return false;
    };

    function validateWinPattern(board, marker) {
        const length = board.length;
        let patternCount = 0;

        // Horizontal Pattern
        for (let i = 0; i < length; ++i) {
            patternCount = 0;
            for (let j = 0; j < length; ++j) {
                if (board[i][j].textContent === marker) {
                    patternCount++;
                    if (patternCount == 3) return true;
                };
            };
        };

        patternCount = 0;
        // Vertical Pattern
        for (let i = 0; i < length; ++i) {
            patternCount = 0;
            for (let j = 0; j < length; ++j) {
                if (board[j][i].textContent === marker) {
                    patternCount++;
                    if (patternCount == 3) return true;
                };
            };
        };

        patternCount = 0;
        // Diagonal Left to Right
        for (let i = 0; i < length; ++i) {
            if (board[i][i].textContent === marker) {
                patternCount++;
                if (patternCount == 3) return true;
            };
        };
        
        patternCount = 0;
        // Diagonal Right to Left
        for (let i = 1; i <= length; ++i) {
            if (board[i - 1].at(i * -1).textContent === marker) {
                patternCount++;
                if (patternCount == 3) return true;
            };
        };

        return false;
    };

    function changeCard(newCard, oldCard) {
        newCard.classList.add('active');
        newCard.querySelector('.container-profile').classList.add('active');
        newCard.querySelector('.victory_count').classList.add('active');
        newCard.querySelector('.marker').classList.add('active');
        newCard.querySelector('.defeat_count').classList.add('active');
        oldCard.classList.remove('active');
        oldCard.querySelector('.container-profile').classList.remove('active');
        oldCard.querySelector('.victory_count').classList.remove('active');
        oldCard.querySelector('.marker').classList.remove('active');
        oldCard.querySelector('.defeat_count').classList.remove('active');
    }

    function changePlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        marker = currentPlayer.getMarker();

        if (currentPlayer === player1) {
            changeCard(card1, card2);
        } else {
            changeCard(card2, card1);
        };
    };

    // Initialization of gameboard
    gameboard.createBoard();
    let board = gameboard.getBoard();
    
    // Initialization of players
    const player1 = startInterface.getPlayer1()
    const player2 = startInterface.getPlayer2();

    // Initialization of player cards
    const card1 = gameInterface.getPlayerCard()[0];
    const card2 = gameInterface.getPlayerCard()[1];
    
    // Initialization of current player
    let currentPlayer = player1;

    // Initialization of marker of the current player
    let marker = currentPlayer.getMarker();
    
    // Adding username to player cards
    card1.querySelector('.player').textContent = player1.getUsername();
    card2.querySelector('.player').textContent = player2.getUsername();

    // Initialize winner variable
    let winner;

    /*
        After initial animation of game interface,
        visually provide hint who is the first to play.
    */
    setTimeout(() => {
        card1.classList.add('active');
        card1.querySelector('.container-profile').classList.add('active');
        card1.querySelector('.victory_count').classList.add('active');
        card1.querySelector('.marker').classList.add('active');
        card1.querySelector('.defeat_count').classList.add('active');
    }, 4000);

    /*
        For each tile, add a listener when a player
        inputs their marker and verify game flow.
    */
    for (let iter = 0; iter < board.length; ++iter) {
        for (let jiter = 0; jiter < board.length; ++jiter) {
            let tile = board[iter][jiter];

            tile.addEventListener('mouseover', () => {
                tile.classList.add('hover');
            });
            
            tile.addEventListener('mousedown', () => {
                tile.classList.add('active')
            });
            
            tile.addEventListener('mouseleave', () => {
                if (tile.textContent === '') {
                    tile.classList.remove('active');
                };
                tile.classList.remove('hover');
            });
            
            tile.addEventListener('mouseup', () => {
                if (validateTile(tile)) {
                    console.log('Marked');
                    return;
                };

                gameboard.addMarkOnBoard(marker, tile);
                tile.classList.add('active');
                if (validateWinPattern(board, marker)) {
                    console.log('WIN');
                    winner = getWinner(currentPlayer);
                    gameInterface.nextRound();
                    return;
                };

                if (isDraw(board)) {
                    console.log('Draw');
                    return;
                };

                changePlayer();
            });
        };
    };

    const el_resetButton = document.querySelector('button.reset');
    el_resetButton.addEventListener('mouseup', () => {
        gameInterface.resetGameInterface();
        // Reinitialization current player and marker
        currentPlayer = player1;
        marker = currentPlayer.getMarker();
        changeCard(card1, card2);
    });
};

// Game();
// No global variables


// function Game() {
//     function getWinner(player) {
//         return player.getUsername();
//     };

//     function validateResponse(row, col) {
//         const boardArr = gameboard.getBoard();
//         if (row == 0 || col == 0) return false;

//         return boardArr[row - 1][col - 1] == 0;
//     };

//     function validateWinPattern(marker) {
//         const boardArr = gameboard.getBoard();
//         const length = boardArr.length;
//         let patternCount = 0;

//         // Horizontal Pattern
//         for (let i = 0; i < length; ++i) {
//             patternCount = 0;
//             for (let j = 0; j < length; ++j) {
//                 if (boardArr[i][j] == marker) {
//                     patternCount++;
//                     if (patternCount == 3) return true;
//                 };
//             };
//         };

//         patternCount = 0;
//         // Vertical Pattern
//         for (let i = 0; i < length; ++i) {
//             for (let j = 0; j < length; ++j) {
//                 if (boardArr[j][i] == marker) {
//                     patternCount++;
//                     if (patternCount == 3) return true;
//                 };
//             };
//         };

//         patternCount = 0;
//         // Diagonal Left to Right
//         for (let i = 0; i < length; ++i) {
//             if (boardArr[i][i] == marker) {
//                 patternCount++;
//                 if (patternCount == 3) return true;
//             };
//         };
        
//         patternCount = 0;
//         // Diagonal Right to Left
//         for (let i = 1; i <= length; ++i) {
//             if (boardArr.at((i * -1)).at((i * -1)) == marker) {
//                 patternCount++;
//                 if (patternCount == 3) return true;
//             };
//         };

//         return false;
//     };

//     const gameboard = Gameboard();
//     gameboard.createBoard();

//     const player1 = startInterface.getPlayer1();
//     const player2 = startInterface.getPlayer2();

//     let currentPlayer = player1, winner, row, col;
//     let showBoard = gameboard.getBoard();

//     while (true) {
//         let player = currentPlayer.getUsername();
//         let marker = currentPlayer.getMarker();
        
//         console.log(`It's ${player}'s turn!`);
//         while (true) {
//             row = prompt('Please enter a row: ');
//             col = prompt('Please enter a col: ');
//             if (validateResponse(row, col)) break;
//             else alert('Please enter a valid position');
//         }

//         gameboard.addMarkOnBoard(marker, row, col);
//         console.log(showBoard[0]); console.log(showBoard[1]); console.log(showBoard[2]);
//         if (validateWinPattern(marker)) {
//             winner = getWinner(currentPlayer); 
//             console.log(`${winner}[${marker}] won!`); break;
//         }
        
//         currentPlayer = currentPlayer == player1 ? player2 : player1;
//     };

//     console.log(showBoard[0]); console.log(showBoard[1]); console.log(showBoard[2]);
// };