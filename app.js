/* ==========================================
   PEOPLE HR SOLUTIONS LMS
   Talent Internship Platform
========================================== */

/* ---------- QUIZ DATA ---------- */

const quizData = [

{
question:"What is the primary objective of the Talent Internship Program?",
options:[
"Only provide certificates",
"Develop practical industry-ready skills",
"Offer theoretical learning only",
"Conduct examinations"
],
answer:"Develop practical industry-ready skills"
},

{
question:"Which mindset is most important for internship success?",
options:[
"Ownership and accountability",
"Waiting for instructions",
"Working alone",
"Avoiding challenges"
],
answer:"Ownership and accountability"
},

{
question:"Why is project-based learning valuable?",
options:[
"It replaces learning",
"It provides practical exposure",
"It reduces engagement",
"It removes collaboration"
],
answer:"It provides practical exposure"
},

{
question:"Which skill is increasingly important across industries?",
options:[
"AI and Digital Literacy",
"Handwriting",
"Typewriter Skills",
"Fax Communication"
],
answer:"AI and Digital Literacy"
},

{
question:"What does professional communication involve?",
options:[
"Clarity and respect",
"Using complex words",
"Speaking frequently",
"Avoiding feedback"
],
answer:"Clarity and respect"
},

{
question:"How should interns approach feedback?",
options:[
"Ignore it",
"Accept and learn from it",
"Challenge everything",
"Avoid discussion"
],
answer:"Accept and learn from it"
},

{
question:"What supports effective teamwork?",
options:[
"Collaboration",
"Competition only",
"Working in isolation",
"Avoiding communication"
],
answer:"Collaboration"
},

{
question:"What is a key benefit of data-driven thinking?",
options:[
"Better decision making",
"Less learning",
"Random actions",
"Reduced accountability"
],
answer:"Better decision making"
},

{
question:"What is expected regarding ethics?",
options:[
"Integrity and professionalism",
"Shortcuts when possible",
"Ignore policies",
"Results at any cost"
],
answer:"Integrity and professionalism"
},

{
question:"Why is continuous learning important?",
options:[
"It improves future readiness",
"It is optional",
"It reduces performance",
"It avoids innovation"
],
answer:"It improves future readiness"
}

];

/* ---------- VARIABLES ---------- */

let currentQuestion = 0;
let answers = [];

const orientationCheck =
document.getElementById("orientationCheck");

const startAssessmentBtn =
document.getElementById("startAssessmentBtn");

const profileSection =
document.getElementById("profileSection");

const orientationSection =
document.getElementById("orientationSection");

const quizSection =
document.getElementById("quizSection");

const resultsSection =
document.getElementById("resultsSection");

const failSection =
document.getElementById("failSection");

const questionContainer =
document.getElementById("questionContainer");

const questionCounter =
document.getElementById("questionCounter");

const progressFill =
document.getElementById("progressFill");

const nextBtn =
document.getElementById("nextBtn");

const prevBtn =
document.getElementById("prevBtn");

const beginQuizBtn =
document.getElementById("beginQuizBtn");

/* ---------- ORIENTATION ---------- */

startAssessmentBtn.addEventListener(
"click",
()=>{

if(!orientationCheck.checked){

alert(
"Please complete the orientation before proceeding."
);

return;
}

orientationSection.classList.add("hidden");

profileSection.classList.remove("hidden");

}
);

/* ---------- PROFILE VALIDATION ---------- */

beginQuizBtn.addEventListener(
"click",
()=>{

const name =
document.getElementById("candidateName").value.trim();

const email =
document.getElementById("candidateEmail").value.trim();

const college =
document.getElementById("candidateCollege").value.trim();

const domain =
document.getElementById("candidateDomain").value;

if(!name || !email || !college || !domain){

alert(
"Please complete all profile details."
);

return;
}

profileSection.classList.add("hidden");

quizSection.classList.remove("hidden");

loadQuestion();

}
);

/* ---------- LOAD QUESTION ---------- */

function loadQuestion(){

const q = quizData[currentQuestion];

questionCounter.innerHTML =
`Question ${currentQuestion+1} of ${quizData.length}`;

progressFill.style.width =
`${((currentQuestion+1)/quizData.length)*100}%`;

questionContainer.innerHTML =

`
<h3>${q.question}</h3>

<div class="quiz-options">

${q.options.map(option=>`

<div
class="quiz-option
${answers[currentQuestion]===option?"selected":""}"

onclick="selectAnswer('${option.replace(/'/g,"\\'")}')">

${option}

</div>

`).join("")}

</div>
`;

}

/* ---------- SELECT ANSWER ---------- */

function selectAnswer(answer){

answers[currentQuestion] = answer;

loadQuestion();

}

/* ---------- NEXT ---------- */

nextBtn.addEventListener(
"click",
()=>{

if(!answers[currentQuestion]){

alert(
"Please select an answer."
);

return;
}

if(currentQuestion < quizData.length-1){

currentQuestion++;

loadQuestion();

}
else{

submitAssessment();

}

}
);

/* ---------- PREVIOUS ---------- */

prevBtn.addEventListener(
"click",
()=>{

if(currentQuestion > 0){

currentQuestion--;

loadQuestion();

}

}
);

/* ---------- SUBMIT ---------- */

function submitAssessment(){

let score = 0;

quizData.forEach((q,index)=>{

if(answers[index] === q.answer){

score++;

}

});

const percentage =
Math.round((score/quizData.length)*100);

const result =
percentage >= 70
? "Pass"
: "Fail";

submitToGoogleSheets(
score,
percentage,
result
);

quizSection.classList.add("hidden");

if(result === "Pass"){

showSuccess(
score,
percentage
);

}
else{

showFailure(
score,
percentage
);

}

}

/* ---------- SUCCESS ---------- */

function showSuccess(score,percentage){

resultsSection.classList.remove("hidden");

document.getElementById(
"scoreDisplay"
).innerHTML =
`${percentage}%`;

document.getElementById(
"resultMessage"
).innerHTML =

`
Congratulations!

You have successfully completed
Day 0 Orientation Assessment.

Score:
${score}/${quizData.length}
`;

}

/* ---------- FAILURE ---------- */

function showFailure(score,percentage){

failSection.classList.remove("hidden");

}

/* ---------- RETRY ---------- */

document
.getElementById("retryBtn")
.addEventListener(
"click",
()=>{

answers = [];

currentQuestion = 0;

failSection.classList.add("hidden");

quizSection.classList.remove("hidden");

loadQuestion();

}
);

/* ---------- PROJECT ---------- */

document
.getElementById("launchProjectBtn")
.addEventListener(
"click",
()=>{

window.location.href =
"https://lms.peoplehrsolutions.in/day-0-orientation-talent-internship/day-0-assessment-talent-internship";

}
);

/* ---------- GOOGLE SHEETS ---------- */

function submitToGoogleSheets(
score,
percentage,
result
){

const payload = {

name:
document.getElementById("candidateName").value,

email:
document.getElementById("candidateEmail").value,

college:
document.getElementById("candidateCollege").value,

domain:
document.getElementById("candidateDomain").value,

score,

percentage,

result,

timestamp:
new Date().toISOString()

};

fetch(
"https://script.google.com/macros/s/AKfycbwQkdIH2spg6uBdv9A0kbVgjPXYI5uUP_erXg8sy1U-OoecBW32tHPbwHj1I9KnfnZo/exec",
{
method:"POST",
mode:"no-cors",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(payload)
}
);

}

/* ---------- START ---------- */

document.addEventListener(
"DOMContentLoaded",
()=>{

progressFill.style.width = "10%";

});
