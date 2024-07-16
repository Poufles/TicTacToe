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


function Gameboard() {
    const row = 3, col = 3;
    const board = [];

    const createBoard = () => {
        for (let i = 0; i < row; ++i) {
            board.push(new Array(3))
            for (let j = 0; j < col; ++j) {
                board[i].splice(j, 1, 0);
            }
        };
    };

    const getBoard = () => board;
    const resetBoard = () => board = [];

    const addMarkOnBoard = (marker, row, col) => {
        board[row - 1].splice(col - 1, 1, marker);
    };

    return {
        createBoard,
        getBoard,
        resetBoard,
        addMarkOnBoard
    }
};


function Game() {
    function getWinner(player) {
        return player.getUsername();
    };

    function validateResponse(row, col) {
        const boardArr = gameboard.getBoard();
        if (row == 0 || col == 0) return false;

        return boardArr[row - 1][col - 1] == 0;
    };

    function validateWinPattern(marker) {
        const boardArr = gameboard.getBoard();
        const length = boardArr.length;
        let patternCount = 0;

        // Horizontal Pattern
        for (let i = 0; i < length; ++i) {
            patternCount = 0;
            for (let j = 0; j < length; ++j) {
                if (boardArr[i][j] == marker) {
                    patternCount++;
                    if (patternCount == 3) return true;
                };
            };
        };

        patternCount = 0;
        // Vertical Pattern
        for (let i = 0; i < length; ++i) {
            for (let j = 0; j < length; ++j) {
                if (boardArr[j][i] == marker) {
                    patternCount++;
                    if (patternCount == 3) return true;
                };
            };
        };

        patternCount = 0;
        // Diagonal Left to Right
        for (let i = 0; i < length; ++i) {
            if (boardArr[i][i] == marker) {
                patternCount++;
                if (patternCount == 3) return true;
            };
        };
        
        patternCount = 0;
        // Diagonal Right to Left
        for (let i = 1; i <= length; ++i) {
            if (boardArr.at((i * -1)).at((i * -1)) == marker) {
                patternCount++;
                if (patternCount == 3) return true;
            };
        };

        return false;
    };

    const gameboard = Gameboard();
    gameboard.createBoard();

    const player1 = Player(prompt('Enter username for player 1:', 'Player 1'), 'X');
    const player2 = Player(prompt('Enter username for player 2:', 'Player 2'), 'O');

    let currentPlayer = player1, winner, row, col;
    let showBoard = gameboard.getBoard();

    while (true) {
        let player = currentPlayer.getUsername();
        let marker = currentPlayer.getMarker();
        
        console.log(`It's ${player}'s turn!`);
        while (true) {
            row = prompt('Please enter a row: ');
            col = prompt('Please enter a col: ');
            if (validateResponse(row, col)) break;
            else alert('Please enter a valid position');
        }

        gameboard.addMarkOnBoard(marker, row, col);
        console.log(showBoard[0]); console.log(showBoard[1]); console.log(showBoard[2]);
        if (validateWinPattern(marker)) {
            winner = getWinner(currentPlayer); 
            console.log(`${winner}[${marker}] won!`); break;
        }
        
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    };

    console.log(showBoard[0]); console.log(showBoard[1]); console.log(showBoard[2]);
};

// Game();
// No global variables