const click = document.querySelector('#click');
const el_dialog = document.querySelector('dialog');
const el_dialogOption = document.querySelectorAll('dialog .container-button_option>button');

click.addEventListener('click', () => {
    el_dialog.showModal();
});

el_dialogOption.forEach(button => {
    button.addEventListener('mouseup', () => {
        el_dialog.close();
    });
});