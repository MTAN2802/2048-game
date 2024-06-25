const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const ten = document.getElementById("ten");
const eleven = document.getElementById("eleven");
const twelve = document.getElementById("twelve");
const thirteen = document.getElementById("thirteen");
const fourteen = document.getElementById("fourteen");
const fifteen = document.getElementById("fifteen");
const sixteen = document.getElementById("sixteen");
const arr = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen];

const tiles = [
    {number: 2,
     colour: "lavender",
     hex: "#E6E6FA",
     numCode: "<p>2</p>"},

    {number: 4,
     colour: "sakuraPink",
     hex: "#FFB7C5",
     numCode: "<p>4</p>"},

    {number: 8,
     colour: "skyBlue",
     hex: "#87CEEB",
     numCode: "<p>8</p>"},

    {number: 16,
     colour: "limeGreen",
     hex: "#32CD32",
     numCode: "<p>16</p>"},

    {number: 32,
     colour: "mustardYellow",
     hex: "FFDB58",
     numCode: "<p>32</p>"},

    {number: 64,
     colour: "pastelOrange",
     hex: "#FAC898",
     numCode: "<p>64</p>"},

    {number: 128,
     colour: "jade",
     hex: "00A36C",
     numCode: "<p>128</p>"},

    {number: 256,
     colour: "blushRed",
     hex: "#BC544B",
     numCode: "<p>256</p>"},

    {number: 512,
     colour: "pastelBlue",
     hex: "#A7C7E7",
     numCode: "<p>512</p>"},

    {number: 1024,
     colour: "pastelGreen",
     hex: "#77DD77",
     numCode: "<p>1024</p>"},

    {number: 2048,
     colour: "currantRed",
     hex: "#680C07",
     numCode: "<p>2048</p>"}
]

//Functions for the buttons
function isThereAGame(){   
    for (i=0; i < arr.length; i++){
        if (arr[i].innerHTML.includes("2") ) {
            return true}
    }
}

function initiateGame(){
    let test = 14;
    let randomNo = Math.floor(Math.random() * 16);
    if (isThereAGame()){
        alert('There is already an active game!')
    }
    else{
        for (i=0; i < arr.length; i++){
            if (test == i){
                arr[i].style.backgroundColor = `${tiles[0].hex}`;
                arr[i].innerHTML = `<p>${tiles[0].number}</p>`;
            }
        }
    }
}

function clearGame() {
    for (i=0; i < arr.length; i++){
        arr[i].style.backgroundColor = "";
        arr[i].innerHTML = '';
    }
}


const startButton = document.getElementById('start');
startButton.addEventListener("click", initiateGame);
document.addEventListener("keydown", (e) => {
    if (e.key == 't' || e.key == 't'){
        initiateGame();
    }
})

const resetButton = document.getElementById('reset');
resetButton.addEventListener("click", clearGame);
/*document.addEventListener("keydown", (e) => {
    if (e.key == "r" || e.key == "R"){
        clearGame()
    }
});*/

function openSquares(arr) {
    let available = [];
    for (i = 0; i < arr.length; i++){
        if (arr[i].style.backgroundColor == ""){
            available.push(arr[i]);
        }
    }
    return available;
}

