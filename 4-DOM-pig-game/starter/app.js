/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;
init();
/* 0 = 1st player, 1 = 2nd player - correlates to array index */

/* DOM Manipulation - select value of current round*/
/* as we know from CSS, to select the ids we use # in the select string*/
/* if we want to change the text, need textContent method 
This changes the content of a HTML element.*/
//document.querySelector("#current-" + activePlayer).textContent = diceInt;
/* Due to type coersion, JS will convert the activePlayer to string*/

//document.querySelector("#current-" + activePlayer).innerHTML = '<em>' + diceInt + '</em>';
/* everytime we need to write HTML code, it needs to be in a string ourwise it will be interpreted as JS*/

var x = document.querySelector('#score-0').textContent;
var diceDOM = document.querySelector('.dice');
console.log(x);



/** addLE args
 * Click = event type
 *  2nd arg = the function that will be called as soon as the event happens.
 */
 /** We just use the name of the function 'btn' without the parenthesis because we don't want to call it right here. We want the EventListener to call the function for us.*/
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying){
    // 1. Random Number
        var diceDec = Math.random() * 6;
        var diceInt = Math.floor(diceDec) + 1;
        console.log(diceInt);
        // These only need to be declared in this function because we don't need them from outside.

        // 2. Display result - need to change image to correct dice value
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+ diceInt + '.png';
        // the image is an img element and the source 'src' defines what is displayed

        // 3. Update the round score IF the rolled number was NOT a 1
        if (diceInt !== 1){
            // string not equal to 1 (doesn't do type coersion)
            roundScore += diceInt;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
            //add score
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying){
        // Add the current score to the players global score
        scores[activePlayer] += roundScore;

        // update UI - DOM manipulation
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if the player has won the game
        if (scores[activePlayer] >= 20){
            document.querySelector('#name-'+ activePlayer).textContent = 'Player '+(activePlayer+1) + ' wins!';
            diceDOM.style.display = 'none';  
            // It is not always good to change the CSS style constantly t/f apply a class
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer(){
    //next player
        /* Using a ternary operator*/
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        //current round score set to zero
        document.getElementById("current-0").textContent = 0;
        document.getElementById("current-1").textContent = 0;

        //need to show which player has the round using the 'active' HTML class in the panels
        /** If player 0 has the active class, it will remove it, if it does not then it will add it. */
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        // can also use 'remove' or 'add' but would need if statements
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');

        // when its the next players turn, hide the dice again
        diceDOM.style.display = 'none';
}

function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    /** Set dice image to invisible on game start up */
    /** To select a class, use '.' selector */
    document.querySelector('.dice').style.display = 'none';

    // global scores
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;

    // round scores
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    // prevents having two active classes
    // if you remove an 'active' class but there were two, there there will be one remaining
}

document.querySelector('.btn-new').addEventListener('click', init);