function Player(playername, marker, card) {
    let victory = 0;
    let defeat = 0;

    const getPlayerCard = () => card;
    const getUsername = () => playername;
    const getMarker = () => marker;
    const getVictory = () => victory;
    const getDefeat = () => defeat;
    const addVictory = () => ++victory;
    const addDefeat = () => ++defeat;
    const resetStatus = () => {
        victory = 0;
        defeat = 0
    };

    return {
        getPlayerCard,
        getUsername,
        getMarker,
        getVictory,
        getDefeat,
        addVictory,
        addDefeat,
        resetStatus
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
    const resetBoard = () => {
        for (let iter = 0; iter < 3; ++iter) {
            board.shift();
        }
    };

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
    const card1 = player1.getPlayerCard();
    const card2 = player2.getPlayerCard();

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
        changeCard(card1, card2);
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
                    return;
                };

                gameboard.addMarkOnBoard(marker, tile);
                tile.classList.add('active');
                if (validateWinPattern(board, marker)) {
                    winner = getWinner(currentPlayer);
                    const loser = currentPlayer === player1 ? player2 : player1;
                    currentPlayer.addVictory();
                    loser.addDefeat();
                    gameInterface.nextRound(currentPlayer, loser);
                    setTimeout(() => {
                        changePlayer();
                    }, 4300);
                    return;
                };

                if (isDraw(board)) {
                    gameInterface.nextRound();
                    setTimeout(() => {
                        changePlayer();
                    }, 4300);
                    return;
                };

                changePlayer();
            });
        };
    };

    const el_resetButton = document.querySelector('button.reset');
    el_resetButton.addEventListener('mouseup', () => {
        const el_dialog = document.querySelector('dialog');
        const el_confirm = el_dialog.querySelector('button.confirm');
        const el_cancel = el_dialog.querySelector('button.cancel');
        const el_message = el_dialog.querySelector('p.message');

        const cancel = () => {
            el_dialog.close();
            el_confirm.removeEventListener('mouseup', confirm);
            el_cancel.removeEventListener('mouseup', cancel);
        };

        const confirm = () => {
            el_dialog.close();
            // Reinitialize visuals
            gameInterface.resetGameInterface();
            // Reinitialization current player and marker
            player1.resetStatus();
            player2.resetStatus();
            currentPlayer = player1;
            marker = currentPlayer.getMarker();
            changeCard(card1, card2);
            el_confirm.removeEventListener('mouseup', confirm);
            el_cancel.removeEventListener('mouseup', cancel);
        };

        el_message.textContent = 'Reset Game ?';
        el_dialog.showModal();
        el_confirm.addEventListener('mouseup', confirm);
        el_cancel.addEventListener('mouseup', cancel);
    });

    const el_backButton = document.querySelector('button.back');
    el_backButton.addEventListener('mouseup', () => {
        const el_dialog = document.querySelector('dialog');
        const el_confirm = el_dialog.querySelector('button.confirm');
        const el_cancel = el_dialog.querySelector('button.cancel');
        const el_message = el_dialog.querySelector('.message');

        const cancel = () => {
            el_dialog.close();
            el_confirm.removeEventListener('mouseup', confirm);
            el_cancel.removeEventListener('mouseup', cancel);
        };

        const confirm = () => {
            el_dialog.close();
            animationLoad.unloadGameScreen();
            setTimeout(() => {
                animationLoad.loadStartScreen();
            }, 3500);
            // Reinitialize visuals
            gameInterface.resetGameInterface();
            gameInterface.removeTiles();
            gameboard.resetBoard();
            el_confirm.removeEventListener('mouseup', confirm);
            el_cancel.removeEventListener('mouseup', cancel);
        };

        el_message.textContent = 'Quit Game ?';
        el_dialog.showModal();
        el_confirm.addEventListener('mouseup', confirm);
        el_cancel.addEventListener('mouseup', cancel);
    });
};