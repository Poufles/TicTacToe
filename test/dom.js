function visualInterface (el) {
    let element;

    const createElement = () => element = document.createElement(el);
    const selector = () => element = document.querySelector(el);
    const getElement = () => element;
    const addClass = (classItem) => element.classList.add(classItem);
    const removeClass = (classItem) => element.classList.remove(classItem);
    const containsClass = (classItem) => element.classItem.contains(classItem);
    const addID = (idItem) => element.setAttribute('id', idItem);
    const removeID = (idItem) => element.removeAttribute('id', idItem);
    const prependChild = (child) => element.prepend(child);
    const appendChild = (child) => element.appendChild(child);
    const removeChild = (child) => element.removeChild(child);

    return {
        selector,
        getElement,
        createElement,
        addClass,
        removeClass,
        containsClass,
        addID,
        removeID,
        prependChild,
        appendChild,
        removeChild
    }
};

const body = visualInterface('body');
console.log(body.selector());
body.addClass('class-1');
console.log(body.getElement());
body.removeClass('class-1');

const p = visualInterface('p');
p.createElement();
console.log(p.getElement());

body.appendChild(p.getElement());


body.appendChild('section');