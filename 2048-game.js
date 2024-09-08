const tile = new Map();
for (i = 1; i <= 16; i++) {
  tile.set(i, { position: document.getElementById(i), currentValue: 0 });
}

const fullBoard = [];
  for (i = 1; i <= tile.size; i++) {
    fullBoard.push(i);
  }

function updateCurrentValue(old, updated){
  const newCurrentValue = {currentValue: updated};
  const updatedObject = Object.assign(old, newCurrentValue);
  return updatedObject;
}

const tileValue = new Map();
tileValue.set(2, { hex: "#E6E6FA", value: 2 });
tileValue.set(4, { hex: "#FFB7C5", value: 4 });
tileValue.set(8, { hex: "#87CEEB", value: 8 });
tileValue.set(16, { hex: "#32CD32", value: 16 });
tileValue.set(32, { hex: "FFDB58", value: 32 });
tileValue.set(64, { hex: "#FAC898", value: 64 });
tileValue.set(128, { hex: "00A36C", value: 128 });
tileValue.set(256, { hex: "#BC544B", value: 256 });
tileValue.set(512, { hex: "#A7C7E7", value: 512 });
tileValue.set(1024, { hex: "#77DD77", value: 1024 });
tileValue.set(2048, { hex: "#680C07", value: 2048 });

function isEmpty(target){
  return tile.get(target).currentValue === 0;
}

function matchingTiles(tileA, tileB){
  return tile.get(tileA).currentValue === tile.get(tileB).currentValue;
}

function isThereAGame() {
  for(let tile of fullBoard){
    if (!isEmpty(tile)){
      return true;
    }
  }
  return false;
}

function addTile() {
  let between1and10 = Math.floor(Math.random() * 10);
  if (between1and10 <= 7) {
    return 2;
  } else {
    return 4;
  }
}

function initiateGame() {
  let randomNo = Math.floor(Math.random() * 16);
  if (isThereAGame()) {
    return alert("There is already an active game!");
  }
  let tileToAdd = addTile();
  tile.get(randomNo).position.style.backgroundColor = tileValue.get(tileToAdd).hex;
  tile.get(randomNo).position.innerHTML = `<p>${tileValue.get(tileToAdd).value}</p>`;
  updateCurrentValue(tile.get(randomNo), tileToAdd);
}

function clearGame() {
  for (i = 1; i <= tile.size; i++) {
    tile.get(i).position.style.backgroundColor = "";
    tile.get(i).position.innerHTML = "";
    tile.set(i, updateCurrentValue(tile.get(i), 0))
  }
}

const startButton = document.getElementById("start");
startButton.addEventListener("click", initiateGame);

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", clearGame);

function openSquares() {
  let available = [];
  for (let i of fullBoard) {
    if (isEmpty(i)) {
      available.push(i);
    }
  }
  return available;
}

function nextSetOfTiles(givenTiles, numForNextEntry) {
  let newTileArray = [];
  for (let value of givenTiles) {
    newTileArray.push(value + numForNextEntry);
  }
  return newTileArray;
}

function compareArrays(array1, array2) {
  if (
    array1.length === array2.length &&
    array1.every((element, index) => element === array2[index])
  ) {
    return true;
  }
}

function canItMove(direction, startingLine, nextTile, nextLine, endingLine) {
  switch(direction){
    case 'right':
      startingLine = [1,5,9,13];
      nextLine = 1;
      endingLine = [4,8,12,16];
      break;
    case 'left':
      startingLine = [4,8,12,16];
      nextLine = -1;
      endingLine = [1,5,9,13];
      break;
    case 'down':
      startingLine = [1,2,3,4];
      nextLine = 4;
      endingLine = [13,14,15,16];
      break;
    case 'up':
      startingLine = [13,14,15,16];
      nextLine = -4;
      endingLine = [1,2,3,4];
      break;
  }

  while(!compareArrays(startingLine, endingLine)){
    for (let tileNo of startingLine) {
      if (!isEmpty(tileNo)){
        let tileAfter = tileNo + nextLine;
        if(isEmpty(tileAfter) || matchingTiles(tileNo, tileAfter)){
          return true;
        }
      }
    }
    startingLine = nextSetOfTiles(startingLine, nextLine)
  }
  //
  return false;
}

function tileToMove(currentLineTiles){
  if (!isEmpty(currentLineTiles[i])){
    tileToMerge = 0
    while(!isEmpty(currentLineTiles[tileToMerge]) && !matchingTiles(currentLineTiles[i], currentLineTiles[tileToMerge]) && tileToMerge < i){
      tileToMerge++;}
  }
  console.log(tileToMerge)
}

