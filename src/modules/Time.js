import Clock from "./Clock.js";
import Pomodoro from "./Pomodoro.js";

const Time = ($container) => {
  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    const $timeBox = document.createElement("section");
    $timeBox.classList.add("time-box");
    $timeBox.innerHTML = `
      <button class='time-btn'>
        <i class="fas fa-chevron-left fa-lg"></i>
      </button>
      <button class='time-btn'>
        <i class="fas fa-chevron-right fa-lg"></i>
      </button>
      <div class='time-content active'>
        <span>Analog Clock</span>
      </div>
      <div class='time-content'>
        <span>Pomodoro Timer</span>
      </div>
    `;

    $container.appendChild($timeBox);
  };

  const render = () => {
    const timeContents = $container.querySelectorAll(".time-content");
    const clock = Clock(timeContents[0]);
    const pomodoro = Pomodoro(timeContents[1]);

    clock();
    pomodoro();

    const timeBtns = $container.querySelectorAll(".time-btn");
    timeBtns.forEach((btn) => {
      btn.addEventListener("click", onClickBtn);
    });
  };

  const onClickBtn = () => {
    const timeContents = $container.querySelectorAll(".time-content");
    timeContents.forEach((content) => {
      content.classList.contains("active")
        ? content.classList.remove("active")
        : content.classList.add("active");
    });
  };

  return constructor;
};

export default Time;
