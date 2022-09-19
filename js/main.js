let categoryTypes = document.getElementById("categoryTypes")
let difficultyLevel = document.querySelectorAll(".difficultyLevel")
let QuestionsNumber = document.getElementById("QuestionsNumber")
let startBtn = document.getElementById("startBtn")
let categoryChosed;
let difficultyLevelChooesd;
let quizContainer = document.getElementById("quizContainer")
let quizHeader = document.getElementById("quizHeader")
let introHeader = document.querySelector("#introHeader h2")
let introBody = document.getElementById("introBody")
let tryAgain = document.getElementById("tryAgain")
let nextBtn = document.getElementById("nextBtn")


//..........................................................................................
// get category that user chose
categoryTypes.addEventListener("click",function(e){
     categoryChosed = e.target.value
     return categoryChosed
})

//..........................................................................................
// get the level of deffucilty that user chose
for (let i = 0; i < difficultyLevel.length; i++) {
     difficultyLevel[i].addEventListener("click",function(e){
        difficultyLevelChooesd = e.target.value
        console.log(difficultyLevelChooesd)
        return difficultyLevelChooesd
    })    
}

//..............................................................................................
// start the quiz
startBtn.addEventListener("click",function(){
        checkChooses()
})

//..............................................................................................
// check chooses that user do it to get the questions depends on it 
function checkChooses(){
    switch (categoryChosed) {
        case "General Knowledge":
            categoryChosed = "9"
            break;
        case "Book":
            categoryChosed = "10"
            break;
        case "Films":
            categoryChosed = "11"           
            break;
        case "Music":
            categoryChosed = "12"            
            break; 
        case "Sport":
            categoryChosed = "21"            
            break;
        case "History":
            categoryChosed = "23"            
            break;
    
        default:
            categoryChosed = "9"
            break;
    }    
    if(difficultyLevelChooesd == undefined){
        difficultyLevelChooesd = "easy"
    }
    if(QuestionsNumber.value == ""){
        // QuestionsNumber.value = 5
        alert("Please Choose The Number Of Questions")
    }
        let getAmount = QuestionsNumber.value
        getQuestions(getAmount , categoryChosed ,difficultyLevelChooesd)        
}

//...............................................................................................
// get api depends on the user's chosese
async function getQuestions(amount,category, difficultyLevel){
    let response  = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficultyLevel}&type=multiple`);
    let Questions = await response.json() ;
    questionsList = Questions.results
    // console.log(questionsList)
    displayQuestions(questionIndex)
    introBody.classList.add("d-none")
    quizContainer.classList.remove("d-none")    
}

//.................................................................................................
// display the question 
let questionsList = []
let questionIndex = 0 
let answers = []
let begin = 1;
let end ;
let answersDec = []
function displayQuestions(getIndex){
    let progress = document.getElementById("progress")
    let quizQuestions;
    let quizAnswers = "";
    end = questionsList.length
    answers = questionsList[getIndex].incorrect_answers
    answers.push(questionsList[getIndex].correct_answer)   
    shuffle(answers);
    introHeader.innerHTML = "Quiz Questions"    
    quizQuestions = `<h3 class="main mb-2" id="quizHeader"> ${questionsList[getIndex].question}  </h3>`
    let answerIndex = 0;
    for (let i = 0; i < answers.length; i++) {
        answerIndex++
        quizAnswers+=`
        <div class="form-check mt-3">
                <input class="form-check-input" type="radio" name="flexRadioDefault" value="${answers[i]}" id="q${getIndex}Answer${answerIndex}">
                <label class="form-check-label" for="q${getIndex}Answer${answerIndex}">
                ${answers[i]}
                </label>
        </div>`
        // console.log(answers)

    }          
    quiz.innerHTML = quizQuestions + quizAnswers
    progress.innerHTML = `${begin} OF ${end} Question`
    console.log( questionsList[getIndex].correct_answer)
    // console.log(answers)    
}

//.................................................................................................
// navigate between the Questions
function browseQuestions(){
    begin++
    if (nextBtn.innerHTML == "submit") {

        displayTheResult()
     }else{
        if (questionIndex == questionsList.length-1) {
            nextBtn.innerHTML = "submit"    
            nextBtn.classList.remove("bg-main")
            nextBtn.classList.add("btn-danger")
        }
        collcetScore()
            displayQuestions(questionIndex+=1)           
    }       
}
nextBtn.addEventListener("click", browseQuestions)  

//.................................................................................................
// get the score of quiz
let userScore = 0
function collcetScore(){
    let answerChek = false;
    for (let i = 0; i < answers.length; i++) {
         answersDec[i] = document.getElementById(`q${questionIndex}Answer${i+1}`) ;

        if (questionIndex <= (questionsList.length)) {   

            if (answersDec[i].checked) {
                answerChek = true
                if (answersDec[i].value == questionsList[questionIndex].correct_answer) {
                    userScore += 10;
                    console.log('yes' , userScore)
                }
                else {
                    console.log('no' , userScore)
                }                   
            }
        }
    }
    if (answerChek == false) {
        console.log('choose')
    }
    console.log(`${userScore} of ${end*10}`)
}

//.................................................................................................
// display the score of quiz
function displayTheResult(){
    let scoreSection = document.getElementById("scoreSection")
    let result = document.querySelector("#result h4")

    if (userScore > (end*10)/2){
        introHeader.innerHTML = `Congratulations`     
        changeColor()
    }else{
        introHeader.innerHTML = `Ooooops....` 
        changeColor()
    }
        result.innerHTML =  ` ${userScore} of ${end*10}`
        quizContainer.classList.add("d-none")
        scoreSection.classList.remove("d-none")
}
//...............................................
// change color the result 
function changeColor(){
    introHeader.classList.remove("main")
    introHeader.classList.add("text-danger")
    tryAgain.classList.remove("bg-main")
    tryAgain.classList.add("btn-danger")
}
//.................................................................................................
// return to the setting page
tryAgain.addEventListener("click",function(){
    window.location.reload()
})

//...................................................................
//get random display for the answers
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    console.log(array)
    return array;
  }







 