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

/*const tile1 = document.getElementById(1);
const tile2 = document.getElementById(2);
const tile3 = document.getElementById(3);
const tile4 = document.getElementById(4);
const tile5 = document.getElementById(5);
const tile6 = document.getElementById(6);
const tile7 = document.getElementById(7);
const tile8 = document.getElementById(8);
const tile9 = document.getElementById(9);
const tile10 = document.getElementById(10);
const tile11 = document.getElementById(11);
const tile12 = document.getElementById(12);
const tile13 = document.getElementById(13);
const tile14 = document.getElementById(14);
const tile15 = document.getElementById(15);
const tile16 = document.getElementById(16);
const arr = [
  tile1,
  tile2,
  tile3,
  tile4,
  tile5,
  tile6,
  tile7,
  tile8,
  tile9,
  tile10,
  tile11,
  tile12,
  tile13,
  tile14,
  tile15,
  tile16,
];*/

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
  tile.set(randomNo, updateCurrentValue(tile.get(randomNo), tileToAdd));
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

function shift(direction, iterator, currentLineTiles){
  switch(direction){
    case 'right':
      currentLineTiles = [4,3,2,1];
      iterator = 4;
  }
  let line = 1
  while(line <= 4){
    for (i=1; i <=3; i++){
      if (!isEmpty(currentLineTiles[i])){
        let tileToMerge = 0;
        while(!isEmpty(currentLineTiles[tileToMerge]) && !matchingTiles(currentLineTiles[i], currentLineTiles[tileToMerge])){
          tileToMerge++;
        }
      if(isEmpty(currentLineTiles[tileToMerge])){
        tile.get(currentLineTiles[tileToMerge]).position.style.backgroundColor = tile.get(currentLineTiles[i]).position.style.backgroundColor;
        tile.get(currentLineTiles[tileToMerge]).position.innerHTML = tile.get(currentLineTiles[i]).position.innerHTML;
        updateCurrentValue(tile.get(currentLineTiles[tileToMerge]), tile.get(currentLineTiles[i]).currentValue)

        tile.get(currentLineTiles[i]).position.style.backgroundColor = "";
        tile.get(currentLineTiles[i]).position.innerHTML = "";
        updateCurrentValue(tile.get(currentLineTiles[i]), 0);
        }
      else if(matchingTiles(currentLineTiles[i], currentLineTiles[tileToMerge])){
        tile.get(currentLineTiles[tileToMerge]).position.style.backgroundColor = tileValue.get((tile.get(currentLineTiles[i]).currentValue * 2)).hex
        tile.get(currentLineTiles[tileToMerge]).position.innerHTML = `<p>${tileValue.get((tile.get(currentLineTiles[i]).currentValue * 2)).value}</p>`;
        updateCurrentValue(tile.get(currentLineTiles[tileToMerge]), tile.get(currentLineTiles[i]).currentValue * 2)

        tile.get(currentLineTiles[i]).position.style.backgroundColor = "";
        tile.get(currentLineTiles[i]).position.innerHTML = "";
        updateCurrentValue(tile.get(currentLineTiles[i]), 0);
        }
      }
    }
    currentLineTiles = currentLineTiles.map((val) => val + iterator);
    line++;
    console.log(`Line: ${line}; currentLineTiles: ${currentLineTiles}`)
  }
}

