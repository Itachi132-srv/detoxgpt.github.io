const board = document.getElementById("board");
const diceEl = document.getElementById("dice");
const turnEl = document.getElementById("turn");

let cells=[];
let path=[];
let playerPos=0;
let aiPos=0;
let playerTurn=true;

// create board
for(let i=0;i<100;i++){
    let cell=document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
    cells.push(cell);
}

// simple path (snake style)
for(let i=0;i<100;i++){
    path.push(i);
    cells[i].classList.add("path");
}

updateBoard();

function rollDice(){
    if(!playerTurn) return;

    let dice=Math.floor(Math.random()*6)+1;
    diceEl.innerText=dice;

    playerPos+=dice;

    if(playerPos>=99){
        alert("You Win 🎉");
        resetGame();
        return;
    }

    updateBoard();
    playerTurn=false;
    turnEl.innerText="AI Turn";

    setTimeout(aiMove,800);
}

function aiMove(){
    let dice=Math.floor(Math.random()*6)+1;
    diceEl.innerText=dice;

    aiPos+=dice;

    if(aiPos>=99){
        alert("AI Wins 🤖");
        resetGame();
        return;
    }

    updateBoard();
    playerTurn=true;
    turnEl.innerText="Your Turn";
}

function updateBoard(){
    cells.forEach(c=>c.innerHTML="");

    let pToken=document.createElement("div");
    pToken.classList.add("token","red");
    cells[path[playerPos]].appendChild(pToken);

    let aToken=document.createElement("div");
    aToken.classList.add("token","blue");
    cells[path[aiPos]].appendChild(aToken);
}

function resetGame(){
    playerPos=0;
    aiPos=0;
    playerTurn=true;
    turnEl.innerText="Your Turn";
    updateBoard();
}
