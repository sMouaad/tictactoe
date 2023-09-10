const gameResult = document.querySelector(".result");
const audio = document.querySelectorAll("audio")
const human = document.getElementById("human")
const robot = document.getElementById("robot");
const button = document.querySelector("button");

let humanButtons = document.querySelectorAll(".choice.player");
let robotButtons = document.querySelectorAll(".choice.robot");
let robotHearts = document.querySelectorAll(".player2 .heart");
let humanHearts = document.querySelectorAll(".player1 .heart");
let heartIndex = [0,4]; // [0] : Robot [1] : Human;

function smooth(e){
    e.target.classList.toggle("playerchoice");
    e.target.previousElementSibling.classList.toggle("flexy");
    humanButtons.forEach((btn)=>{
        btn.removeEventListener("click",smooth);
    })
    let computerChoice = getComputerChoice();
    let computerElement = document.querySelector(`.${computerChoice.toLowerCase()}.choice.robot`);
    computerElement.previousElementSibling.classList.toggle("flexy");
    computerElement.classList.toggle("robotchoice");
    game(e.target.classList[0],computerChoice);
    //game(e.target.textContent);
}
humanButtons.forEach((btn)=>{
    btn.addEventListener("click",smooth);
})

function getComputerChoice(){
    let choice = parseInt(Math.random()*3+1);
    if(choice == 1){
        return 'Rock'
    }
    else if(choice==2){
        return 'Paper'
    }
    return 'Scissors'
}


function rockPaperScissors(playerchoice, computerChoice){
    if(playerchoice.toLowerCase()==computerChoice.toLowerCase()) return("It's a tie!")

    if(playerchoice.toLowerCase()=='rock'){
        if(computerChoice=='Scissors') return("You win!<br>Rock beats Scissors.")
        return("You lose!<br>Paper beats Rock.")
    }
    if(playerchoice.toLowerCase()=='paper'){
        if(computerChoice=='Scissors') return("You lose!<br>Scissors beat Paper.")
        return("You win!<br>Paper beats Rock.")
    }
    if(playerchoice.toLowerCase()=='scissors'){
        if(computerChoice=='Rock') return("You lose!<br>Rock beats Scissors.")
        return("You win!<br> Scissors beat Paper.")
    }

}
function robotHurt(duration){
    setTimeout(function (){
        audio[1].play();
        //takes 0.15 seconds to finish.
        robot.classList.add("hurt");
        decreaseHeart(1);
        setTimeout(function(){
            robot.classList.remove("hurt");
        },audio[1].duration*100)
    },duration);

}
function humanHurt(duration){
    setTimeout(function (){
        audio[0].play();
        //Animation & filter when getting hurt
        human.classList.add("hurt");
        decreaseHeart(0);
        setTimeout(function(){
            human.classList.remove("hurt");
        },audio[0].duration*100)
    },duration);
}

function humanAttack(){
    //Animation to attack : takes 2s to finish.
    human.classList.add("attackright");
    setTimeout(() => {
        human.classList.remove("attackright");
    },2000);
    robotHurt(1600);
}

function robotAttack(){
    //Animation to attack
    robot.classList.add("attackleft");
    setTimeout(() => {
        robot.classList.remove("attackleft");
    }, 2000);
    humanHurt(1600);

}

function decreaseHeart(humanOrRobot){
    if(!humanOrRobot){
        humanHearts[heartIndex[1]].src = "./imgs/empty-heart.png";
        humanHearts[heartIndex[1]].classList.add("flash");
        //delay to remove the flash
        setTimeout(()=>{
            humanHearts[heartIndex[1]--].classList.remove("flash");
        },100)
    }
    else{
        robotHearts[heartIndex[0]].src = "./imgs/empty-heart.png";
        robotHearts[heartIndex[0]].classList.add("flash");
        //delay to remove the flash
        setTimeout(()=>{
            robotHearts[heartIndex[0]++].classList.remove("flash");
        },100)
    }
}

function initializeHearts(){
    humanHearts.forEach((heart)=>{
        heart.src= "./imgs/heart.png"
    })
    robotHearts.forEach((heart)=>{
        heart.src= "./imgs/hardcore-heart.png"
    })
}
function initializeButtons(){
    humanButtons.forEach((btn)=>{
        btn.previousElementSibling.classList.add("flexy");
        btn.classList.remove("playerchoice");
        btn.addEventListener("click",smooth);
    })
}
function nextRound(){
    robotButtons.forEach((btn)=>{
        btn.previousElementSibling.classList.add("flexy");
        btn.classList.remove("robotchoice");
    })
    initializeButtons();
}
function checkWin(result){
    if(heartIndex[0] === 5 || heartIndex[1]+1 === 0){
        if(heartIndex[0] === 5) {
            robot.src = "./imgs/death.gif"
            setTimeout(() => {
                robot.src = "./imgs/robot.png"
                robot.classList.add("hidden");
            },2000);
            setTimeout(() => {
                humanButtons.forEach((btn)=>{
                    btn.removeEventListener("click",smooth);
                })
            }, 700);
            gameResult.textContent="You win!"
        }
        else if(heartIndex[1]+1===0){
            human.src = "./imgs/death.gif"
            setTimeout(() => {
                human.src = "./imgs/human.png"
                human.classList.add("hidden");
            },2000);
            setTimeout(() => {
                humanButtons.forEach((btn)=>{
                    btn.removeEventListener("click",smooth);
                })
            }, 700);
            gameResult.textContent="Game over!"
        }
        button.classList.remove("hidden");
    }
}
function initializeScore(){
    heartIndex = [0,4];
}

function initializeCharacters(){
    human.classList.remove("hidden");
    robot.classList.remove("hidden");
}
function initializeGame(){
    button.classList.add("hidden");
    initializeHearts();
    initializeButtons();
    initializeScore();
    initializeCharacters();
}

function game(playerchoice,computerChoice){
    //one of them won, we stop the game.
    gameResult.textContent="";
    if(heartIndex[0] === 5 || heartIndex[1]+1 === 0){
        return
    }
    else{
        let result = rockPaperScissors(playerchoice,computerChoice);
        if(result.includes("win")){
            //this function takes around 2.15 seconds to finish.
            humanAttack();

        }else if(result.includes("lose")){
            //this function takes around 2.15 seconds to finish.
            robotAttack();
        }
        gameResult.innerHTML = result;
        setTimeout(nextRound,2400);
        setTimeout(checkWin,1750,result);
    }
    
}

