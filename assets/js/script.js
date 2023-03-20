var startQuizEl = document.querySelector("#start-quiz");
var startScreenEl = document.querySelector("#start-screen");
var questionsEl = document.querySelector("#questions");
var timeEl = document.querySelector("#time");
var titleEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback")
var timerId;
var time = questions.length * 15;

var currentQuestionIndex = 0;

startQuizEl.addEventListener('click', function(){
    startScreenEl.setAttribute('class', "hide");
    questionsEl.removeAttribute('class');
    timerId = setInterval(clockTick, 1000);
    timeEl.textContent = time;
    getQuestion();
})


function clockTick(){
    time--
    timeEl.textContent = time;
    if(time <= 0){
        alert("Quiz ends");
    }
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = questionClick;
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    timeEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "200%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "200%";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    alert("Quiz ends!")
    quizEnd();
    
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

var finalScoreEl = document.getElementById("final-score");
finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}

