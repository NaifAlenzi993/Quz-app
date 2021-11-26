let qustionnID = document.getElementsByClassName("qustionn")[0]
let answerID = document.getElementsByClassName("ans")[0]


let questions  = []
let qnum = 0
let score = 0

const getData = async()=>{
    try {
        let response = await fetch("https://quiz-app-safcsp.herokuapp.com/api/v1/questions")
        let data = await response.json()
        questions  = shuffleArray(data)
        render()
    } catch (error) {
        console.log(error);
    }
}
getData()


function render (){
        qustionnID.innerHTML  = `<div id = "question"> ${questions[qnum].question} </div>`
        
        answerID.innerHTML =""
        questions[qnum].answers.forEach((element,i) => {
            answerID.innerHTML  += `<div class="answers" id="answers-${i}" onclick='check(${i} , event)'>${element.text}</div>`
        });

}



function check(i , e){

    if (qnum <= questions.length-1){
        if (questions[qnum].answers[i].correct == true){
            score++
            e.target.style.background = "green"
            setTimeout(()=>{
                qnum++
                render()
            } , 600)
            
        } else {
            e.target.style.background = "red"
            let correct = document.getElementById("answers-" + getTrueAswer(questions[qnum].answers))
            correct.style.backgroundColor = "green"
            setTimeout(()=>{
                qnum++
                render()
            } , 600)
            
        }    
    }
   
  
if (qnum  == questions.length-1) { 
    setTimeout(()=>{
        answerID.innerHTML = ""
        qustionnID.innerHTML  = `<div class = "${score >= 2 ? "questionLose" : "questionWin"}">SCORE : ${score} 
        <div> ${score >= 2 ? "لقد اجتزت الاختبار" : "حاول مره اخرى"} </div>
        <input id="btn" type="button" onclick="restQ()" value="اعادة الاسئلة">
        </div>
        `
    },500)
}
 
}

function restQ(){
    qnum = 0
    score = 0
    questions = shuffleArray(questions)
    render()
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}


function getTrueAswer(answers){
    let correctID = null
    answers.forEach((elemtn,i) => {
        if (elemtn.correct == true){
            correctID = i
        }
    })
return correctID
}




