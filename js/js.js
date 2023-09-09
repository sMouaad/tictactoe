const btns = document.querySelectorAll(".choice.player");
const gameResult = document.querySelector(".result");
const round = [0,0];
const rounds = document.querySelectorAll(".player")
const audio = document.querySelectorAll("audio")
const human = document.getElementById("human")
const robot = document.getElementById("robot");
function smooth(e){
    e.target.classList.toggle("playerchoice");
    e.target.previousElementSibling.classList.toggle("flexy");
    btns.forEach((btn)=>{
        btn.removeEventListener("click",smooth);
    })
    let computerChoice = getComputerChoice();
    let computerElement = document.querySelector(`.${computerChoice.toLowerCase()}.choice.robot`);
    computerElement.previousElementSibling.classList.toggle("flexy");
    computerElement.classList.toggle("robotchoice");
    game(e.target.classList[0],computerChoice);
    //game(e.target.textContent);
}
btns.forEach((btn)=>{
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
        if(computerChoice=='Scissors') return("You win! Rock beats Scissors.")
        return("You lose! Paper beats Rock.")
    }
    if(playerchoice.toLowerCase()=='paper'){
        if(computerChoice=='Scissors') return("You lose! Scissors beat Paper.")
        return("You win! Paper beats Rock.")
    }
    if(playerchoice.toLowerCase()=='scissors'){
        if(computerChoice=='Rock') return("You lose! Rock beats Scissors.")
        return("You win! Scissors beat Paper.")
    }

}

function game(playerchoice,computerChoice){
    //one of them won, we stop the game.
    if(round[0] === 5 || round[1] === 5){
        return
    }
    else{
        let result = rockPaperScissors(playerchoice,computerChoice);
        if(result.includes("win")){
            rounds[0].textContent = ++round[0];
            human.classList.remove("attackright");
            human.classList.add("attackright");
            setTimeout(function (){
                audio[1].play();
                robot.classList.add("hurt");
                setTimeout(function(){
                    robot.classList.remove("hurt");
                },audio[1].duration*100)
            },1600);

        }else if(result.includes("lose")){
            rounds[1].textContent = ++round[1];
            robot.classList.remove("attackleft");
            robot.classList.add("attackleft");
            setTimeout(function (){
                audio[0].play();
                human.classList.add("hurt");
                setTimeout(function(){
                    human.classList.remove("hurt");
                },audio[0].duration*100)
            },1600);
            console.log("hi")
            
        }
        if(round[0] === 5 || round[1] === 5){
            if(round[0]>round[1]) {
                gameResult.textContent="You won!"
            }
            else{
                gameResult.textContent="You lost!"
            }
        }
        else{
            gameResult.textContent = result;
        }
    }
    
}

