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
function moveRight(event){
    if (event.key == "d"){
        let a = 0;
        //For all the tiles in the first row
        while(a < 3){
            //If the current tile has a value of "2"
            if (arr[a].innerHTML.indexOf("2") != -1){
                arr[a].innerHTML = "";
                arr[a].style.backgroundColor = "";
                a++
                //If next tile is empty (min: 2nd tile)
                if(arr[a].style.backgroundColor == ""){
                    a++
                    //If next tile is empty (min: 3rd tile)
                    if(arr[a].style.backgroundColor == "" && a < 4){
                        a++;
                        if(arr[a].style.backgroundColor == "" && a < 4){
                            arr[a].innerHTML = `<p>${tiles[0].number}</p>`
                            arr[a].style.backgroundColor = `${tiles[0].hex}`
                        }
                        else{
                            arr[a-1].innerHTML = `<p>${tiles[0].number}</p>`
                            arr[a-1].style.backgroundColor = `${tiles[0].hex}`
                        }
                    }
                    else{
                        arr[a-1].innerHTML = `<p>${tiles[0].number}</p>`
                        arr[a-1].style.backgroundColor = `${tiles[0].hex}`
                        }
                    }
                }
        a++;
        }
    }
        //If the NEXT tile has a value of "2"
        /*if (arr[a].innerHTML.indexOf("2") != -1){
            arr[a].innerHTML = `${tiles[1].number}`;
            arr[a].style.backgroundColor = `${tiles[1].hex}`;
        }*/
    }

document.addEventListener("keydown", moveRight)