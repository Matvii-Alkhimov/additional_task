
// const elements = {
//     startButtonEl: document.querySelector(".start-button"),
//     pauseButtonEl: document.querySelector(".pause-button"),
//     stopButtonEl: document.querySelector(".stop-button"),
//     hoursInput: document.querySelector("#hour"),
//     minutesInput: document.querySelector("#min"),
//     secondsInput: document.querySelector("#sec"),
// }

// let hours = 0;
// let minutes = 0;
// let seconds = 0;
// let timer = undefined;
// let animation = undefined;

// elements.startButtonEl.addEventListener("click", onStartButtonClick);
// elements.stopButtonEl.addEventListener("click", onStopButtonClick);
// elements.pauseButtonEl.addEventListener("click", onPauseButtonClick);

// function onStartButtonClick() {
//     if (elements.hoursInput.value === "") {
//         elements.hoursInput.value = 0;
//     }  if (elements.minutesInput.value === "") {
//         elements.minutesInput.value = 0;
//     }  if (elements.secondsInput.value === "") {
//         elements.secondsInput.value = 0;
//     }
//     hours = elements.hoursInput.value;
//     minutes = elements.minutesInput.value;
//     seconds = elements.secondsInput.value;

//     timer = setInterval(timerOn, 100);
//     animation = setInterval(animationOn, 100);
// }

// function onStopButtonClick() {
//     clearInterval(timer);
//     clearInterval(animation);

//     elements.hoursInput.value = 0;
//     elements.minutesInput.value = 0;
//     elements.secondsInput.value = 0;

//     setStartButtonStyles();
// }

// function onPauseButtonClick() {
//     clearInterval(timer);
//     clearInterval(animation);
//     setStartButtonStyles();
// }

// function timerOn() {
//     elements.hoursInput.value = hours;
//     elements.minutesInput.value = minutes;
//     elements.secondsInput.value = seconds;
    
//     if (hours <= 0 && minutes <= 0 && seconds <= 0) {
//         alert("Time is out!");
//         clearInterval(timer);
//         clearInterval(animation);
//         setStartButtonStyles();
//         return
//     }
//     if (seconds <= 0) {
//         minutes -=1;
//         seconds = 60;
//     } else if (minutes <= 0 && hours != 0) {
//         hours -= 1;
//         minutes = 60;
//     } 
//     seconds -= 1;
// }

// function animationOn() {
//     const color = `rgb(255, ${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}`;
//     elements.startButtonEl.style.boxShadow = `0px 0px ${Math.random() * (25 - 0) + 0}px ${color})`;
// }

// function setStartButtonStyles() {
//     elements.startButtonEl.style.boxShadow = '0px 0px 8px black';
// }

// const date = Date.now();
// const randomDate = new Date('March 4, 2020');

// console.log(date);
// console.log(randomDate);

// const birthday = new Date('August 6, 2007')

// alert(birthday)


// const promise = new Promise((resolve, reject) => {
//     const isFullfilled = Math.random()>0.5;

//     if(isFullfilled) {
//         resolve(true);
//     } else {
//         reject(false)
//     }
// })

// console.log(promise)

// 1

// Напишіть функцію, яка отримує масив чисел і повертає проміс, який виконується, якщо всі числа в масиві є парними. 
// Якщо ж принаймні одне число непарне, проміс повинен бути відхилено з повідомленням "Є непарні числа".

// const arr1 = [2, 4, 38, 94];
// const arr2 = [2, 6, 3, 0];

// function getArray(numbers) {
//     const result = numbers.every((number) => {
//         return number%2 === 0;
//     });

//     return new Promise((resolve, reject) => {
//     if(result) {
//         resolve("Всі числа в масиві парні");
//     }
//     reject("Не всі числа в масиві парні");
// })
// }

// getArray(arr1)
// .then((success)=> console.log(success))
// .catch((failrule) => console.log(failrule));

// getArray(arr2)
// .then((success)=> console.log(success))
// .catch((failrule) => console.log(failrule));




// Напишіть функцію, яка приймає два числа і повертає проміс, який виконується з результатом їхнього додавання. 
// Якщо хоча б одне з чисел не є числом, проміс повинен бути відхилено з повідомленням .


// function getSummary(a, b) {
//     const numsArr = [a, b];
//     const check = numsArr.every((num) => Number(num));

//     return new Promise((resolve, reject) => {
//         if(check) {
//             resolve(a + b);
//         }
//         reject("Неправильні аргументи");
//     })
// }

// getSummary(5, 6)
// .then((success)=> console.log(success))
// .catch((failrule) => console.log(failrule));

// getSummary(5, "q")
// .then((success)=> console.log(success))
// .catch((failrule) => console.log(failrule));

import winnerTpl from "../templates/winners-table.handlebars";

const winners = JSON.parse(localStorage.getItem("winners"));

const elements = {
    startButtonEl: document.querySelector(".js-start-race"),
    winnerEl: document.querySelector(".js-winner"),
    progressEl: document.querySelector(".js-progress"),
    tbodyEl: document.querySelector(".js-results-table > tbody"),
}

elements.tbodyEl.innerHTML = winnerTpl(JSON.parse(localStorage.getItem("winners")));

const horses = [
  'Secretariat',
  'Eclipse',
  'West Australian',
  'Flying Fox',
  'Seabiscuit',
];

elements.startButtonEl.addEventListener("click", onStartButtonClick);

function onStartButtonClick() {

    elements.progressEl.textContent = "🤖 Заїзд розпочався, ставки не приймаються!";
    elements.winnerEl.textContent = "";
    const promisesArr = horses.map(horse => raceStarted(horse));

    Promise.race(promisesArr).then(({horse, time}) => { 
        elements.winnerEl.textContent = `🎉 Переможець ${horse}, фiнiшував за ${time}мс часу`;
        winners.push({horse, time, num: winners.length + 1});
        localStorage.setItem("winners", JSON.stringify(winners));
    })
    Promise.all(promisesArr).then(res => {
        elements.progressEl.textContent = "📝 Заїзд закінчився, приймаються ставки.";
        elements.tbodyEl.innerHTML = winnerTpl(winners);
    });
}

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function raceStarted(horse) {
    const time = getRandomTime(2500, 5000);

    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve({horse, time});
        }, time)
    });
}