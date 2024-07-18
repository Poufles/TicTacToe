function onLoad() {
    const el_playerCard = document.querySelectorAll('.card-player');
    const el_startButton = document.querySelector('.start-game');
    const el_statusVictory = document.querySelectorAll('.container-status>.victory_count');
    const el_statusMarker = document.querySelectorAll('.container-status>.marker');
    const el_statusDefeat = document.querySelectorAll('.container-status>.defeat_count');
    const wrapper_message = document.querySelectorAll('.wrapper-message');

    window.addEventListener('load', () => {
        el_playerCard.forEach(card => {
            setTimeout(() => {
                card.classList.add('slide-in_right');
            }, 600);
            setTimeout(() => {
                card.classList.remove('opacity-0');
                card.classList.remove('slide-in_right');
            }, 3000);
        });

        el_startButton.classList.add('slide-in_up');
        setTimeout(() => {
            el_startButton.classList.remove('opacity-0');
            el_startButton.classList.remove('slide-in_up');
        }, 3270);
    });

    el_statusVictory.forEach(victory => {
        victory.addEventListener('mouseover', () => {
            wrapper_message.forEach(message => {
                message.setAttribute('style', 'left: 16.5%;');
                message.querySelector('.message').textContent = 'Victory(s)'
            });
        });
    });

    el_statusMarker.forEach(marker => {
        marker.addEventListener('mouseover', () => {
            wrapper_message.forEach(message => {
                message.setAttribute('style', 'left: 50%;');
                message.querySelector('.message').textContent = 'Marker'
            });
        });
    });

    el_statusDefeat.forEach(defeat => {
        defeat.addEventListener('mouseover', () => {
            wrapper_message.forEach(message => {
                message.setAttribute('style', 'left: 83.5%;');
                message.querySelector('.message').textContent = 'Defeat(s)'
            });
        });
    });
};

function startGameAnimation() {
    const el_gameScreen = document.querySelector('.container-game_screen');
    const el_overlay = document.querySelector('.overlay');
    const el_roundCounter = document.querySelector('.round');
    const el_tile = document.querySelectorAll('.container-board .tile');
    const el_backButton = document.querySelector('.container-back_reset .back');
    const el_resetButton = document.querySelector('.container-back_reset .reset');
    const el_playerCard1 = document.querySelector('.container-player_status_card #player1');
    const el_playerCard2 = document.querySelector('.container-player_status_card #player2');



    el_overlay.classList.remove('d-none')
    el_gameScreen.classList.remove('d-none');
    el_roundCounter.classList.remove('d-none');
    el_roundCounter.classList.add('zoom-out_pop');
    setTimeout(() => {
        el_roundCounter.classList.remove('zoom-out_pop');
    }, 500);

    setTimeout(() => {
        document.getElementById('tile-1').classList.add('border-top-left-radius');
        document.getElementById('tile-3').classList.add('border-top-right-radius');
        document.getElementById('tile-7').classList.add('border-bottom-left-radius');
        document.getElementById('tile-9').classList.add('border-bottom-right-radius');

        el_tile.forEach(tile => {
            tile.classList.remove('d-none');
            tile.classList.add('initial-box');
            tile.classList.add('zoom-out_pop');
            setTimeout(() => {
                document.getElementById('tile-1').classList.remove('border-top-left-radius');
                document.getElementById('tile-3').classList.remove('border-top-right-radius');
                document.getElementById('tile-7').classList.remove('border-bottom-left-radius');
                document.getElementById('tile-9').classList.remove('border-bottom-right-radius');
                tile.classList.remove('initial-box');
                tile.classList.remove('zoom-out_pop');
            }, 1500);
        });
    }, 500);

    setTimeout(() => {
        el_backButton.classList.remove('d-none');
        el_backButton.classList.add('zoom-out_pop');
        setTimeout(() => {
            el_backButton.classList.remove('zoom-out_pop');
        }, 500);
    }, 800);

    setTimeout(() => {
        el_resetButton.classList.remove('d-none');
        el_resetButton.classList.add('zoom-out_pop');
        setTimeout(() => {
            el_resetButton.classList.remove('zoom-out_pop');
        }, 500);
    }, 1100);

    setTimeout(() => {
        el_playerCard1.classList.remove('d-none');
        el_playerCard1.classList.add('zoom-out_pop');
        setTimeout(() => {
            el_playerCard1.classList.remove('zoom-out_pop');
        }, 500);
    }, 1400);

    setTimeout(() => {
        el_playerCard2.classList.remove('d-none');
        el_playerCard2.classList.add('zoom-out_pop');
        setTimeout(() => {
            el_playerCard2.classList.remove('zoom-out_pop');
        }, 500);
    }, 1700);

    setTimeout(() => {
        el_overlay.classList.add('d-none');
    }, 2000);
};

