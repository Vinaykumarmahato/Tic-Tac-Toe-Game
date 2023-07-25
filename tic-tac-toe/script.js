//!----- Cells -----
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

//!----- Statistic -----
const winX = document.querySelector(".x-win-count");
const drawCount = document.querySelector(".draw-count");
const winO = document.querySelector(".o-win-count");
const stat = {
    X: 0,
    D: 0,
    O: 0
}

//!----- Выиграшные комбинации -----
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let cross = '<svg class="cross"><use href="./other/symbol-defs.svg#icon-cross"></use></svg>';
let circle = '<svg class="circle"><use href="./other/symbol-defs.svg#icon-circle"></use></svg>';

//!----- Клетки поля изначально пустые -----
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

//!----- Иницилизация игры -----
function initializeGame(){
    cells.forEach(cells => cells.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

//!----- Отслеживает каждый клик по пустому полю -----
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    
    if(options[cellIndex] != "" || !running){
        return;
    }
    
    updateCell(this, cellIndex);
    checkWinner();
}

//!----- Заменяет в массиве options пустые места на текущего игрока ( "O" или "X") -----
function updateCell(cell, index){
    options[index] = currentPlayer;
    if(currentPlayer === "X"){
        cell.innerHTML = cross;
    }
    else{
        cell.innerHTML = circle;
    }
    // cell.textContent = currentPlayer;
}

//!-----Меняет каждый раз текущего игрока-----
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

//!----- После каждого хода проверяет победу -----
function checkWinner(){
    let roundWon = false;
    
    for(let i = 0; i < winCombinations.length; i += 1){
        const condition = winCombinations[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        //!----- Проверяет клетки, если пустые ничего не делает, -----
        //!----- если они не пустые и одинаковые, -----
        //!----- то добавляет выиграшным клеткам стиль победы -----
        if (cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        else if(cellA == cellB && cellB == cellC){
            cells[condition[0]].classList.add('win');
            cells[condition[1]].classList.add('win');
            cells[condition[2]].classList.add('win');
            roundWon = true;
            break;
        }
        // const condition = winCombinations[i];
        // const cellA = options[condition[0]];
        // const cellB = options[condition[1]];
        // const cellC = options[condition[2]];
    
        // if(cellA == "" || cellB == "" || cellC == ""){
        //     continue;
        // }
        // if(cellA == cellB && cellB == cellC){
        //     roundWon = true;
        //     break;
        // }
    }
    
    //!----- Если победа, проверяет чья она и обновляет статиску -----
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
        if (currentPlayer === "X"){ 
            stat.X += 1;
            winX.textContent = stat.X;
        } else{
            stat.O += 1;
            winO.textContent = stat.O;
        }
    } 
    //!----- Если ничья, обновляет статиску и подсвечивает все клетки-----
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
        stat.D += 1;
        drawCount.textContent = stat.D;
        cells.forEach(cells => cells.classList.add('draw'));
    }
    //!----- Если не ничья и не победа, то игра продолжается-----
    else{
        changePlayer();
    }
}

//!----- Кнопка, которая обновляет все -----
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove('win');
        cell.classList.remove('draw');
    })
    // cells.forEach(cells => cells.textContent = "");
    // cells.forEach(cells => cells.classList.remove('win'));
    // cells.forEach(cells => cells.classList.remove('draw'));
    running = true;
}

initializeGame();