const audio = new Audio();
audio.src = "./audio/lock.mp3";

let setting = {
    size: 4,
    sound: true,
    moves: 0,
    countOfSize: 6,
    minutes: 0,
    seconds: 0,
    gameIsStart: false,
    volume: true,
    thereIsWinnerWindwo: false,
    game: 0,
}


const body = document.getElementById('body');
let timer;  

setStartSetting();
createHtml();
createSetting();
createInfo();






let containerNode = document.getElementById('PuzzleNode');
let itemNodes = Array.from(containerNode.querySelectorAll('.puzzle__item'));
let COUNT_ITEM = setting.size**2;
let wonMatrix = new Array(setting.size**2).fill(0).map((item, i) => i+1);

/* set position */

let matrix = getMatrix(
    itemNodes.map(item => Number(item.dataset.id))
)
setPositionItems(matrix) 

function getMatrix(arr) {
    let matrix = [];
    for (let i = 0; i < setting.size; i ++) {
        matrix.push([])
    }
    
    let x = 0;
    let y = 0;

    for (let i = 0; i<arr.length; i++) {
        if (x == setting.size) {
            y++;
            x = 0;
        }
        matrix[y][x] = arr[i];
        x++
    }
    return matrix
}

function setPositionItems(matrix) {
    for (let x = 0; x<matrix.length; x++) {
        for (let y = 0; y<matrix[x].length; y++) {
            const currentValue = matrix[y][x];
            const item = itemNodes[currentValue-1];
            setPosititonStyleCss(item, x, y);
        }
    }
}

function setPosititonStyleCss(item, x, y) {
    const itemWidth = 100;
    item.style.transform = `translate(${x*itemWidth}%, ${y*itemWidth}%)`;
}


shuffleItems();
/* Shiffle  */

let  shuffleButton = document.getElementById('shuffle')
function shuffleItems() {
    do {
        matrix = getMatrix (
            itemNodes.map(item => Number(item.dataset.id))
                     .sort(() => Math.random() - 0.5)
        )
    } while (!isValidMatrix(matrix))
    
    setPositionItems(matrix);

    setting.moves = 0;
    changeMoves();

    clearInterval(timer)
    setting.gameIsStart = false;
    setting.seconds = 0;
    setting.minutes = 0;
    document.getElementById('timer').innerHTML = showTime();
    
}
shuffleButton.addEventListener('click', () => shuffleItems());

/* Change position by click */

let unvisibleItem = setting.size**2;
containerNode.addEventListener('click', (event)=> listenerForItemNode(event))

function listenerForItemNode(event) {
    const itemNode = event.target.closest('span');
    if (!itemNode) {
        return
    }
    const itemNumber = Number(itemNode.dataset.id);
    const clickedItemCoordinate = findCoordinateByItemId(matrix, itemNumber);
    const unvisibleItemCoordinate = findCoordinateByItemId(matrix, unvisibleItem);
    const canWeSwap = checkedPossibilityToSwap(clickedItemCoordinate, unvisibleItemCoordinate);

    if (canWeSwap) {
        swapItems(clickedItemCoordinate, unvisibleItemCoordinate, matrix);
        setting.moves++;
        changeMoves();
        playAudio();
        if (!setting.gameIsStart) {
            setting.gameIsStart = true;
            timer = setInterval(changeSeconds, 1000);
        } 
    }

}

function findCoordinateByItemId(matrix, number) {
    for (let y = 0; y < matrix.length; y++){
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == number) {
                return {"x": x, "y": y}
            }
        }
    }
}

function checkedPossibilityToSwap(clicked, blank) {
    const absX = Math.abs(clicked.x - blank.x);
    const absY = Math.abs(clicked.y - blank.y);
    if (
        (absX == 1 && absY == 0) || 
        (absY == 1 && absX == 0) 
    )
        {
        return true
    } else {
        return false
    }
}

function swapItems(coord1, coord2, matrix) {
    let clicked = matrix[coord1.y][coord1.x];
    let blank = matrix[coord2.y][coord2.x];
    matrix[coord1.y][coord1.x] = blank;
    matrix[coord2.y][coord2.x] = clicked;
    setPositionItems(matrix);

    if(isWon()) {
        youAreWon()
    }
}

/* Change position by keyboard */ 

