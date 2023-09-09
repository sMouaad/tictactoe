const btns = document.querySelectorAll("button");
const gameResult = document.querySelector(".result");
const round = [0,0];
const rounds = document.querySelectorAll(".player")
btns.forEach((btn)=>{
    btn.addEventListener("click", function (e){
        game(e.target.textContent);
    });
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


function rockPaperScissors(playerchoice){
    let computerChoice = getComputerChoice();
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
function game(playerchoice){
    //one of them won, we stop the game.
    if(round[0] === 5 || round[1] === 5){
        return
    }
    else{
        let result;
        result = rockPaperScissors(playerchoice);
        if(result.includes("win")){
            rounds[0].textContent = ++round[0];
        }else if(result.includes("lose")){
            rounds[1].textContent = ++round[1];
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

