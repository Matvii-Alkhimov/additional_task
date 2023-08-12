
const elements = {
    startButtonEl: document.querySelector(".start-button"),
    pauseButtonEl: document.querySelector(".pause-button"),
    stopButtonEl: document.querySelector(".stop-button"),
    hoursInput: document.querySelector("#hour"),
    minutesInput: document.querySelector("#min"),
    secondsInput: document.querySelector("#sec"),
}

let hours = 0;
let minutes = 0;
let seconds = 0;
let timer = undefined;
let animation = undefined;

elements.startButtonEl.addEventListener("click", onStartButtonClick);
elements.stopButtonEl.addEventListener("click", onStopButtonClick);
elements.pauseButtonEl.addEventListener("click", onPauseButtonClick);

function onStartButtonClick() {
    if (elements.hoursInput.value === "") {
        elements.hoursInput.value = 0;
    }  if (elements.minutesInput.value === "") {
        elements.minutesInput.value = 0;
    }  if (elements.secondsInput.value === "") {
        elements.secondsInput.value = 0;
    }
    hours = elements.hoursInput.value;
    minutes = elements.minutesInput.value;
    seconds = elements.secondsInput.value;

    timer = setInterval(timerOn, 100);
    animation = setInterval(animationOn, 100);
}

function onStopButtonClick() {
    clearInterval(timer);
    clearInterval(animation);

    elements.hoursInput.value = 0;
    elements.minutesInput.value = 0;
    elements.secondsInput.value = 0;

    setStartButtonStyles();
}

function onPauseButtonClick() {
    clearInterval(timer);
    clearInterval(animation);
    setStartButtonStyles();
}

function timerOn() {
    elements.hoursInput.value = hours;
    elements.minutesInput.value = minutes;
    elements.secondsInput.value = seconds;
    
    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        alert("Time is out!");
        clearInterval(timer);
        clearInterval(animation);
        setStartButtonStyles();
        return
    }
    if (seconds <= 0) {
        minutes -=1;
        seconds = 60;
    } else if (minutes <= 0 && hours != 0) {
        hours -= 1;
        minutes = 60;
    } 
    seconds -= 1;
}

function animationOn() {
    const color = `rgb(255, ${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}`;
    elements.startButtonEl.style.boxShadow = `0px 0px ${Math.random() * (25 - 0) + 0}px ${color})`;
}

function setStartButtonStyles() {
    elements.startButtonEl.style.boxShadow = '0px 0px 8px black';
}

// const date = Date.now();
// const randomDate = new Date('March 4, 2020');

// console.log(date);
// console.log(randomDate);

// const birthday = new Date('August 6, 2007')

// alert(birthday)