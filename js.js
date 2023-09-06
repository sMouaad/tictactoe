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

function game(){
    let playerchoice;
    let win = 0;
    let result;
    for (let i = 0; i < 5; i++) {
        do{
            playerchoice = prompt("What are you gonna play ?");
        }while(playerchoice.toLowerCase()!="rock" && playerchoice.toLowerCase()!='paper' && playerchoice.toLowerCase()!="scissors");
        if(!playerchoice) return;
        result = rockPaperScissors(playerchoice);
        if(result.includes("win")){
            win++
        }else if(result.includes("lose")){
            win--;
        }
        console.log(result);
    }
    if(win >0){
        console.log("YOU WON!");
    }
    else if (win <0){
        console.log("YOU LOST!")
    }
    else{
        console.log("TIE");
    }

}