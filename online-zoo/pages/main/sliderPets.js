import pets from "./pets.js";

const leftButton = document.getElementById('petsLeft')
const rightButton = document.getElementById('petsRight')
const cardsList = document.getElementById('cardsList');
const sliderList = document.getElementById('sliderList');
let currentPosition = 0;
let currentTranslatePosition = 0;
leftButton.addEventListener('click', showLeftSlide);
rightButton.addEventListener('click', showRightSlide);


function showLeftSlide() {
    leftButton.removeEventListener('click', showLeftSlide);
    currentTranslatePosition+=parseFloat(getComputedStyle(sliderList).width);
    sliderList.prepend(createCardList());
    currentPosition -= parseFloat(getComputedStyle(sliderList).width);
    sliderList.style.left = `${currentPosition}px`;
    sliderList.style.transform = `translateX(${currentTranslatePosition}px)`;
    setTimeout(function(){
        leftButton.addEventListener('click', showLeftSlide);
        sliderList.lastElementChild.remove();
    }, 500)
}

function showRightSlide(){
    rightButton.removeEventListener('click', showRightSlide);
    sliderList.append(createCardList());
    currentTranslatePosition -= parseFloat(getComputedStyle(sliderList).width);
    sliderList.style.transform = `translateX(${currentTranslatePosition}px)`;
    currentPosition += parseFloat(getComputedStyle(sliderList).width);
    setTimeout(function(){
        rightButton.addEventListener('click', showRightSlide)
        sliderList.style.left = `${currentPosition}px`;
        sliderList.firstElementChild.remove();
    }, 500)
}



function createCardList(){
    let countOfCards = cardsList.children.length;
    
    let petsList = [... pets];

    let newCardsList = document.createElement('div')
    newCardsList.classList.add('animals__cards');    
    function makeRandomArr(a, b) {
        return Math.random() - 0.5;
      }
      
    let shuffleArr = [... petsList.sort(makeRandomArr)];   
    
    let number = 1;
    for (let i = 0; i<countOfCards; i++) {
        newCardsList.append(createCard(shuffleArr[i], number))
        number++
    }

    return newCardsList
}

function createCard(cardValues, numberOfSlide) {
    // обёртка
    let animalCard = document.createElement('div');
    animalCard.classList.add('animal__card');

    if(numberOfSlide > 4) {
        animalCard.classList.add('animal__card-none');
    }

    // фотка

    let animalCardPhoto = document.createElement('div');
    animalCardPhoto.classList.add("animal__card-photo");

    let cardPhoto = document.createElement('img');
    cardPhoto.classList.add('card-photo');
    cardPhoto.src = `${cardValues.image}`;

    let cardActive = document.createElement('div')
    cardActive.classList.add('card__active');

    let animalDescription = document.createElement('div')
    animalDescription.classList.add('animal__description');

    let animalName = document.createElement('p');
    animalName.classList.add("animal__card-name");
    animalName.innerHTML = `${cardValues.name}`;

    let animalCountry = document.createElement('p');
    animalCountry.classList.add('animal__card-country');
    animalCountry.innerHTML = `${cardValues.description}`;


    animalDescription.append(animalName, animalCountry);
    cardActive.append(animalDescription);
    animalCardPhoto.append(cardPhoto, cardActive);


    let animalCardFooter = document.createElement('div');
    animalCardFooter.classList.add("animal__card__footer");
    animalCardFooter.append(animalDescription);

    let animalSvg = document.createElement('img');
    animalSvg.classList.add("animal__card-icon");
    animalSvg.src = `${cardValues.svg}`;

    animalCardFooter.append(animalSvg);


    animalCard.append(animalCardPhoto, animalCardFooter);


    return animalCard;
}
