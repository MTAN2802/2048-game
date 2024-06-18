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
    //let test = 15;
    let randomNo = Math.floor(Math.random() * 16);
    if (isThereAGame() == true){
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

//Functions for the game
function openSquares(arr) {
    let available = [];
    for (i = 0; i < arr.length; i++){
        if (arr[i].style.backgroundColor == ""){
            available.push(arr[i]);
        }
    }
    return available;
}

function moveRight(event){
    if (isThereAGame()){
        if (event.key == "d"){
            let a = 0;
            while(a < 3){ //For all the tiles in the first row
                
                if (arr[a].innerHTML.indexOf("2") != -1){ //If the current tile has a value of "2"
                    a++
                    
                    if(arr[a].style.backgroundColor == "" && a < 3){ //If the next tile from target is empty
                        arr[a-1].innerHTML = "";
                        arr[a-1].style.backgroundColor = "";
                        a++
                        
                        if(arr[a].style.backgroundColor == "" && a < 3){ //If the next two tiles from target is empty
                            a++;
                            if(arr[a].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[a].innerHTML = `<p>${tiles[0].number}</p>`
                                arr[a].style.backgroundColor = `${tiles[0].hex}`
                            }
                            else if (arr[a].innerHTML.indexOf("2") != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[a].innerHTML = `<p>${tiles[1].number}</p>`;
                                arr[a].style.backgroundColor = `${tiles[1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[a-1].innerHTML = `<p>${tiles[0].number}</p>`
                                arr[a-1].style.backgroundColor = `${tiles[0].hex}`
                            }
                        }
                        else if (arr[a].innerHTML.indexOf("2") != -1){ //If the next tile from target is empty but the next one is "2"
                            arr[a].innerHTML = `<p>${tiles[1].number}</p>`;
                            arr[a].style.backgroundColor = `${tiles[1].hex}`;
                        }
                        else if (arr[a].innerHTML != "2" && arr[a].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[a-1].innerHTML = `<p>${tiles[0].number}</p>`
                            arr[a-1].style.backgroundColor = `${tiles[0].hex}`
                            }
                        else if(arr[a].style.backgroundColor == "" && a == 3){
                            arr[a].innerHTML = `<p>${tiles[0].number}</p>`;
                            arr[a].style.backgroundColor = `${tiles[0].hex}`;
                        }
                        }
                    else if (arr[a].style.backgroundColor == "" && a == 3){
                        arr[a-1].innerHTML = "";
                        arr[a-1].style.backgroundColor = "";
                        arr[a].innerHTML = `<p>${tiles[0].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[0].hex}`;
                    }
                    else if (arr[a].innerHTML.indexOf("2") != -1){ //If the next tile from target is "2"
                        arr[a].innerHTML = `<p>${tiles[1].number}</p>`;
                        arr[a].style.backgroundColor = `${tiles[1].hex}`;
                    }
                }
                a++;
            }
    
            let b = 4;
            while(b < 7){ //For all the tiles in the first row
                
                if (arr[b].innerHTML.indexOf("2") != -1){ //If the current tile has a value of "2"
                    b++
                    
                    if(arr[b].style.backgroundColor == "" && b < 7){ //If the next tile from target is empty
                        arr[b-1].innerHTML = "";
                        arr[b-1].style.backgroundColor = "";
                        b++
                        
                        if(arr[b].style.backgroundColor == "" && b < 7){ //If the next two tiles from target is empty
                            b++;
                            if(arr[b].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[b].innerHTML = `<p>${tiles[0].number}</p>`
                                arr[b].style.backgroundColor = `${tiles[0].hex}`
                            }
                            else if (arr[b].innerHTML.indexOf("2") != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[b].innerHTML = `<p>${tiles[1].number}</p>`;
                                arr[b].style.backgroundColor = `${tiles[1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[b-1].innerHTML = `<p>${tiles[0].number}</p>`
                                arr[b-1].style.backgroundColor = `${tiles[0].hex}`
                            }
                        }
                        else if (arr[b].innerHTML.indexOf("2") != -1){ //If the next tile from target is empty but the next one is "2"
                            arr[b].innerHTML = `<p>${tiles[1].number}</p>`;
                            arr[b].style.backgroundColor = `${tiles[1].hex}`;
                        }
                        else if (arr[b].innerHTML != "2" && arr[b].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[b-1].innerHTML = `<p>${tiles[0].number}</p>`
                            arr[b-1].style.backgroundColor = `${tiles[0].hex}`
                            }
                        else if(arr[b].style.backgroundColor == "" && b == 7){
                            arr[b].innerHTML = `<p>${tiles[0].number}</p>`;
                            arr[b].style.backgroundColor = `${tiles[0].hex}`;
                        }
                        }
                    else if (arr[b].style.backgroundColor == "" && b == 7){
                        arr[b-1].innerHTML = "";
                        arr[b-1].style.backgroundColor = "";
                        arr[b].innerHTML = `<p>${tiles[0].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[0].hex}`;
                    }
                    else if (arr[b].innerHTML.indexOf("2") != -1){ //If the next tile from target is "2"
                        arr[b].innerHTML = `<p>${tiles[1].number}</p>`;
                        arr[b].style.backgroundColor = `${tiles[1].hex}`;
                    }
                }
                b++;
            }
    
            let c = 8;
            while(c < 11){ //For all the tiles in the first row
                
                if (arr[c].innerHTML.indexOf("2") != -1){ //If the current tile has a value of "2"
                    c++
                    
                    if(arr[c].style.backgroundColor == "" && c < 11){ //If the next tile from target is empty
                        arr[c-1].innerHTML = "";
                        arr[c-1].style.backgroundColor = "";
                        c++
                        
                        if(arr[c].style.backgroundColor == "" && c < 11){ //If the next two tiles from target is empty
                            c++;
                            if(arr[c].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[c].innerHTML = `<p>${tiles[0].number}</p>`
                                arr[c].style.backgroundColor = `${tiles[0].hex}`
                            }
                            else if (arr[c].innerHTML.indexOf("2") != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[c].innerHTML = `<p>${tiles[1].number}</p>`;
                                arr[c].style.backgroundColor = `${tiles[1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[c-1].innerHTML = `<p>${tiles[0].number}</p>`
                                arr[c-1].style.backgroundColor = `${tiles[0].hex}`
                            }
                        }
                        else if (arr[c].innerHTML.indexOf("2") != -1){ //If the next tile from target is empty but the next one is "2"
                            arr[c].innerHTML = `<p>${tiles[1].number}</p>`;
                            arr[c].style.backgroundColor = `${tiles[1].hex}`;
                        }
                        else if (arr[c].innerHTML != "2" && arr[c].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[c-1].innerHTML = `<p>${tiles[0].number}</p>`
                            arr[c-1].style.backgroundColor = `${tiles[0].hex}`
                            }
                        else if(arr[c].style.backgroundColor == "" && c == 11){
                            arr[c].innerHTML = `<p>${tiles[0].number}</p>`;
                            arr[c].style.backgroundColor = `${tiles[0].hex}`;
                        }
                        }
                    else if (arr[c].style.backgroundColor == "" && c == 11){
                        arr[c-1].innerHTML = "";
                        arr[c-1].style.backgroundColor = "";
                        arr[c].innerHTML = `<p>${tiles[0].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[0].hex}`;
                    }
                    else if (arr[c].innerHTML.indexOf("2") != -1){ //If the next tile from target is "2"
                        arr[c].innerHTML = `<p>${tiles[1].number}</p>`;
                        arr[c].style.backgroundColor = `${tiles[1].hex}`;
                    }
                }
                c++;
            }
    
            let d = 12;
    
            while(d < 15){ //For all the tiles in the first row
                
                if (arr[d].innerHTML.indexOf("2") != -1){ //If the current tile has a value of "2"
                    d++
                    
                    if(arr[d].style.backgroundColor == "" && d < 15){ //If the next tile from target is empty
                        arr[d-1].innerHTML = "";
                        arr[d-1].style.backgroundColor = "";
                        d++
                        
                        if(arr[d].style.backgroundColor == "" && d < 15){ //If the next two tiles from target is empty
                            d++;
                            if(arr[d].style.backgroundColor == ""){ //If the next three tiles from target is empty
                                arr[d].innerHTML = `<p>${tiles[0].number}</p>`
                                arr[d].style.backgroundColor = `${tiles[0].hex}`
                            }
                            else if (arr[d].innerHTML.indexOf("2") != -1){ //If the next two tiles from target is empty but the last one is "2"
                                arr[d].innerHTML = `<p>${tiles[1].number}</p>`;
                                arr[d].style.backgroundColor = `${tiles[1].hex}`;
                            }
                            else{  //If the next two tiles from target is empty but a number other than "2" is next
                                arr[d-1].innerHTML = `<p>${tiles[0].number}</p>`
                                arr[d-1].style.backgroundColor = `${tiles[0].hex}`
                            }
                        }
                        else if (arr[d].innerHTML.indexOf("2") != -1){ //If the next tile from target is empty but the next one is "2"
                            arr[d].innerHTML = `<p>${tiles[1].number}</p>`;
                            arr[d].style.backgroundColor = `${tiles[1].hex}`;
                        }
                        else if (arr[d].innerHTML != "2" && arr[d].innerHTML != "") { //If the next tile from target is empty but a number other than "2" is next
                            arr[d-1].innerHTML = `<p>${tiles[0].number}</p>`
                            arr[d-1].style.backgroundColor = `${tiles[0].hex}`
                            }
                        else if(arr[d].style.backgroundColor == "" && d == 15){
                            arr[d].innerHTML = `<p>${tiles[0].number}</p>`;
                            arr[d].style.backgroundColor = `${tiles[0].hex}`;
                        }
                        }
                    else if (arr[d].style.backgroundColor == "" && d == 15){
                        arr[d-1].innerHTML = "";
                        arr[d-1].style.backgroundColor = "";
                        arr[d].innerHTML = `<p>${tiles[0].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[0].hex}`;
                    }
                    else if (arr[d].innerHTML.indexOf("2") != -1){ //If the next tile from target is "2"
                        arr[d].innerHTML = `<p>${tiles[1].number}</p>`;
                        arr[d].style.backgroundColor = `${tiles[1].hex}`;
                    }
                }
                d++;
            }
    
            let nextSquare = openSquares(arr);
            let randomNo = Math.floor(Math.random() * nextSquare.length);
            nextSquare[randomNo].style.backgroundColor = `${tiles[0].hex}`;
            nextSquare[randomNo].innerHTML = `<p>${tiles[0].number}</p>`;
        }
    }
    
}

document.addEventListener("keydown", moveRight)