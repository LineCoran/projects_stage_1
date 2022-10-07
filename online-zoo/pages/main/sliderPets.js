import pets from "./pets.js";

const leftButton = document.getElementById('petsLeft')
const rightButton = document.getElementById('petsRight')
const cardsList = document.getElementById('cardsList');
const sliderList = document.getElementById('sliderList');
let currentPosition = 0;
leftButton.addEventListener('click', showLeftSlide);
rightButton.addEventListener('click', showRightSlide);


function showLeftSlide() {
    leftButton.removeEventListener('click', showLeftSlide);
    sliderList.prepend(createCardList());
    sliderList.style.transition = 'none';
    currentPosition -= parseFloat(getComputedStyle(sliderList).width);
    sliderList.style.transform = `translateX(${currentPosition}px)`
    setTimeout(function(){
        sliderList.style.transition = '0.4s ease-out'
    currentPosition += parseFloat(getComputedStyle(sliderList).width);
    sliderList.style.transform = `translateX(${currentPosition}px)`
    }, 100)

    setTimeout(function(){
        leftButton.addEventListener('click', showLeftSlide)
    }, 500)
    
}

function showRightSlide(){
    rightButton.removeEventListener('click', showRightSlide);
    currentPosition -= parseFloat(getComputedStyle(sliderList).width);
    sliderList.append(createCardList());
    sliderList.style.transform = `translateX(${currentPosition}px)`;

    setTimeout(function(){
        rightButton.addEventListener('click', showRightSlide)
    }, 500)
}



function createCardList(){
    let countOfCards = cardsList.children.length;
    
    let petsList = [... pets];

    let newCardsList = document.createElement('div')
    newCardsList.classList.add('animals__cards');

    let newSlide = document.createElement('div')
    

    function makeRandomArr(a, b) {
        return Math.random() - 0.5;
      }
      
    let shuffleArr = [... petsList.sort(makeRandomArr)];   

    for (let i = 0; i<countOfCards; i++) {
        newCardsList.append(createCard(shuffleArr[i]))
    }

    return newCardsList
}

function createCard(cardValues) {
    // обёртка
    let animalCard = document.createElement('div');
    animalCard.classList.add('animal__card');

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

// createCardList()
