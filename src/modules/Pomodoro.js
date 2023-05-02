const Pomodoro = ($container) => {
  let pomoTime = 30 * 60;
  let timerId;

  const constructor = () => {
    template();
    render();
    Notification.requestPermission();
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
        <button class='pomo_btn--start'>Start</button>
        <button class='pomo_btn--stop hidden'>Stop</button>
      </div>
    `;
    $container.appendChild($pomoBox);
  };

  const render = () => {
    const pomoBtnStart = $container.querySelector(".pomo_btn--start");
    const pomoBtnStop = $container.querySelector(".pomo_btn--stop");
    pomoBtnStart.addEventListener("click", () => {
      superEventHandler.onClickStart();
    });
    pomoBtnStop.addEventListener("click", () => {
      superEventHandler.onClickStop();
    });
  };

  const startPomo = () => {
    if (timerId) return;
    notiStart();
    const pomoBtnStart = $container.querySelector(".pomo_btn--start");
    const pomoBtnStop = $container.querySelector(".pomo_btn--stop");
    pomoBtnStart.classList.add("hidden");
    pomoBtnStop.classList.remove("hidden");

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
        endPomo();
      }
    }, 1000);
  };

  const endPomo = () => {
    notiEnd();
    clearInterval(timerId);
    pomoTime = 30 * 60;
    timerId = undefined;
    const pomoBtnStart = $container.querySelector(".pomo_btn--start");
    const pomoBtnStop = $container.querySelector(".pomo_btn--stop");
    const pomoTimerItems = $container.querySelectorAll(".pomo-timer span");

    pomoBtnStart.classList.remove("hidden");
    pomoBtnStop.classList.add("hidden");

    pomoTimerItems[0].innerText = "00";
    pomoTimerItems[1].classList.remove("active");
    pomoTimerItems[2].innerText = "00";
  };

  const notiStart = () => {
    if (Notification.permission === "granted") {
      new Notification("코어 타임 시작", {
        body: "코어 타임 시작!",
        icon: "https://www.google.com/favicon.ico",
      });
    } else {
      alert("코어 타임이 시작 되었습니다.");
    }
  };

  const notiEnd = () => {
    if (Notification.permission === "granted") {
      new Notification("코어 타임 종료", {
        body: "코어 타임 종료!",
        icon: "https://www.google.com/favicon.ico",
      });
    } else {
      alert("코어 타임이 종료 되었습니다.");
    }
  };

  const superEventHandler = {
    onClickStart: () => {
      startPomo();
    },
    onClickStop: () => {
      endPomo();
    },
  };

  return constructor;
};

export default Pomodoro;