const startInterface = function () {
    const el_titleScreen = document.querySelector('.container-title_screen');
    const el_mainTitle = document.querySelector('.container-title_screen .title');
    const el_startContainer = document.querySelectorAll('.container-title_screen>section')
    const el_playerCard = document.querySelectorAll('.container-player_section>.card-player');
    const el_startButton = document.querySelector('.start-game');
    let player1, player2;

    el_playerCard.forEach(card => {
        const card_input = card.querySelector('.input-player');

        card_input.addEventListener('focus', () => {
            card.classList.add('active')
            card.querySelector('#profile').classList.add('img-active')
        });

        card_input.addEventListener('blur', () => {
            if (card_input.value !== '') {
                card.classList.add('active')
                card.querySelector('#profile').classList.add('img-active')
            } else {
                card.classList.remove('active')
                card.querySelector('#profile').classList.remove('img-active')
            }
        });
    });

    el_startButton.addEventListener('mouseup', () => {
        let input1 = document.querySelector('#player1');
        let input2 = document.querySelector('#player2');

        input1 = input1.value !== '' ? input1.value : 'Player 1';
        input2 = input2.value !== '' ? input2.value : 'Player 2';

        player1 = Player(input1, 'X');
        player2 = Player(input2, 'O');

        el_playerCard.forEach(card => {
            card.classList.add('zoom-in-pop');
            setTimeout(() => {
                card.classList.remove('zoom-in-pop');
                card.classList.add('d-none');
            }, 2000);
        });

        setTimeout(() => {
            el_mainTitle.classList.add('zoom-in-pop');
        }, 500);
        setTimeout(() => {
            el_mainTitle.classList.remove('zoom-in-pop');
        }, 1100);

        setTimeout(() => {
            el_startButton.classList.add('zoom-in-pop');
        }, 900);
        setTimeout(() => {
            el_mainTitle.classList.add('d-none');
            el_startButton.classList.remove('zoom-in-pop');
            el_startButton.classList.add('d-none');
        }, 1900);

        el_startContainer.forEach(container => {
            setTimeout(() => {
                container.classList.add('d-none');
            }, 2000);
        });

        setTimeout(() => {
            el_titleScreen.classList.add('d-none');
            startGameAnimation();
        }, 2000);

        Game();
    });

    const getStartEl = () => el_playerCard;
    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;

    return {
        getStartEl,
        getPlayer1,
        getPlayer2
    }
}();

const gameInterface = function () {
    const el_tile = document.querySelectorAll('.tile');
    const el_playerCard = document.querySelectorAll('.container-player_status_card>.card-player')
    const el_round = document.querySelector('.round');
    const tiles = [];
    const cards = [];
    let round = 1;

    el_tile.forEach(tile => {
        tiles.push(tile);
    });
    
    el_playerCard.forEach(card => {
        cards.push(card);
    });

    const getTile = () => tiles;
    const getPlayerCard = () => cards;
    const nextRound = () => {
        ++round;
        el_round.textContent = `Round ${round}`;
        el_tile.forEach(tile => {
            tile.classList.remove('active');
            tile.textContent = '';
        });
    };
    const resetGameInterface = () => {
        round = 1;
        el_round.textContent = `Round ${round}`;

        el_tile.forEach(tile => {
            tile.classList.remove('active');
            tile.textContent = '';
        });

        el_playerCard.forEach(card => {
            const victory = card.querySelector('.victory_count');
            const defeat = card.querySelector('.defeat_count');

            victory.textContent = '0';
            defeat.textContent = '0';
        });
    };

    return {
        getTile,
        getPlayerCard,
        nextRound,
        resetGameInterface
    }
}();

const playerTurn = function () {
    const currentPlayer = (player) => player;

    return {
        currentPlayer
    }
}();

onLoad();