function shift(direction, iterator, currentLineTiles){
  switch(direction){
    case 'right':
      currentLineTiles = [4,3,2,1];
      iterator = 4;
      break;
    case 'left':
      currentLineTiles = [1,2,3,4];
      iterator = 4;
      break;
    case 'down':
      currentLineTiles = [13,9,5,1];
      iterator = 1;
      break;
    case 'up':
      currentLineTiles = [1,5,9,13];
      iterator = 1;
      break;
  }

  let line = 1
  while(line <= 4){
    for (i=1; i <=3; i++){
      if (!isEmpty(currentLineTiles[i])){
        tileToMerge = i;
        while(isEmpty(currentLineTiles[tileToMerge-1]) && tileToMerge-1 >= 0){
          tileToMerge--
        if(tileToMerge === 0){
          break;
          }
        }

        if(tileToMerge !== 0 && matchingTiles(currentLineTiles[i], currentLineTiles[tileToMerge-1])){
          tile.get(currentLineTiles[tileToMerge-1]).position.style.backgroundColor = tileValue.get((tile.get(currentLineTiles[i]).currentValue * 2)).hex
          tile.get(currentLineTiles[tileToMerge-1]).position.innerHTML = `<p>${tileValue.get((tile.get(currentLineTiles[i]).currentValue * 2)).value}</p>`;
          updateCurrentValue(tile.get(currentLineTiles[tileToMerge - 1]), tile.get(currentLineTiles[i]).currentValue * 2)

          tile.get(currentLineTiles[i]).position.style.backgroundColor = "";
          tile.get(currentLineTiles[i]).position.innerHTML = "";
          updateCurrentValue(tile.get(currentLineTiles[i]), 0);
          }

          else if (i !== tileToMerge) {
            tile.get(currentLineTiles[tileToMerge]).position.style.backgroundColor = tile.get(currentLineTiles[i]).position.style.backgroundColor;
            tile.get(currentLineTiles[tileToMerge]).position.innerHTML = tile.get(currentLineTiles[i]).position.innerHTML;
            updateCurrentValue(tile.get(currentLineTiles[tileToMerge]), tile.get(currentLineTiles[i]).currentValue)
  
            tile.get(currentLineTiles[i]).position.style.backgroundColor = "";
            tile.get(currentLineTiles[i]).position.innerHTML = "";
            updateCurrentValue(tile.get(currentLineTiles[i]), 0);
            }
      }
    }
    currentLineTiles = currentLineTiles.map((val) => val + iterator);
    line++;
  }
}

function moveRight(event) {
  if (isThereAGame()) {
    if (canItMove('right')) {
      if (event.code === "KeyD" || event.key === "ArrowRight") {
        shift('right');

        let nextSquare = openSquares();
        let randomNo = Math.floor(Math.random() * nextSquare.length);
        let newTile = addTile();
    
        tile.get(nextSquare[randomNo]).position.style.backgroundColor = `${tileValue.get(newTile).hex}`;
        tile.get(nextSquare[randomNo]).position.innerHTML = `<p>${tileValue.get(newTile).value}</p>`;
        updateCurrentValue(tile.get(nextSquare[randomNo]), newTile)
      }
    }
  }
}

function moveLeft(event) {
  if (isThereAGame()) {
    if (canItMove('left')) {
      if (event.code === "KeyA" || event.key === "ArrowLeft") {
        shift('left');

        let nextSquare = openSquares();
        let randomNo = Math.floor(Math.random() * nextSquare.length);
        let newTile = addTile();
    
        tile.get(nextSquare[randomNo]).position.style.backgroundColor = `${tileValue.get(newTile).hex}`;
        tile.get(nextSquare[randomNo]).position.innerHTML = `<p>${tileValue.get(newTile).value}</p>`;
        updateCurrentValue(tile.get(nextSquare[randomNo]), newTile)
      }
    }
  }
}


function moveDown(event) {
  if (isThereAGame()) {
    if (canItMove('down')) {
      if (event.code === "KeyS" || event.key === "ArrowDown") {
        shift('down');

        let nextSquare = openSquares();
        let randomNo = Math.floor(Math.random() * nextSquare.length);
        let newTile = addTile();
    
        tile.get(nextSquare[randomNo]).position.style.backgroundColor = `${tileValue.get(newTile).hex}`;
        tile.get(nextSquare[randomNo]).position.innerHTML = `<p>${tileValue.get(newTile).value}</p>`;
        updateCurrentValue(tile.get(nextSquare[randomNo]), newTile)
      }
    }
  }
}

function moveUp(event) {
  if (isThereAGame()) {
    if (canItMove('up')) {
      if (event.code === "KeyW" || event.key === "ArrowUp") {
        shift('up');

        let nextSquare = openSquares();
        let randomNo = Math.floor(Math.random() * nextSquare.length);
        let newTile = addTile();
    
        tile.get(nextSquare[randomNo]).position.style.backgroundColor = `${tileValue.get(newTile).hex}`;
        tile.get(nextSquare[randomNo]).position.innerHTML = `<p>${tileValue.get(newTile).value}</p>`;
        updateCurrentValue(tile.get(nextSquare[randomNo]), newTile)
      }
    }
  }
}

document.addEventListener("keydown", moveRight);
document.addEventListener("keydown", moveLeft);
document.addEventListener("keydown", moveDown);
document.addEventListener("keydown", moveUp);