//Functions to determine if tiles can be moved in each direction
function canItMoveRight(){
    let counter = 0;
    for (i = arr.length-1; i >=0; i--){
        if (arr[i].style.backgroundColor != ""){
            if (i == 3 || i == 7 || i == 11 || i == 15){
                let edges = [3,7,11,15];
                edges.forEach((edgeNo) => {
                    if (arr[edgeNo - 3].style.backgroundColor != "" && arr[edgeNo - 3].innerHTML == arr[edgeNo - 2].innerHTML){
                        counter++;
                    } 
                    if (arr[edgeNo - 3].style.backgroundColor != "" && arr[edgeNo - 3].innerHTML == arr[edgeNo - 1].innerHTML && arr[edgeNo - 2].style.backgroundColor == "") {
                        counter++;
                    }
                    if (arr[edgeNo - 3].style.backgroundColor != "" && arr[edgeNo - 3].innerHTML == arr[edgeNo].innerHTML && arr[edgeNo - 2].style.backgroundColor == "" && arr[edgeNo - 1].style.backgroundColor == "") {
                        counter++;
                    }
                    if (arr[edgeNo - 2].style.backgroundColor != "" && arr[edgeNo - 2].innerHTML == arr[edgeNo - 1].innerHTML){
                        counter++;
                    } 
                    if (arr[edgeNo - 2].style.backgroundColor != "" && arr[edgeNo - 2].innerHTML == arr[edgeNo].innerHTML && arr[edgeNo - 1].style.backgroundColor == "") {
                        counter++;
                    }
                    if (arr[edgeNo - 1].style.backgroundColor != "" && arr[edgeNo - 1].innerHTML == arr[edgeNo].innerHTML){
                        counter++;
                    } 
                })
                    
            }
            if(i != 3 && i != 7 && i != 11 && i != 15){
                if (arr[i+1].style.backgroundColor == "" || arr[i+1].innerHTML == arr[i].innerHTML){
                        counter++;
                        }  
                }
        }
    }
    //console.log(`Right counter: ${counter}`)
    if (counter != 0) return true;
    else return false;
}

function canItMoveLeft(){
    let counter = 0;
    for (i = arr.length-1; i >=0; i--){
        if (arr[i].style.backgroundColor != ""){
            if (i == 0 || i == 4 || i == 8 || i == 13){
                let edges = [0,4,8,12];
                edges.forEach((edgeNo) => {
                    if (arr[edgeNo + 3].style.backgroundColor != "" && arr[edgeNo + 3].innerHTML == arr[edgeNo + 2].innerHTML){
                        counter++;
                    } 
                    if (arr[edgeNo + 3].style.backgroundColor != "" && arr[edgeNo + 3].innerHTML == arr[edgeNo + 1].innerHTML && arr[edgeNo + 2].style.backgroundColor == "") {
                        counter++;
                    }
                    if (arr[edgeNo + 3].style.backgroundColor != "" && arr[edgeNo + 3].innerHTML == arr[edgeNo].innerHTML && arr[edgeNo +  2].style.backgroundColor == "" && arr[edgeNo + 1].style.backgroundColor == "") {
                        counter++;
                    }
                    if (arr[edgeNo + 2].style.backgroundColor != "" && arr[edgeNo + 2].innerHTML == arr[edgeNo + 1].innerHTML){
                        counter++;
                    } 
                    if (arr[edgeNo + 2].style.backgroundColor != "" && arr[edgeNo + 2].innerHTML == arr[edgeNo].innerHTML && arr[edgeNo + 1].style.backgroundColor == "") {
                        counter++;
                    }
                    if (arr[edgeNo + 1].style.backgroundColor != "" && arr[edgeNo + 1].innerHTML == arr[edgeNo].innerHTML){
                        counter++;
                    } 
                })
                    
            }
            if(i != 0 && i != 4 && i != 8 && i != 12){
                if (arr[i-1].style.backgroundColor == "" || arr[i-1].innerHTML == arr[i].innerHTML){
                        counter++;
                        }  
                }
        }
    }
    //console.log(`Left counter: ${counter}`)
    if (counter != 0) return true;
    else return false;
}

function canItMoveUp(){
    let counter = 0;
    for (i = arr.length-1; i >=0; i--){
        if (arr[i].style.backgroundColor != ""){
            if (i == 0 || i == 1 || i == 2 || i == 3){
                let edges = [0,1,2,3];
                edges.forEach((edgeNo) => {
                    if (arr[edgeNo + 12].style.backgroundColor != "" && arr[edgeNo + 12].innerHTML == arr[edgeNo + 8].innerHTML){
                        counter++;
                    } 
                    if (arr[edgeNo + 12].style.backgroundColor != "" && arr[edgeNo + 12].innerHTML == arr[edgeNo + 4].innerHTML && arr[edgeNo + 8].style.backgroundColor == "") {
                        counter++;
                    }
                    if (arr[edgeNo + 12].style.backgroundColor != "" && arr[edgeNo + 12].innerHTML == arr[edgeNo].innerHTML && arr[edgeNo +  8].style.backgroundColor == "" && arr[edgeNo + 4].style.backgroundColor == "") {
                        counter++;
                    }
                    if (arr[edgeNo + 8].style.backgroundColor != "" && arr[edgeNo + 8].innerHTML == arr[edgeNo + 4].innerHTML){
                        counter++;
                    } 
                    if (arr[edgeNo + 8].style.backgroundColor != "" && arr[edgeNo + 8].innerHTML == arr[edgeNo].innerHTML && arr[edgeNo + 4].style.backgroundColor == "") {
                        counter++;
                    }
                    if (arr[edgeNo + 4].style.backgroundColor != "" && arr[edgeNo + 4].innerHTML == arr[edgeNo].innerHTML){
                        counter++;
                    } 
                })
                    
            }
            if(i != 0 && i != 1 && i != 2 && i != 3){
                if (arr[i-4].style.backgroundColor == "" || arr[i-4].innerHTML == arr[i].innerHTML){
                        counter++;
                        }  
                }
        }
    }
    //console.log(`Up counter: ${counter}`)
    if (counter != 0) return true;
    else return false;
}

