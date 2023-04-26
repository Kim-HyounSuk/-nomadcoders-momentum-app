const Clock = ($container) => {
  const constructor = () => {
    template();
    setInterval(render, 500);
  };

  const template = () => {
    const $clockContainer = document.createElement("div");
    $clockContainer.classList.add("clock-container");

    $clockContainer.innerHTML = `
        <div class='clock-box'>
          <div class='clock--hand hours--hand'></div>
          <div class='clock--hand minutes--hand'></div>
          <div class='clock--hand seconds--hand'></div>
          <div class='clock--point'></div>
        </div>
        <div class='digital--clock-box'>
          <span></span>
          <span></span>
          <span>:</span>
          <span></span>
          <span>:</span>
          <span></span>
        </div>
    `;

    $container.appendChild($clockContainer);
  };

  const render = () => {
    const now = new Date();
    const secondsHand = $container.querySelector(".seconds--hand");
    const minutesHand = $container.querySelector(".minutes--hand");
    const hoursHand = $container.querySelector(".hours--hand");
    const digitalClockItems = $container.querySelectorAll(
      ".digital--clock-box span"
    );

    /* 아날로그 시계 부분 */
    const millisecondsDeg = now.getMilliseconds() * (6 / 1000);
    const secondsDeg = now.getSeconds() * 6;
    const minutesDeg = now.getMinutes() * 6;
    const hoursDeg = now.getHours() * 30;

    secondsHand.style.transform = `translate(-50%, 0) rotate(${
      millisecondsDeg + secondsDeg
    }deg)`;
    minutesHand.style.transform = `translate(-50%, 0) rotate(${
      minutesDeg + (secondsDeg / 360) * 6
    }deg)`;
    hoursHand.style.transform = `translate(-50%, 0) rotate(${
      hoursDeg + (minutesDeg / 360) * 30
    }deg)`;

    /* 디지털 시계 부분 */
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const hours = now.getHours();

    digitalClockItems[0].innerText = `${hours > 12 ? "PM" : "AM"}`;
    digitalClockItems[1].innerText = `${
      hours > 13
        ? (hours - 12).toString().padStart(2, "0")
        : hours.toString().padStart(2, "0")
    }`;
    digitalClockItems[3].innerText = `${minutes}`;
    digitalClockItems[5].innerText = `${seconds}`;
  };

  return constructor;
};

export default Clock;
