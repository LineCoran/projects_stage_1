const containerNode = document.getElementById('PuzzleNode');
const itemNodes = Array.from(containerNode.querySelectorAll('.puzzle__item'));
const COUNT_ITEM = 16;



let matrix = getMatrix(
    itemNodes.map(item => Number(item.dataset.id))
)

const wonMatrix = new Array(16).fill(0).map((item, i) => i+1)


setPositionItems(matrix) 

/* set position */
function getMatrix(arr) {
    let matrix = [[], [], [], []];
    let x = 0;
    let y = 0;

    for (let i = 0; i<arr.length; i++) {
        if (x == 4) {
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
    item.style.background = "yellow";
    item.style.transform = `translate(${x*itemWidth}%, ${y*itemWidth}%)`;
}

/* Shiffle  */
const shuffleButton = document.getElementById('shuffle')
function shuffleItems() {
    matrix = getMatrix (
        itemNodes.map(item => Number(item.dataset.id))
                 .sort(() => Math.random() - 0.5)
    )
    setPositionItems(matrix)
}
shuffleButton.addEventListener('click', () => shuffleItems());

/* Change position by click */

const unvisibleItem = 16;
containerNode.addEventListener('click', (event)=> {
    const itemNode = event.target.closest('span');
    if (!itemNode) {
        return
    }
    const itemNumber = Number(itemNode.dataset.id);
    const clickedItemCoordinate = findCoordinateByItemId(matrix, itemNumber);
    const unvisibleItemCoordinate = findCoordinateByItemId(matrix, unvisibleItem);
    const canWeSwap = checkedPossibilityToSwap(clickedItemCoordinate, unvisibleItemCoordinate);

    if (canWeSwap) {
        swapItems(clickedItemCoordinate, unvisibleItemCoordinate, matrix)
    }
    
})

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
        swapItems(itemCoordinate, unvisibleItemCoordinate, matrix)
    }
    
})

function checkedPossibilityToSwapByKey(coord) {
    if (coord.x>3 || coord.y>3 || coord.x<0 || coord.y <0) {
        return false
    } else {
        return true;
    }
}

function isWon() {
    const flatCurrentMatrix = matrix.flat()
    for (let i = 0; i<flatCurrentMatrix.length; i++) {
        if (flatCurrentMatrix[i] !== wonMatrix[i])
        return false;
    } 
    return true;
}

function youAreWon() {
    setTimeout(function(){
        alert('You are won!')
    }, 250)
}