function canItMoveDown(){
    let counter = 0;
    for (i = arr.length-1; i >=0; i--){
        if (arr[i].style.backgroundColor != ""){
            if (i == 12 || i == 13 || i == 14 || i == 15){
                let edges = [12,13,14,15];
                edges.forEach((edgeNo) => {
                    if (arr[edgeNo - 12].style.backgroundColor != "" && arr[edgeNo - 12].innerHTML == arr[edgeNo - 8].innerHTML){
                        counter++;
                    } 
                    if (arr[edgeNo - 12].style.backgroundColor != "" && arr[edgeNo - 12].innerHTML == arr[edgeNo - 4].innerHTML && arr[edgeNo - 8].style.backgroundColor == "") {
                        counter++;
                    }
                    if (arr[edgeNo - 12].style.backgroundColor != "" && arr[edgeNo - 12].innerHTML == arr[edgeNo].innerHTML && arr[edgeNo -  8].style.backgroundColor == "" && arr[edgeNo - 4].style.backgroundColor == "") {
                        counter++;
                    }
                    if (arr[edgeNo - 8].style.backgroundColor != "" && arr[edgeNo - 8].innerHTML == arr[edgeNo - 4].innerHTML){
                        counter++;
                    } 
                    if (arr[edgeNo - 8].style.backgroundColor != "" && arr[edgeNo - 8].innerHTML == arr[edgeNo].innerHTML && arr[edgeNo - 4].style.backgroundColor == "") {
                        counter++;
                    }
                    if (arr[edgeNo - 4].style.backgroundColor != "" && arr[edgeNo - 4].innerHTML == arr[edgeNo].innerHTML){
                        counter++;
                    } 
                })
                    
            }
            if(i != 12 && i != 13 && i != 14 && i != 15){
                if (arr[i+4].style.backgroundColor == "" || arr[i+4].innerHTML == arr[i].innerHTML){
                        counter++;
                        }  
                }
        }
    }
    //console.log(`Down counter: ${counter}`)
    if (counter != 0) return true;
    else return false;
}

//Function to see which number is in selected tile
function numInTile(x){
    let n = 0;
    while (x != tiles[n].numCode){
        n++
    }
    return n
}

