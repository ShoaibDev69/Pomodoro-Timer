/**
 * Represents a Pomodoro Timer.
 * The timer allows the user to set focus time, short break time, and long break time.
 * It displays the remaining time and provides controls to start, pause, and reset the timer.
 */

// Define variables
let focusButton = document.getElementById("focus"); // Button for setting focus time
let buttons = document.querySelectorAll(".btn"); // All buttons on the page
let shortBreakButton = document.getElementById("shortbreak"); // Button for setting short break time
let longBreakButton = document.getElementById("longbreak"); // Button for setting long break time
let startBtn = document.getElementById("btn-start"); // Start button
let reset = document.getElementById("btn-reset"); // Reset button
let pause = document.getElementById("btn-pause"); // Pause button
let time = document.getElementById("time"); // Display for remaining time
let set; // Interval timer
let active = "focus"; // Current timer mode (focus, short, long)
let count = 59; // Seconds count
let paused = true; // Flag indicating if the timer is paused
let minCount = 24; // Minutes count
time.textContent = `${minCount + 1}:00`; // Set initial time display

/**
 * Appends a leading zero to a value if it is less than 10.
 * @param {number} value - The value to append zero to.
 * @returns {string} - The value with or without the leading zero.
 */
const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

// Event listener for reset button
reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

/**
 * Removes the focus class from all buttons.
 */
const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

// Event listener for focus button
focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

// Event listener for short break button
shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

// Event listener for long break button
longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

// Event listener for pause button
pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

// Event listener for start button
startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});
