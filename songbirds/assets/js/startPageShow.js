import createHeaderBlock from "../components/header/header";
import createWelcomeBlock from "../components/welcome/welcome";
import init from "./game";
import { addListenerForLanguageButtons} from "./languageButtons";
import setActiveEnglish from "./languageButtons"

let gameIsStart = false;


export default function startPageShow() {
    let language = localStorage.getItem('lang');
    const wrapper = document.getElementById('wrapper');
    const mainPage = document.getElementById('main');
    const headerBlock = createHeaderBlock(language);
    const welcomePage =  createWelcomeBlock(language);
    wrapper.prepend(headerBlock);
    mainPage.append(welcomePage);
    listenerForHeaderButtons();
    addListenerForLanguageButtons();
    setActiveEnglish();
    listenerForPlayGame();
}

export function showStartPageAgain() {
    removeGamePage();
    startPageShow();
    gameIsStart = false;
}

export function startGame(game) {

    if (game) {
        deleteWelcomePage();
    }
    
    init();

    gameIsStart = true;
}

export function deleteWelcomePage() {
    const header = document.querySelector('.header__inner')
    const welcomePage = document.getElementById('welcome-page');
    welcomePage.remove();
    header.remove();
}

export function listenerForHeaderButtons() {
   
    const playGameButtonNav = document.getElementById('game-button');
    const mainPageButton = document.getElementById('main-button');
    
    playGameButtonNav.addEventListener('click', function() {
        if(!gameIsStart) {
            startGame(true);
        }
    });

    mainPageButton.addEventListener('click', function() {
        if(gameIsStart) {
            showStartPageAgain();
        }
    })
}

function listenerForPlayGame() {
    const playGameButton = document.querySelector('.welcome__button');
    playGameButton.addEventListener('click', startGame);
}

export function removeGamePage() {
    const header = document.querySelector('.header');
    const mainInner= document.getElementById('main__inner');

    header.remove();
    while(mainInner.firstChild) {
        mainInner.firstChild.remove()
    }
}