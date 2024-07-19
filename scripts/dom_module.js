const startInterface = function () {
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
        let input1 = document.querySelector('.container-player_section #player1');
        let input2 = document.querySelector('.container-player_section #player2');

        input1 = input1.value !== '' ? input1.value : 'Player 1';
        input2 = input2.value !== '' ? input2.value : 'Player 2';

        const playerCard1 = gameInterface.getPlayerCard(0);
        const playerCard2 = gameInterface.getPlayerCard(1);

        player1 = Player(input1, 'X', playerCard1);
        player2 = Player(input2, 'O', playerCard2);

        animationLoad.unloadStartScreen();
        setTimeout(() => {
            animationLoad.loadGameScreen()
        }, 2000);

        Game();
    });

    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;

    return {
        getPlayer1,
        getPlayer2
    }
}();

const gameInterface = function () {
    const el_overlay = document.querySelector('.overlay');
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
    const getPlayerCard = (index) => cards[index];
    const nextRound = (winner = null, loser = null) => {
        el_overlay.classList.remove('d-none')
        if (winner !== null) {
            const winnerCard = winner.getPlayerCard();
            const loserCard = loser.getPlayerCard();

            const notif_winner = winnerCard.querySelector('.notification-status');
            const notif_winnerStatus = winnerCard.querySelector('.victory_count');
            notif_winnerStatus.textContent = winner.getVictory();
            notif_winner.classList.remove('d-none');
            notif_winner.classList.add('jump-pop');
            setTimeout(() => {
                notif_winner.classList.remove('jump-pop');
                notif_winner.classList.add('opacity-0');
                setTimeout(() => {
                    notif_winner.classList.remove('opacity-0');
                    notif_winner.classList.add('d-none');
                }, 1000);
            }, 3000);

            const notif_loser = loserCard.querySelector('.notification-status');
            const notif_defeatStatus = loserCard.querySelector('.defeat_count');
            notif_defeatStatus.textContent = loser.getDefeat();
            notif_loser.classList.remove('d-none');
            notif_loser.classList.add('jump-pop');
            notif_loser.setAttribute('style', '--_status: #aa0e0e');
            const message = notif_loser.querySelector('.container-status');
            message.textContent = 'Loser !';
            setTimeout(() => {
                notif_loser.classList.remove('jump-pop');
                notif_loser.classList.add('opacity-0');
                setTimeout(() => {
                    notif_loser.classList.remove('opacity-0');
                    notif_loser.classList.add('d-none');
                    notif_loser.setAttribute('style', '--_status: #04ff00');
                    message.textContent = 'Winner !';
                }, 1000);
            }, 3000);
        } else {
            for (playerCard of cards) {
                const notif = playerCard.querySelector('.notification-status');
                notif.setAttribute('style', '--_status: #CACACA');
                notif.classList.remove('d-none');
                notif.querySelector('.container-status').textContent = 'DRAW !';
                notif.classList.add('jump-pop');
                setTimeout(() => {
                    notif.classList.remove('jump-pop');
                    notif.classList.add('opacity-0');
                    setTimeout(() => {
                        notif.classList.remove('opacity-0');
                        notif.classList.add('d-none');
                        notif.setAttribute('style', '--_status: #04ff00');
                        notif.querySelector('.container-status').textContent = "Winner !"
                    }, 1000);
                }, 3000);
            };
        }

        setTimeout(() => {
            el_round.classList.add('scale-pop');
            el_round.classList.add('z-1');
            setTimeout(() => {
                ++round;
                el_round.textContent = `Round ${round}`;
            }, 700);
            setTimeout(() => {
                el_round.classList.remove('scale-pop');
            }, 1200);
            setTimeout(() => {
                el_round.classList.remove('z-1');
            }, 1500);
        }, 3500);

        setTimeout(() => {
            el_tile.forEach(tile => {
                tile.classList.remove('active');
                tile.textContent = '';
                el_overlay.classList.add('d-none');
            });
        }, 4400);
    };

    const resetGameInterface = () => {
        if (round > 1) {
            round = 1;
            el_round.textContent = `Round ${round}`;
            el_round.classList.add('scale-pop');
            el_round.classList.add('z-1');
            setTimeout(() => {
                el_round.textContent = `Round ${round}`;
            }, 700);
            setTimeout(() => {
                el_round.classList.remove('scale-pop');
            }, 1200);
            setTimeout(() => {
                el_round.classList.remove('z-1');
            }, 1500);
        };

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

const animationLoad = function () {
    const el_titleScreen = document.querySelector('.container-title_screen');
    const el_overlay = document.querySelector('.overlay')
    const el_title = document.querySelector('.container-title');
    const el_mainTitle = document.querySelector('.container-title_screen .title');
    const el_playerCard = document.querySelectorAll('.container-player_section>.card-player');
    const el_startButton = document.querySelector('.start-game');
    const el_statusVictory = document.querySelectorAll('.container-status>.victory_count');
    const el_statusMarker = document.querySelectorAll('.container-status>.marker');
    const el_statusDefeat = document.querySelectorAll('.container-status>.defeat_count');
    const wrapper_message = document.querySelectorAll('.wrapper-message');

    // Initial load
    window.addEventListener('load', () => {
        loadStartScreen();

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
    });

    const loadStartScreen = () => {
        el_titleScreen.classList.remove('d-none')
        el_overlay.classList.remove('d-none');
        el_title.classList.remove('d-none');

        setTimeout(() => {
            el_overlay.classList.add('d-none');
        }, 3300);

        el_mainTitle.classList.remove('d-none');

        el_playerCard.forEach(card => {
            setTimeout(() => {
                card.classList.remove('d-none');
            }, 1);
            card.classList.add('opacity-0')
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
            el_startButton.classList.remove('d-none');
        }, 2000);
        setTimeout(() => {
            el_overlay.classList.add('d-none');
            el_startButton.classList.remove('opacity-0');
            el_startButton.classList.remove('slide-in_up');
        }, 3000);
    }

    const unloadStartScreen = () => {
        // const el_startContainer = document.querySelectorAll('.container-title_screen>section')
        const el_playerCard = document.querySelectorAll('.container-player_section>.card-player');

        el_overlay.classList.remove('d-none');
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
        setTimeout(() => {
            el_titleScreen.classList.add('d-none');
        }, 2000);
    };

    const loadGameScreen = () => {
        const el_gameScreen = document.querySelector('.container-game_screen');
        const el_roundCounter = document.querySelector('.round');
        const el_tile = document.querySelectorAll('.container-board .tile');
        const el_backButton = document.querySelector('.container-back_reset .back');
        const el_resetButton = document.querySelector('.container-back_reset .reset');
        const el_playerCard1 = document.querySelector('.container-player_status_card #player1');
        const el_playerCard2 = document.querySelector('.container-player_status_card #player2');

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

    const unloadGameScreen = () => {
        const el_gameScreen = document.querySelector('.container-game_screen');
        const el_roundCounter = document.querySelector('.round');
        const el_tile = document.querySelectorAll('.container-board .tile');
        const el_backButton = document.querySelector('.container-back_reset .back');
        const el_resetButton = document.querySelector('.container-back_reset .reset');
        const el_playerCard1 = document.querySelector('.container-player_status_card #player1');
        const el_playerCard2 = document.querySelector('.container-player_status_card #player2');

        el_playerCard2.classList.add('zoom-in-pop');
        setTimeout(() => {
            el_playerCard2.classList.remove('zoom-in-pop');
            el_playerCard2.classList.add('d-none');
        }, 1000);

        setTimeout(() => {
            el_playerCard1.classList.add('zoom-in-pop');
            setTimeout(() => {
                el_playerCard1.classList.remove('zoom-in-pop');
                el_playerCard1.classList.add('d-none');
            }, 1000);
        }, 500);

        setTimeout(() => {
            el_resetButton.classList.add('zoom-in-pop');
            setTimeout(() => {
                el_resetButton.classList.remove('zoom-in-pop');
                el_resetButton.classList.add('d-none');
            }, 1000);
        }, 1000);

        setTimeout(() => {
            el_backButton.classList.add('zoom-in-pop');
            setTimeout(() => {
                el_backButton.classList.remove('zoom-in-pop');
                el_backButton.classList.add('d-none');
            }, 1000);
        }, 1500);

        setTimeout(() => {
            el_tile.forEach(tile => {
                tile.classList.add('zoom-in-pop');
                setTimeout(() => {
                    tile.classList.remove('zoom-in-pop');
                    tile.classList.add('d-none');
                }, 1000);
            });
        }, 2000);

        setTimeout(() => {
            el_roundCounter.classList.add('zoom-in-pop');
            setTimeout(() => {
                el_roundCounter.classList.remove('zoom-in-pop');
                el_roundCounter.classList.add('d-none');
            }, 1000);
        }, 2500);

        setTimeout(() => {
            el_gameScreen.classList.add('d-none');
        }, 3000);
    };

    return {
        loadStartScreen,
        unloadStartScreen,
        loadGameScreen,
        unloadGameScreen
    }
}();