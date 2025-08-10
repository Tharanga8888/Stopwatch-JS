const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsEl = document.getElementById("laps");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 1;
let lapTime = 0;

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    display.textContent = 
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}:` +
        `${String(milliseconds).padStart(2, "0")}`;
}

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

function lapDisplay() {
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount++}: ${display.textContent}`;
    lapsEl.prepend(li);
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        lapDisplay()
    }
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    startTime = 0;
    isRunning = false;
    lapCount = 1;
    display.textContent = "00:00:00:00";
    lapsEl.innerHTML = "";
}

function lap() {
    if (isRunning) {
        lapDisplay()
    }
}

startBtn.onclick = start;
stopBtn.onclick = stop;
resetBtn.onclick = reset;
lapBtn.onclick = lap;

//Keyboard Shortcuts
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "s") {
        isRunning ? stop() : start();
    } else if (e.key.toLowerCase() === "r") {
        reset();
    } else if (e.key.toLowerCase() === "l") {
        lap();
    }
});
