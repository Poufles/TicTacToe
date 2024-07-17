const container_status_victory = document.querySelector('.container-status>.victory_count');
const container_status_marker = document.querySelector('.container-status>.marker');
const container_status_defeat = document.querySelector('.container-status>.defeat_count');
const wrapper_message = document.querySelector('.wrapper-message');


container_status_victory.addEventListener('mouseover', () => {
    wrapper_message.setAttribute('style', 'left: 16.5%;');
    wrapper_message.querySelector('.message').textContent = 'Victory(s)'
});

container_status_marker.addEventListener('mouseover', () => {
    wrapper_message.setAttribute('style', 'left: 50%;');
    wrapper_message.querySelector('.message').textContent = 'Marker'
});

container_status_defeat.addEventListener('mouseover', () => {
    wrapper_message.setAttribute('style', 'left: 83.5%;');
    wrapper_message.querySelector('.message').textContent = 'Defeat(s)'
});