/*function shiftRight(direction, startingLine, endingLine) {
  
  for (let i of excludingEndingLine.reverse()) {
    if (!isEmpty(i)) {
      
      const lineBeforeLast = endingLine.map((value) => value - 1);
      const x = numInTile(tile.get(i).currentValue);

        if (lineBeforeLast.includes(i)) {
          //If the selected tile is in the second right column
          if (arr[i + 1].style.backgroundColor == "") {
            //If the very right column is empty
            arr[i + 1].style.backgroundColor = arr[i].style.backgroundColor;
            arr[i + 1].innerHTML = arr[i].innerHTML;
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
          }

          if (
            arr[i + 1].style.backgroundColor != "" &&
            arr[i + 1].innerHTML == arr[i].innerHTML
          ) {
            //If next tile is not empty and has the same number
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i + 1].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i + 1].style.backgroundColor = `${tiles[x + 1].hex}`;
          }
        }

        if (secondLeftColumn.includes(i)) {
          //If the selected tile is in the second column to the left
          if (
            arr[i + 1].style.backgroundColor == "" &&
            arr[i + 2].style.backgroundColor == ""
          ) {
            //If the next two tiles are empty
            arr[i + 2].style.backgroundColor = arr[i].style.backgroundColor;
            arr[i + 2].innerHTML = arr[i].innerHTML;
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
          } else if (
            arr[i + 1].style.backgroundColor == "" &&
            arr[i + 2].style.backgroundColor != "" &&
            arr[i + 2].innerHTML != arr[i].innerHTML
          ) {
            //If the next tile is empty but the end tile has a different number
            arr[i + 1].style.backgroundColor = arr[i].style.backgroundColor;
            arr[i + 1].innerHTML = arr[i].innerHTML;
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
          }

          if (
            arr[i + 1].style.backgroundColor == "" &&
            arr[i + 2].innerHTML == arr[i].innerHTML
          ) {
            //If the next tile is empty but the end tile equals the selected tile
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i + 2].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i + 2].style.backgroundColor = `${tiles[x + 1].hex}`;
          } else if (
            arr[i + 1].style.backgroundColor != "" &&
            arr[i + 1].innerHTML == arr[i].innerHTML
          ) {
            //If the next tile has the same number as the selected tile
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i + 1].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i + 1].style.backgroundColor = `${tiles[x + 1].hex}`;
          }
        }

        if (veryLeftColumn.includes(i)) {
          //If the selected column is in the very left column
          if (
            arr[i + 1].style.backgroundColor == "" &&
            arr[i + 2].style.backgroundColor == "" &&
            arr[i + 3].style.backgroundColor == ""
          ) {
            // If all three next tiles are empty
            arr[i + 3].style.backgroundColor = arr[i].style.backgroundColor;
            arr[i + 3].innerHTML = arr[i].innerHTML;
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
          } else if (
            arr[i + 1].style.backgroundColor == "" &&
            arr[i + 2].style.backgroundColor == "" &&
            arr[i + 3].style.backgroundColor != "" &&
            arr[i + 3].innerHTML != arr[i].innerHTML
          ) {
            // If the next two tiles are empty and the last column tile has a different number
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i + 2].style.backgroundColor = `${tiles[x].hex}`;
            arr[i + 2].innerHTML = `<p>${tiles[x].number}</p>`;
          } else if (
            arr[i + 1].style.backgroundColor == "" &&
            arr[i + 2].style.backgroundColor != "" &&
            arr[i + 2].innerHTML != arr[i].innerHTML
          ) {
            //If the next tile is empty but the tile after has a different number
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i + 1].style.backgroundColor = `${tiles[x].hex}`;
            arr[i + 1].innerHTML = `<p>${tiles[x].number}</p>`;
          }

          if (
            arr[i + 1].style.backgroundColor == "" &&
            arr[i + 2].style.backgroundColor == "" &&
            arr[i + 3].innerHTML == arr[i].innerHTML
          ) {
            //If the next two tiles are empty and the last tile has the same number
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i + 3].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i + 3].style.backgroundColor = `${tiles[x + 1].hex}`;
          } else if (
            arr[i + 1].style.backgroundColor == "" &&
            arr[i + 2].style.backgroundColor != "" &&
            arr[i + 2].innerHTML == arr[i].innerHTML
          ) {
            //If the next tile is empty but the tile after has the same number
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i + 2].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i + 2].style.backgroundColor = `${tiles[x + 1].hex}`;
          } else if (
            arr[i + 1].style.backgroundColor != "" &&
            arr[i + 1].innerHTML == arr[i].innerHTML
          ) {
            //If the next tile has the same number
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i + 1].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i + 1].style.backgroundColor = `${tiles[x + 1].hex}`;
          }
        }
      
    }
  }
}*/


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
        updateCurrentValue(tile.get(nextSquare[randomNo]), addTile())
        console.log(tile.get(nextSquare[randomNo]))
      }
    }
  }
}

