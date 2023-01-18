
var button = document.getElementById("start");
var container = document.getElementById("bingo");
var container2 = document.querySelector("#test");
var scoreContainer = document.querySelector('#highscores');
var scoreBoard = document.getElementById('showScore');
var containers = document.querySelectorAll("div");

var question_title = document.getElementById("title");
var button_container = document.querySelector(".button-container");
var answer_choice_1 = document.getElementById("one");
var answer_choice_2 = document.getElementById("two");
var answer_choice_3 = document.getElementById("three");
var answer_choice_4 = document.getElementById("four");
var input = document.querySelector("#initials");
var submitBtn = document.getElementById('submit');
var timerContainer = document.querySelector('.timer-container')

var timer = document.querySelector(".timer");


var count;
var intervalID;
var score;
var highscores;


if(localStorage.getItem('dataset')) {
    highscores = JSON.parse(localStorage.getItem('dataset'));
} else {
    
    localStorage.setItem('dataset', '[]')
}


container2.addEventListener("click", function(event) {
    console.log("Clicked on <div id='test'")

   
});

button_container.addEventListener("click", function(event) {
   
    event.stopPropagation();
    
    console.log(event.target.textContent);

   
    var userChoice = event.target.textContent;
 
    if(userChoice == questions[currentQuestion].correct_answer) {
        console.log("Matching Answers");
       
        score = score + 10;
        console.log("Congrats add 10 points")
        
    } else {
        console.log("Incorrect Answer");
        
       
        count = count - 5;
       
        console.log("Minus 5 points")
    }
    
   
    currentQuestion = currentQuestion + 1;  
    console.log("Current Question is : " + currentQuestion)
    updateContent();
});


var questions = [
    {
        title: "What is CSS used for?",
        answer_choices: ["Math", "Adding styling to your HTML", "Bingo", "Four"],
        correct_answer: "Adding styling to your HTML"
    },
    {
        title: "What is HTML used for?",
        answer_choices: ["Geography", "adding structure to your application", "Chicken", "Two"],
        correct_answer: "adding structure to your application"
    },
    {
        title: "What is Blah used for?",
        answer_choices: ["Geography", "adding structure to your application", "Chicken", "Two"],
        correct_answer: "adding structure to your application"
    },
    {
        title: "What is Workbox used for?",
        answer_choices: ["Geography", "adding structure to your application", "Chicken", "Two"],
        correct_answer: "adding structure to your application"
    },

];

console.log("Number of items in Questions Array: ", questions.length);


var currentQuestion = 0;
console.log("Current Question is : " + currentQuestion)



button.addEventListener("click", function() {
    
  
    score = 0;
   
    intervalID = setInterval(function() {
      
        count = count - 1; 
    
        timer.textContent = count;
        
        if(count == 0) {
            console.log("Timer Ended");
            gameOver()
        }
    }, 1000);
    
    console.log("ID - " , intervalID);

    
    container.setAttribute('class', 'hide')
    container2.setAttribute('class', 'show')
   
   
    answer_choice_1.textContent = questions[currentQuestion].answer_choices[0];
    answer_choice_2.textContent = questions[currentQuestion].answer_choices[1];
    answer_choice_3.textContent = questions[currentQuestion].answer_choices[2];
    answer_choice_4.textContent = questions[currentQuestion].answer_choices[3];

});

function updateContent() {
  
    */
    testQuestions();

    question_title.textContent = questions[currentQuestion].title;
    answer_choice_1.textContent = questions[currentQuestion].answer_choices[0];
    answer_choice_2.textContent = questions[currentQuestion].answer_choices[1];
    answer_choice_3.textContent = questions[currentQuestion].answer_choices[2];
    answer_choice_4.textContent = questions[currentQuestion].answer_choices[3];  
}

function testQuestions() {
    if(questions.length <= currentQuestion) {
      
        gameOver();
    }
}

function gameOver() {

    console.log("Game Over");
    clearInterval(intervalID);

    container2.setAttribute('class', 'hide');
    timerContainer.setAttribute('class', 'hide');
    
    scoreContainer.setAttribute('class', 'show');
    scoreBoard.textContent = score;

    var json = localStorage.getItem('dataset');
    var jsArr = JSON.parse(json);

    for(var i = 0; i < jsArr.length; i++) {
        var newItem = document.createElement('div');
        var newName = document.createElement('p');
        var newScore = document.createElement('p');
        newName.textContent = "Username: " + jsArr[i].name;
        newScore.textContent = "Score: " + jsArr[i].score;
        newItem.append(newName)
        newItem.append(newScore)
        scoreBoard.append(newItem);
    }
}



submitBtn.addEventListener('click', function(event) {
   
    console.log(highscores)

   
    var newUser = {
        name: input.value,
        score: score
    }

    console.log(newUser);
    console.log(typeof newUser);
   
    highscores.push(newUser);
    console.log(highscores)

    localStorage.setItem('dataset', JSON.stringify(highscores))
    gameOver();
});