window.addEventListener('keydown', (event) => {
    if (!event.key.includes("Arrow")){
        return
    };
    const unvisibleItemCoordinate = findCoordinateByItemId(matrix, unvisibleItem);

    const itemCoordinate = {
        x: unvisibleItemCoordinate.x,
        y: unvisibleItemCoordinate.y
    }

    const direction = event.key.split('Arrow')[1].toLowerCase();
    
    switch(direction) {
        case 'up':
            itemCoordinate.y += 1;
            break;
        case 'down':
            itemCoordinate.y -= 1;
            break;    
        case 'left':
            itemCoordinate.x += 1;
            break;
        case 'right':
            itemCoordinate.x -= 1;
            break;        
    }
    const canWeSwap = checkedPossibilityToSwapByKey(itemCoordinate);

    if(canWeSwap) {
        swapItems(itemCoordinate, unvisibleItemCoordinate, matrix);
        setting.moves++;
        changeMoves();

        playAudio();
        if (!setting.gameIsStart) {
            setting.gameIsStart = true;
            timer = setInterval(changeSeconds, 1000);
        } 
    }
    
})

function checkedPossibilityToSwapByKey(coord) {
    if (coord.x>setting.size-1 || coord.y>setting.size-1 || coord.x<0 || coord.y <0) {
        return false
    } else {
        return true;
    }
}


//checked won or not

function isWon() {
    const flatCurrentMatrix = matrix.flat()
    for (let i = 0; i<flatCurrentMatrix.length; i++) {
        if (flatCurrentMatrix[i] !== wonMatrix[i])
        return false;
    } 
    return true;
}

function youAreWon() {
    
    clearInterval(timer);
    setTimeout(function(){

        setResultIfYouAreWon()
        setting.gameIsStart = false;
        createWinnerWindow();

        setting.moves = 0;
        changeMoves();
        setting.seconds = -1;
        changeSeconds();
        
    }, 250);

}


//create HTML Elements

function createHtml() {
    let container = document.createElement('div');
    container.classList.add('container');

    let gameName = document.createElement('h1')
    gameName.classList.add('gamename');
    gameName.innerHTML = 'Puzzle Game';

    let mainInner = document.createElement('div');
    mainInner.classList.add('main__inner');

    let puzzleNode = document.createElement('div');
    puzzleNode.id = "PuzzleNode";
    puzzleNode.classList = "puzzle";
    for (let i = 1; i <= setting.size**2; i++) {
        let puzzle = document.createElement('span');
        if (i === setting.size**2) {
            puzzle.id = "last__item"   
        }
        puzzle.classList = ('puzzle__item');
        puzzle.setAttribute(`data-id`, `${i}`);
        puzzle.innerHTML = `${i}`;
        puzzle.style.height = `${100/setting.size}%`
        puzzle.style.width = `${100/setting.size}%`
        puzzleNode.append(puzzle);
    }
    body.append(container)
    container.append(gameName)
    container.append(mainInner);
    mainInner.append(puzzleNode);
}

function createSetting() {
    let settingNode = document.createElement('div');
    settingNode.classList.add('setting');

    let settingInner = document.createElement('div')
    settingInner.classList.add('setting__inner');

    let settingMainText = document.createElement('h2');
    settingMainText.classList.add('setting__maintext'); 
    settingMainText.innerHTML = "Setting";

    let chooseSize = document.createElement('div');
    chooseSize.classList.add('choose__size'); 

    for (let i = 0; i< setting.countOfSize; i++) {
        let sizeButton = document.createElement('button');
        sizeButton.classList.add("size__button"); 
        sizeButton.id = `size-${i+3}`;
        sizeButton.innerHTML = `${i+3}x${i+3}`;
        chooseSize.append(sizeButton);
    }

    let shuffleButton = document.createElement('button');
    shuffleButton.classList.add('shuffle');
    shuffleButton.id = "shuffle";
    shuffleButton.innerHTML = 'Shuffle and start';

    let soundButton = createButtons("sound", "Sound", event=>changeSoundVolume(event))
    let bestButton = createButtons("best-result", "Top result", (event)=>creatingListBestResult(event) );
    let saveButton = createButtons('save-button', "Save", event=>saveProgress(event));
    let loadButton = createButtons('load-button', "Load", event=>loadProgress(event));

    settingInner.append(settingMainText, chooseSize, soundButton, bestButton, saveButton, loadButton, shuffleButton);
    settingNode.append(settingInner);
    body.querySelector('.main__inner').append(settingNode);
}

function saveProgress() {
    localStorage.setItem("saveSize", setting.size);
    localStorage.setItem("saveMoves", setting.moves);
    localStorage.setItem("saveSecond", setting.seconds);
    localStorage.setItem("saveMinutes", setting.minutes);
    localStorage.setItem("saveMatrix", matrix);
}