//Function to move left
function shiftLeft() {
  for (i = 0; i < arr.length; i++) {
    //For each tile from left to right, top to bottom
    if (arr[i].style.backgroundColor != "") {
      if (i != 0 && i != 4 && i != 8 && i != 12) {
        const veryRightColumn = [3, 7, 11, 15];
        const secondRightColumn = [2, 6, 10, 14];
        const secondLeftColumn = [1, 5, 9, 13];
        const x = numInTile(arr[i].innerHTML);

        if (secondLeftColumn.includes(i)) {
          if (arr[i - 1].style.backgroundColor == "") {
            arr[i - 1].style.backgroundColor = arr[i].style.backgroundColor;
            arr[i - 1].innerHTML = arr[i].innerHTML;
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
          }

          if (
            arr[i - 1].style.backgroundColor != "" &&
            arr[i - 1].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i - 1].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i - 1].style.backgroundColor = `${tiles[x + 1].hex}`;
          }
        }

        if (secondRightColumn.includes(i)) {
          if (
            arr[i - 1].style.backgroundColor == "" &&
            arr[i - 2].style.backgroundColor == ""
          ) {
            arr[i - 2].style.backgroundColor = arr[i].style.backgroundColor;
            arr[i - 2].innerHTML = arr[i].innerHTML;
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
          } else if (
            arr[i - 1].style.backgroundColor == "" &&
            arr[i - 2].style.backgroundColor != "" &&
            arr[i - 2].innerHTML != arr[i].innerHTML
          ) {
            arr[i - 1].style.backgroundColor = arr[i].style.backgroundColor;
            arr[i - 1].innerHTML = arr[i].innerHTML;
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
          }

          if (
            arr[i - 1].style.backgroundColor == "" &&
            arr[i - 2].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i - 2].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i - 2].style.backgroundColor = `${tiles[x + 1].hex}`;
          } else if (
            arr[i - 1].style.backgroundColor != "" &&
            arr[i - 1].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i - 1].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i - 1].style.backgroundColor = `${tiles[x + 1].hex}`;
          }
        }

        if (veryRightColumn.includes(i)) {
          if (
            arr[i - 1].style.backgroundColor == "" &&
            arr[i - 2].style.backgroundColor == "" &&
            arr[i - 3].style.backgroundColor == ""
          ) {
            arr[i - 3].style.backgroundColor = arr[i].style.backgroundColor;
            arr[i - 3].innerHTML = arr[i].innerHTML;
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
          } else if (
            arr[i - 1].style.backgroundColor == "" &&
            arr[i - 2].style.backgroundColor == "" &&
            arr[i - 3].style.backgroundColor != "" &&
            arr[i - 3].innerHTML != arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i - 2].style.backgroundColor = `${tiles[x].hex}`;
            arr[i - 2].innerHTML = `<p>${tiles[x].number}</p>`;
          } else if (
            arr[i - 1].style.backgroundColor == "" &&
            arr[i - 2].style.backgroundColor != "" &&
            arr[i - 2].innerHTML != arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i - 1].style.backgroundColor = `${tiles[x].hex}`;
            arr[i - 1].innerHTML = `<p>${tiles[x].number}</p>`;
          }

          if (
            arr[i - 1].style.backgroundColor == "" &&
            arr[i - 2].style.backgroundColor == "" &&
            arr[i - 3].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i - 3].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i - 3].style.backgroundColor = `${tiles[x + 1].hex}`;
          } else if (
            arr[i - 1].style.backgroundColor == "" &&
            arr[i - 2].style.backgroundColor != "" &&
            arr[i - 2].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i - 2].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i - 2].style.backgroundColor = `${tiles[x + 1].hex}`;
          } else if (
            arr[i - 1].style.backgroundColor != "" &&
            arr[i - 1].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i - 1].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i - 1].style.backgroundColor = `${tiles[x + 1].hex}`;
          }
        }
      }
    }
  }
}

function moveLeft(event) {
  if (isThereAGame()) {
    if (canItMoveLeft()) {
      if (event.code === "KeyA" || event.key === "ArrowLeft") {
        shiftLeft();

        let nextSquare = openSquares(arr);
        let randomNo = Math.floor(Math.random() * nextSquare.length);
        nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
        nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
      }
    }
  }
}

