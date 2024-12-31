let score=JSON.parse(localStorage.getItem('score'));       
console.log(score);         

if (score === null){
score={
wins: 0,
losses: 0,
ties: 0
};
 
}


/*converts from JSON back to an object*/             

/* this variable/object is being created outside of a scope/ function because everytime a move is made, the score from the last move needs to be updated, so in order to save the score last time, we need to keep it outside the function, if it was inside the function, the function will create a new score everytime */



// a new function to reuse the result code

updateScoreElement();   //used to modify the paragraph tag to show results

let isAutoPlaying = false;
let intervalId;

// const autoplay = ()=> {

// };
   
function autoplay(){
  if (!isAutoPlaying){
    intervalId = setInterval(  () => {
      const playerMove = pickComputerMove();
    playGame(playerMove);        
     }, 1000);

     isAutoPlaying=true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;      

    
  }
 

}

function reset (){
  score.wins=0 ;
  score.losses=0; 
  score.ties=0;        
  localStorage.removeItem('score');     
  updateScoreElement ();  
};

document.querySelector('.js-rock-button')
.addEventListener('click', ()=>{
  playGame('rock');
}
)

document.querySelector('.js-paper-button')
.addEventListener( 'click', ()=>{
  playGame('paper');
}       
)

document.querySelector('.js-scissors-button')
.addEventListener('click', ()=>{
  playGame('scissors');  
}
)
document.querySelector('.js-reset-button')
.addEventListener('click', ()=> {
  reset();
})

document.querySelector ('.js-autoplay-button')
.addEventListener ('click', () => {
  autoplay();
}
)  

document.body.addEventListener('keydown',(event)=> {
 if (event.key === 'r'){
  playGame('rock');

 } else if(event.key === 'p'){
  playGame('paper');

 }
 else if (event.key === 's'){
  playGame('scissors');      

 }     
}
);




function playGame(playerMove){

const computerMove = pickComputerMove();      /* diffferent from the scope variable inside the function below, as scope lets us create a variable with same name outside the if statement or function 
 
 */ 

console.log (computerMove);
let result = ''
if (playerMove=== 'scissors'){

if (computerMove === 'rock') {
  result= 'You Lose';
} else if ( computerMove === 'paper'){
  result= 'You Win' ;
} else if (computerMove === 'scissors'){
  result = 'Tie' ;
}

} else if(playerMove==='paper'){
if (computerMove === 'rock'){
result = 'You Win';
} else if ( computerMove === 'paper'){
result = 'Tie';      
} else if ( computerMove === 'scissors'){    
result = 'You Lose';
} 

} else if(playerMove==='rock'){if ( computerMove === 'rock'){
result= 'Tie.';
} else if (computerMove === 'paper'){
result = 'You Lose';
} else if (computerMove === 'scissors'){
result = 'You Win.' ;
}

}

if (result === 'You Win'){
score.wins += 1;//or += 1; as a shortcut       
} else if(result === 'You Lose'){
score.losses += 1;      

}      
else if(result === 'Tie'){
score.ties += 1;    

}
localStorage.setItem('score', JSON.stringify(score)); /* saves score object in local storage, local storage only supports strings, we convert the object to JSON using Json.stringify */   

/* this if statement uses the object outside the function to callculate the  number of wins, loss and ties */

updateScoreElement(); //updates the score on the page
document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-moves').innerHTML=  `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`  ;  

/*alert  (`you picked ${playerMove}, Computer picked ${computerMove}. ${result}
wins: ${score.wins}, losses: ${score.losses}, Ties:${score.ties}.        ` );*/                    
// as this is a new function to reuse the result code
// but it can not be re used as the code is different in one part
// the difference is our move or our pick
// it might be rock or paper or scissors
// for us to reuse we need to use parameters as they sub a value into a function

}    

function updateScoreElement(){

document.querySelector('.js-score').innerHTML = ` wins: ${score.wins}, losses: ${score.losses}, Ties:${score.ties}.`; // why does this update on  the page?

}

function pickComputerMove (){
  const  randomNumber = Math.random();     
  let  computerMove = ''  ;

if (randomNumber >= 0 && randomNumber <1/3 ){
computerMove = 'rock';    
} else if (randomNumber >= 1/3 && randomNumber <2/3 ){
computerMove = 'paper';
} else if (randomNumber >= 2/3 && randomNumber < 1){
computerMove = 'scissors';
}
/* this code just creates the function,we will have to reference it to
use it in the code */
   return computerMove; /* this will take whatever value is saved in the computerMove
   and return it out of the function  i.e give it a value outside the function */ 
}
  
  