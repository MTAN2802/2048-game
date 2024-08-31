const tile = new Map();
for (i = 1; i <= 16; i++) {
  tile.set(i, { position: document.getElementById(i), currentValue: 0 });
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
tileValue.set(4, { hex: "#FFB7C5", value: 4});
tileValue.set(8, { hex: "#87CEEB", value: 8 });
tileValue.set(16, { hex: "#32CD32", value: 16 });
tileValue.set(32, { hex: "FFDB58", value: 32 });
tileValue.set(64, { hex: "#FAC898", value: 64 });
tileValue.set(128, { hex: "00A36C", value: 128 });
tileValue.set(256, { hex: "#BC544B", value: 256 });
tileValue.set(512, { hex: "#A7C7E7", value: 512 });
tileValue.set(1024, { hex: "#77DD77", value: 1024 });
tileValue.set(2048, { hex: "#680C07", value: 2048 });

function isThereAGame() {
  for (i = 1; i <= tile.size; i++) {
    if (tile.get(i).currentValue !== 0) {
      return true;
    }
  }
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
  for (i = 1; i <= tile.size; i++) {
    if (tile.get(i).currentValue === 0) {
      available.push(tile.get(i).position);
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

function canItMove(startingPosition, nextTilePosition) {
  for (let value of startingPosition) {
    if (tile.get(value).currentValue === 0){
      let tileAfter = value + nextTilePosition;
      if (
        tile.get(tileAfter).currentValue === 0 ||
        tile.get(tileAfter).currentValue === tile.get(value).currentValue
      ) {
        return true;
      }
    }
  }
}

function isEmpty(set){
  for (let target of set){
    if (tile.get(target).currentValue !== 0){
      return false;
    }
  }
  return true;
}

function canLastSetTilesMerge(lastSet, numTillPreviousTile) {
  for (let lastTile of lastSet) {
    if (arr[lastTile].style.backgroundColor !== "") {
      if (
        arr[lastTile].innerHTML ===
        arr[lastTile - numTillPreviousTile].innerHTML
      ) {
        return true;
      }
    }
    return false;
  }
}

function compareArrays(array1, array2) {
  if (
    array1.length === array2.length &&
    array1.every((element, index) => element === array2[index])
  ) {
    return true;
  }
}

function canItMoveRight() {
  let startingColumn = [0, 4, 8, 12];
  let endingColumn = [3, 7, 11, 15];
  let nextRightTile = 1;

  if (!canItMove(startingColumn, nextRightTile)) {
    for (i = 1; i <= 3; i++) {
      currentColumn = nextSetOfTiles(startingColumn, i);

      if (compareArrays(currentColumn, endingColumn)) {
        return canLastSetTilesMerge(endingColumn, 1);
      } else if (canItMove(currentColumn, nextRightTile)) {
        return true;
      }
    }
  } else {
    return true;
  }
}

function canItMoveLeft() {
  let startingColumn = [3, 7, 11, 15];
  let endingColumn = [0, 4, 8, 12];
  let nextLeftTile = -1;

  if (!canItMove(startingColumn, nextLeftTile)) {
    for (i = -1; i >= -3; i--) {
      currentColumn = nextSetOfTiles(startingColumn, i);

      if (compareArrays(currentColumn, endingColumn)) {
        return canLastSetTilesMerge(endingColumn, -1);
      } else if (canItMove(currentColumn, nextLeftTile)) {
        return true;
      }
    }
  } else {
    return true;
  }
}

function canItMoveDown() {
  let startingRow = [0, 1, 2, 3];
  let endingRow = [12, 13, 14, 15];
  let nextTileUp = 4;

  if (!canItMove(startingRow, nextTileUp)) {
    for (i = 4; i <= 12; i += 4) {
      currentRow = nextSetOfTiles(startingRow, i);

      if (compareArrays(currentRow, endingRow)) {
        return canLastSetTilesMerge(endingRow, 4);
      } else if (canItMove(currentRow, nextTileUp)) {
        return true;
      }
    }
  } else {
    return true;
  }
}

function canItMoveUp() {
  let startingRow = [12, 13, 14, 15];
  let endingRow = [0, 1, 2, 3];
  let nextTileDown = -4;

  if (!canItMove(startingRow, nextTileDown)) {
    for (i = -4; i >= -12; i -= 4) {
      currentRow = nextSetOfTiles(startingRow, i);

      if (compareArrays(currentRow, endingRow)) {
        return canLastSetTilesMerge(endingRow, -4);
      } else if (canItMove(currentRow, nextTileDown)) {
        return true;
      }
    }
  } else {
    return true;
  }
}

function numInTile(x) {
  let n = 0;
  while (x != tiles[n].numCode) {
    n++;
  }
  return n;
}

function shiftRight() {
  for (i = arr.length - 1; i >= 0; i--) {
    if (arr[i].style.backgroundColor != "") {
      //If the tile is not empty
      if (i != 3 && i != 7 && i != 11 && i != 15) {
        //Anything but the very right column
        const veryLeftColumn = [0, 4, 8, 12];
        const secondLeftColumn = [1, 5, 9, 13];
        const secondRightColumn = [2, 6, 10, 14];
        const x = numInTile(arr[i].innerHTML);

        if (secondRightColumn.includes(i)) {
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
  }
}

function moveRight(event) {
  if (isThereAGame()) {
    if (canItMoveRight()) {
      if (event.code === "KeyD" || event.key === "ArrowRight") {
        shiftRight();

        let nextSquare = openSquares(arr);
        let randomNo = Math.floor(Math.random() * nextSquare.length);
        console.log(`new square:`, nextSquare[randomNo]);
        nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
        nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
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

//Function to move down
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

//Function to move up
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
