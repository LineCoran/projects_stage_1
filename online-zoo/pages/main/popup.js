let popup = document.getElementById('popup');
let button = document.getElementById('button');
let wrapper = document.getElementById('body__wrapper');
let popupItemList = document.querySelectorAll('.popup__item');
console.log(popupItemList);

button.addEventListener('click', e => {
    let time = 50;
    e.stopPropagation();
    popup.classList.toggle('popup-active');
    wrapper.classList.toggle('body__wrapper-active');
    popupItemList.forEach(item => {
        addClass(item, time, 'popup__item-active');
        time = time+50;
    })
})

document.addEventListener('click', e => {
    let element = e.target;
    let time = 50;
    let its_hamburger = element == popup;
    if (popup.classList.contains('popup-active') && !its_hamburger) {
        popupItemList.forEach(item => {
            addClass(item, time, 'popup__item-active')
            time = time + 50;
        })
        time = time+150;
        addClass(popup, time, 'popup-active')
        time = time+600
        addClass(wrapper, time, 'body__wrapper-active')
    }
  })

  function addClass(item, time, className) {
    setTimeout(function() {
        item.classList.toggle(className);
        console.log(time)
    }, time)
  }