function shiftDown() {
  for (i = arr.length - 1; i >= 0; i--) {
    if (arr[i].style.backgroundColor != "") {
      //If the number in the target tile is "y"
      if (i != 12 && i != 13 && i != 14 && i != 15) {
        //Anything but the very right column
        const veryTopColumn = [0, 1, 2, 3];
        const secondTopColumn = [4, 5, 6, 7];
        const secondBottomColumn = [8, 9, 10, 11];
        const x = numInTile(arr[i].innerHTML);

        if (secondBottomColumn.includes(i)) {
          if (arr[i + 4].style.backgroundColor == "") {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i + 4].style.backgroundColor = `${tiles[x].hex}`;
            arr[i + 4].innerHTML = `<p>${tiles[x].number}</p>`;
          }

          if (
            arr[i + 4].style.backgroundColor != "" &&
            arr[i + 4].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i + 4].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i + 4].style.backgroundColor = `${tiles[x + 1].hex}`;
          }
        }

        if (secondTopColumn.includes(i)) {
          if (
            arr[i + 4].style.backgroundColor == "" &&
            arr[i + 8].style.backgroundColor == ""
          ) {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i + 8].style.backgroundColor = `${tiles[x].hex}`;
            arr[i + 8].innerHTML = `<p>${tiles[x].number}</p>`;
          } else if (
            arr[i + 4].style.backgroundColor == "" &&
            arr[i + 8].style.backgroundColor != "" &&
            arr[i + 8].innerHTML != arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i + 4].style.backgroundColor = `${tiles[x].hex}`;
            arr[i + 4].innerHTML = `<p>${tiles[x].number}</p>`;
          }

          if (
            arr[i + 4].style.backgroundColor == "" &&
            arr[i + 8].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i + 8].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i + 8].style.backgroundColor = `${tiles[x + 1].hex}`;
          } else if (
            arr[i + 4].style.backgroundColor != "" &&
            arr[i + 4].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i + 4].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i + 4].style.backgroundColor = `${tiles[x + 1].hex}`;
          }
        }

        if (veryTopColumn.includes(i)) {
          if (
            arr[i + 4].style.backgroundColor == "" &&
            arr[i + 8].style.backgroundColor == "" &&
            arr[i + 12].style.backgroundColor == ""
          ) {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i + 12].style.backgroundColor = `${tiles[x].hex}`;
            arr[i + 12].innerHTML = `<p>${tiles[x].number}</p>`;
          } else if (
            arr[i + 4].style.backgroundColor == "" &&
            arr[i + 8].style.backgroundColor == "" &&
            arr[i + 12].style.backgroundColor != "" &&
            arr[i + 12].innerHTML != arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i + 8].style.backgroundColor = `${tiles[x].hex}`;
            arr[i + 8].innerHTML = `<p>${tiles[x].number}</p>`;
          } else if (
            arr[i + 4].style.backgroundColor == "" &&
            arr[i + 8].style.backgroundColor != "" &&
            arr[i + 8].innerHTML != arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i + 4].style.backgroundColor = `${tiles[x].hex}`;
            arr[i + 4].innerHTML = `<p>${tiles[x].number}</p>`;
          }

          if (
            arr[i + 4].style.backgroundColor == "" &&
            arr[i + 8].style.backgroundColor == "" &&
            arr[i + 12].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i + 12].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i + 12].style.backgroundColor = `${tiles[x + 1].hex}`;
          } else if (
            arr[i + 4].style.backgroundColor == "" &&
            arr[i + 8].style.backgroundColor != "" &&
            arr[i + 8].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i + 8].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i + 8].style.backgroundColor = `${tiles[x + 1].hex}`;
          } else if (
            arr[i + 4].style.backgroundColor != "" &&
            arr[i + 4].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i + 4].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i + 4].style.backgroundColor = `${tiles[x + 1].hex}`;
          }
        }
      }
    }
  }
}

function moveDown(event) {
  if (isThereAGame()) {
    if (canItMoveDown()) {
      if (event.code === "KeyS" || event.key === "ArrowDown") {
        shiftDown();

        let nextSquare = openSquares(arr);
        let randomNo = Math.floor(Math.random() * nextSquare.length);
        nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
        nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
      }
    }
  }
}