//Function to move right
function shiftRight(){
    for (i = arr.length-1; i >=0 ; i--){
        if(arr[i].style.backgroundColor != ""){ //If the tile is not empty
            if (i != 3 && i != 7 && i != 11 && i!= 15){ //Anything but the very right column
                const veryLeftColumn = [0, 4, 8, 12];
                const secondLeftColumn = [1, 5, 9, 13];
                const secondRightColumn = [2, 6, 10, 14];
                const x = numInTile(arr[i].innerHTML);

                if (secondRightColumn.includes(i)){ //If the selected tile is in the second right column
                    if (arr[i+1].style.backgroundColor == ""){ //If the very right column is empty
                        arr[i+1].style.backgroundColor = arr[i].style.backgroundColor;
                        arr[i+1].innerHTML = arr[i].innerHTML;
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                    }

                    if (arr[i+1].style.backgroundColor != "" && arr[i+1].innerHTML == arr[i].innerHTML){ //If next tile is not empty and has the same number
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+1].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[i+1].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }

                if (secondLeftColumn.includes(i)) { //If the selected tile is in the second column to the left
                    if(arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor == ""){ //If the next two tiles are empty
                        arr[i+2].style.backgroundColor = arr[i].style.backgroundColor;
                        arr[i+2].innerHTML = arr[i].innerHTML;
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                    }
                    else if (arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor != "" && arr[i+2].innerHTML != arr[i].innerHTML){ //If the next tile is empty but the end tile has a different number
                        arr[i+1].style.backgroundColor = arr[i].style.backgroundColor;
                        arr[i+1].innerHTML = arr[i].innerHTML;
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                    }

                    if(arr[i+1].style.backgroundColor == "" && arr[i+2].innerHTML == arr[i].innerHTML){ //If the next tile is empty but the end tile equals the selected tile
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+2].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[i+2].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                    
                    else if (arr[i+1].style.backgroundColor != "" && arr[i+1].innerHTML == arr[i].innerHTML){ //If the next tile has the same number as the selected tile
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+1].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+1].style.backgroundColor = `${tiles[x+1].hex}`
                    }

                }
                
                if (veryLeftColumn.includes(i)) { //If the selected column is in the very left column
                    if(arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor == "" && arr[i+3].style.backgroundColor == ""){ // If all three next tiles are empty
                        arr[i+3].style.backgroundColor = arr[i].style.backgroundColor;
                        arr[i+3].innerHTML = arr[i].innerHTML;
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        
                    }
                    else if(arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor == "" && arr[i+3].style.backgroundColor != "" && 
                    arr[i+3].innerHTML != arr[i].innerHTML){ // If the next two tiles are empty and the last column tile has a different number
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+2].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+2].innerHTML = `<p>${tiles[x].number}</p>`;
                    }
                    else if(arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor != "" && arr[i+2].innerHTML != arr[i].innerHTML){ //If the next tile is empty but the tile after has a different number
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+1].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+1].innerHTML = `<p>${tiles[x].number}</p>`;
                    }

                    if (arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor == "" && arr[i+3].innerHTML == arr[i].innerHTML){ //If the next two tiles are empty and the last tile has the same number
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+3].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+3].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor != "" && arr[i+2].innerHTML == arr[i].innerHTML){ //If the next tile is empty but the tile after has the same number
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+2].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+2].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i+1].style.backgroundColor != "" && arr[i+1].innerHTML == arr[i].innerHTML){ //If the next tile has the same number
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+1].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+1].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                }
            }
        }
    }  
}

function moveRight(event){
    if (isThereAGame()){
        if(canItMoveRight()){
            if (event.key == "d" || event.key == "D"){
                shiftRight();       

                let nextSquare = openSquares(arr);
                let randomNo = Math.floor(Math.random() * nextSquare.length);
                console.log(`new square:` , nextSquare[randomNo])
                nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
                nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
                
            }
        }
    }
}

