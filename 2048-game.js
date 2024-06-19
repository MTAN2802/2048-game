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
        if (arr[i].innerHTML.indexOf("2") != -1) {
            return true}
    }
}

function initiateGame(){
    //let test = 0;
    let randomNo = Math.floor(Math.random() * 16);
    if (isThereAGame()){
        alert('There is already an active game!')
    }
    else{
        for (i=0; i < arr.length; i++){
            if (randomNo == i){
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

//Function to move right
function leftToRight(x, y){
    let a = 0;
            while(a < 3){ //For all the tiles in the first row
                
                if (arr[a].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
                    a++
                    
                    if(arr[a].style.backgroundColor == "" && a < 3){ //If the next tile from target is empty
                        arr[a-1].innerHTML = "";
                        arr[a-1].style.backgroundColor = "";
                        a++
                        
                        if(arr[a].style.backgroundColor == "" && a < 3){ //If the next two tiles from target is empty
                            a++;
                            if(arr[a].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[a].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[a].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[a].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[a-1].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[a-1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[a].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
                            arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[a].innerHTML != y && arr[a].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[a-1].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[a-1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[a].style.backgroundColor == "" && a == 3){
                            arr[a].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[a].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[a].style.backgroundColor == "" && a == 3){
                        arr[a-1].innerHTML = "";
                        arr[a-1].style.backgroundColor = "";
                        arr[a].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[a].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                a++;
            }
    
            let b = 4;
            while(b < 7){ //For all the tiles in the first row
                
                if (arr[b].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
                    b++
                    
                    if(arr[b].style.backgroundColor == "" && b < 7){ //If the next tile from target is empty
                        arr[b-1].innerHTML = "";
                        arr[b-1].style.backgroundColor = "";
                        b++
                        
                        if(arr[b].style.backgroundColor == "" && b < 7){ //If the next two tiles from target is empty
                            b++;
                            if(arr[b].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[b].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[b].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[b].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[b-1].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[b-1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[b].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
                            arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[b].innerHTML != y && arr[b].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[b-1].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[b-1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[b].style.backgroundColor == "" && b == 7){
                            arr[b].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[b].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[b].style.backgroundColor == "" && b == 7){
                        arr[b-1].innerHTML = "";
                        arr[b-1].style.backgroundColor = "";
                        arr[b].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[b].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                b++;
            }
    
            let c = 8;
            while(c < 11){ //For all the tiles in the first row
                
                if (arr[c].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
                    c++
                    
                    if(arr[c].style.backgroundColor == "" && c < 11){ //If the next tile from target is empty
                        arr[c-1].innerHTML = "";
                        arr[c-1].style.backgroundColor = "";
                        c++
                        
                        if(arr[c].style.backgroundColor == "" && c < 11){ //If the next two tiles from target is empty
                            c++;
                            if(arr[c].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[c].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[c].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[c].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[c-1].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[c-1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[c].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
                            arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[c].innerHTML != y && arr[c].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[c-1].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[c-1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[c].style.backgroundColor == "" && c == 11){
                            arr[c].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[c].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[c].style.backgroundColor == "" && c == 11){
                        arr[c-1].innerHTML = "";
                        arr[c-1].style.backgroundColor = "";
                        arr[c].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[c].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                c++;
            }
    
            let d = 12;
    
            while(d < 15){ //For all the tiles in the first row
                
                if (arr[d].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
                    d++
                    
                    if(arr[d].style.backgroundColor == "" && d < 15){ //If the next tile from target is empty
                        arr[d-1].innerHTML = "";
                        arr[d-1].style.backgroundColor = "";
                        d++
                        
                        if(arr[d].style.backgroundColor == "" && d < 15){ //If the next two tiles from target is empty
                            d++;
                            if(arr[d].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[d].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[d].style.backgroundColor = `${tiles[x].hex}`
                            }
                            else if (arr[d].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[d-1].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[d-1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[d].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
                            arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                            arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                        }
                        else if (arr[d].innerHTML != y && arr[d].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[d-1].innerHTML = `<p>${tiles[x].number}</p>`
                            arr[d-1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        else if(arr[d].style.backgroundColor == "" && d == 15){
                            arr[d].innerHTML = `<p>${tiles[x].number}</p>`;
                            arr[d].style.backgroundColor = `${tiles[x].hex}`;
                        }
                        }
                    else if (arr[d].style.backgroundColor == "" && d == 15){
                        arr[d-1].innerHTML = "";
                        arr[d-1].style.backgroundColor = "";
                        arr[d].innerHTML = `<p>${tiles[x].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[x].hex}`;
                    }
                    else if (arr[d].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                d++;
            }
}

function moveRight(event){
    if (isThereAGame()){
        if (event.key == "d"){
            leftToRight(10, "2048");
            leftToRight(9, "1024");
            leftToRight(8, "512");
            leftToRight(7, "256");
            leftToRight(6, "128");
            leftToRight(5, "64");
            leftToRight(4, "32");
            leftToRight(3, "16");
            leftToRight(2, "8");
            leftToRight(1, "4");
            leftToRight(0, "2");
           
            let nextSquare = openSquares(arr);
            let randomNo = Math.floor(Math.random() * nextSquare.length);
            nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
            nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
        }
    }
}

//Function to move left
function rightToLeft(x, y){
    let a = 3;
            while(a > 0){ //For all the tiles in the first row
                
                if (arr[a].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
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
                            else if (arr[a].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[a+1].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[a+1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[a].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
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
                    else if (arr[a].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                a--;
            }
    
            let b = 7;
            while(b > 4){ //For all the tiles in the first row
                
                if (arr[b].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
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
                            else if (arr[b].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[b+1].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[b+1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[b].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
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
                    else if (arr[b].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                b--;
            }
    
            let c = 11;
            while(c > 8){ //For all the tiles in the first row
                
                if (arr[c].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
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
                            else if (arr[c].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[c+1].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[c+1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[c].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
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
                    else if (arr[c].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                c--;
            }
    
            let d = 15;
    
            while(d > 12){ //For all the tiles in the first row
                
                if (arr[d].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
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
                            else if (arr[d].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[d+1].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[d+1].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[d].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
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
                    else if (arr[d].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                d--;
            }
}

function moveLeft(event){
    if (isThereAGame()){
        if (event.key == "a"){
            rightToLeft(10, "2048");
            rightToLeft(9, "1024");
            rightToLeft(8, "512");
            rightToLeft(7, "256");
            rightToLeft(6, "128");
            rightToLeft(5, "64");
            rightToLeft(4, "32");
            rightToLeft(3, "16");
            rightToLeft(2, "8");
            rightToLeft(1, "4");
            rightToLeft(0, "2");

            let nextSquare = openSquares(arr);
            let randomNo = Math.floor(Math.random() * nextSquare.length);
            nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
            nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
        }
    }
}

//Function to move down
function topToBottom(x, y){
    let a = 0;
            while(a < 12){ //For all the tiles in the first row
                
                if (arr[a].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
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
                            else if (arr[a].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[a-4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[a-4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[a].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
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
                    else if (arr[a].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                a += 4;
            }
    
            let b = 1;
            while(b < 13){ //For all the tiles in the first row
                
                if (arr[b].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
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
                            else if (arr[b].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[b-4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[b-4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[b].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
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
                    else if (arr[b].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                b += 4;
            }
    
            let c = 2;
            while(c < 14){ //For all the tiles in the first row
                
                if (arr[c].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
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
                            else if (arr[c].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[c-4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[c-4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[c].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
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
                    else if (arr[c].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                c += 4;
            }
    
            let d = 3;
    
            while(d < 15){ //For all the tiles in the first row
                
                if (arr[d].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
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
                            else if (arr[d].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[d-4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[d-4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[d].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
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
                    else if (arr[d].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                d += 4;
            }
}

function moveDown(event){
    if (isThereAGame()){
        if (event.key == "s"){
            topToBottom(10, "2048");
            topToBottom(9, "1024");
            topToBottom(8, "512");
            topToBottom(7, "256");
            topToBottom(6, "128");
            topToBottom(5, "64");
            topToBottom(4, "32");
            topToBottom(3, "16");
            topToBottom(2, "8");
            topToBottom(1, "4");
            topToBottom(0, "2");

            let nextSquare = openSquares(arr);
            let randomNo = Math.floor(Math.random() * nextSquare.length);
            nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
            nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
        }
    }
}

//Function to move up
function bottomToTop(x, y){
    let a = 12;
            while(a > 0){ //For all the tiles in the first row
                
                if (arr[a].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
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
                            else if (arr[a].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[a+4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[a+4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[a].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
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
                    else if (arr[a].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[a].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                a -= 4;
            }
    
            let b = 13;
            while(b > 1){ //For all the tiles in the first row
                
                if (arr[b].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
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
                            else if (arr[b].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[b+4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[b+4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[b].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
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
                    else if (arr[b].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[b].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                b -= 4;
            }
    
            let c = 14;
            while(c > 2){ //For all the tiles in the first row
                
                if (arr[c].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
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
                            else if (arr[c].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[c+4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[c+4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[c].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
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
                    else if (arr[c].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[c].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                c -= 4;
            }
    
            let d = 15;
    
            while(d > 3){ //For all the tiles in the first row
                
                if (arr[d].innerHTML.indexOf(y) != -1){ //If the current tile has a value of "2"
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
                            else if (arr[d].innerHTML.indexOf(y) != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                                arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[d+4].innerHTML = `<p>${tiles[x].number}</p>`
                                arr[d+4].style.backgroundColor = `${tiles[x].hex}`
                            }
                        }
                        else if (arr[d].innerHTML.indexOf(y) != -1){ //If the next tile from target is empty but the next one is "2"
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
                    else if (arr[d].innerHTML.indexOf(y) != -1){ //If the next tile from target is "2"
                        arr[d].innerHTML = `<p>${tiles[x+1].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[x+1].hex}`;
                    }
                }
                d -= 4;
            }
}

function moveUp(event){
    if (isThereAGame()){
        if (event.key == "w"){
            bottomToTop(10, "2048");
            bottomToTop(9, "1024");
            bottomToTop(8, "512");
            bottomToTop(7, "256");
            bottomToTop(6, "128");
            bottomToTop(5, "64");
            bottomToTop(4, "32");
            bottomToTop(3, "16");
            bottomToTop(2, "8");
            bottomToTop(1, "4");
            bottomToTop(0, "2");

            let nextSquare = openSquares(arr);
            let randomNo = Math.floor(Math.random() * nextSquare.length);
            nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
            nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
        }
    }
}

document.addEventListener("keydown", moveRight)
document.addEventListener("keydown", moveLeft)
document.addEventListener("keydown", moveDown)
document.addEventListener("keydown", moveUp)
