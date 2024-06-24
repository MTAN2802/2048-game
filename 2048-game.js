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
     hex: "#E6E6FA"},

    {number: 4,
     colour: "sakuraPink",
     hex: "#FFB7C5"},

    {number: 8,
     colour: "skyBlue",
     hex: "#87CEEB"},

    {number: 16,
     colour: "limeGreen",
     hex: "#32CD32"},

    {number: 32,
     colour: "mustardYellow",
     hex: "FFDB58"},

    {number: 64,
     colour: "pastelOrange",
     hex: "#FAC898"},

    {number: 128,
     colour: "jade",
     hex: "00A36C"},

    {number: 256,
     colour: "blushRed",
     hex: "#BC544B"},

    {number: 512,
     colour: "pastelBlue",
     hex: "#A7C7E7"},

    {number: 1024,
     colour: "pastelGreen",
     hex: "#77DD77"},

    {number: 2048,
     colour: "currantRed",
     hex: "#680C07"}
]

//Functions for the buttons
function isThereAGame(){   
    for (i=0; i < arr.length; i++){
        if (arr[i].innerHTML.includes("2") ) {
            return true}
    }
}

function initiateGame(){
    let test = 6;
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
const resetButton = document.getElementById('reset');
resetButton.addEventListener("click", clearGame);

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

//Function to move right

function shiftRight(x, y){
    for (i = arr.length-1; i >= 0; i--){
        if(arr[i].innerHTML == y){ //If the number in the target tile is "y"
            if (i != 3 && i != 7 && i != 11 && i!= 15){ //Anything but the very right column
                const veryLeftColumn = [12, 8, 4, 0];
                const secondLeftColumn = [13, 9, 5, 1];
                const secondRightColumn = [14, 10, 6, 2];

                if (veryLeftColumn.includes(i)) {
                    if(arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor == "" && arr[i+3].style.backgroundColor == ""){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+3].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+3].innerHTML = `<p>${tiles[x].number}</p>`;
                        
                    }
                    else if(arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor == "" && arr[i+3].style.backgroundColor != "" && arr[i+3].innerHTML != arr[i].innerHTML){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+2].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+2].innerHTML = `<p>${tiles[x].number}</p>`;
                    }
                    else if(arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor != "" && arr[i+2].innerHTML != arr[i].innerHTML){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+1].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+1].innerHTML = `<p>${tiles[x].number}</p>`;
                    }

                    if (arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor == "" && arr[i+3].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+3].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+3].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor != "" && arr[i+2].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+2].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+2].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i+1].style.backgroundColor != "" && arr[i+1].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+1].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+1].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                }

                if (secondLeftColumn.includes(i)) {
                    if(arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor == ""){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+2].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+2].innerHTML = `<p>${tiles[x].number}</p>`;
                    }
                    else if (arr[i+1].style.backgroundColor == "" && arr[i+2].style.backgroundColor != "" && arr[i+2].innerHTML != arr[i].innerHTML){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+1].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+1].innerHTML = `<p>${tiles[x].number}</p>`;
                    }

                    if(arr[i+1].style.backgroundColor == "" && arr[i+2].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+2].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+2].style.backgroundColor = `${tiles[x+1].hex}`
                    }
                    else if (arr[i+1].style.backgroundColor != "" && arr[i+1].innerHTML == arr[i].innerHTML){
                        arr[i].style.backgroundColor = "";
                        arr[i].innerHTML = "";
                        arr[i+1].innerHTML = `<p>${tiles[x+1].number}</p>`
                        arr[i+1].style.backgroundColor = `${tiles[x+1].hex}`
                    }

                }

                if (secondRightColumn.includes(i)){
                    if (arr[i+1].style.backgroundColor == ""){
                        arr[i].style.backgroundColor = ``;
                        arr[i].innerHTML = ``;
                        arr[i+1].style.backgroundColor = `${tiles[x].hex}`;
                        arr[i+1].innerHTML = `<p>${tiles[x].number}</p>`;
                    }

                    if (arr[i+1].innerHTML == arr[i].innerHTML){
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
                shiftRight(10,  "<p>2048</p>");
                shiftRight(9, "<p>1024</p>");
                shiftRight(8, "<p>512</p>");
                shiftRight(7, "<p>256</p>");
                shiftRight(6, "<p>128</p>");
                shiftRight(5, "<p>64</p>");
                shiftRight(4, "<p>32</p>");
                shiftRight(3, "<p>16</p>");
                shiftRight(2, "<p>8</p>");
                shiftRight(1, "<p>4</p>");
                shiftRight(0, "<p>2</p>");        

                let nextSquare = openSquares(arr);
                let randomNo = Math.floor(Math.random() * nextSquare.length);
                nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
                nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
            }
        }
    }
}
//Function to move left
function shiftLeft(x, y){
    let a = 3;
            while(a > 0){ //For all the tiles in the first row
                
                if (arr[a].innerHTML == y){ //If the current tile has a value of "2"
                    a--
                    
                    if(arr[a].style.backgroundColor == "" && a > 0){ //If the next tile from target is empty
                        arr[a+1].innerHTML = "";
                        arr[a+1].style.backgroundColor = "";
                        a--
                        
                        if(arr[a].style.backgroundColor == "" && a > 0){ //If the next two tiles from target is empty
                            a--;
                            if(arr[a].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[a].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[a].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[a].innerHTML == y){ //If the next two tiles from target is empty but the last one is "2"
                                arr[a+1].innerHTML = "";
                                arr[a+1].style.backgroundColor = "";
                                arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[a+1].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[a+1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[a].innerHTML == y){ //If the next tile from target is empty but the next one is "2"
                            arr[a+1].innerHTML = "";
                            arr[a+1].style.backgroundColor = "";
                            arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[a].innerHTML != y && arr[a].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[a+1].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[a+1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[a].style.backgroundColor == "" && a == 0){
                            arr[a].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[a].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[a].style.backgroundColor == "" && a == 0){
                        arr[a+1].innerHTML = "";
                        arr[a+1].style.backgroundColor = "";
                        arr[a].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[a].innerHTML == y){ //If the next tile from target is "2"
                        arr[a+1].innerHTML = "";
                        arr[a+1].style.backgroundColor = "";
                        arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                a--;
            }
    
            let b = 7;
            while(b > 4){ //For all the tiles in the first row
                
                if (arr[b].innerHTML == y){ //If the current tile has a value of "2"
                    b--
                    
                    if(arr[b].style.backgroundColor == "" && b > 4){ //If the next tile from target is empty
                        arr[b+1].innerHTML = "";
                        arr[b+1].style.backgroundColor = "";
                        b--
                        
                        if(arr[b].style.backgroundColor == "" && b > 4){ //If the next two tiles from target is empty
                            b--;
                            if(arr[b].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[b].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[b].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[b].innerHTML == y){ //If the next two tiles from target is empty but the last one is "2"
                                arr[b+1].innerHTML = "";
                                arr[b+1].style.backgroundColor = "";
                                arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[b+1].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[b+1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[b].innerHTML == y){ //If the next tile from target is empty but the next one is "2"
                            arr[b+1].innerHTML = "";
                            arr[b+1].style.backgroundColor = "";
                            arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[b].innerHTML != y && arr[b].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[b+1].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[b+1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[b].style.backgroundColor == "" && b == 4){
                            arr[b].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[b].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[b].style.backgroundColor == "" && b == 4){
                        arr[b+1].innerHTML = "";
                        arr[b+1].style.backgroundColor = "";
                        arr[b].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[b].innerHTML == y){ //If the next tile from target is "2"
                        arr[b+1].innerHTML = "";
                        arr[b+1].style.backgroundColor = "";
                        arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                b--;
            }
    
            let c = 11;
            while(c > 8){ //For all the tiles in the first row
                
                if (arr[c].innerHTML == y){ //If the current tile has a value of "2"
                    c--
                    
                    if(arr[c].style.backgroundColor == "" && c > 8){ //If the next tile from target is empty
                        arr[c+1].innerHTML = "";
                        arr[c+1].style.backgroundColor = "";
                        c--
                        
                        if(arr[c].style.backgroundColor == "" && c > 8){ //If the next two tiles from target is empty
                            c--;
                            if(arr[c].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[c].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[c].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[c].innerHTML == y){ //If the next two tiles from target is empty but the last one is "2"
                                arr[c+1].innerHTML = "";
                                arr[c+1].style.backgroundColor = "";
                                arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[c+1].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[c+1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[c].innerHTML == y){ //If the next tile from target is empty but the next one is "2"
                            arr[c+1].innerHTML = "";
                            arr[c+1].style.backgroundColor = "";
                            arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[c].innerHTML != y && arr[c].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[c+1].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[c+1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[c].style.backgroundColor == "" && c == 8){
                            arr[c].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[c].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[c].style.backgroundColor == "" && c == 8){
                        arr[c+1].innerHTML = "";
                        arr[c+1].style.backgroundColor = "";
                        arr[c].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[c].innerHTML == y){ //If the next tile from target is "2"
                        arr[c+1].innerHTML = "";
                        arr[c+1].style.backgroundColor = "";
                        arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                c--;
            }
    
            let d = 15;
    
            while(d > 12){ //For all the tiles in the first row
                
                if (arr[d].innerHTML == y){ //If the current tile has a value of "2"
                    d--
                    
                    if(arr[d].style.backgroundColor == "" && d > 12){ //If the next tile from target is empty
                        arr[d+1].innerHTML = "";
                        arr[d+1].style.backgroundColor = "";
                        d--
                        
                        if(arr[d].style.backgroundColor == "" && d > 12){ //If the next two tiles from target is empty
                            d--;
                            if(arr[d].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[d].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[d].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[d].innerHTML == y){ //If the next two tiles from target is empty but the last one is "2"
                                arr[d+1].innerHTML = "";
                                arr[d+1].style.backgroundColor = "";
                                arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[d+1].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[d+1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[d].innerHTML == y){ //If the next tile from target is empty but the next one is "2"
                            arr[d+1].innerHTML = "";
                            arr[d+1].style.backgroundColor = "";
                            arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[d].innerHTML != y && arr[d].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[d+1].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[d+1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[d].style.backgroundColor == "" && d == 12){
                            arr[d].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[d].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[d].style.backgroundColor == "" && d == 12){
                        arr[d+1].innerHTML = "";
                        arr[d+1].style.backgroundColor = "";
                        arr[d].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[d].innerHTML == y){ //If the next tile from target is "2"
                        arr[d+1].innerHTML = "";
                        arr[d+1].style.backgroundColor = "";
                        arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                d--;
            }
}

function moveLeft(event){
    if (isThereAGame()){
        if (canItMoveLeft()){
            if (event.key == "a"){
                shiftLeft(10,  "<p>2048</p>");
                shiftLeft(9, "<p>1024</p>");
                shiftLeft(8, "<p>512</p>");
                shiftLeft(7, "<p>256</p>");
                shiftLeft(6, "<p>128</p>");
                shiftLeft(5, "<p>64</p>");
                shiftLeft(4, "<p>32</p>");
                shiftLeft(3, "<p>16</p>");
                shiftLeft(2, "<p>8</p>");
                shiftLeft(1, "<p>4</p>");
                shiftLeft(0, "<p>2</p>");
                /*shiftLeft(0, "<p>2</p>");
                shiftLeft(1, "<p>4</p>");
                shiftLeft(2, "<p>8</p>");
                shiftLeft(3, "<p>16</p>");
                shiftLeft(4, "<p>32</p>");
                shiftLeft(5, "<p>64</p>");
                shiftLeft(6, "<p>128</p>");
                shiftLeft(7, "<p>256</p>");
                shiftLeft(8, "<p>512</p>");
                shiftLeft(9, "<p>1024</p>");
                shiftLeft(10, "<p>2048</p>");*/         
    
                let nextSquare = openSquares(arr);
                let randomNo = Math.floor(Math.random() * nextSquare.length);
                nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
                nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
 
            }
        }
        
    }
}

//Function to move down
function shiftDown(x, y){
    let a = 0;
            while(a < 12){ //For all the tiles in the first row
                
                if (arr[a].innerHTML == y){ //If the current tile has a value of "2"
                    a += 4;
                    
                    if(arr[a].style.backgroundColor == "" && a < 12){ //If the next tile from target is empty
                        arr[a-4].innerHTML = "";
                        arr[a-4].style.backgroundColor = "";
                        a += 4;
                        
                        if(arr[a].style.backgroundColor == "" && a < 12){ //If the next two tiles from target is empty
                            a += 4;
                            if(arr[a].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[a].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[a].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[a].innerHTML == y){ //If the next two tiles from target is empty but the last one is "2"
                                arr[a-4].innerHTML = "";
                                arr[a-4].style.backgroundColor = "";
                                arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[a-4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[a-4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[a].innerHTML == y){ //If the next tile from target is empty but the next one is "2"
                            arr[a-4].innerHTML = "";
                            arr[a-4].style.backgroundColor = "";
                            arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[a].innerHTML != y && arr[a].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[a-4].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[a-4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[a].style.backgroundColor == "" && a == 12){
                            arr[a].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[a].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[a].style.backgroundColor == "" && a == 12){
                        arr[a-4].innerHTML = "";
                        arr[a-4].style.backgroundColor = "";
                        arr[a].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[a].innerHTML == y){ //If the next tile from target is "2"
                        arr[a-4].innerHTML = "";
                        arr[a-4].style.backgroundColor = "";
                        arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                a += 4;
            }
    
            let b = 1;
            while(b < 13){ //For all the tiles in the first row
                
                if (arr[b].innerHTML == y){ //If the current tile has a value of "2"
                    b += 4;
                    
                    if(arr[b].style.backgroundColor == "" && b < 13){ //If the next tile from target is empty
                        arr[b-4].innerHTML = "";
                        arr[b-4].style.backgroundColor = "";
                        b += 4;
                        
                        if(arr[b].style.backgroundColor == "" && b < 13){ //If the next two tiles from target is empty
                            b += 4;
                            if(arr[b].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[b].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[b].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[b].innerHTML == y){ //If the next two tiles from target is empty but the last one is "2"
                                arr[b-4].innerHTML = "";
                                arr[b-4].style.backgroundColor = "";
                                arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[b-4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[b-4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[b].innerHTML == y){ //If the next tile from target is empty but the next one is "2"
                            arr[b-4].innerHTML = "";
                            arr[b-4].style.backgroundColor = "";
                            arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[b].innerHTML != y && arr[b].style.backgroundColor != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[b-4].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[b-4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[b].style.backgroundColor == "" && b == 13){
                            arr[b].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[b].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[b].style.backgroundColor == "" && b == 13){
                        arr[b-4].innerHTML = "";
                        arr[b-4].style.backgroundColor = "";
                        arr[b].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[b].innerHTML == y){ //If the next tile from target is "2"
                        arr[b-4].innerHTML = "";
                        arr[b-4].style.backgroundColor = "";
                        arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                b += 4;
            }
    
            let c = 2;
            while(c < 14){ //For all the tiles in the first row
                
                if (arr[c].innerHTML == y){ //If the current tile has a value of "2"
                    c += 4;
                    
                    if(arr[c].style.backgroundColor == "" && c < 14){ //If the next tile from target is empty
                        arr[c-4].innerHTML = "";
                        arr[c-4].style.backgroundColor = "";
                        c += 4;
                        
                        if(arr[c].style.backgroundColor == "" && c < 14){ //If the next two tiles from target is empty
                            c += 4;
                            if(arr[c].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[c].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[c].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[c].innerHTML == y){ //If the next two tiles from target is empty but the last one is "2"
                                arr[c-4].innerHTML = "";
                                arr[c-4].style.backgroundColor = "";
                                arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[c-4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[c-4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[c].innerHTML == y){ //If the next tile from target is empty but the next one is "2"
                            arr[c-4].innerHTML = "";
                            arr[c-4].style.backgroundColor = "";
                            arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[c].innerHTML != y && arr[c].style.backgroundColor != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[c-4].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[c-4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[c].style.backgroundColor == "" && c == 14){
                            arr[c].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[c].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[c].style.backgroundColor == "" && c == 14){
                        arr[c-4].innerHTML = "";
                        arr[c-4].style.backgroundColor = "";
                        arr[c].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[c].innerHTML == y){ //If the next tile from target is "2"
                        arr[c-4].innerHTML = "";
                        arr[c-4].style.backgroundColor = "";
                        arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                c += 4;
            }
    
            let d = 3;
    
            while(d < 15){ //For all the tiles in the first row
                
                if (arr[d].innerHTML == y){ //If the current tile has a value of "2"
                    d += 4;
                    
                    if(arr[d].style.backgroundColor == "" && d < 15){ //If the next tile from target is empty
                        arr[d-4].innerHTML = "";
                        arr[d-4].style.backgroundColor = "";
                        d += 4;
                        
                        if(arr[d].style.backgroundColor == "" && d < 15){ //If the next two tiles from target is empty
                            d += 4;
                            if(arr[d].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[d].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[d].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[d].innerHTML == y){ //If the next two tiles from target is empty but the last one is "2"
                                arr[d-4].innerHTML = "";
                                arr[d-4].style.backgroundColor = "";
                                arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[d-4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[d-4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[d].innerHTML == y){ //If the next tile from target is empty but the next one is "2"
                            arr[d-4].innerHTML = "";
                            arr[d-4].style.backgroundColor = "";
                            arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[d].innerHTML != y && arr[d].style.backgroundColor != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[d-4].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[d-4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[d].style.backgroundColor == "" && d == 15){
                            arr[d].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[d].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[d].style.backgroundColor == "" && d == 15){
                        arr[d-4].innerHTML = "";
                        arr[d-4].style.backgroundColor = "";
                        arr[d].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[d].innerHTML == y){ //If the next tile from target is "2"
                        arr[d-4].innerHTML = "";
                        arr[d-4].style.backgroundColor = "";
                        arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                d += 4;
            }
}

function moveDown(event){
    if (isThereAGame()){
        if (canItMoveDown()){
            if (event.key == "s"){
                shiftDown(10,  "<p>2048</p>");
                shiftDown(9, "<p>1024</p>");
                shiftDown(8, "<p>512</p>");
                shiftDown(7, "<p>256</p>");
                shiftDown(6, "<p>128</p>");
                shiftDown(5, "<p>64</p>");
                shiftDown(4, "<p>32</p>");
                shiftDown(3, "<p>16</p>");
                shiftDown(2, "<p>8</p>");
                shiftDown(1, "<p>4</p>");
                shiftDown(0, "<p>2</p>");
                /*shiftDown(0, "<p>2</p>");
                shiftDown(1, "<p>4</p>");
                shiftDown(2, "<p>8</p>");
                shiftDown(3, "<p>16</p>");
                shiftDown(4, "<p>32</p>");
                shiftDown(5, "<p>64</p>");
                shiftDown(6, "<p>128</p>");
                shiftDown(7, "<p>256</p>");
                shiftDown(8, "<p>512</p>");
                shiftDown(9, "<p>1024</p>");
                shiftDown(10,  "<p>2048</p>");*/         
    
                let nextSquare = openSquares(arr);
                let randomNo = Math.floor(Math.random() * nextSquare.length);
                nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
                nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`; 
            }
        }
    }
}

//Function to move up
function shiftUp(x, y){
    let a = 12;
            while(a > 0){ //For all the tiles in the first row
                
                if (arr[a].innerHTML == y){ //If the current tile has a value of "2"
                    a -= 4;
                    
                    if(arr[a].style.backgroundColor == "" && a > 0){ //If the next tile from target is empty
                        arr[a+4].innerHTML = "";
                        arr[a+4].style.backgroundColor = "";
                        a -= 4;
                        
                        if(arr[a].style.backgroundColor == "" && a > 0){ //If the next two tiles from target is empty
                            a -= 4;
                            if(arr[a].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[a].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[a].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[a].innerHTML == y){ //If the next two tiles from target is empty but the last one is "2"
                                arr[a+4].innerHTML = "";
                                arr[a+4].style.backgroundColor = "";
                                arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[a+4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[a+4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[a].innerHTML == y){ //If the next tile from target is empty but the next one is "2"
                            arr[a+4].innerHTML = "";
                            arr[a+4].style.backgroundColor = "";
                            arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[a].innerHTML != y && arr[a].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[a+4].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[a+4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[a].style.backgroundColor == "" && a == 0){
                            arr[a].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[a].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[a].style.backgroundColor == "" && a == 0){
                        arr[a+4].innerHTML = "";
                        arr[a+4].style.backgroundColor = "";
                        arr[a].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[a].innerHTML == y){ //If the next tile from target is "2"
                        arr[a+4].innerHTML = "";
                        arr[a+4].style.backgroundColor = "";
                        arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                a -= 4;
            }
    
            let b = 13;
            while(b > 1){ //For all the tiles in the first row
                
                if (arr[b].innerHTML == y){ //If the current tile has a value of "2"
                    b -= 4;
                    
                    if(arr[b].style.backgroundColor == "" && b > 1){ //If the next tile from target is empty
                        arr[b+4].innerHTML = "";
                        arr[b+4].style.backgroundColor = "";
                        b -= 4;
                        
                        if(arr[b].style.backgroundColor == "" && b > 1){ //If the next two tiles from target is empty
                            b -= 4;
                            if(arr[b].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[b].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[b].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[b].innerHTML == y){ //If the next two tiles from target is empty but the last one is "2"
                                arr[b+4].innerHTML = "";
                                arr[b+4].style.backgroundColor = "";
                                arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[b+4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[b+4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[b].innerHTML == y){ //If the next tile from target is empty but the next one is "2"
                            arr[b+4].innerHTML = "";
                            arr[b+4].style.backgroundColor = "";
                            arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[b].innerHTML != y && arr[b].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[b+4].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[b+4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[b].style.backgroundColor == "" && b == 1){
                            arr[b].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[b].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[b].style.backgroundColor == "" && b == 1){
                        arr[b+4].innerHTML = "";
                        arr[b+4].style.backgroundColor = "";
                        arr[b].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[b].innerHTML == y){ //If the next tile from target is "2"
                        arr[b+4].innerHTML = "";
                        arr[b+4].style.backgroundColor = "";
                        arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                b -= 4;
            }
    
            let c = 14;
            while(c > 2){ //For all the tiles in the first row
                
                if (arr[c].innerHTML == y){ //If the current tile has a value of "2"
                    c -= 4;
                    
                    if(arr[c].style.backgroundColor == "" && c > 2){ //If the next tile from target is empty
                        arr[c+4].innerHTML = "";
                        arr[c+4].style.backgroundColor = "";
                        c -= 4;
                        
                        if(arr[c].style.backgroundColor == "" && c > 2){ //If the next two tiles from target is empty
                            c -= 4;
                            if(arr[c].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[c].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[c].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[c].innerHTML == y){ //If the next two tiles from target is empty but the last one is "2"
                                arr[c+4].innerHTML = "";
                                arr[c+4].style.backgroundColor = "";
                                arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[c+4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[c+4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[c].innerHTML == y){ //If the next tile from target is empty but the next one is "2"
                            arr[c+4].innerHTML = "";
                            arr[c+4].style.backgroundColor = "";
                            arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[c].innerHTML != y && arr[c].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[c+4].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[c+4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[c].style.backgroundColor == "" && c == 2){
                            arr[c].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[c].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[c].style.backgroundColor == "" && c == 2){
                        arr[c+4].innerHTML = "";
                        arr[c+4].style.backgroundColor = "";
                        arr[c].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[c].innerHTML == y){ //If the next tile from target is "2"
                        arr[c+4].innerHTML = "";
                        arr[c+4].style.backgroundColor = "";
                        arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                c -= 4;
            }
    
            let d = 15;
    
            while(d > 3){ //For all the tiles in the first row
                
                if (arr[d].innerHTML == y){ //If the current tile has a value of "2"
                    d -= 4;
                    
                    if(arr[d].style.backgroundColor == "" && d > 3){ //If the next tile from target is empty
                        arr[d+4].innerHTML = "";
                        arr[d+4].style.backgroundColor = "";
                        d -= 4;
                        
                        if(arr[d].style.backgroundColor == "" && d > 3){ //If the next two tiles from target is empty
                            d -= 4;
                            if(arr[d].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[d].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[d].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[d].innerHTML == y){ //If the next two tiles from target is empty but the last one is "2"
                                arr[d+4].innerHTML = "";
                                arr[d+4].style.backgroundColor = "";
                                arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[d+4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[d+4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[d].innerHTML == y){ //If the next tile from target is empty but the next one is "2"
                            arr[d+4].innerHTML = "";
                            arr[d+4].style.backgroundColor = "";
                            arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[d].innerHTML != y && arr[d].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[d+4].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[d+4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[d].style.backgroundColor == "" && d == 3){
                            arr[d].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[d].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[d].style.backgroundColor == "" && d == 3){
                        arr[d+4].innerHTML = "";
                        arr[d+4].style.backgroundColor = "";
                        arr[d].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[d].innerHTML == y){ //If the next tile from target is "2"
                        arr[d+4].innerHTML = "";
                        arr[d+4].style.backgroundColor = "";
                        arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                d -= 4;
            }
}

function moveUp(event){
    if (isThereAGame()){
        if (canItMoveUp()){
            if (event.key == "w"){
                shiftUp(10,  "<p>2048</p>");
                shiftUp(9, "<p>1024</p>");
                shiftUp(8, "<p>512</p>");
                shiftUp(7, "<p>256</p>");
                shiftUp(6, "<p>128</p>");
                shiftUp(5, "<p>64</p>");
                shiftUp(4, "<p>32</p>");
                shiftUp(3, "<p>16</p>");
                shiftUp(2, "<p>8</p>");
                shiftUp(1, "<p>4</p>");
                shiftUp(0, "<p>2</p>");
                /*shiftUp(0, "<p>2</p>");
                shiftUp(1, "<p>4</p>");
                shiftUp(2, "<p>8</p>");
                shiftUp(3, "<p>16</p>");
                shiftUp(4, "<p>32</p>");
                shiftUp(5, "<p>64</p>");
                shiftUp(6, "<p>128</p>");
                shiftUp(7, "<p>256</p>");
                shiftUp(8, "<p>512</p>");
                shiftUp(9, "<p>1024</p>");
                shiftUp(10,  "<p>2048</p>");*/  

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