function shiftUp() {
  for (i = 0; i < arr.length; i++) {
    if (arr[i].style.backgroundColor != "") {
      //If the number in the target tile is "y"
      if (i != 0 && i != 1 && i != 2 && i != 3) {
        //Anything but the very right column
        const veryBottomColumn = [12, 13, 14, 15];
        const secondTopColumn = [4, 5, 6, 7];
        const secondBottomColumn = [8, 9, 10, 11];
        const x = numInTile(arr[i].innerHTML);

        if (secondTopColumn.includes(i)) {
          if (arr[i - 4].style.backgroundColor == "") {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i - 4].style.backgroundColor = `${tiles[x].hex}`;
            arr[i - 4].innerHTML = `<p>${tiles[x].number}</p>`;
          }

          if (
            arr[i - 4].style.backgroundColor != "" &&
            arr[i - 4].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i - 4].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i - 4].style.backgroundColor = `${tiles[x + 1].hex}`;
          }
        }

        if (secondBottomColumn.includes(i)) {
          if (
            arr[i - 4].style.backgroundColor == "" &&
            arr[i - 8].style.backgroundColor == ""
          ) {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i - 8].style.backgroundColor = `${tiles[x].hex}`;
            arr[i - 8].innerHTML = `<p>${tiles[x].number}</p>`;
          } else if (
            arr[i - 4].style.backgroundColor == "" &&
            arr[i - 8].style.backgroundColor != "" &&
            arr[i - 8].innerHTML != arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i - 4].style.backgroundColor = `${tiles[x].hex}`;
            arr[i - 4].innerHTML = `<p>${tiles[x].number}</p>`;
          }

          if (
            arr[i - 4].style.backgroundColor == "" &&
            arr[i - 8].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i - 8].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i - 8].style.backgroundColor = `${tiles[x + 1].hex}`;
          } else if (
            arr[i - 4].style.backgroundColor != "" &&
            arr[i - 4].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i - 4].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i - 4].style.backgroundColor = `${tiles[x + 1].hex}`;
          }
        }

        if (veryBottomColumn.includes(i)) {
          if (
            arr[i - 4].style.backgroundColor == "" &&
            arr[i - 8].style.backgroundColor == "" &&
            arr[i - 12].style.backgroundColor == ""
          ) {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i - 12].style.backgroundColor = `${tiles[x].hex}`;
            arr[i - 12].innerHTML = `<p>${tiles[x].number}</p>`;
          } else if (
            arr[i - 4].style.backgroundColor == "" &&
            arr[i - 8].style.backgroundColor == "" &&
            arr[i - 12].style.backgroundColor != "" &&
            arr[i - 12].innerHTML != arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i - 8].style.backgroundColor = `${tiles[x].hex}`;
            arr[i - 8].innerHTML = `<p>${tiles[x].number}</p>`;
          } else if (
            arr[i - 4].style.backgroundColor == "" &&
            arr[i - 8].style.backgroundColor != "" &&
            arr[i - 8].innerHTML != arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = ``;
            arr[i].innerHTML = ``;
            arr[i - 4].style.backgroundColor = `${tiles[x].hex}`;
            arr[i - 4].innerHTML = `<p>${tiles[x].number}</p>`;
          }

          if (
            arr[i - 4].style.backgroundColor == "" &&
            arr[i - 8].style.backgroundColor == "" &&
            arr[i - 12].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i - 12].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i - 12].style.backgroundColor = `${tiles[x + 1].hex}`;
          } else if (
            arr[i - 4].style.backgroundColor == "" &&
            arr[i - 8].style.backgroundColor != "" &&
            arr[i - 8].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i - 8].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i - 8].style.backgroundColor = `${tiles[x + 1].hex}`;
          } else if (
            arr[i - 4].style.backgroundColor != "" &&
            arr[i - 4].innerHTML == arr[i].innerHTML
          ) {
            arr[i].style.backgroundColor = "";
            arr[i].innerHTML = "";
            arr[i - 4].innerHTML = `<p>${tiles[x + 1].number}</p>`;
            arr[i - 4].style.backgroundColor = `${tiles[x + 1].hex}`;
          }
        }
      }
    }
  }
}

function moveUp(event) {
  if (isThereAGame()) {
    if (canItMoveUp()) {
      if (event.code === "KeyW" || event.key === "ArrowUp") {
        shiftUp();

        let nextSquare = openSquares(arr);
        let randomNo = Math.floor(Math.random() * nextSquare.length);
        nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
        nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
      }
    }
  }
}

document.addEventListener("keydown", moveRight);
document.addEventListener("keydown", moveLeft);
document.addEventListener("keydown", moveDown);
document.addEventListener("keydown", moveUp);
