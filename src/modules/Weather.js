import {
  fetchWeather,
  getWeatherData,
  CALCUL_CELSIUS,
} from "../libs/weather.js";

const Weather = ($container) => {
  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    const $weatherBox = document.createElement("section");
    $weatherBox.classList.add("weather-box");
    $weatherBox.innerHTML = `
      <div class='weather-content'>
        <span>Today's Weather</span>
        <div class='weather-container'>
          <div class='weather--daily'>
            <div class='weather--current'>
              <span></span>
              <span></span>
            </div>
            <div class='weather--daily__temperature'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class='weather--daily__icon'></div>
        </div>
      </div>
    `;

    $container.appendChild($weatherBox);
  };

  const render = () => {
    const weatherCurrent = $container.querySelectorAll(
      ".weather--current span"
    );
    const weatherIcon = $container.querySelector(".weather--daily__icon");
    const weatherTemp = $container.querySelectorAll(
      ".weather--daily__temperature span"
    );
    fetchWeather();
    getWeatherData().then((data) => {
      weatherCurrent[0].innerText = `${
        Math.round((data.main.temp - CALCUL_CELSIUS) * 10) / 10
      }℃`;
      weatherCurrent[1].innerText = `${data.name}`;
      weatherIcon.innerHTML = `
        <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' />
        <span>${data.weather[0].main}</span>
      `;
      weatherTemp[0].innerText = `최고 ${
        Math.round((data.main.temp_max - CALCUL_CELSIUS) * 10) / 10
      }℃`;
      weatherTemp[1].innerText = `최저 ${
        Math.round((data.main.temp_min - CALCUL_CELSIUS) * 10) / 10
      }℃`;
      weatherTemp[2].innerText = `체감 ${
        Math.round((data.main.feels_like - CALCUL_CELSIUS) * 10) / 10
      }℃`;
    });
  };

  return constructor;
};

export default Weather;
