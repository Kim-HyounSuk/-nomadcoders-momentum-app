import Quotes from "../modules/Quotes.js";
import Time from "../modules/Time.js";
import Topbar from "../modules/Topbar.js";
import Wether from "../modules/Wether.js";

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
    const wether = Wether(articles[1]);
    wether();
    const time = Time(articles[1]);
    time();
    const quotes = Quotes(articles[2]);
    quotes();
  };

  return constructor;
};

export default Home;
