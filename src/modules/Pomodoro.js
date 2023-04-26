const Pomodoro = ($container) => {
  let pomoTime = 30 * 60;
  let timerId;

  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    const $pomoBox = document.createElement("div");
    $pomoBox.classList.add("pomo-box");
    $pomoBox.innerHTML = `
      <div class='pomo-timer'>
        <span>00</span>
        <span>:</span>
        <span>00</span>
      </div>
      <div class='pomo-setting'>
        <input type='number' value='30' min='0' max='60' required />
        <button>Start</button>
      </div>
    `;
    $container.appendChild($pomoBox);
  };

  const render = () => {
    const pomoBtn = $container.querySelector(".pomo-setting button");
    pomoBtn.addEventListener("click", () => {
      superEventHandler.onClickStart();
    });
  };

  const startPomo = () => {
    if (timerId) return;
    const pomoInput = $container.querySelector(".pomo-setting input");
    const pomoTimerItems = $container.querySelectorAll(".pomo-timer span");
    pomoTime = parseInt(pomoInput.value) * 60;
    timerId = setInterval(() => {
      if (pomoTime > 0) {
        pomoTime--;
        const minutes = Math.floor(pomoTime / 60);
        const seconds = pomoTime % 60;
        pomoTimerItems[0].textContent = minutes.toString().padStart(2, "0");
        pomoTimerItems[1].classList.add("active");
        pomoTimerItems[2].textContent = seconds.toString().padStart(2, "0");
      } else {
        pomoTime = 30 * 60;
        timerId = undefined;
        const pomoBtn = $container.querySelector(".pomo-setting button");
        pomoBtn.onClick = null;
        pomoBtn.innerText = "Start";
        pomoBtn.addEventListener("click", () => {
          superEventHandler.onClickStart();
        });
      }
    }, 1000);
  };

  const superEventHandler = {
    onClickStart: () => {
      startPomo();
      const pomoBtn = $container.querySelector(".pomo-setting button");
      pomoBtn.onClick = null;
      pomoBtn.innerText = "Stop";
      pomoBtn.addEventListener("click", () => {
        superEventHandler.onClickStop();
      });
    },
    onClickStop: () => {
      clearInterval(timerId);
      pomoTime = 30 * 60;
      timerId = undefined;
      const pomoTimerItems = $container.querySelectorAll(".pomo-timer span");
      const pomoBtn = $container.querySelector(".pomo-setting button");
      pomoBtn.onClick = null;
      pomoBtn.innerText = "Start";
      pomoBtn.addEventListener("click", () => {
        superEventHandler.onClickStart();
      });
      pomoTimerItems[0].innerText = "00";
      pomoTimerItems[1].classList.remove("active");
      pomoTimerItems[2].innerText = "00";
    },
  };

  return constructor;
};

export default Pomodoro;
