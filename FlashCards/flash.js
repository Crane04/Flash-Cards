function how(){
    alert(`Click on "Add Card" to Add a Flash Card.
Click on "Clear Cards" to delete all Cards.
Click on "End" to update all your answers.
Click on "Edit" to edit the Question and Answers of the FlashCards.
Click on "Delete" to delete a Card
` )
}
//retrieve questions and answers from local storage
let myQsts = localStorage.getItem('Qsts') ? JSON.parse(localStorage.getItem('Qsts')) : [];

//Declare variables
let showCard=document.getElementsByClassName("style")
let p=document.getElementsByClassName("p")
let createCardBox=document.getElementsByClassName("createCardBox")[0]
let container=document.getElementsByClassName("container")[0]

myQsts.forEach(flashCards)
//the flash cards function

function flashCards(text){
//creating new elements
let div=document.createElement("div")
let question=document.createElement("h3")
let answer=document.createElement("p") 
let deleteBtn=document.createElement("button")
let deleteBtnText="Delete"
deleteBtn.append(deleteBtnText)
let editBtn=document.createElement("button")
let editBtnText="Edit"
editBtn.append(editBtnText)
div.className="style"
answer.className="p"

question.innerHTML=text.Question
answer.innerHTML=text.Answer

//appending new elements inside new div(flash card)
//appending div inside the container

div.append(deleteBtn)
div.append(editBtn)
div.append(question)
div.append(answer)
container.append(div)
//delete one flashcard
deleteBtn.addEventListener("click", function(){
    if(confirm("Are you sure you want Delete?")){
    div.parentNode.removeChild(div)
    myQsts=myQsts.filter((e)=>
    e!==text)
    localStorage.setItem("Qsts",JSON.stringify(myQsts))
    }else{
        localStorage.setItem("Qsts",JSON.stringify(myQsts))
    }
})
//edit  flashcard
editBtn.addEventListener("click", function(){
    if(confirm("Are you sure you want to edit?")){
        document.getElementById("question").value=question.innerText
    document.getElementById("answer").value=answer.innerText
    createCardBox.style.display="block"
    div.parentNode.removeChild(div)
    myQsts=myQsts.filter((e)=>
    e!==text)
    localStorage.setItem("Qsts",JSON.stringify(myQsts))
    }else{
        localStorage.setItem("Qsts",JSON.stringify(myQsts)) 
    }
})
}
//clear all cards
function clearCards(){
    if(confirm("Are you sure you want to clear all Cards?")){
    localStorage.clear()
    container.innerHTML=""
    location.reload()
    }else{
        localStorage.setItem("Qsts",JSON.stringify(myQsts))
    }
}
//save cards
function save(){
let question=document.getElementById("question")
let answer=document.getElementById("answer")

//question and answer objects
if(question.value===""||answer.value===""){
    alert("Fields can't be empty")
}else{
    let questAndAns={
    "Question":question.value,
    "Answer":answer.value
    
}
myQsts.push(questAndAns)

flashCards(myQsts[myQsts.length - 1],myQsts.length - 1);
localStorage.setItem("Qsts",JSON.stringify(myQsts))
question.value=""
answer.value=""
}

}


//displaying the answers
for(let i=0; i<showCard.length; i++){
    showCard[i].addEventListener("dblclick", function(){

       
        let panel=showCard[i].lastElementChild

        if(panel.style.display==="block"){
            panel.style.display="none"
          
        } 
        else{
            panel.style.display="block"
        }
       
    })
}
//New card...
function add(){
        createCardBox.style.display="block"
        //localStorage.clear()
}
//saves the users progress
function end(){
    
        createCardBox.style.display="none"
        location.reload()
}