function loadProgress() {
    setting.size =  localStorage.getItem("saveSize");
    setting.moves = localStorage.getItem("saveMoves");
    setting.seconds =  localStorage.getItem("saveSecond");
    setting.minutes =  localStorage.getItem("saveMinutes");
    let loadMatrix = localStorage.getItem("saveMatrix").split(',');
    matrix = getMatrix(loadMatrix);  
    
    // init();
    // setPositionItems(matrix)
    // changeMoves()
    // changeSeconds();

    if (document.querySelector('.container')) {
        document.querySelector('.container').remove()
    }
    createHtml();  
    createSetting();
    createInfo();
    containerNode = document.getElementById('PuzzleNode'); 
    itemNodes = Array.from(containerNode.querySelectorAll('.puzzle__item'));
    COUNT_ITEM = setting.size**2;
    setPositionItems(matrix)
    unvisibleItem = setting.size**2;
    containerNode.addEventListener('click', (event)=> listenerForItemNode(event))

    chooseSizeButtons = document.querySelectorAll('.size__button');
    chooseSizeButtons.forEach((item) => {
        item.addEventListener('click', (event) => listenerForSizeButtons(event))
    });

    shuffleButton = document.getElementById('shuffle');
    shuffleButton.addEventListener('click', () => shuffleItems());

    changeMoves();
    changeSeconds();

    clearInterval(timer);

    setTimeout(function(){
        setting.gameIsStart = false;
    }, 250);

    // shuffleItems()
}


function createButtons(id, innerHtml, listener) {
    let button = document.createElement('button')
    button.classList.add("sound__button")
    button.classList.add("sound__button-on");
    button.id = id;
    button.innerHTML = innerHtml;
    button.addEventListener('click', listener);
    return button;
}

function createInfo() {
    let infoWrapper = document.createElement('div');
    infoWrapper.classList.add('info__wrapper')

    let infoTime = document.createElement('div');
    infoTime.classList.add('info__value')
    let infoTimeTitle = document.createElement('h3');
    infoTimeTitle.innerHTML = "Time";
    let infoTimeSubTitle = document.createElement('p');
    infoTimeSubTitle.id = 'timer';
    infoTimeSubTitle.innerHTML = "00:00"; 

    let infoMoves = document.createElement('div');
    infoMoves.classList.add('info__value')
    let infoMovesTitle = document.createElement('h3');
    infoMovesTitle.innerHTML = "Moves";
    let infoMovesSubTitle = document.createElement('p');
    infoMovesSubTitle.id = 'moves';
    infoMovesSubTitle.innerHTML = setting.moves; 


    infoTime.append(infoTimeTitle, infoTimeSubTitle);
    infoMoves.append(infoMovesTitle, infoMovesSubTitle);
    infoWrapper.append(infoTime, infoMoves);

    document.querySelector('.setting').append(infoWrapper)
}

function createWinnerWindow(){
    
    let winnerWindow = document.createElement('div');
    winnerWindow.classList.add('winner');

    let winnerWrapper = document.createElement('div');
    winnerWrapper.classList.add('winner__wrapper');

    let winnerTitle = document.createElement('h2');
    winnerTitle.classList.add('winner__title');
    winnerTitle.innerHTML = `Hooray! You solved the puzzle in ${showTime()} and ${setting.moves} moves`

    let winnerCloseButton = document.createElement('button');
    winnerCloseButton.classList.add('winner__close');
    winnerCloseButton.innerHTML = 'Continue';

    winnerWrapper.append(winnerTitle, winnerCloseButton);
    winnerWindow.append(winnerWrapper);

    winnerCloseButton.addEventListener('click', function(){
        document.querySelector('.winner').remove()
    })

    
    body.append(winnerWindow)
}

//choose size of nodeIntems
let chooseSizeButtons = document.querySelectorAll('.size__button');
chooseSizeButtons.forEach((item) => {
    item.addEventListener('click', (event) => listenerForSizeButtons(event))
});

function listenerForSizeButtons(event) {
    setting.size = Number(event.target.id.split('size-')[1]);
    bestResult = (!localStorage.getItem(`${setting.size}result`))?[]:JSON.parse(localStorage.getItem(`${setting.size}result`));
    init();
}



