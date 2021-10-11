
const toDoform = document.querySelector(".js-toDoForm"),
    toDoInput = toDoform.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
    // .target allows us to know which button is clicked
    // .parentNode allows us to know the id of li of parent
    // console.log(event.target.parentNode);

    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // filter(arg) returns array where its elements satisfy (gives true) arg
    const cleanToDos = toDos.filter(function(toDos) {
        return toDos.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();

}
  
function saveToDos(){
    // JSON.stringfy(arg) takes any JS object and converts it to string'
    // JSON = JavaScript object Notation
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

let idNum = 1;

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    
    // this can give duplicate id when removed a todo and added a new one
    // const newID = toDos.length +1;

    const newID = idNum;
    idNum += 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newID;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newID
    }

    // put element in toDos array
    toDos.push(toDoObj);
    saveToDos();

}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        // converting string to object
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
        }
}


function init(){
    loadToDos();
    toDoform.addEventListener("submit", handleSubmit);
}

init();