//Function to move left
function shiftLeft(){
    for (i = 0; i < arr.length; i++){ //For each tile from left to right, top to bottom
        if(arr[i].style.backgroundColor != ""){
            if (i != 0 && i != 4 && i != 8 && i!= 12){
                const veryRightColumn = [3, 7, 11, 15];
                const secondRightColumn = [2, 6, 10, 14];
                const secondLeftColumn = [1, 5, 9, 13];
                const x = numInTile(arr[i].innerHTML);

                if (secondLeftColumn.includes(i)){
                    if (arr[i-1].style.backgroundColor == ""){
                        arr[i-1].style.backgroundColor = arr[i].style.backgroundColor;
                        arr[i-1].innerHTML = arr[i].innerHTML;
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                    }

                    if (arr[i-1].style.backgroundColor != "" && arr[i-1].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i-1].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[i-1].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }

                if (secondRightColumn.includes(i)) {
                    if(arr[i-1].style.backgroundColor == "" && arr[i-2].style.backgroundColor == ""){
                        arr[i-2].style.backgroundColor = arr[i].style.backgroundColor;
                        arr[i-2].innerHTML = arr[i].innerHTML;
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                    }
                    else if (arr[i-1].style.backgroundColor == "" && arr[i-2].style.backgroundColor != "" && arr[i-2].innerHTML != arr[i].innerHTML){
                        arr[i-1].style.backgroundColor = arr[i].style.backgroundColor;
                        arr[i-1].innerHTML = arr[i].innerHTML;
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                    }

                    if(arr[i-1].style.backgroundColor == "" && arr[i-2].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i-2].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i-2].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i-1].style.backgroundColor != "" && arr[i-1].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i-1].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i-1].style.backgroundColor = `${tiles[x+1].hex}`
                    }

                }

                if (veryRightColumn.includes(i)) {
                    if(arr[i-1].style.backgroundColor == "" && arr[i-2].style.backgroundColor == "" && arr[i-3].style.backgroundColor == ""){
                        arr[i-3].style.backgroundColor = arr[i].style.backgroundColor;
                        arr[i-3].innerHTML = arr[i].innerHTML;
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        
                    }
                    else if(arr[i-1].style.backgroundColor == "" && arr[i-2].style.backgroundColor == "" && arr[i-3].style.backgroundColor != "" && arr[i-3].innerHTML != arr[i].innerHTML){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i-2].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i-2].innerHTML = `<p>${tiles[x].number}</p>`;
                    }
                    else if(arr[i-1].style.backgroundColor == "" && arr[i-2].style.backgroundColor != "" && arr[i-2].innerHTML != arr[i].innerHTML){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i-1].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i-1].innerHTML = `<p>${tiles[x].number}</p>`;
                    }

                    if (arr[i-1].style.backgroundColor == "" && arr[i-2].style.backgroundColor == "" && arr[i-3].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i-3].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i-3].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i-1].style.backgroundColor == "" && arr[i-2].style.backgroundColor != "" && arr[i-2].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i-2].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i-2].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i-1].style.backgroundColor != "" && arr[i-1].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i-1].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i-1].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                }

            }
        }
    }
}

function moveLeft(event){
    if (isThereAGame()){
        if (canItMoveLeft()){
            if (event.key == "a" || event.key == "A"){
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
function shiftDown(){
    for (i = arr.length-1; i >=0; i--){
        if(arr[i].style.backgroundColor != ""){ //If the number in the target tile is "y"
            if (i != 12 && i != 13 && i != 14 && i != 15){ //Anything but the very right column
                const veryTopColumn = [0, 1, 2, 3];
                const secondTopColumn = [4, 5, 6, 7];
                const secondBottomColumn = [8, 9, 10, 11];
                const x = numInTile(arr[i].innerHTML);

                if (secondBottomColumn.includes(i)){
                    if (arr[i+4].style.backgroundColor == ""){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+4].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+4].innerHTML = `<p>${tiles[x].number}</p>`;
                    }

                    if (arr[i+4].style.backgroundColor != "" && arr[i+4].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+4].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+4].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                }
                
                if (secondTopColumn.includes(i)) {
                    if(arr[i+4].style.backgroundColor == "" && arr[i+8].style.backgroundColor == ""){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+8].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+8].innerHTML = `<p>${tiles[x].number}</p>`;
                    }
                    else if (arr[i+4].style.backgroundColor == "" && arr[i+8].style.backgroundColor != "" && arr[i+8].innerHTML != arr[i].innerHTML){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+4].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+4].innerHTML = `<p>${tiles[x].number}</p>`;
                    }

                    if(arr[i+4].style.backgroundColor == "" && arr[i+8].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+8].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+8].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i+4].style.backgroundColor != "" && arr[i+4].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+4].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+4].style.backgroundColor = `${tiles[x+1].hex}`
                    }

                }


                if (veryTopColumn.includes(i)) {
                    if(arr[i+4].style.backgroundColor == "" && arr[i+8].style.backgroundColor == "" && arr[i+12].style.backgroundColor == ""){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+12].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+12].innerHTML = `<p>${tiles[x].number}</p>`;
                        
                    }
                    else if(arr[i+4].style.backgroundColor == "" && arr[i+8].style.backgroundColor == "" && arr[i+12].style.backgroundColor != "" && arr[i+12].innerHTML != arr[i].innerHTML){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+8].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+8].innerHTML = `<p>${tiles[x].number}</p>`;
                    }
                    else if(arr[i+4].style.backgroundColor == "" && arr[i+8].style.backgroundColor != "" && arr[i+8].innerHTML != arr[i].innerHTML){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+4].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+4].innerHTML = `<p>${tiles[x].number}</p>`;
                    }

                    if (arr[i+4].style.backgroundColor == "" && arr[i+8].style.backgroundColor == "" && arr[i+12].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+12].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+12].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i+4].style.backgroundColor == "" && arr[i+8].style.backgroundColor != "" && arr[i+8].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+8].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+8].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i+4].style.backgroundColor != "" && arr[i+4].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+4].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+4].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                }

                
            }
        }
    }
}

