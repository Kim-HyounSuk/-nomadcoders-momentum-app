import {
  CALCUL_CELSIUS,
  fetchWeather,
  getWeatherData,
} from "../libs/weather.js";

const Today = ($container) => {
  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    const $todayBox = document.createElement("section");
    $todayBox.classList.add("today-box");
    $todayBox.innerHTML = `
      <div class='today-content'>
        <span>Today Pannel</span>
        <div class='today-container'>
          <div class='today--weather__box'>
            <div class='today--weather__icon'></div>
            <div class='today--temperature'>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class='today--clock-container'>
            <span></span>
            <span></span>
            <span>:</span>
            <span></span>
            <span>:</span>
            <span></span>
          </div>
        </div>
      </div>
    `;

    $container.appendChild($todayBox);
  };

  const render = () => {
    const todayIcon = $container.querySelector(".today--weather__icon");
    const todayCurrent = $container.querySelectorAll(
      ".today--temperature span"
    );
    const clockItems = $container.querySelectorAll(
      ".today--clock-container span"
    );

    fetchWeather();
    getWeatherData().then((data) => {
      todayIcon.innerHTML = `
      <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' />
    `;
      todayCurrent[0].innerText = `${
        Math.round((data.main.temp - CALCUL_CELSIUS) * 10) / 10
      }℃`;
      todayCurrent[1].innerText = `${data.name}`;
    });

    setInterval(() => {
      const now = new Date();
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const hours = now.getHours();

      clockItems[0].innerText = `${hours >= 12 ? "PM" : "AM"}`;
      clockItems[1].innerText = `${
        hours > 13
          ? (hours - 12).toString().padStart(2, "0")
          : hours.toString().padStart(2, "0")
      }`;
      clockItems[3].innerText = `${minutes}`;
      clockItems[5].innerText = `${seconds}`;
    }, 500);
  };

  return constructor;
};

export default Today;
