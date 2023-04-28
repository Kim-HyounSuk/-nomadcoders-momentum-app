import { config } from "./apikey.js";

const API_KEY = config.apikey;
export const CALCUL_CELSIUS = 273.15;

let weatherData = null;

export const fetchWeather = () => {
  const onGeo = {
    success: (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          weatherData = data;
        });
    },
    error: () => {
      alert(`Can't find you. No weather for you.`);
    },
  };

  navigator.geolocation.getCurrentPosition(onGeo.success, onGeo.error);
};

export const getWeatherData = () => {
  return new Promise((resolve, reject) => {
    const checkWeatherData = () => {
      if (weatherData !== null) {
        resolve(weatherData);
      } else {
        setTimeout(checkWeatherData, 100);
      }
    };
    checkWeatherData();
  });
};
