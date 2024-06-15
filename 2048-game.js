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

let arr = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen];
//
function isThereAGame(){
    for (i=0; i < arr.length; i++){
        if (arr[i].style.backgroundColor == "lightblue") {
            return true}
    }
}

function initiateGame(){
    let randomNo = Math.floor(Math.random() * 16);
    if (isThereAGame() == true){
        alert('There is already a game active!')
    }
    else{
        for (i=0; i < arr.length; i++){
            if (randomNo == i){
                arr[i].style.backgroundColor = "lightblue";
                arr[i].innerHTML = '2';
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