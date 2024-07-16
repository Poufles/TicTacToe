function onLoad() {
    const el_playerCard = document.querySelectorAll('.card-player');
    const el_startButton = document.querySelector('.start-game'); 

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
};

const startInterface = function () {
    const el_mainTitle = document.querySelector('.container-title_screen .title');
    const el_startContainer = document.querySelectorAll('.container-title_screen>section')
    console.log(el_mainTitle);
    const el_playerCard = document.querySelectorAll('.card-player');
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

const startAnimation = function () {

}();

onLoad();