// init game 
function init() {

    setting.moves = 0;
    if (document.querySelector('.container')) {
        document.querySelector('.container').remove()
    }
    createHtml();  
    createSetting();
    createInfo();
    containerNode = document.getElementById('PuzzleNode'); 
    itemNodes = Array.from(containerNode.querySelectorAll('.puzzle__item'));
    COUNT_ITEM = setting.size**2;
    matrix = getMatrix(itemNodes.map(item => Number(item.dataset.id)));
    setPositionItems(matrix)
    unvisibleItem = setting.size**2;
    containerNode.addEventListener('click', (event)=> listenerForItemNode(event))

    chooseSizeButtons = document.querySelectorAll('.size__button');
    chooseSizeButtons.forEach((item) => {
        item.addEventListener('click', (event) => listenerForSizeButtons(event))
    });

    shuffleButton = document.getElementById('shuffle');
    shuffleButton.addEventListener('click', () => shuffleItems());

    changeMoves();

    clearInterval(timer);

    setTimeout(function(){
        setting.gameIsStart = false;
    }, 250);

    shuffleItems()
}

// setting 

function changeMoves() {
    let moveInfo = document.getElementById('moves');
    moveInfo.innerHTML = setting.moves;
}



// timer()

function changeSeconds() {

    setting.seconds++;
    if (setting.seconds == 60) {
        setting.seconds=0;
        setting.minutes++;
    }
    document.getElementById('timer').innerHTML = showTime();
}

function showTime() {
    let secondsString = ""
    let minutesString = ""
    secondsString = (String(setting.seconds).length==1)?`0${setting.seconds}`:`${setting.seconds}`;
    minutesString = (String(setting.minutes).length==1)?`0${setting.minutes}`:`${setting.minutes}`;
    return `${minutesString}:${secondsString}`;
}


// checkValidMatrix 
function isValidMatrix(matrix) {
    let currentMatrix = JSON.parse(JSON.stringify(matrix)).flat();
    let countOfInversion = 0;
    let blank = Math.floor(currentMatrix.indexOf(setting.size**2)/setting.size);

    for (let i = 0; i < currentMatrix.length; i++) {
        let item = currentMatrix[i];
        if (item == setting.size**2) {
            continue;
        }
        for (let j = currentMatrix.indexOf(item); j < currentMatrix.length; j++) {
            if (item > currentMatrix[j]) {
                countOfInversion++
            }
        }
    }

    if (setting.size%2 == 0) {
        return ((countOfInversion+blank)%2 !== 0)?true:false
    } else {
        return (countOfInversion%2 === 0)?true:false;
    }
}

// playAudio 

function playAudio() {
    if (setting.volume) {
        let newSound = new Audio();
        newSound.src = "./audio/lock.mp3"
        newSound.play()
    } else {
        return;
    }
    
}

// soundButton 

function changeSoundVolume(event) {
    let item = event.target;
    item.classList.toggle('sound__button-off');
    setting.volume = (!setting.volume)?true:false;
}

// top best result 

function creatingListBestResult() {
    sortBestResult();

    let winnerWindow = document.createElement('div');
    winnerWindow.classList.add('winner', 'result');

    let winnerWrapper = document.createElement('div');
    winnerWrapper.classList.add('winner__wrapper', 'result__wrapper');

    let winnerTitle = document.createElement('h2');
    winnerTitle.classList.add('winner__title');
    winnerTitle.innerHTML = `Top 10 results size ${setting.size}x${setting.size}`;

    let winnerList = document.createElement('ol');

    for (let i = 0; i < bestResult.length; i++) {
        let winnerListItem = document.createElement('li');
        winnerListItem.innerHTML = `${bestResult[i]} Moves`;
        winnerList.append(winnerListItem);
    }

    let winnerCloseButton = document.createElement('button');
    winnerCloseButton.classList.add('winner__close');
    winnerCloseButton.innerHTML = 'Continue';

    winnerWrapper.append(winnerTitle, winnerCloseButton, winnerList);
    winnerWindow.append(winnerWrapper);

    winnerCloseButton.addEventListener('click', function(){
        document.querySelector('.winner').remove();
        setting.thereIsWinnerWindwo = false;
    })

    if (!setting.thereIsWinnerWindwo) {
        body.append(winnerWindow);
        setting.thereIsWinnerWindwo = true;    
    }
}

function setStartSetting() {
    setting.size = (localStorage.getItem(`currentSize`))?localStorage.getItem('currentSize'):4;
    bestResult = (!localStorage.getItem(`${setting.size}result`))?[]:JSON.parse(localStorage.getItem(`${setting.size}result`));
}

function setResultIfYouAreWon() {
    bestResult.push(
        setting.moves
    )
}


window.addEventListener('beforeunload', function() {
    localStorage.setItem(`${setting.size}result`, JSON.stringify(bestResult));
    localStorage.setItem(`currentSize`, setting.size);
})


function sortBestResult() {
    if (!!bestResult.length) {
        bestResult.sort((a, b) => a - b);
    }
}


