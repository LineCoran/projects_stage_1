let popup = document.getElementById('popup');
let popupInner = document.getElementById('popup__inner');
let button = document.getElementById('button');
let wrapper = document.getElementById('body__wrapper');
let popupItemList = document.querySelectorAll('.popup__item');

button.addEventListener('click', e => {
    let time = 50;
    e.stopPropagation();
    let element = e.target;
    let its_hamburger = element == popupInner;
    if (popup.classList.contains('popup-active') && !its_hamburger) {
        button.classList.toggle('burger-active');
        popupItemList.forEach(item => {
            addClass(item, time, 'popup__item-active');
            time= time+100;
        })
        time = time+50;
        addClass(popup, time, 'popup-active')
        time=time+300;
        addClass(wrapper, time, 'body__wrapper-active')
    } else {
        button.classList.toggle('burger-active');
        popup.classList.toggle('popup-active');
        wrapper.classList.toggle('body__wrapper-active');
        popupItemList.forEach(item => {
            addClass(item, time, 'popup__item-active');
            time = time+100;
        })
    }
})

document.addEventListener('click', e => {
    let element = e.target;
    let time = 50;
    let its_hamburger = element == popupInner;
    if (popup.classList.contains('popup-active') && !its_hamburger) {
        button.classList.toggle('burger-active');
        popupItemList.forEach(item => {
            addClass(item, time, 'popup__item-active')
            time = time + 100;
        })
        time = time+50;
        addClass(popup, time, 'popup-active')
        time = time+300
        addClass(wrapper, time, 'body__wrapper-active')
    }
})

function addClass(item, time, className) {
    setTimeout(function() {
        item.classList.toggle(className);
    }, time)
}