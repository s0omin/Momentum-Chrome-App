const form = document.querySelector(".js-form"); // selects class
const input = form.querySelector("input"); // selects tag
const greeting = document.querySelector(".js-greetings");


const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    // this will save the item in your local space
    // key = USER_LS = "currentUser"
    // value = text
    localStorage.setItem(USER_LS, text);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello, ${text}`;
}

function handleSubmit(event) {
    // by default, when you submit, you refresh the page
    event.preventDefault(); // this prevents from refreshing the page
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
        handleSubmit();
    } else {
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();