function moveDown(event){
    if (isThereAGame()){
        if (canItMoveDown()){
            if (event.key == "s" || event.key == "S"){
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
function shiftUp(){
    for (i = 0; i < arr.length; i++){
        if(arr[i].style.backgroundColor != ""){ //If the number in the target tile is "y"
            if (i != 0 && i != 1 && i != 2 && i!= 3){ //Anything but the very right column
                const veryBottomColumn = [12, 13, 14, 15];
                const secondTopColumn = [4, 5, 6, 7];
                const secondBottomColumn = [8, 9, 10, 11];
                const x = numInTile(arr[i].innerHTML)

                if (secondTopColumn.includes(i)){
                    if (arr[i-4].style.backgroundColor == ""){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i-4].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i-4].innerHTML = `<p>${tiles[x].number}</p>`;
                    }

                    if (arr[i-4].style.backgroundColor != "" && arr[i-4].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i-4].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i-4].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                }

                if (secondBottomColumn.includes(i)) {
                    if(arr[i-4].style.backgroundColor == "" && arr[i-8].style.backgroundColor == ""){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i-8].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i-8].innerHTML = `<p>${tiles[x].number}</p>`;
                    }
                    else if (arr[i-4].style.backgroundColor == "" && arr[i-8].style.backgroundColor != "" && arr[i-8].innerHTML != arr[i].innerHTML){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i-4].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i-4].innerHTML = `<p>${tiles[x].number}</p>`;
                    }

                    if(arr[i-4].style.backgroundColor == "" && arr[i-8].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i-8].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i-8].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i-4].style.backgroundColor != "" && arr[i-4].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i-4].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i-4].style.backgroundColor = `${tiles[x+1].hex}`
                    }

                }

                if (veryBottomColumn.includes(i)) {
                    if(arr[i-4].style.backgroundColor == "" && arr[i-8].style.backgroundColor == "" && arr[i-12].style.backgroundColor == ""){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i-12].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i-12].innerHTML = `<p>${tiles[x].number}</p>`;
                        
                    }
                    else if(arr[i-4].style.backgroundColor == "" && arr[i-8].style.backgroundColor == "" && arr[i-12].style.backgroundColor != "" && arr[i-12].innerHTML != arr[i].innerHTML){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i-8].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i-8].innerHTML = `<p>${tiles[x].number}</p>`;
                    }
                    else if(arr[i-4].style.backgroundColor == "" && arr[i-8].style.backgroundColor != "" && arr[i-8].innerHTML != arr[i].innerHTML){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i-4].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i-4].innerHTML = `<p>${tiles[x].number}</p>`;
                    }

                    if (arr[i-4].style.backgroundColor == "" && arr[i-8].style.backgroundColor == "" && arr[i-12].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i-12].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i-12].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i-4].style.backgroundColor == "" && arr[i-8].style.backgroundColor != "" && arr[i-8].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i-8].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i-8].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i-4].style.backgroundColor != "" && arr[i-4].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i-4].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i-4].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                }   
            }
        }
    }
}

function moveUp(event){
    if (isThereAGame()){
        if (canItMoveUp()){
            if (event.key == "w" || event.key == "W"){
                shiftUp();

                let nextSquare = openSquares(arr);
                let randomNo = Math.floor(Math.random() * nextSquare.length);
                nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
                nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
            }
        }
    }
}

document.addEventListener("keydown", moveRight)
document.addEventListener("keydown", moveLeft)
document.addEventListener("keydown", moveDown)
document.addEventListener("keydown", moveUp)
