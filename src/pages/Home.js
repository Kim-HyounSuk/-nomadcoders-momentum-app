import Quotes from "../modules/Quotes.js";
import Time from "../modules/Time.js";
import Topbar from "../modules/Topbar.js";
import Weather from "../modules/Weather.js";

const Home = ($container) => {
  const constructor = () => {
    template();
    render();
  };

  const template = () => {
    $container.innerHTML = `
      <article class='page__article'></article>
      <article class='page__article'></article>
      <article class='page__article'></article>
    `;
  };

  const render = () => {
    const articles = $container.querySelectorAll("article");

    const topbar = Topbar(articles[0]);
    topbar();
    const weather = Weather(articles[1]);
    weather();
    const time = Time(articles[1]);
    time();
    const quotes = Quotes(articles[2]);
    quotes();
  };

  return constructor;
};

export default Home;
