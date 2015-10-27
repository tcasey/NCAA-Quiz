// set global variables that will be used in functions 
var userSelection;
var correct;
var incorrect;
var page = 0;
var answered = 0;
var $gameArea = $('.game-area');
var $overlay = $('.overlay');
var $quizResults = $('.quiz-results');
var $reStartButton = $('#start-over');
var $startButton = $('#start');
var $optionButton = $('.button'); 
var $userSubmit = $('.user-submit');
var $nextButton = $('#next');

// JS objects 
var questions = [{
  question: "Which legendary coach once led Georgia Tech to a 222-0 win over Cumberland College?",
  qNum: 1,
  choices: ["William Alexander", "John Heisman", "George O'Leary", "Bobby Dodd"],
  answer: "John Heisman",
  image: "",
  },
{
  question: "Which coach won the most national titles during the BCS era?",
  qNum: 2,
  choices: ["Nick Saban", "Joe Paterno", "Kevin Donley", "LaVell Edwards"],
  answer: "Nick Saban",
  image: "",
  },
{
  question: "Who is the only college football coach to lose 200 games in his career?",
  qNum: 3,
  choices: ["John Gagliardi", "Frank Beamer", "Watson Brown", "Todd Knight"],
  answer: "Watson Brown",
  image: "",
  },
{
  question: "What live college mascot is named Ralphie?",
  qNum: 4,
  choices: ["Boston College's Eagle", "UCLA's Bruin", "BYU's Cougar", "Colorado’s Buffalo"],
  answer: "Colorado’s Buffalo",
  image: "",
  },
{
  question: "What two schools played in the first college football game in 1869?",
  qNum: 5,
  choices: ["Yale & Harvard", "Princeton & Rutgers", "USC & UCLA", "Notre Dame & Penn State"],
  answer: "Princeton & Rutgers",
  image: "",
  }]

// hides questions, overlay, and quiz results area
$gameArea.hide();
$overlay.hide();
$quizResults.hide();
// starts a new game when user clicks on 'START' button
$startButton.click(startGame);

// initialize function. sets global variables to 0 to keep track of right/wrong answers and fires first question
function startGame(){
  var $intro = $('.introduction');
  correct = 0;
  incorrect = 0;
  $intro.fadeOut();
  $gameArea.fadeIn(600);
  displayQuestion();
}

// displays users selection when user clicks on an option
$optionButton.click(getUserSelection);

// grabs the value of the button selected and sets it to global variable userSelection
// calls function setUserChoice() and passes userSelection to set that text of the div
function getUserSelection(){
  userSelection = $(this).text();   
  setUserChoice(userSelection);
}

var setUserChoice = (function(){
  var $userChoice = $('#user-choice');

  return function(stringToSet){
    $userChoice.text(stringToSet);
  }

})();

// hides the game area and displays the overlay showing the user if they got the answer correct or incorrect
$userSubmit.submit(instead(submitSelection));

function submitSelection(){
  $gameArea.hide();
  $overlay.fadeIn(600);
  checkUserSelection(userSelection);
}

// calls preventDefault to whatever you pass this function to
function instead(fn){
  return function(e){
    e.preventDefault();
    fn.apply(this);
  };
}

// takes an argument and checks whether that input is the correct answer
// sets the feedback section to correct or incorrect
// shows user correct answer if they answered incorrectly
// increments the correct and incorrect values
var checkUserSelection = (function(){
  var $currentQuestionFeedback = $('#current-question-feedback');
  var $correctAnswer = $('#correct-answer');
  var $displayCorrect = $('#display-correct');

  return function(userInput){
    if (userInput === questions[page].answer) {
      $displayCorrect.hide();
      $currentQuestionFeedback.text("Correct!");
      $currentQuestionFeedback.css("color", "green");
      correct++;
    } else {
      $displayCorrect.show();
      $correctAnswer.text(questions[page].answer);
      $currentQuestionFeedback.text("Incorrect");
      $currentQuestionFeedback.css("color", "red");
      incorrect++     
    }   
  }

})();

// calls displayNextQuestion function when user clicks on 'NEXT' button
$nextButton.click(displayNextQuestion);

// increments page and answered variables 
// hides the overlay and shows next question in queue
// clears user choice div in next question
// shows user total score when they reach the end 
function displayNextQuestion(){
  page++;
  answered++;
  $overlay.hide();
  $gameArea.fadeIn(600);
  setUserChoice("");
  showUserTotalScore();
  displayQuestion();
}

// starts quiz over again when user clicks on 'START OVER' button
$reStartButton.click(startOver);

// reloads page 
function startOver(){
  window.location.reload(); 
}

// grabs all elements and sets them dynamically 
var displayQuestion = (function(){  
  var $current = $('#current-question');
  var $description = $('#description');
  var $currentQNum = $('#current-question-number');
  var $image = $('#image')
;

  return function(){
    //sets current question to each index in questions array. if question does not exist, sets equal to empty string
    var currentQuestion = questions[page] || "";
    // sets choices to each question objects options. if questions does not exist, sets equal to empty string
    var choices = currentQuestion.choices || "";
    for(var i = 0; i < choices.length; i++){
      $('#option-' + (i + 1)).text(choices[i]); 
    }     
    $image.attr('src', currentQuestion.image);
    $current.text(currentQuestion.question);
    $description.text(currentQuestion.desc);
    $currentQNum.text(currentQuestion.qNum)
  }

})();

// checks how many questions user has answered. if theyve reached the end, displays the total questions answered correctly
var showUserTotalScore = (function(){
  var $totalCorrect = $('#total-correct');

  return function(){
    if(answered === 5){   
      $gameArea.hide();
      $overlay.hide();
      $totalCorrect.text(correct);    
      $quizResults.show();
      giveUserRating();
    }     
  }

})();

// gives user a rating depending on how many questions they answered correct
var giveUserRating = (function(){
  var $userRating = $('#user-rating');

  return function(){
    if(correct >= 4){
        $userRating.text("Heisman Candidate Status");
      } else if(correct === 3) {
        $userRating.text("Bowl Eligible");
      } else {
        $userRating.text("Just Go Watch the CFL...");
      } 
    } 

})();

